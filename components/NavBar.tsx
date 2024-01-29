"use client";

import Link from "next/link";

interface Route {
  title: string;
  href: string;
  tooltip?: string;
}

const routes: Route[] = [
  {
    title: "Exercises",
    href: "/exercises",
  },
  {
    title: "Workouts",
    href: "/workouts",
  },
];

function NavBar() {
  return (
    <nav className="sticky top-0 mt-2 rounded-lg bg-secondary p-2">
      <ul className="flex items-center justify-evenly">
        {routes.map((route, index) => {
          return (
            <li
              key={index}
              className="cursor-pointer rounded-lg p-2 hover:bg-primary hover:text-secondary"
            >
              <Link href={route.href}>{route.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
export default NavBar;
