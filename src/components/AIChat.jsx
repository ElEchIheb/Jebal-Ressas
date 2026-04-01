import { useEffect, useMemo, useRef, useState } from "react";
import { createGuideReply } from "../lib/aiGuide";

export function AIChat({ copy, lang, onAction, onOpenChange, openRequest }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const panelRef = useRef(null);
  const timersRef = useRef([]);

  const quickQuestions = useMemo(() => copy.quickQuestions, [copy.quickQuestions]);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => {
    setMessages([
      {
        id: "intro",
        role: "assistant",
        text: copy.intro,
        actions: ["map", "three", "gallery"]
      }
    ]);
    setInput("");
    setIsTyping(false);
    setTypingText("");
    clearTimers();
  }, [copy.intro, lang]);

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    onOpenChange?.(isOpen);

    let cancelled = false;

    const animate = async () => {
      const module = await import("gsap");
      const gsap = module.gsap ?? module.default ?? module;

      if (cancelled || !panelRef.current) {
        return;
      }

      gsap.to(panelRef.current, {
        autoAlpha: isOpen ? 1 : 0,
        y: isOpen ? 0 : 24,
        scale: isOpen ? 1 : 0.96,
        duration: 0.32,
        ease: "power3.out",
        pointerEvents: isOpen ? "auto" : "none"
      });
    };

    animate();

    return () => {
      cancelled = true;
    };
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (openRequest) {
      setIsOpen(true);
    }
  }, [openRequest]);

  const startTypingReply = (reply) => {
    clearTimers();
    setIsTyping(true);
    setTypingText("");

    const revealDelay = window.setTimeout(() => {
      let cursor = 0;
      const increment = Math.max(2, Math.ceil(reply.text.length / 42));

      const step = () => {
        cursor += increment;
        setTypingText(reply.text.slice(0, cursor));

        if (cursor < reply.text.length) {
          const timer = window.setTimeout(step, 18);
          timersRef.current.push(timer);
          return;
        }

        setMessages((current) => [
          ...current,
          {
            id: `${Date.now()}-assistant`,
            role: "assistant",
            text: reply.text,
            actions: reply.actions
          }
        ]);
        setTypingText("");
        setIsTyping(false);
      };

      step();
    }, 260);

    timersRef.current.push(revealDelay);
  };

  const sendMessage = (value) => {
    const nextValue = value.trim();

    if (!nextValue || isTyping) {
      return;
    }

    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-user`, role: "user", text: nextValue, actions: [] }
    ]);
    setInput("");

    const reply = createGuideReply(nextValue, lang);
    startTypingReply(reply);
  };

  return (
    <>
      <button
        className={`chat-launcher glass-panel ${isOpen ? "is-open" : ""}`}
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-label={isOpen ? copy.closeLabel : copy.openLabel}
      >
        <span className="chat-launcher__pulse" aria-hidden="true" />
        <span>{isOpen ? copy.closeLabel : copy.launcher}</span>
      </button>

      <aside className="chat-panel glass-panel" ref={panelRef} aria-hidden={!isOpen}>
        <div className="chat-panel__header">
          <div>
            <span className="chat-panel__eyebrow">AI</span>
            <h3>{copy.title}</h3>
          </div>

          <button type="button" onClick={() => setIsOpen(false)} aria-label={copy.closeLabel}>
            ×
          </button>
        </div>

        <div className="chat-panel__suggestions">
          {quickQuestions.map((question) => (
            <button key={question} type="button" onClick={() => sendMessage(question)}>
              {question}
            </button>
          ))}
        </div>

        <div className="chat-panel__messages" aria-live="polite">
          {messages.map((message) => (
            <article
              className={`chat-message chat-message--${message.role}`}
              key={message.id}
            >
              <span className="chat-message__speaker">{copy.speaker[message.role]}</span>
              <p>{message.text}</p>

              {message.actions?.length ? (
                <div className="chat-message__actions">
                  {message.actions.map((action) => (
                    <button key={action} type="button" onClick={() => onAction(action)}>
                      {copy.actions[action]}
                    </button>
                  ))}
                </div>
              ) : null}
            </article>
          ))}

          {isTyping ? (
            <article className="chat-message chat-message--assistant is-typing">
              <span className="chat-message__speaker">{copy.speaker.assistant}</span>
              <p>
                {typingText || copy.thinking}
                <span className="chat-message__cursor" aria-hidden="true" />
              </p>
            </article>
          ) : null}
        </div>

        <form
          className="chat-panel__form"
          onSubmit={(event) => {
            event.preventDefault();
            sendMessage(input);
          }}
        >
          <input
            className="chat-panel__input"
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={copy.placeholder}
            aria-label={copy.placeholder}
          />
          <button className="button button--primary" type="submit" disabled={isTyping}>
            {copy.submit}
          </button>
        </form>
      </aside>
    </>
  );
}
