import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface SettingsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  numLyrics: number;
  setNumLyrics: (num: number) => void;
  numGuesses: number;
  setNumGuesses: (num: number) => void;
  isAutoShuffle: boolean;
  setIsAutoShuffle: (isAutoShuffle: boolean) => void;
  isAutoReveal: boolean;
  setIsAutoReveal: (isAutoReveal: boolean) => void;
  isHardMode: boolean;
  setIsHardMode: (isHardMode: boolean) => void;
}

const SettingsPopover = ({
  isOpen,
  onClose,
  numLyrics,
  setNumLyrics,
  numGuesses,
  setNumGuesses,
  isAutoShuffle,
  setIsAutoShuffle,
  isAutoReveal,
  setIsAutoReveal,
  isHardMode,
  setIsHardMode,
}: SettingsPopoverProps) => {
  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center backdrop-blur-xl duration-500',
        {
          hidden: !isOpen,
        },
      )}
    >
      <div className="no-scrollbar max-h-[400px] w-[30%] overflow-auto rounded-xl border border-apple-bg-hover bg-apple-bg-accent p-6 shadow-md">
        <div className="flex flex-row justify-between">
          <h1 className="w-full text-3xl font-semibold text-apple-text-main">Settings</h1>
          <span className="flex size-10 items-start justify-end pb-4 pl-4" onClick={onClose}>
            <X className="size-6 rounded text-apple-text-accent duration-100 hover:bg-apple-bg-hover" />
          </span>
        </div>

        <div className="mt-4 flex flex-col items-start gap-2">
          <div className="grid w-full grid-cols-2 items-center justify-between">
            <p className="w-30 font-apple text-apple-text-main">Max Lyrics</p>
            <input
              type="number"
              max={20}
              value={numLyrics}
              onChange={(event) => setNumLyrics(Number(event.target.value))}
              className="rounded-md border border-apple-text-accent border-opacity-50 bg-apple-bg-accent px-1 font-apple text-apple-text-main outline-none"
            />
          </div>
          <div className="grid w-full grid-cols-2 items-center justify-between">
            <p className="w-30 font-apple text-apple-text-main">Max Guesses</p>
            <input
              type="number"
              max={20}
              value={numGuesses}
              onChange={(event) => setNumGuesses(Number(event.target.value))}
              className="rounded-md border border-apple-text-accent border-opacity-50 bg-apple-bg-accent px-1 font-apple text-apple-text-main outline-none"
            />
          </div>
          <div className="grid w-full grid-cols-2 items-center justify-start">
            <p className="w-30 font-apple text-apple-text-main">Auto Reveal Answer</p>
            <input
              type="checkbox"
              checked={isAutoReveal}
              onChange={(event) => setIsAutoReveal(event.target.checked)}
              className="rounded-md border border-apple-text-accent border-opacity-50 bg-apple-bg-accent px-1 font-apple text-apple-text-main outline-none"
            />
          </div>
          <div className="grid w-full grid-cols-2 items-center justify-start">
            <p className="w-30 font-apple text-apple-text-main">Auto Shuffle</p>
            <input
              type="checkbox"
              checked={isAutoShuffle}
              onChange={(event) => setIsAutoShuffle(event.target.checked)}
              className="rounded-md border border-apple-text-accent border-opacity-50 bg-apple-bg-accent px-1 font-apple text-apple-text-main outline-none"
            />
          </div>
          <div className="grid w-full grid-cols-2 items-center justify-start">
            <p className="w-30 font-apple text-apple-text-main">Hard Mode</p>
            <input
              type="checkbox"
              checked={isHardMode}
              onChange={(event) => setIsHardMode(event.target.checked)}
              className="rounded-md border border-apple-text-accent border-opacity-50 bg-apple-bg-accent px-1 font-apple text-apple-text-main outline-none"
            />
          </div>
          <div className="flex w-full justify-end">
            <button
              className="mt-4 h-fit cursor-pointer rounded-md bg-apple-red px-3 py-1 text-apple-text-main"
              onClick={onClose}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopover;
