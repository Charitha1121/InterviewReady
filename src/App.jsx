import React, { useState } from "react";

const categories = [
  {
    id: "technical",
    number: "01",
    title: "Technical interview",
    description:
      "Sharpen your problem-solving skills and explain your thinking with confidence.",
    label: "For developers & engineers",
    icon: "code",
    color: "blue",
    questions: [
      "How would you explain the difference between let, const, and var?",
      "What happens when you type a URL into a browser?",
      "How do you approach debugging a problem you have never seen before?",
    ],
  },
  {
    id: "behavioral",
    number: "02",
    title: "HR & behavioral",
    description:
      "Find your stories, structure your answers, and make a memorable first impression.",
    label: "For every career path",
    icon: "people",
    color: "purple",
    questions: [
      "Tell me about yourself and what brings you to this role.",
      "Tell me about a time you overcame a challenging situation.",
      "What is one skill you are currently working to improve?",
    ],
  },
  {
    id: "mock",
    number: "03",
    title: "Mock interviews",
    description:
      "Put it all together with a realistic practice round, at your own pace.",
    label: "Your confidence builder",
    icon: "chat",
    color: "mint",
    questions: [
      "Let's begin: what would you like an interviewer to know about you?",
      "What kind of team helps you do your best work?",
      "What questions do you have for your interviewer?",
    ],
  },
];

function Icon({ name, size = 22 }) {
  const shared = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (name === "code") {
    return (
      <svg {...shared}>
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16" />
      </svg>
    );
  }
  if (name === "people") {
    return (
      <svg {...shared}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="10" cy="7" r="4" />
        <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    );
  }
  if (name === "chat") {
    return (
      <svg {...shared}>
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z" />
      </svg>
    );
  }
  if (name === "arrow") {
    return (
      <svg {...shared}>
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    );
  }
  if (name === "sparkle") {
    return (
      <svg {...shared}>
        <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3zM19 14l1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14z" />
      </svg>
    );
  }
  return null;
}

