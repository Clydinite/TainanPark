import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import { ThemeProvider } from "./components/theme-provider";

import Activities from "./pages/Activities";
import Host from "./pages/Host";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MyActivities from "./pages/MyActivities";
import { Button } from "./components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "./components/ui/sheet";

import { Menu } from "lucide-react";
import clsx from "clsx";

import parkIcon from "/park-icon.svg";

const routerType = import.meta.env.VITE_ROUTER_TYPE ?? "browser";
const Router = routerType === "hash" ? HashRouter : BrowserRouter;

function Nav() {
  const location = useLocation();
  const navItems = [
    { path: "/", label: "首頁" },
    { path: "/activities", label: "探索活動" },
    { path: "/host", label: "發起活動" },
    { path: "/my-activities", label: "我的活動" },
    { path: "/profile", label: "個人檔案" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link to="/" className="ml-6 flex items-center space-x-2">
            <img src={parkIcon} className="h-6 w-6" alt="Logo" />
            <span className="font-bold">
              台南公園輕社交平台
            </span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="p-0 h-8 w-8 mr-3 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link to="/" className="m-6 flex items-center space-x-2">
                <img src={parkIcon} className="h-6 w-6" alt="Logo" />
                <span className="font-bold">台南公園輕社交平台</span>
              </Link>
              <div className="h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <Link
                        to={item.path}
                        className={clsx(
                          "text-xl font-medium transition-colors hover:text-foreground/80",
                          location.pathname === item.path
                            ? "text-foreground"
                            : "text-foreground/60"
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
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
            <Route path="/my-activities" element={<MyActivities />} />
            <Route
              path="/profile-demo"
              element={
                <Profile
                  initialName="楊子萱"
                  initialAge="16"
                  initialSchool="台南市立和風高中"
                  initialSocialMedia="@zixuan.draws"
                  initialProfilePicture="persona_profile.png"
                  initialBio="有點害羞、喜歡散步跟拍天空。正在努力變得比較勇敢 :)"
                />
              }
            />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

