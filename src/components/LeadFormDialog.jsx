import { useEffect, useRef, useState } from "react";

const questions = [
  {
    key: "name",
    label: "First, what’s your name?",
    placeholder: "Your name",
    type: "text",
    autoComplete: "name",
  },
  {
    key: "phone",
    label: "What’s the best phone number to reach you?",
    placeholder: "+1 555 000 0000",
    type: "tel",
    autoComplete: "tel",
  },
  {
    key: "email",
    label: "And your email address?",
    placeholder: "you@company.com",
    type: "email",
    autoComplete: "email",
  },
  {
    key: "businessType",
    label: "What kind of business are you building?",
  },
];

const businessTypes = ["Local business", "E-commerce", "Personal brand", "Startup", "Other"];

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  businessType: "",
};

export function LeadFormDialog({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const currentQuestion = questions[step];

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 80);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open, step]);

  if (!open) return null;

  const updateField = (key, value) => {
    setFormData((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const moveForward = () => {
    if (!inputRef.current?.reportValidity()) return;
    setStep((current) => Math.min(current + 1, questions.length - 1));
  };

  const submitForm = async () => {
    if (!formData.businessType) {
      setError("Choose the option that fits best.");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/lukapranjeta18@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            "business type": formData.businessType,
            _subject: `New Searcha inquiry from ${formData.name}`,
            _template: "table",
            _captcha: "false",
          }),
        },
      );

      if (!response.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again or email me directly.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step < questions.length - 1) moveForward();
    else submitForm();
  };

  const closeAndReset = () => {
    onClose();
    window.setTimeout(() => {
      setStep(0);
      setFormData(emptyForm);
      setStatus("idle");
      setError("");
    }, 350);
  };

  return (
    <div className="lead-form-overlay" role="presentation" onMouseDown={closeAndReset}>
      <section
        className="lead-form-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-form-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="lead-form-header">
          <span className="lead-form-brand">Searcha</span>
          <button className="lead-form-close" type="button" onClick={closeAndReset}>
            Close <span aria-hidden="true">×</span>
          </button>
        </header>

        {status === "success" ? (
          <div className="lead-form-success" aria-live="polite">
            <span>Message received</span>
            <h2 id="lead-form-title">Thanks, {formData.name}.</h2>
            <p>I’ll take a look and get back to you shortly.</p>
            <button type="button" onClick={closeAndReset}>Back to the site</button>
          </div>
        ) : (
          <form className="lead-form" onSubmit={handleSubmit} noValidate={false}>
            <div className="lead-form-progress" aria-label={`Question ${step + 1} of 4`}>
              {questions.map((question, index) => (
                <span key={question.key} className={index <= step ? "is-active" : ""} />
              ))}
            </div>

            <span className="lead-form-step">0{step + 1} / 04</span>
            <h2 id="lead-form-title">{currentQuestion.label}</h2>

            {currentQuestion.key === "businessType" ? (
              <div className="business-options" role="group" aria-label="Business type">
                {businessTypes.map((type) => (
                  <button
                    key={type}
                    className={formData.businessType === type ? "is-selected" : ""}
                    type="button"
                    onClick={() => updateField("businessType", type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            ) : (
              <input
                ref={inputRef}
                name={currentQuestion.key}
                type={currentQuestion.type}
                value={formData[currentQuestion.key]}
                placeholder={currentQuestion.placeholder}
                autoComplete={currentQuestion.autoComplete}
                onChange={(event) => updateField(currentQuestion.key, event.target.value)}
                required
              />
            )}

            {error && <p className="lead-form-error" role="alert">{error}</p>}

            <footer className="lead-form-actions">
              <button
                className="lead-form-back"
                type="button"
                onClick={() => setStep((current) => Math.max(0, current - 1))}
                disabled={step === 0 || status === "sending"}
              >
                Back
              </button>
              <button className="lead-form-next" type="submit" disabled={status === "sending"}>
                {step === questions.length - 1
                  ? status === "sending" ? "Sending…" : "Send inquiry"
                  : "Continue"}
                <span aria-hidden="true">→</span>
              </button>
            </footer>

            <p className="lead-form-privacy">No spam. Your details are only used to reply.</p>
          </form>
        )}
      </section>
    </div>
  );
}
