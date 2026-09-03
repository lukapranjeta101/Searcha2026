import { AboutContent } from "../components/AboutContent";
import { ContactContent } from "../components/ContactContent";
import { PortfolioScene } from "../components/PortfolioScene";
import { SiteHeader } from "../components/SiteHeader";
import { InstagramCard } from "../components/InstagramCard";

export function WorksPage({ activePage, onOpenMenu, onOpenContact }) {
  const showingWorks = activePage === "works";
  const showingAbout = activePage === "about";
  const showingContact = activePage === "contact";

  return (
    <main className={`showcase studio-page is-${activePage}`}>
      <PortfolioScene galleryVisible={showingWorks} />
      <SiteHeader onOpenMenu={onOpenMenu} showViewSwitch />

      <div className="interaction-hint" aria-hidden="true">
        <span className="hint-line" />
        <span>Drag or scroll to explore</span>
      </div>

      <AboutContent visible={showingAbout} />
      <ContactContent visible={showingContact} onOpenForm={onOpenContact} />
      <InstagramCard />
    </main>
  );
}
