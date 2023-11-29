import Link from "next/link";

interface PureLinkProps {
    href: string;
    children: React.ReactNode;
  }

export const PureLink: React.FC<PureLinkProps> = ({href, children}) => {
    return <Link className="hover:opacity-50 duration-100" href={href}>{children}</Link>;
  };