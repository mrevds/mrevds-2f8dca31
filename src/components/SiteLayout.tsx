import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import SiteLink from "./SiteLink";
import { currentSub, isAbsolute, mainHref, pageHref, type Sub } from "@/lib/site";
import Kamon from "./Kamon";
import ClaudeMark from "./ClaudeMark";

const NavItem = ({ sub, label }: { sub: Sub; label: string }) => {
  const to = pageHref(sub);
  return isAbsolute(to) ? (
    <a href={to} aria-current={currentSub() === sub ? "page" : undefined}>{label}</a>
  ) : (
    <NavLink to={to}>{label}</NavLink>
  );
};

/* Frame shared by every page: the wobble filter, the nav, the footer */
const SiteLayout = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      {/* hand-drawn wobble shared by every line illustration */}
      <svg width="0" height="0" className="defs" aria-hidden="true">
        <filter id="rough">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="1.8" />
        </filter>
      </svg>

      <div className="wrap">
        <nav className="nav" aria-label="Primary">
          <SiteLink className="brand" to={mainHref("/")} id="top">
            <Kamon size={30} />
            <span>Denis Muratbaev</span>
          </SiteLink>
          <ul>
            <li><NavItem sub="stack" label="Stack" /></li>
            <li><NavItem sub="projects" label="Projects" /></li>
            <li><NavItem sub="music" label="Music" /></li>
            <li><SiteLink to={mainHref("/#contact")}>Contact</SiteLink></li>
          </ul>
          <SiteLink className="btn btn-ink btn-small" to={mainHref("/#contact")}>Say hi</SiteLink>
        </nav>

        <Outlet />

        <footer className="footer">
          <Kamon size={28} />
          <span>Denis Muratbaev · Tashkent · 2026</span>
          <span className="footer-right">
            <ClaudeMark size={14} /> Built with Claude Code · data from WakaTime, LeetCode and Yandex Music, daily
          </span>
        </footer>
      </div>
    </>
  );
};

export default SiteLayout;
