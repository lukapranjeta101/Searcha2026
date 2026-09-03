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
  const [showIntro, setShowIntro] = useState(true);
  const [leavingIntro, setLeavingIntro] = useState(false);

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

  const enterSite = () => {
    setLeavingIntro(true);
    window.setTimeout(() => setShowIntro(false), 650);
  };

  return (
    <>
      <WorksPage activePage={activePage} onOpenMenu={openMenu} />

      <SiteMenu
        open={menuOpen}
        activePage={activePage}
        onClose={() => setMenuOpen(false)}
      />

      {showIntro && (
        <section
          className={`site-intro${leavingIntro ? " is-leaving" : ""}`}
          aria-label="Searcha introduction"
        >
          <div className="site-intro-content">
            <video
              className="site-intro-video"
              src="./assets/logovideo-intro.mp4"
              poster="./assets/logovideo-poster.jpg"
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            <button className="site-intro-enter" type="button" onClick={enterSite}>
              Enter site
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default App;
