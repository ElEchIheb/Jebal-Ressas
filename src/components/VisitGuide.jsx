import { useEffect, useMemo, useRef, useState } from "react";
import { createGuideReply } from "../lib/visitGuide";

function GuideTyping({ label }) {
  return (
    <p>
      {label}
      <span className="guide-message__typing" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
    </p>
  );
}

export function VisitGuide({ copy, lang, onAction }) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(() => [
    { id: `welcome-${lang}`, role: "guide", text: copy.intro, actions: ["experience", "panorama"] }
  ]);
  const timeoutRef = useRef(null);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  const welcomeMessage = useMemo(
    () => ({ id: `welcome-${lang}`, role: "guide", text: copy.intro, actions: ["experience", "panorama"] }),
    [copy.intro, lang]
  );

  useEffect(() => {
    window.clearTimeout(timeoutRef.current);
    setMessages([welcomeMessage]);
    setDraft("");
    setIsTyping(false);
  }, [welcomeMessage]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [isOpen, messages, isTyping]);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const sendMessage = (text) => {
    const trimmed = text.trim();

    if (!trimmed || isTyping) {
      return;
    }

    const reply = createGuideReply(trimmed, lang);

    setIsOpen(true);
    setMessages((current) => [...current, { id: `user-${Date.now()}`, role: "user", text: trimmed }]);
    setDraft("");
    setIsTyping(true);

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: `guide-${Date.now()}`, role: "guide", text: reply.text, actions: reply.actions }
      ]);
      setIsTyping(false);
    }, Math.min(1500, 650 + trimmed.length * 12));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(draft);
  };

  return (
    <>
      <button
        className={`guide-launcher glass-panel ${isOpen ? "is-open" : ""}`}
        type="button"
        aria-label={isOpen ? copy.closeLabel : copy.openLabel}
        onClick={() => {
          setIsOpen((current) => {
            const next = !current;

            if (!current) {
              window.setTimeout(() => inputRef.current?.focus(), 220);
            }

            return next;
          });
        }}
      >
        <span className="guide-launcher__dot" aria-hidden="true" />
        <span>{copy.launcher}</span>
      </button>

      <aside className={`guide-panel glass-panel ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <div className="guide-panel__header">
          <div>
            <span className="guide-panel__eyebrow">{copy.launcher}</span>
            <h3>{copy.title}</h3>
          </div>

          <button type="button" aria-label={copy.closeLabel} onClick={() => setIsOpen(false)}>
            x
          </button>
        </div>

        <div className="guide-panel__suggestions">
          <span>{copy.quickLabel}</span>

          <div className="guide-panel__chiplist">
            {copy.quickQuestions.map((question) => (
              <button key={question} type="button" onClick={() => sendMessage(question)}>
                {question}
              </button>
            ))}
          </div>
        </div>

        <div className="guide-panel__messages">
          {messages.map((message) => (
            <article className={`guide-message guide-message--${message.role}`} key={message.id}>
              <span className="guide-message__speaker">{copy.speaker[message.role]}</span>
              <p>{message.text}</p>

              {message.role === "guide" && message.actions?.length ? (
                <div className="guide-message__actions">
                  {message.actions
                    .filter((action) => copy.actions[action])
                    .map((action) => (
                      <button key={action} type="button" onClick={() => onAction(action)}>
                        {copy.actions[action]}
                      </button>
                    ))}
                </div>
              ) : null}
            </article>
          ))}

          {isTyping ? (
            <article className="guide-message guide-message--guide">
              <span className="guide-message__speaker">{copy.speaker.guide}</span>
              <GuideTyping label={copy.thinking} />
            </article>
          ) : null}

          <div ref={endRef} />
        </div>

        <form className="guide-panel__form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="guide-panel__input"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={copy.placeholder}
          />
          <button className="button button--primary" type="submit" disabled={isTyping}>
            {copy.submit}
          </button>
        </form>
      </aside>
    </>
  );
}
