import Link from "next/link";

type NavItem = {
  href: string;
  label: string;
};

type MainNavProps = {
  items: NavItem[];
};

export const MainNav = ({ items }: MainNavProps) => {
  return (
    <nav>
      <ul className="flex space-x-4">
        {items.map((item) => (
          <li key={item.href}>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <Link href={item.href as any}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

