import { LyricDisplay } from '@/App';
import { cn } from '@/lib/utils';
import { songs } from '@/songs';
import AnimatedText from './AnimatedText';

interface LyricSheetProps {
  isOpen: boolean;
  displayedLyrics: LyricDisplay[];
  isAnswerRevealed: boolean;
  correctSong: string;
}

const LyricsSheet = ({ isOpen, displayedLyrics, isAnswerRevealed, correctSong }: LyricSheetProps) => {
  return (
    <div
      className={cn('border-l border-apple-bg-hover bg-apple-bg-lyrics transition-all duration-300 ease-in-out', {
        'w-[300px]': isOpen,
        'w-0': !isOpen,
      })}
      id="Sheet"
    >
      <div
        className={cn('no-scrollbar fixed top-0 h-full overflow-auto p-3', {
          hidden: !isOpen,
        })}
      >
        {displayedLyrics.map((line: LyricDisplay, index: number) => (
          <AnimatedText
            key={index}
            text={line.lyric}
            className={cn('my-2 w-full rounded-xl p-3 text-2xl font-bold first:mt-12 hover:bg-apple-bg-hover', {
              'animated-line text-left': line.isLeft,
              'text-right text-lg': !line.isLeft,
              'animate-shake text-red-500 hover:text-red-500':
                !line.isLeft && line.lyric.toLowerCase() !== correctSong?.toLowerCase(),
              'text-green-500': !line.isLeft && line.lyric.toLowerCase() === correctSong?.toLowerCase(),
            })}
          />
        ))}
        {isAnswerRevealed && correctSong && (
          <div className="flex flex-row items-center border border-x-0 border-b-0 border-t-apple-bg-hover p-2">
            <img
              src={import.meta.env.BASE_URL + songs.find((song) => song.title === correctSong)?.cover}
              alt={correctSong}
              className="size-16 rounded"
            />
            <div className="ml-4 flex h-full flex-col justify-center">
              <p className="text-xl font-semibold text-apple-text-main">{correctSong}</p>
              <p className="text-xs text-apple-text-accent">
                {songs.find((song) => song.title === correctSong)?.artist}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LyricsSheet;
