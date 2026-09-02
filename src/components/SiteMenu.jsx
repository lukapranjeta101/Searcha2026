import { useEffect, useRef } from "react";

const navigation = ["works", "about", "contact"];

export function SiteMenu({ open, activePage, onClose }) {
  const closeButton = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    closeButton.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="menu-overlay" role="presentation" onMouseDown={onClose}>
      <section
        className="menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Website navigation"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button ref={closeButton} className="menu-close" type="button" onClick={onClose}>
          <span>close</span>
          <i aria-hidden="true" />
        </button>

        <nav className="menu-navigation" aria-label="Main navigation">
          {navigation.map((page) => (
            <a
              key={page}
              className={activePage === page ? "is-active" : ""}
              href={`#${page}`}
              aria-current={activePage === page ? "page" : undefined}
              onClick={onClose}
            >
              {page}
            </a>
          ))}
        </nav>

        <footer className="menu-footer">
          <a className="menu-email" href="mailto:lukapranjeta18@gmail.com">
            lukapranjeta18@gmail.com
          </a>
          <span className="menu-socials">
            <a
              className="menu-social"
              href="https://www.instagram.com/pranjetaaa/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <svg className="instagram-icon" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4.25" />
                <circle className="instagram-icon-dot" cx="17.4" cy="6.7" r="1" />
              </svg>
            </a>
            <a
              className="menu-social"
              href="https://www.linkedin.com/in/luka-pranjeta-985626282/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <svg className="linkedin-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.47-.9 1.64-1.85 3.37-1.85 3.61 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.1 20.45H3.54V8.98H7.1v11.47Z" />
              </svg>
            </a>
          </span>
        </footer>
      </section>
    </div>
  );
}
