export function SiteHeader({ onOpenMenu, showViewSwitch = false }) {
  return (
    <header className="showcase-header">
      <a className="brand-logo" href="#works" aria-label="Searcha works">
        <img src="assets/logo.png" alt="Searcha Website Agency" />
      </a>

      {showViewSwitch && (
        <div className="view-switch" aria-label="Current gallery view">
          <span>Spiral</span>
        </div>
      )}

      <button className="menu-button" type="button" onClick={onOpenMenu} aria-label="Open menu">
        <span>menu</span>
        <i aria-hidden="true" />
      </button>
    </header>
  );
}
