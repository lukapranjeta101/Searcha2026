import { useEffect, useState } from "react";
import { LeadFormDialog } from "./components/LeadFormDialog";
import { SiteMenu } from "./components/SiteMenu";
import { WorksPage } from "./pages/WorksPage";

const pages = new Set(["works", "about", "contact"]);

function getPageFromHash() {
  const page = window.location.hash.replace("#", "").toLowerCase();
  return pages.has(page) ? page : "works";
}

function App() {
  const [activePage, setActivePage] = useState("works");
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [leavingIntro, setLeavingIntro] = useState(false);
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}#works`,
    );

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
      <WorksPage
        activePage={activePage}
        onOpenMenu={openMenu}
        onOpenContact={() => setContactOpen(true)}
      />

      {!showIntro && !contactOpen && (
        <button
          className="floating-contact"
          type="button"
          onClick={() => setContactOpen(true)}
          aria-label="Open contact form"
        >
          <span className="floating-contact-dot" aria-hidden="true" />
          <span>Let’s talk</span>
          <span className="floating-contact-arrow" aria-hidden="true">↗</span>
        </button>
      )}

      <SiteMenu
        open={menuOpen}
        activePage={activePage}
        onClose={() => setMenuOpen(false)}
      />

      <LeadFormDialog open={contactOpen} onClose={() => setContactOpen(false)} />

      {showIntro && (
        <section
          className={`site-intro${leavingIntro ? " is-leaving" : ""}`}
          aria-label="Searcha introduction"
        >
          <div className="site-intro-content">
            <video
              className="site-intro-video"
              src="./assets/logovideo-intro.mp4?v=3"
              poster="./assets/logovideo-poster.jpg?v=3"
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={(event) => {
                if (event.currentTarget.currentTime >= 1.5) setShowEnter(true);
              }}
              onEnded={() => setShowEnter(true)}
              onError={() => setShowEnter(true)}
              aria-hidden="true"
            />
            <button
              className={`site-intro-enter${showEnter ? " is-visible" : ""}`}
              type="button"
              onClick={enterSite}
              tabIndex={showEnter ? 0 : -1}
            >
              Enter site
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default App;
