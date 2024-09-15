import { parseLyrics } from './Header';

interface LyricsSheetProps {
  lyrics: string;
}

const LyricsSheet = ({ lyrics }: LyricsSheetProps) => {
  return (
    <div className="mt-12">
      {parseLyrics(lyrics).map((line, index) => (
        <p
          key={index}
          className="text-apple-text-accent hover:bg-apple-bg-hover hover:text-apple-text-main my-2 rounded-xl p-3 text-2xl font-bold"
        >
          {line}
        </p>
      ))}
    </div>
  );
};

export default LyricsSheet;
