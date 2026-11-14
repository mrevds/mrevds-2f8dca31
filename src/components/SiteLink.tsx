import type { AnchorHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { isAbsolute } from "@/lib/site";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string };

/* In-app route for relative paths, a plain link when the page lives on another address */
const SiteLink = ({ to, ...rest }: Props) =>
  isAbsolute(to) ? <a href={to} {...rest} /> : <Link to={to} {...rest} />;

export default SiteLink;
