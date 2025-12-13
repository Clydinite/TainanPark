import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import { ThemeProvider } from "./components/theme-provider";
import { useState } from "react";

import Activities from "./pages/Activities";
import Host from "./pages/Host";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Profile from "./pages/Profile"; // Import the new Profile component

const routerType = import.meta.env.VITE_ROUTER_TYPE ?? "browser";
const Router = routerType === "hash" ? HashRouter : BrowserRouter;

function Nav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/activities", label: "Activities" },
    { path: "/host", label: "Host" },
    { path: "/profile", label: "個人檔案" },
  ];

  const getNavClass = (path: string) =>
    `block py-2 px-3 rounded-sm md:p-0 ${
      location.pathname === path
        ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
    }`;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/vite.svg" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Tainan Park Activities
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={getNavClass(path)}
                  aria-current={location.pathname === path ? "page" : undefined}
                  // onClick={() => setIsOpen(false)} // close menu when clicking a link
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="relative overflow-hidden min-h-screen bg-gray-950 text-white">
          <Nav />

          {/* BLOBS */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Center container takes full viewport */}
            <div className="relative w-full h-full max-w-screen-xl mx-auto">
              {/* Pink blob top-left */}
              <div className="absolute -top-20 -left-20 w-100 h-100 bg-pink-500 opacity-5 rounded-full filter blur-3xl mix-blend-multiply animate-blob" />
              {/* Blue blob top-right */}
              <div className="absolute top-40 right-10 w-100 h-100 bg-blue-500 opacity-5 rounded-full filter blur-3xl mix-blend-multiply animate-blob" />
              {/* Green blob bottom-left */}
              <div className="absolute bottom-10 left-20 w-100 h-100 bg-green-500 opacity-5 rounded-full filter blur-3xl mix-blend-multiply animate-blob" />
            </div>
          </div>

          {/* MAIN CONTENT */}
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/host" element={<Host />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile-demo"
              element={
                <Profile
                  initialName="李小明"
                  initialAge="25"
                  initialSchool="成功大學"
                  initialSocialMedia="@lee_xiaoming"
                  initialProfilePicture="https://picsum.photos/200/200"
                />
              }
            />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

