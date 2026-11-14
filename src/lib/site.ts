/* One app serves every address: mrevds.online is the story, projects.mrevds.online is the projects page.
   Locally the same split works on localhost:8080 and projects.localhost:8080. */
const ROOT = "mrevds.online";

const host = () => window.location.hostname;

/** "projects" on projects.mrevds.online, null on the main address and on unknown hosts */
export const currentSub = (): string | null => {
  const h = host();
  if (h.endsWith(`.${ROOT}`)) {
    const sub = h.slice(0, -(ROOT.length + 1));
    return sub === "www" ? null : sub;
  }
  if (h.endsWith(".localhost")) return h.slice(0, -".localhost".length);
  return null;
};

const origin = (sub?: string): string | null => {
  const { protocol, port, hostname } = window.location;
  if (hostname === ROOT || hostname.endsWith(`.${ROOT}`)) return `https://${sub ? `${sub}.` : ""}${ROOT}`;
  if (hostname === "localhost" || hostname.endsWith(".localhost")) {
    return `${protocol}//${sub ? `${sub}.` : ""}localhost${port ? `:${port}` : ""}`;
  }
  return null; // preview deployments and other hosts keep everything on one address
};

/** link to a page of the main site; absolute when we are on a subdomain */
export const mainHref = (path: string) => {
  const root = currentSub() ? origin() : null;
  return root ? `${root}${path}` : path;
};

/** link to the projects page: its own subdomain when there is one, /projects otherwise */
export const projectsHref = () => {
  const sub = origin("projects");
  return sub ?? "/projects";
};

export const isAbsolute = (href: string) => /^https?:\/\//.test(href);
