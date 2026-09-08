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

function RevealText({ as: Tag = "h2", text, className, id }) {
  const tokens = text.split(/(\s+)/);

  return (
    <Tag
      className={["reveal-words", className].filter(Boolean).join(" ")}
      id={id}
      aria-label={text.replace(/\s+/g, " ").trim()}
      data-reveal
    >
      {tokens.map((token, index) => {
        if (token.includes("\n")) return <br aria-hidden="true" key={`break-${index}`} />;
        if (/^\s+$/.test(token)) return " ";

        return (
          <span className="reveal-word" aria-hidden="true" key={`${token}-${index}`}>
            <span style={{ "--word-index": index }}>{token}</span>
          </span>
        );
      })}
    </Tag>
  );
}

export function ImpactContent({ visible }) {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!visible || !contentRef.current) return undefined;

    const scrollContainer = contentRef.current.closest(".showcase");
    const elements = contentRef.current.querySelectorAll("[data-reveal]");
    elements.forEach((element) => element.classList.remove("is-visible"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: scrollContainer,
        threshold: 0.05,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    let animationFrame;
    const revealFromScrollPosition = () => {
      animationFrame = undefined;
      const rootBounds = scrollContainer?.getBoundingClientRect();
      if (!rootBounds) return;

      const triggerPoint = rootBounds.top + rootBounds.height * 0.88;
      elements.forEach((element) => {
        if (element.classList.contains("is-visible")) return;
        const bounds = element.getBoundingClientRect();
        if (bounds.top <= triggerPoint && bounds.bottom >= rootBounds.top) {
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      });
    };

    const handleScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(revealFromScrollPosition);
    };

    const setupFrame = window.requestAnimationFrame(() => {
      elements.forEach((element) => observer.observe(element));
      revealFromScrollPosition();
    });

    scrollContainer?.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      scrollContainer?.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(setupFrame);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      elements.forEach((element) => element.classList.remove("is-visible"));
    };
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
        <RevealText
          as="h1"
          id="impact-heading"
          text="A great website should do more than look good."
        />
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
        <RevealText
          id="case-study-heading"
          text={`Turning an online presence into ${impactResults.revenueShort} in business.`}
        />
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
        <RevealText
          id="visibility-heading"
          text={"We don't just build the destination.\nWe help people find it."}
        />
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
        <RevealText id="capabilities-heading" text="Design is only one part of the equation." />
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
        <RevealText
          id="philosophy-heading"
          text="We don't measure a website by how many people say it looks cool."
        />
        <RevealText
          as="p"
          className="impact-next"
          text="We measure it by what happens next."
        />
        <ol className="impact-growth-path" aria-label="Views to business growth" data-reveal>
          {growthSteps.map((step, index) => (
            <li key={step} style={{ "--path-index": index }}>{step}</li>
          ))}
        </ol>
        <p className="impact-closing" data-reveal>
          Beautiful design gets attention.<br />Strategic design does something with it.
          <strong>Searcha builds for both.</strong>
        </p>
      </section>

      <section className="impact-section impact-cta" aria-labelledby="impact-cta-heading">
        <RevealText
          id="impact-cta-heading"
          text="What could a better online presence do for your business?"
        />
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
