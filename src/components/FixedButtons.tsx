import { LyricDisplay } from '@/App';
import { cn } from '@/lib/utils';
import { Lightbulb, Music, Settings, Sparkles } from 'lucide-react';
import React from 'react';

interface FixedButtonsProps {
  isSheetOpen: boolean;
  toggleSheet: () => void;
  setIsAnswerRevealed: React.Dispatch<React.SetStateAction<boolean>>;
  isAnswerRevealed: boolean;
  setIsSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSettingsOpen: boolean;
  correctLyrics: any;
  displayedLyrics: any;
  numGuesses: number;
}

const FixedButtons = ({
  correctLyrics,
  displayedLyrics,
  isAnswerRevealed,
  isSettingsOpen,
  isSheetOpen,
  numGuesses,
  setIsAnswerRevealed,
  setIsSettingsOpen,
  toggleSheet,
}: FixedButtonsProps) => {
  return (
    <div
      className={cn('fixed top-3 flex w-[77px] flex-col items-end', {
        'right-[120px]': isSheetOpen,
        'right-3': !isSheetOpen,
      })}
    >
      <button
        onClick={toggleSheet}
        className={cn('fixed top-3 mb-2 rounded-md text-white duration-300', {
          'right-[312px]': isSheetOpen,
          'right-3': !isSheetOpen,
        })}
      >
        <img
          src={import.meta.env.BASE_URL + '/LyricIcon.png'}
          alt="Lyrics"
          className={cn('size-10 rounded p-2 hover:bg-apple-bg-hover')}
        />
      </button>
      <div
        className={cn(
          'fixed top-[56px] mb-2 flex h-10 flex-row rounded p-2 duration-300',
          {
            'opacity-0': !isSheetOpen,
          },
          {
            'right-[312px]': isSheetOpen,
            'right-3': !isSheetOpen,
          },
        )}
      >
        <span className="flex flex-row text-apple-text-accent">
          <Music />
          <p className="text-xl">
            : {correctLyrics.index + 1}/{correctLyrics.lyrics.length}
          </p>
        </span>
      </div>
      <div
        className={cn(
          'fixed top-[100px] mb-2 flex h-10 flex-row rounded p-2 duration-300',
          {
            'opacity-0': !isSheetOpen,
          },
          {
            'right-[312px]': isSheetOpen,
            'right-3': !isSheetOpen,
          },
        )}
      >
        <span className="flex flex-row text-apple-text-accent">
          <Lightbulb />
          <p className="text-xl">
            : {displayedLyrics.filter((line: LyricDisplay) => !line.isLeft).length}/{numGuesses}
          </p>
        </span>
      </div>
      {(correctLyrics.index === correctLyrics.lyrics.length - 1 ||
        numGuesses === displayedLyrics.filter((lyric: LyricDisplay) => lyric.isLeft).length) && (
        <div
          className={cn(
            'fixed top-[144px] duration-300',
            {
              'right-[312px]': isSheetOpen,
              'right-3': !isSheetOpen,
            },
            {
              'opacity-0': !isSheetOpen,
            },
          )}
          onClick={() => setIsAnswerRevealed(!isAnswerRevealed)}
        >
          <Sparkles className="size-10 rounded p-2 text-apple-text-accent hover:bg-apple-bg-hover" />
        </div>
      )}
      <div className={cn('fixed bottom-3 left-3 duration-300')} onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
        <Settings className="size-10 rounded p-2 text-apple-text-accent hover:bg-apple-bg-hover" />
      </div>
    </div>
  );
};

export default FixedButtons;
