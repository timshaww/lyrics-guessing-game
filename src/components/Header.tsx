import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import SongAutocomplete from './SongAutocomplete';
import { HiMiniArrowRightCircle } from 'react-icons/hi2';
import { LyricsIndex, StringIndex } from '@/App';

interface HeaderProps {
  handlePlay: () => void;
  getLyrics: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleGuess: () => void;
  guess: StringIndex;
  setGuess: React.Dispatch<React.SetStateAction<StringIndex>>;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
  isInputFocused: boolean;
  isHardMode: boolean;
  correctLyrics: LyricsIndex;
}

const Header = ({
  handlePlay,
  getLyrics,
  handleInputChange,
  handleGuess,
  guess,
  setGuess,
  setIsInputFocused,
  isInputFocused,
  isHardMode,
  correctLyrics,
}: HeaderProps) => {
  return (
    <div className="mb-12 flex flex-row items-center gap-10">
      <img src={import.meta.env.BASE_URL + '/AppleMusicHeading.png'} alt="AppleMusicHeading" className="h-40 md:h-60" />
      <div className="flex h-[240px] w-full flex-col justify-between font-apple">
        <div className="flex h-full flex-col justify-center">
          <h1 className="text-3xl font-semibold text-apple-text-main md:text-5xl">Guess the 2010's Song</h1>
          <h2 className="text-2xl font-normal text-apple-red md:text-3xl">Tim Shaw's Hits</h2>
          <p className="text-md h-12 overflow-hidden text-apple-text-accent">
            Can you guess the song from the lyrics?
            <br /> Click Play to add a lyric. Click Shuffle to get a new song. Submit your guesses by clicking the
            arrow!
          </p>
        </div>
        <div className="relative flex w-full flex-row gap-4">
          <button
            className="h-fit w-[116px] cursor-pointer rounded-md bg-apple-red px-6 py-1 text-apple-text-main"
            onClick={handlePlay}
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <FaPlay className="size-3" />
              <p className="text-sm font-semibold">Play</p>
            </div>
          </button>
          <button
            className="flex h-fit w-[116px] flex-row items-center gap-2 rounded-md bg-apple-red px-6 py-1 text-apple-text-main"
            onClick={getLyrics}
          >
            <FaShuffle className="size-3" />
            <p className="text-sm font-semibold">Shuffle</p>
          </button>
          <div className="relative w-full">
            <input
              type="text"
              className="h-full w-full rounded-md border border-apple-text-accent border-opacity-50 bg-apple-bg-accent px-1 font-apple text-apple-text-main outline-none"
              value={guess.string}
              onChange={handleInputChange}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleGuess();
                }
              }}
              disabled={correctLyrics.index === -1}
            />
            {isInputFocused && !isHardMode && (
              <SongAutocomplete guess={guess} setGuess={setGuess} setIsInputFocused={setIsInputFocused} />
            )}
          </div>
          <button
            className="absolute right-[5px] flex h-full flex-row items-center gap-2 rounded-md text-apple-text-main"
            onClick={handleGuess}
          >
            <HiMiniArrowRightCircle className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
