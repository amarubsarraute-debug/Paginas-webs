import { motion, useReducedMotion } from "motion/react";

interface AnimatedHeadlineProps {
  text: string;
  className?: string;
}

export function AnimatedHeadline({ text, className = "" }: AnimatedHeadlineProps) {
  const reducedMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <h1 className={className}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          initial={reducedMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.55, delay: index * 0.075, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </h1>
  );
}
