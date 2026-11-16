import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Link, Navigate, Outlet, Route, Routes, useLocation } from "react-router";
import "./index.css";
import { ME, STUDENTS } from "./data";
import { K } from "./keys";
import { Admin, Announcements, CoursesPage, Dashboard, Files, LostFound, Profile, SettingsPage } from "./pages";
import { Reporter } from "./reporter";

const NAV = [["dashboard", "Хянах самбар"], ["courses", "Хичээл бүртгэл"], ["profile", "Профайл"], ["files", "Файл"], ["announcements", "Зарлал"], ["settings", "Тохиргоо"]];

function Layout() {
  const me = STUDENTS.find((s) => s.sid === ME)!;
  const { pathname } = useLocation();
  return (
    <div>
      <div hidden dangerouslySetInnerHTML={{ __html: "<!-- 404:[NULL] -->\n<!-- TODO: /m4/admin хуудсыг production-оос хасах -->" }} />
      <header className="sticky top-0 z-10 border-b bg-card">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6">
          <span aria-hidden className="grid size-8 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground">M4</span>
          <span className="font-heading leading-tight">Оюутны портал<span className="block text-xs font-normal text-muted-foreground">2026-2027 оны намар</span></span>
          <span className="ml-auto hidden text-right text-sm leading-tight sm:block">{me.name}<span className="block text-xs text-muted-foreground">{me.sid}</span></span>
          <span aria-hidden className="grid size-8 place-items-center rounded-full bg-secondary text-xs font-semibold">{me.name.split(" ").at(-1)?.[0]}</span>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-6 p-4 sm:p-6 md:grid-cols-[13rem_minmax(0,1fr)]">
        <nav className="flex gap-1 overflow-x-auto md:flex-col md:self-start">
          {NAV.map(([p, t]) => (
            <Link key={p} to={`/m4/${p}`} data-k={K[`nav.${p}`]} aria-current={pathname === `/m4/${p}` ? "page" : undefined}
              className="rounded-md px-3 py-2 text-sm whitespace-nowrap text-muted-foreground no-underline hover:bg-muted hover:text-foreground aria-[current=page]:bg-primary/15 aria-[current=page]:font-semibold aria-[current=page]:text-primary">
              {t}
            </Link>
          ))}
        </nav>
        <div className="min-w-0 space-y-6"><Outlet /></div>
      </div>
      <Reporter />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/m4" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<CoursesPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="files" element={<Files />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="admin" element={<Admin />} />
          <Route path="lost-found" element={<LostFound />} />
        </Route>
        <Route path="*" element={<Navigate to="/m4/dashboard" replace />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
