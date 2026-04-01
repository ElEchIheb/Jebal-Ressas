import { useEffect, useState } from "react";

export function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || inView) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      options
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [inView, options, ref]);

  return inView;
}
