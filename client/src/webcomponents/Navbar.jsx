import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center text-xl font-semibold" to="/">
            <PackageIcon className="w-8 h-8" />
            <span className="pl-3">CodeRail</span>
          </Link>
          <nav className="hidden md:flex gap-4"></nav>
          <div className="flex items-center gap-4">
            <Link to="/signIn">
              <Button size="sm" variant="outline">
                Sign in
              </Button>
            </Link>
            <Link to="/signUp">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

function PackageIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="10" y="30" width="80" height="40" rx="2" ry="2" />
      <path d="M30 90h40v-20H30z" />
      <line x1="50" y1="39" x2="50" y2="70" />
      <circle cx="25" cy="75" r="10" fill="#000" />
      <circle cx="75" cy="75" r="10" fill="#000" />
    </svg>
  );
}
