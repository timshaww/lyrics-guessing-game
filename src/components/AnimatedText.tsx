interface AnimatedTextProps {
  text: string;
  className: string;
}

const AnimatedText = ({ text, className }: AnimatedTextProps) => {
  const words = text.split(' ');

  return (
    <p className={`${className}`}>
      {words.map((word: string, index: number) => (
        <span key={index} className="word-span" style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}>
          {word}{' '}
        </span>
      ))}
    </p>
  );
};

export default AnimatedText;
