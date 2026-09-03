export function ContactContent({ visible, onOpenForm }) {
  return (
    <section className="contact-content" aria-labelledby="contact-heading" aria-hidden={!visible}>
      <div className="contact-copy">
        <h1 id="contact-heading">
          Have a project in mind? Let’s create something clear, distinctive, and built to be
          remembered.
        </h1>
        <p>
          Tell me about your business, your goals, and where you want the website to take you.
          Answer four quick questions and I’ll get back to you. {" "}
          <button className="contact-email" type="button" onClick={onOpenForm}>
            Start a project
          </button>
          .
        </p>
      </div>
    </section>
  );
}
