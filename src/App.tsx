import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { HiMiniArrowRightCircle } from 'react-icons/hi2';
import SongList from './components/SongList';
import { cn } from './lib/utils';
import { songs } from './songs';
import { Lightbulb, Music, Settings, Sparkles, X } from 'lucide-react';

type LyricDisplay = {
  lyric: string;
  isLeft: boolean;
};

type LyricsIndex = {
  index: number;
  lyrics: string[];
};

type StringIndex = {
  index: number;
  string: string;
};

export const parseLyrics = (lyricsString: string): string[] => {
  return lyricsString.split(/\r?\n/).filter((line) => line.trim() !== '');
};

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
}: any) => {
  return (
    <div
      className={cn(
        'fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center backdrop-blur-xl duration-500',
        {
          hidden: !isOpen,
        },
      )}
    >
      <div className="bg-apple-bg-accent border-apple-bg-hover no-scrollbar max-h-[400px] w-[30%] overflow-auto rounded-xl border p-6 shadow-md">
        <div className="flex flex-row justify-between">
          <h1 className="text-apple-text-main w-full text-3xl font-semibold">Settings</h1>
          <span className="flex size-10 items-start justify-end pb-4 pl-4" onClick={onClose}>
            <X className="text-apple-text-accent hover:bg-apple-bg-hover size-6 rounded duration-100" />
          </span>
        </div>

        <div className="mt-4 flex flex-col items-start gap-2">
          <div className="grid w-full grid-cols-2 items-center justify-between">
            <p className="font-apple text-apple-text-main w-30">Max Lyrics</p>
            <input
              type="number"
              max={20}
              value={numLyrics}
              onChange={(event) => setNumLyrics(Number(event.target.value))}
              className="bg-apple-bg-accent border-apple-text-accent text-apple-text-main font-apple rounded-md border border-opacity-50 px-1 outline-none"
            />
          </div>
          <div className="grid w-full grid-cols-2 items-center justify-between">
            <p className="font-apple text-apple-text-main w-30">Max Guesses</p>
            <input
              type="number"
              max={20}
              value={numGuesses}
              onChange={(event) => setNumGuesses(Number(event.target.value))}
              className="bg-apple-bg-accent border-apple-text-accent text-apple-text-main font-apple rounded-md border border-opacity-50 px-1 outline-none"
            />
          </div>
          <div className="grid w-full grid-cols-2 items-center justify-start">
            <p className="font-apple text-apple-text-main w-30">Auto Shuffle</p>
            <input
              type="checkbox"
              checked={isAutoShuffle}
              onChange={(event) => setIsAutoShuffle(event.target.checked)}
              className="bg-apple-bg-accent border-apple-text-accent text-apple-text-main font-apple rounded-md border border-opacity-50 px-1 outline-none"
            />
          </div>
          <div className="grid w-full grid-cols-2 items-center justify-start">
            <p className="font-apple text-apple-text-main w-30">Auto Reveal Answer</p>
            <input
              type="checkbox"
              checked={isAutoReveal}
              onChange={(event) => setIsAutoReveal(event.target.checked)}
              className="bg-apple-bg-accent border-apple-text-accent text-apple-text-main font-apple rounded-md border border-opacity-50 px-1 outline-none"
            />
          </div>
          <div className="flex w-full justify-end">
            <button
              className="bg-apple-red text-apple-text-main mt-4 h-fit cursor-pointer rounded-md px-3 py-1"
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

const LyricsSheet = ({ isOpen, displayedLyrics, isAnswerRevealed, correctSong }: any) => {
  return (
    <div
      className={cn('bg-apple-bg-lyrics border-apple-bg-hover border-l transition-all duration-300 ease-in-out', {
        'w-[300px]': isOpen,
        'w-0': !isOpen,
      })}
      id="Sheet"
    >
      <div className={cn('no-scrollbar fixed top-0 h-full overflow-auto p-3', { hidden: !isOpen })}>
        {displayedLyrics.map((line: LyricDisplay, index: number) => (
          <p
            key={index}
            className={cn(
              'text-apple-text-accent hover:bg-apple-bg-hover hover:text-apple-text-main my-2 w-full rounded-xl p-3 text-2xl font-bold first:mt-12',
              {
                'text-left': line.isLeft,
                'text-right text-lg': !line.isLeft,
                'text-green-500 opacity-60 hover:text-green-500':
                  line.lyric.toLowerCase() === correctSong.toLowerCase(),
                'animate-shake text-red-500 hover:text-red-500':
                  !line.isLeft && line.lyric.toLowerCase() !== correctSong.toLowerCase(),
              },
            )}
          >
            {line.lyric}
          </p>
        ))}
        {isAnswerRevealed && (
          <div className="border-t-apple-bg-hover flex flex-row items-center border border-x-0 border-b-0 p-2">
            <img
              src={import.meta.env.BASE_URL + songs.find((song) => song.title === correctSong)?.cover}
              alt={correctSong}
              className="size-16 rounded"
            />
            <div className="ml-4 flex h-full flex-col justify-center">
              <p className="text-apple-text-main text-xl font-semibold">{correctSong}</p>
              <p className="text-apple-text-accent text-xs">
                {songs.find((song) => song.title === correctSong)?.artist}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [numLyrics, setNumLyrics] = useState(6);
  const [numGuesses, setNumGuesses] = useState(6);
  const [isAutoShuffle, setIsAutoShuffle] = useState(true);
  const [isAutoReveal, setIsAutoReveal] = useState(true);

  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const [correctSongs, setCorrectSongs] = useState<string[]>([]);
  const [correctLyrics, setCorrectLyrics] = useState<LyricsIndex>({ lyrics: [], index: -1 });
  const [guess, setGuess] = useState<StringIndex>({ string: '', index: 0 });
  const [displayedLyrics, setDisplayedLyrics] = useState<LyricDisplay[]>([]);

  useEffect(() => {
    getLyrics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSong = (): string[] => {
    const remainingSongs = songs.filter((song) => !correctSongs.includes(song.title));
    if (remainingSongs.length === 0) {
      alert('You have guessed all the songs!');
      return [];
    }
    const randomIndex = Math.floor(Math.random() * remainingSongs.length);
    const selectedSong = remainingSongs[randomIndex];

    if (selectedSong.lyrics.length < numLyrics) {
      // Remove this song and try again
      const newCorrectSongs = [...correctSongs, selectedSong.title];
      setCorrectSongs(newCorrectSongs);
      return getSong();
    }
    setCorrectSongs([...correctSongs, selectedSong.title]);
    return selectedSong.lyrics;
  };

  const getLyrics = () => {
    setIsAnswerRevealed(false);
    const lyrics: string[] = getSong();
    if (lyrics.length === 0) {
      return;
    }
    const maxStartIndex = Math.max(lyrics.length - numLyrics, 0);
    const randomIndex = Math.floor(Math.random() * (maxStartIndex + 1));
    const numLyricsArray = lyrics.slice(randomIndex, randomIndex + numLyrics);
    setCorrectLyrics({ index: 0, lyrics: numLyricsArray });
    setDisplayedLyrics([{ lyric: numLyricsArray[0], isLeft: true }]);
  };

  const displayAdditionalLyric = () => {
    const index = correctLyrics.index + 1;
    if (index >= correctLyrics.lyrics.length) {
      alert('You have reached the end of the lyrics!');
      return;
    }
    setCorrectLyrics({ ...correctLyrics, index });
    setDisplayedLyrics([...displayedLyrics, { lyric: correctLyrics.lyrics[index], isLeft: true }]);
  };

  const displayAdditionalGuess = () => {
    setDisplayedLyrics([...displayedLyrics, { lyric: guess.string, isLeft: false }]);
  };

  const handleGuess = () => {
    if (guess.index >= numGuesses - 1) {
      alert('You have reached the maximum number of guesses!');
      if (isAutoReveal) {
        setIsAnswerRevealed(true);
      }
      return;
    }
    displayAdditionalGuess();
    if (guess.string.toLowerCase() === correctSongs[correctSongs.length - 1].toLowerCase()) {
      handleCorrect();
    } else {
      setGuess({ string: '', index: guess.index + 1 });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGuess({ string: event.target.value, index: guess.index });
  };

  const handleCorrect = () => {
    setCorrectLyrics({ index: -1, lyrics: [] });
    setGuess({ string: '', index: 0 });
    setIsCelebrating(true);
    setIsAnswerRevealed(true);
    setTimeout(() => {
      setIsCelebrating(false);
    }, 2000);
  };

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  const handlePlay = () => {
    setIsSheetOpen(true);
    displayAdditionalLyric();
  };

  useEffect(() => {
    if (isSettingsOpen) {
      getLyrics();
    }
  }, [isSettingsOpen]);

  useEffect(() => {
    if (isAutoShuffle && isAnswerRevealed) {
      setTimeout(() => {
        getLyrics();
      }, 2500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAnswerRevealed]);

  return (
    <div className="bg-apple-bg-main relative flex overflow-hidden">
      <div
        className={cn('pulsing-glow-border fixed left-0 top-0 h-screen w-full', {
          hidden: !isCelebrating,
        })}
        id="border"
      />
      {/* Settings popover */}
      <SettingsPopover
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        numLyrics={numLyrics}
        setNumLyrics={setNumLyrics}
        numGuesses={numGuesses}
        setNumGuesses={setNumGuesses}
        isAutoShuffle={isAutoShuffle}
        setIsAutoShuffle={setIsAutoShuffle}
        isAutoReveal={isAutoReveal}
        setIsAutoReveal={setIsAutoReveal}
      />
      {/* Main content that will shrink when the sheet opens */}
      <div
        className={cn('px-24 pt-48 transition-all duration-300 ease-in-out', {
          'w-full': !isSheetOpen,
          'w-[calc(100%-300px)]': isSheetOpen,
        })}
      >
        <div
          className="bg-apple-bg-main max-w-screen-3xl no-scrollbar h-full"
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleGuess();
            }
          }}
        >
          <div className="mb-12 flex flex-row items-center gap-10">
            <img
              src={import.meta.env.BASE_URL + '/AppleMusicHeading.png'}
              alt="AppleMusicHeading"
              className="h-40 md:h-60"
            />
            <div className="font-apple flex h-[240px] w-full flex-col justify-between">
              <div className="flex h-full flex-col justify-center">
                <h1 className="text-apple-text-main text-3xl font-semibold md:text-5xl">Guess the 2010's Song</h1>
                <h2 className="text-apple-red text-2xl font-normal md:text-3xl">Tim Shaw's Hits</h2>
                <p className="text-apple-text-accent text-md h-12 overflow-hidden">
                  Can you guess the song from the lyrics?
                  <br /> Click Play to add a lyric. Click Shuffle to get a new song. Submit your guesses by clicking the
                  arrow!
                </p>
              </div>
              <div className="relative flex w-full flex-row gap-4">
                <button
                  className="bg-apple-red text-apple-text-main h-fit w-[116px] cursor-pointer rounded-md px-6 py-1"
                  onClick={handlePlay}
                >
                  <div className="flex flex-row items-center justify-center gap-2">
                    <FaPlay className="size-3" />
                    <p className="text-sm font-semibold">Play</p>
                  </div>
                </button>
                <button
                  className="bg-apple-red text-apple-text-main flex h-fit w-[116px] flex-row items-center gap-2 rounded-md px-6 py-1"
                  onClick={getLyrics}
                >
                  <FaShuffle className="size-3" />
                  <p className="text-sm font-semibold">Shuffle</p>
                </button>
                <div className="relative w-full">
                  <input
                    type="text"
                    className="bg-apple-bg-accent border-apple-text-accent text-apple-text-main font-apple w-full rounded-md border border-opacity-50 px-1 outline-none"
                    value={guess.string}
                    onChange={handleInputChange}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => {
                      setTimeout(() => setIsInputFocused(false), 200);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleGuess();
                      }
                    }}
                    disabled={correctLyrics.index === -1}
                  />
                  {isInputFocused && (
                    <div className="border-apple-bg-hover no-scrollbar absolute top-10 max-h-64 w-full overflow-auto rounded border bg-white duration-100">
                      {songs
                        .filter((song) => song.title.toLowerCase().includes(guess.string.toLowerCase()))
                        .map((song, index) => (
                          <div
                            key={index}
                            className={`hover:bg-apple-bg-hover flex w-full cursor-pointer items-start p-2 ${
                              index % 2 === 0 ? 'bg-apple-bg-main' : 'bg-apple-bg-accent'
                            }`}
                            onClick={() => {
                              setGuess({ string: song.title, index: guess.index }); // Update input value on song selection
                              setIsInputFocused(false); // Close dropdown on selection
                            }}
                          >
                            <img
                              src={import.meta.env.BASE_URL + song.cover}
                              alt={song.title}
                              className="mr-2 h-10 w-10 rounded"
                            />
                            <div>
                              <p className="text-apple-text-main font-bold">{song.title}</p>
                              <p className="text-apple-text-accent text-sm">{song.artist}</p>
                            </div>
                          </div>
                        ))}
                      {songs.filter((song) => song.artist.toLowerCase().includes(guess.string.toLowerCase())).length ===
                        0 && (
                        <div
                          className={`flex w-full items-center p-2 ${
                            songs.length % 2 === 0 ? 'bg-apple-bg-main' : 'bg-apple-bg-accent'
                          }`}
                          onClick={() => {
                            setIsInputFocused(false);
                          }}
                        >
                          <p className="text-apple-text-accent text-sm">No Results.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  className="text-apple-text-main absolute right-[5px] flex h-full flex-row items-center gap-2 rounded-md"
                  onClick={handleGuess}
                >
                  <HiMiniArrowRightCircle className="size-5" />
                </button>
              </div>
            </div>
          </div>
          <SongList />
        </div>
      </div>

      {/* Lyrics Sheet */}
      <LyricsSheet
        isOpen={isSheetOpen}
        displayedLyrics={displayedLyrics}
        isAnswerRevealed={isAnswerRevealed}
        correctSong={correctSongs[correctSongs.length - 1]}
      />

      {/* Button to toggle the sheet */}
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
            className={cn('hover:bg-apple-bg-hover size-10 rounded p-2')}
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
          <span className="text-apple-text-accent flex flex-row">
            <Music className="" />
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
          <span className="text-apple-text-accent flex flex-row">
            <Lightbulb className="" />
            <p className="text-xl">
              : {displayedLyrics.filter((line) => !line.isLeft).length}/{numGuesses}
            </p>
          </span>
        </div>
        {(correctLyrics.index === correctLyrics.lyrics.length - 1 ||
          numGuesses === displayedLyrics.filter((lyric) => lyric.isLeft).length) && (
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
            <Sparkles className="text-apple-text-accent hover:bg-apple-bg-hover size-10 rounded p-2" />
          </div>
        )}
        <div
          id={'balls'}
          className={cn('fixed bottom-3 left-3 duration-300')}
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <Settings className="text-apple-text-accent hover:bg-apple-bg-hover size-10 rounded p-2" />
        </div>
      </div>
    </div>
  );
};

export default App;