function PracticeDialog({ category, onClose }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [completed, setCompleted] = useState(false);

  function moveToNextQuestion() {
    setAnswer("");
    if (questionIndex === category.questions.length - 1) {
      setCompleted(true);
    } else {
      setQuestionIndex((current) => current + 1);
    }
  }

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="practice-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <button className="dialog-close" onClick={onClose} aria-label="Close practice">
          ×
        </button>
        {completed ? (
          <div className="dialog-complete">
            <span className="complete-icon">
              <Icon name="sparkle" size={26} />
            </span>
            <p className="eyebrow">PRACTICE COMPLETE</p>
            <h2 id="dialog-title">You showed up. That’s a great start.</h2>
            <p>
              Every answer is a step toward feeling more prepared. Keep practicing
              and your confidence will follow.
            </p>
            <button className="button button-primary" onClick={onClose}>
              Back to exploring
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">
              {category.title.toUpperCase()} <span>·</span> QUESTION {questionIndex + 1} OF{" "}
              {category.questions.length}
            </p>
            <div className="question-progress" aria-label="Question progress">
              {category.questions.map((question, index) => (
                <span
                  className={index <= questionIndex ? "progress-active" : ""}
                  key={question}
                />
              ))}
            </div>
            <h2 id="dialog-title">{category.questions[questionIndex]}</h2>
            <p className="dialog-hint">
              Take a moment to think it through. There’s no timer and no wrong way
              to practice.
            </p>
            <label className="answer-label" htmlFor="practice-answer">
              Your answer
            </label>
            <textarea
              id="practice-answer"
              autoFocus
              placeholder="Start with the main point, then add a little detail..."
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              rows={5}
            />
            <div className="dialog-actions">
              <span>{answer.length > 0 ? `${answer.length} characters` : "Write as much as you like"}</span>
              <button
                className="button button-primary"
                onClick={moveToNextQuestion}
                disabled={!answer.trim()}
              >
                {questionIndex === category.questions.length - 1
                  ? "Finish practice"
                  : "Next question"}
                <Icon name="arrow" size={17} />
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

function App() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function startPractice(category) {
    setActiveCategory(category);
    setMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <nav className="navbar page-shell" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="InterviewReady home">
            <span className="brand-mark">
              <Icon name="sparkle" size={20} />
            </span>
            <span>interview<span className="brand-accent">ready</span></span>
          </a>
          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <div className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#questions" onClick={() => setMenuOpen(false)}>Questions</a>
            <a href="#mock-interviews" onClick={() => setMenuOpen(false)}>Mock interviews</a>
            <a className="nav-cta" href="#questions" onClick={() => setMenuOpen(false)}>
              Start practicing <Icon name="arrow" size={16} />
            </a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero page-shell" id="home">
          <div className="hero-copy">
            <div className="hero-note">
              <span className="note-dot" />
              A little practice goes a long way
            </div>
            <h1>
              Your next interview,
              <br />
              <span>your best one yet.</span>
            </h1>
            <p className="hero-description">
              Big opportunities start with a little preparation. Practice at your
              own pace and walk into every interview feeling ready.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#questions">
                Find your practice <Icon name="arrow" size={18} />
              </a>
              <a className="text-link" href="#how-it-works">
                How it works <span>↓</span>
              </a>
            </div>
            <div className="social-proof">
              <div className="avatar-stack" aria-hidden="true">
                <span>J</span><span>M</span><span>A</span><span>K</span>
              </div>
              <p><strong>A fresh start, made simple.</strong><br />For wherever you are in your journey.</p>
            </div>
          </div>

          <div className="hero-art" aria-label="Illustration of interview preparation">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="floating-note note-top">
              <span className="mini-icon mini-blue"><Icon name="sparkle" size={16} /></span>
              One question at a time
            </div>
            <div className="hero-illustration">
              <div className="illustration-glow" />
              <div className="person-shadow" />
              <div className="person-body">
                <div className="person-neck" />
                <div className="person-head">
                  <div className="hair" />
                  <span className="eye eye-left" />
                  <span className="eye eye-right" />
                  <span className="smile" />
                  <span className="ear" />
                </div>
                <div className="shirt-collar collar-left" />
                <div className="shirt-collar collar-right" />
              </div>
              <div className="desk-line" />
              <div className="laptop">
                <div className="laptop-screen">
                  <span className="screen-dot" />
                  <span className="screen-line screen-line-short" />
                  <span className="screen-line" />
                  <span className="screen-line screen-line-mid" />
                  <span className="screen-choice"><i /> Tell me about yourself</span>
                </div>
                <div className="laptop-base" />
              </div>
            </div>
            <div className="floating-note note-bottom">
              <span className="mini-icon mini-purple"><Icon name="chat" size={16} /></span>
              You’ve got this!
              <span className="note-heart">✦</span>
            </div>
            <span className="art-sparkle sparkle-one">✳</span>
            <span className="art-sparkle sparkle-two">✦</span>
          </div>
        </section>

        <section className="trust-strip" aria-label="Benefits">
          <div className="page-shell trust-items">
            <span><i className="trust-check">✓</i> Practice on your schedule</span>
            <span><i className="trust-check">✓</i> Questions that feel real</span>
            <span><i className="trust-check">✓</i> A little more confidence</span>
          </div>
        </section>

        <section className="practice-section page-shell" id="questions">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR PRACTICE, YOUR WAY</p>
              <h2>Every interview starts <span>somewhere.</span></h2>
              <p className="section-description">
                Pick a place to begin. We’ll take it one question at a time.
              </p>
            </div>
            <a className="see-all-link" href="#questions">
              Explore practice <Icon name="arrow" size={17} />
            </a>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <article
                className={`category-card card-${category.color}`}
                id={category.id === "mock" ? "mock-interviews" : undefined}
                key={category.id}
              >
                <div className="card-topline">
                  <span className="category-icon"><Icon name={category.icon} size={22} /></span>
                  <span className="card-number">{category.number}</span>
                </div>
                <h3>{category.title}</h3>
                <p className="card-description">{category.description}</p>
                <div className="card-footer">
                  <span className="category-tag">{category.label}</span>
                  <button
                    className="card-link"
                    onClick={() => startPractice(category)}
                    aria-label={`Start ${category.title} practice`}
                  >
                    <Icon name="arrow" size={19} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="page-shell how-inner">
            <div className="how-copy">
              <p className="eyebrow">NO PRESSURE. JUST PROGRESS.</p>
              <h2>Confidence isn’t a talent. <span>It’s a practice.</span></h2>
              <p>
                You don’t need to have all the answers today. Start with one
                question, find your words, and build from there.
              </p>
              <button
                className="button button-light"
                onClick={() => startPractice(categories[1])}
              >
                Try a question <Icon name="arrow" size={17} />
              </button>
            </div>
            <div className="steps-card">
              <div className="step">
                <span className="step-number">01</span>
                <div><h3>Choose your focus</h3><p>Pick the kind of interview you want to get ready for.</p></div>
              </div>
              <div className="step">
                <span className="step-number">02</span>
                <div><h3>Think it through</h3><p>Take your time. This is your space to work it out.</p></div>
              </div>
              <div className="step">
                <span className="step-number">03</span>
                <div><h3>Feel the difference</h3><p>Each practice round makes the real thing feel easier.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="closing-cta page-shell">
          <div className="closing-sparkle"><Icon name="sparkle" size={21} /></div>
          <p className="eyebrow">YOUR NEXT CHAPTER IS WAITING</p>
          <h2>Ready when you are.</h2>
          <p>Take a breath, pick a question, and give yourself a head start.</p>
          <a className="button button-primary" href="#questions">
            Find your first question <Icon name="arrow" size={18} />
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell footer-inner">
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark"><Icon name="sparkle" size={18} /></span>
            <span>interview<span className="brand-accent">ready</span></span>
          </a>
          <p>Built to help students prepare, practice &amp; succeed.</p>
          <a className="back-top" href="#home">Back to top ↑</a>
        </div>
      </footer>

      {activeCategory && (
        <PracticeDialog
          category={activeCategory}
          onClose={() => setActiveCategory(null)}
        />
      )}
    </>
  );
}

export default App;
