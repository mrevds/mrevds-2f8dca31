export type Project = {
  name: string;
  kind: string;
  year: string;
  status: string;
  plate: string;
  summary: string;
  strengths: [title: string, text: string][];
  note: string;
  stack: string[];
  repo: string;
};

export const githubProfile = "https://github.com/mrevds";

export const projects: Project[] = [
  {
    name: "clipkeep",
    kind: "clipboard history manager",
    year: "2026",
    status: "released · MIT",
    plate: "var(--sage)",
    summary:
      "Everything you copy, one hotkey away. A Win+V style history that stays fast with years of clips and keeps them private.",
    strengths: [
      ["Instant", "Search over 100,000 clips takes about a millisecond, so the history never gets in the way."],
      ["Private", "Encrypted on disk. Passwords and tokens are recognised, masked and forgotten after 60 seconds."],
      ["Everywhere", "One native binary for Linux, Windows and macOS, with optional encrypted sync through Google Drive or a shared folder."],
    ],
    note: "Tested on Linux (GNOME, Wayland). Windows and macOS builds are compile-checked.",
    stack: ["Rust", "egui", "ChaCha20-Poly1305", "Argon2id", "Google Drive API"],
    repo: "https://github.com/mrevds/clipkeep",
  },
  {
    name: "droplet-browser",
    kind: "web browser engine",
    year: "2026",
    status: "work in progress",
    plate: "var(--sky)",
    summary:
      "A browser written from scratch to see how the web works under the hood: parsing, layout, painting, networking, windows.",
    strengths: [
      ["All its own", "HTML, CSS, fonts, images and TLS are written in-house. Zero external crates across 16 workspace crates."],
      ["Light", "An arena DOM, tabs that hibernate after the third warm one, and a tracker blocker that stops ad hosts before DNS."],
      ["Three desktops", "Wayland and X11, Win32 and Cocoa windows, plus a headless mode that dumps the DOM, the layout or a frame."],
    ],
    note: "Still growing: 4 of 12 test pages render correctly, tables, float and media queries are next.",
    stack: ["Rust", "Wayland / X11", "Win32", "Cocoa", "seccomp-bpf"],
    repo: "https://github.com/mrevds/droplet-browser",
  },
];
