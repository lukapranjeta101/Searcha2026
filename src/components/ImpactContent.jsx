import { useEffect, useRef } from "react";

// Update these values and the metric descriptions below when new results are available.
export const impactResults = {
  revenueShort: "$40K+",
  revenueFull: "$40,000",
  calls: "21",
  reach: "50K",
  brands: "15+",
};

export const impactMetrics = [
  {
    value: impactResults.revenueShort,
    description: "Reported additional revenue generated for one client",
  },
  {
    value: impactResults.calls,
    description: "Additional customer calls generated in 60 days",
  },
  {
    value: impactResults.reach,
    description: "People reached through client websites and digital presence",
  },
  { value: impactResults.brands, description: "Businesses and brands worked with" },
];

const processStages = [
  {
    number: "01",
    name: "Discovery",
    description: "Get the business in front of people already searching for what it offers.",
  },
  {
    number: "02",
    name: "Trust",
    description:
      "Give those visitors a polished digital presence that immediately makes the business feel credible.",
  },
  {
    number: "03",
    name: "Action",
    description: "Make calling, contacting, booking, or requesting a quote effortless.",
  },
  {
    number: "04",
    name: "Growth",
    description: "Turn more of that attention into real customers and measurable business.",
  },
];

const capabilities = [
  {
    name: "Stand out",
    description:
      "Distinctive design that makes the business feel different from everyone else in its category.",
  },
  {
    name: "Get found",
    description:
      "Search-friendly websites and digital strategies designed to improve visibility.",
  },
  {
    name: "Build trust",
    description:
      "Clear messaging, professional presentation, social proof, and a better overall digital experience.",
  },
  {
    name: "Create action",
    description: "Every page is designed around getting the visitor to take the next step.",
  },
];

const growthSteps = ["Views", "Clicks", "Calls", "Customers", "Growth"];

export function ImpactContent({ visible }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!visible || !contentRef.current) return undefined;

    const elements = contentRef.current.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8%" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [visible]);

  return (
    <article
      ref={contentRef}
      className="impact-content"
      aria-labelledby="impact-heading"
      aria-hidden={!visible}
    >
      <section className="impact-hero impact-section">
        <p className="impact-eyebrow" data-reveal>THE IMPACT</p>
        <h1 id="impact-heading" data-reveal>A great website should do more than look good.</h1>
        <p className="impact-lede" data-reveal>
          Searcha builds digital experiences designed to get businesses noticed, build trust, and
          turn attention into real opportunities.
        </p>

        <dl className="impact-stats" aria-label="Searcha results">
          {impactMetrics.map((metric, index) => (
            <div className="impact-stat" data-reveal key={metric.description} style={{ "--index": index }}>
              <dt>{metric.value}</dt>
              <dd>{metric.description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="impact-section impact-case-study" aria-labelledby="case-study-heading">
        <p className="impact-eyebrow" data-reveal>ONE PROJECT. REAL RESULTS.</p>
        <h2 id="case-study-heading" data-reveal>
          Turning an online presence into {impactResults.revenueShort} in business.
        </h2>
        <div className="impact-case-copy" data-reveal>
          <p>
            Mike&apos;s Handyman already did great work. The problem wasn&apos;t the service — it was
            getting more people to find the business, trust it, and take the next step.
          </p>
          <p>
            Searcha rebuilt the digital experience around that journey. We created a stronger
            website, improved the way the business presented itself online, and made it easier for
            potential customers to turn interest into a phone call.
          </p>
          <p>
            Within 60 days, the business received {" "}
            <strong>{impactResults.calls} additional customer calls</strong>, contributing to more
            than <strong>{impactResults.revenueFull}</strong> in reported revenue.
          </p>
        </div>

        <ol className="impact-process" aria-label="Discovery to growth process" data-reveal>
          {processStages.map((stage) => (
            <li key={stage.number}>
              <span className="impact-process-number">{stage.number}</span>
              <h3>{stage.name}</h3>
              <p>{stage.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="impact-section impact-visibility" aria-labelledby="visibility-heading">
        <p className="impact-eyebrow" data-reveal>BEING GOOD ISN&apos;T ENOUGH IF NOBODY SEES YOU.</p>
        <h2 id="visibility-heading" data-reveal>
          We don&apos;t just build the destination.<br />We help people find it.
        </h2>
        <p className="impact-body-copy" data-reveal>
          A website is only valuable when the right people reach it.<br /><br />
          Searcha thinks beyond the screen — combining web design, development, search visibility,
          SEO, Google presence, and conversion strategy to help businesses get discovered by more
          of the people they&apos;re trying to reach.
        </p>
        <div className="impact-reach" data-reveal>
          <strong>{impactResults.reach}</strong>
          <span>people put in front of Searcha clients</span>
          <small>Across search, websites, Google presence, and digital campaigns.</small>
        </div>
      </section>

      <section className="impact-section impact-capabilities" aria-labelledby="capabilities-heading">
        <h2 id="capabilities-heading" data-reveal>Design is only one part of the equation.</h2>
        <ol>
          {capabilities.map((capability, index) => (
            <li data-reveal key={capability.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{capability.name}</h3>
              <p>{capability.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="impact-section impact-philosophy" aria-labelledby="philosophy-heading">
        <p className="impact-eyebrow" data-reveal>OUR APPROACH</p>
        <h2 id="philosophy-heading" data-reveal>
          We don&apos;t measure a website by how many people say it looks cool.
        </h2>
        <p className="impact-next" data-reveal>We measure it by what happens next.</p>
        <ol className="impact-growth-path" aria-label="Views to business growth" data-reveal>
          {growthSteps.map((step) => <li key={step}>{step}</li>)}
        </ol>
        <p className="impact-closing" data-reveal>
          Beautiful design gets attention.<br />Strategic design does something with it.
          <strong>Searcha builds for both.</strong>
        </p>
      </section>

      <section className="impact-section impact-cta" aria-labelledby="impact-cta-heading">
        <h2 id="impact-cta-heading" data-reveal>
          What could a better online presence do for your business?
        </h2>
        <p data-reveal>
          Tell us where your business is today and where you&apos;re trying to take it. We&apos;ll figure
          out what your digital presence needs to do to help you get there.
        </p>
        <div className="impact-actions" data-reveal>
          <a className="impact-action-primary" href="#contact">Start a project <span>↗</span></a>
          <a className="impact-action-secondary" href="#works">View our work <span>↗</span></a>
        </div>
      </section>
    </article>
  );
}
