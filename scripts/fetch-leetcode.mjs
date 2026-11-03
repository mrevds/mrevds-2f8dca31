#!/usr/bin/env node
// Pulls public LeetCode stats for the profile into src/data/leetcode.json. No token needed.
import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const USER = process.env.LEETCODE_USER || "mrevds";
const OUT_PATH = path.join(process.cwd(), "src/data/leetcode.json");

const query = `query ($u: String!) {
  matchedUser(username: $u) {
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    languageProblemCount { languageName problemsSolved }
    tagProblemCounts {
      advanced { tagName problemsSolved }
      intermediate { tagName problemsSolved }
      fundamental { tagName problemsSolved }
    }
    userCalendar { streak totalActiveDays submissionCalendar }
  }
  allQuestionsCount { difficulty count }
  userContestRanking(username: $u) { rating attendedContestsCount topPercentage }
  recentAcSubmissionList(username: $u, limit: 6) { title titleSlug timestamp lang }
}`;

await mkdir(path.dirname(OUT_PATH), { recursive: true });

try {
  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json", Referer: "https://leetcode.com", "User-Agent": "mrevds-site" },
    body: JSON.stringify({ query, variables: { u: USER } }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const { data, errors } = await res.json();
  if (errors?.length || !data?.matchedUser) throw new Error(errors?.[0]?.message || "user not found");

  const u = data.matchedUser;
  const byDiff = (list) => Object.fromEntries(list.map((x) => [x.difficulty.toLowerCase(), x.count]));
  const tags = [...u.tagProblemCounts.advanced, ...u.tagProblemCounts.intermediate, ...u.tagProblemCounts.fundamental]
    .sort((a, b) => b.problemsSolved - a.problemsSolved)
    .slice(0, 8)
    .map((t) => ({ name: t.tagName, solved: t.problemsSolved }));

  const out = {
    ok: true,
    fetchedAt: new Date().toISOString(),
    username: USER,
    ranking: u.profile.ranking,
    solved: byDiff(u.submitStatsGlobal.acSubmissionNum),
    total: byDiff(data.allQuestionsCount),
    languages: u.languageProblemCount
      .sort((a, b) => b.problemsSolved - a.problemsSolved)
      .map((l) => ({ name: l.languageName, solved: l.problemsSolved })),
    tags,
    streak: u.userCalendar.streak,
    activeDays: u.userCalendar.totalActiveDays,
    // unix day start (seconds) → accepted submissions that day
    calendar: JSON.parse(u.userCalendar.submissionCalendar || "{}"),
    contest: data.userContestRanking,
    recent: data.recentAcSubmissionList.map((s) => ({ title: s.title, slug: s.titleSlug, at: Number(s.timestamp), lang: s.lang })),
  };
  await writeFile(OUT_PATH, JSON.stringify(out, null, 2) + "\n");
  console.log(`[leetcode] ${out.solved.all} solved, saved to ${OUT_PATH}`);
} catch (err) {
  // keep the last good snapshot instead of breaking the page
  if (existsSync(OUT_PATH) && JSON.parse(await readFile(OUT_PATH, "utf-8")).ok) {
    console.warn(`[leetcode] fetch failed (${err.message}), keeping existing data`);
  } else {
    await writeFile(OUT_PATH, JSON.stringify({ ok: false, fetchedAt: null }, null, 2) + "\n");
    console.error(`[leetcode] fetch failed: ${err.message}`);
    process.exitCode = 1;
  }
}
