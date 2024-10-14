"use client"
import { useState, useEffect } from 'react';

const Typewriter = ({ texts, speed = 100, delayBetween = 1000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (textIndex < texts.length && index < texts[textIndex].length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + texts[textIndex][index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (index === texts[textIndex].length && textIndex < texts.length - 1) {
      const delayTimeout = setTimeout(() => {
        setDisplayedText('');
        setIndex(0);
        setTextIndex((prev) => prev + 1);
      }, delayBetween);
      return () => clearTimeout(delayTimeout);
    }
  }, [index, texts, textIndex, speed, delayBetween]);

  return (
    <div className="inline-block">
      <span className="font-sans text-slate-900 drop-shadow-2xl">{displayedText}</span>
    </div>
  );
};

export default Typewriter;
