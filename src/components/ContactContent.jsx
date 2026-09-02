export function ContactContent({ visible }) {
  return (
    <section className="contact-content" aria-labelledby="contact-heading" aria-hidden={!visible}>
      <div className="contact-copy">
        <h1 id="contact-heading">
          Have a project in mind? Let’s create something clear, distinctive, and built to be
          remembered.
        </h1>
        <p>
          Tell me about your business, your goals, and where you want the website to take you.
          Start a conversation at{" "}
          <a className="contact-email" href="mailto:lukapranjeta18@gmail.com">
            lukapranjeta18@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  );
}
