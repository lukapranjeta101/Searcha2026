import { useEffect, useState } from "react";
import { SiteMenu } from "./components/SiteMenu";
import { WorksPage } from "./pages/WorksPage";

const pages = new Set(["works", "about", "contact"]);

function getPageFromHash() {
  const page = window.location.hash.replace("#", "").toLowerCase();
  return pages.has(page) ? page : "works";
}

function App() {
  const [activePage, setActivePage] = useState(getPageFromHash);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash());
      window.scrollTo(0, 0);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.title = `${activePage[0].toUpperCase()}${activePage.slice(1)} — Searcha`;
  }, [activePage]);

  const openMenu = () => setMenuOpen(true);

  return (
    <>
      <WorksPage activePage={activePage} onOpenMenu={openMenu} />

      <SiteMenu
        open={menuOpen}
        activePage={activePage}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}

export default App;
