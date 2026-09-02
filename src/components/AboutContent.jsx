export function AboutContent({ visible }) {
  return (
    <section className="about-content" aria-labelledby="about-heading" aria-hidden={!visible}>
      <div className="about-copy">
        <h1 id="about-heading">
          We design and build modern websites that make brands stand out. Searcha is a design
          &amp; development studio focused on bold visual design, smooth interactions, and modern
          web technology.
        </h1>
        <p>
          Most of our work is discovered through{" "}
          <a
            className="instagram-inline"
            href="https://www.instagram.com/pranjetaaa/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          , where we share the websites, concepts, and experiments we create. No boring websites.
          Just digital experiences built to be remembered.
        </p>
      </div>
    </section>
  );
}
