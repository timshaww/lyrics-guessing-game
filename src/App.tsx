import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { HiMiniArrowRightCircle } from 'react-icons/hi2';
import SongList from './components/SongList';
import { cn } from './lib/utils';
import { songs } from './songs';
import { Lightbulb, Music } from 'lucide-react';

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

const App = () => {
  const NUM_LYRICS = 6;
  const NUM_GUESSES = 6;

  const [isSheetOpen, setIsSheetOpen] = useState(true);
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const [correctSongs, setCorrectSongs] = useState<string[]>([]);
  const [correctLyrics, setCorrectLyrics] = useState<LyricsIndex>({ lyrics: [], index: -1 });
  const [guess, setGuess] = useState<StringIndex>({ string: '', index: 0 });
  const [displayedLyrics, setDisplayedLyrics] = useState<LyricDisplay[]>([]);

  useEffect(() => {
    getLyrics();
  }, []);

  const getSong = (): string[] => {
    const remainingSongs = songs.filter((song) => !correctSongs.includes(song.title));
    if (remainingSongs.length === 0) {
      alert('You have guessed all the songs!');
      return [];
    }
    const randomIndex = Math.floor(Math.random() * remainingSongs.length);
    const selectedSong = remainingSongs[randomIndex];

    setCorrectSongs([...correctSongs, selectedSong.title]);
    if (selectedSong.lyrics.length < NUM_LYRICS) {
      return getSong();
    }
    return selectedSong.lyrics;
  };

  const getLyrics = () => {
    const lyrics: string[] = getSong();
    const randomIndex = Math.floor(Math.random() * lyrics.length - NUM_LYRICS);
    const numLyrics = lyrics.slice(randomIndex, randomIndex + NUM_LYRICS);
    setCorrectLyrics({ index: 0, lyrics: numLyrics });
    setDisplayedLyrics([{ lyric: numLyrics[0], isLeft: true }]);
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
    console.log('correct songs', correctSongs[correctSongs.length - 1]);
    console.log('guess', guess.string);
    console.log('correct lyrics', correctLyrics.lyrics);
    if (guess.index === NUM_GUESSES) {
      alert('You have reached the maximum number of guesses!');
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
    setTimeout(() => {
      setIsCelebrating(false);
    }, 2000);
  };

  useEffect(() => {
    getLyrics();
  }, []);

  const toggleSheet = () => {
    setIsSheetOpen(!isSheetOpen);
  };

  const handlePlay = () => {
    setIsSheetOpen(true);
    displayAdditionalLyric();
  };

  return (
    <div className="bg-apple-bg-main relative flex overflow-hidden">
      <div
        className={cn('pulsing-glow-border fixed left-0 top-0 h-screen w-full', {
          hidden: !isCelebrating,
        })}
        id="border"
      />
      {/* Main content that will shrink when the sheet opens */}
      <div
        className={cn('px-24 pt-48 transition-all duration-300 ease-in-out', {
          'w-full': !isSheetOpen,
          'w-[calc(100%-300px)]': isSheetOpen,
        })}
      >
        <div className="bg-apple-bg-main max-w-screen-3xl no-scrollbar h-full">
          <div className="mb-12 flex flex-row items-center gap-10">
            <img src="/AppleMusicHeading.png" alt="AppleMusicHeading" className="h-40 md:h-60" />
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
                    onChange={(event) => handleInputChange(event)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => {
                      setTimeout(() => setIsInputFocused(false), 200); // Delay hiding the dropdown
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleGuess();
                      }
                    }}
                    disabled={correctLyrics.index === -1}
                  />
                  <div
                    className={cn(
                      'border-apple-bg-hover no-scrollbar absolute top-10 max-h-64 w-full overflow-auto rounded border bg-white duration-100',
                      {
                        hidden: !isInputFocused,
                        'flex flex-col items-start justify-start': isInputFocused,
                      },
                    )}
                  >
                    {songs
                      .filter((song) => song.title.toLowerCase().includes(guess.string.toLowerCase()))
                      .map((song, index) => (
                        <div
                          key={index}
                          className={`hover:bg-apple-bg-hover flex w-full cursor-pointer items-start p-2 ${
                            index % 2 === 0 ? 'bg-apple-bg-main' : 'bg-apple-bg-accent'
                          }`}
                          onClick={() => {
                            setGuess({ string: song.title, index: guess.index + 1 }); // Update input value on song selection
                            setIsInputFocused(false); // Close dropdown on selection
                          }}
                        >
                          <img src={song.cover} alt={song.title} className="mr-2 h-10 w-10 rounded" />
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
                        <p className="text-apple-text-accent text-sm">No Results. </p>
                      </div>
                    )}
                  </div>
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

      {/* Sheet that opens and shifts content */}
      <div
        className={cn('bg-apple-bg-lyrics border-apple-bg-hover border-l transition-all duration-300 ease-in-out', {
          'w-[300px]': isSheetOpen,
          'w-0': !isSheetOpen,
        })}
        id="Sheet"
      >
        <div className={cn('fixed top-0 h-full overflow-hidden p-3', { hidden: !isSheetOpen })}>
          {/* Sheet content, only visible when sheet is open */}
          {displayedLyrics.map((line, index) => (
            <p
              key={index}
              className={cn(
                'text-apple-text-accent hover:bg-apple-bg-hover hover:text-apple-text-main my-2 w-full rounded-xl p-3 text-2xl font-bold first:mt-12',
                {
                  'text-left': line.isLeft,
                  'text-right text-lg': !line.isLeft,
                  'text-green-500 opacity-60 hover:text-green-500':
                    line.lyric &&
                    correctSongs &&
                    correctSongs[correctSongs.length - 1] &&
                    line.lyric.toLowerCase() === correctSongs[correctSongs.length - 1].toLowerCase(),
                  'animate-shake text-red-500 hover:text-red-500':
                    !line.isLeft && line.lyric.toLowerCase() !== correctSongs[correctSongs.length - 1].toLowerCase(),
                },
              )}
            >
              {line.lyric}
            </p>
          ))}
        </div>
      </div>

      {/* Button to toggle the sheet */}
      <div
        className={cn('fixed top-5 flex w-[77px] flex-col items-end', {
          'right-[320px]': isSheetOpen,
          'right-5': !isSheetOpen,
        })}
      >
        <button
          onClick={toggleSheet}
          className={cn('fixed top-5 mb-2 rounded-md text-white duration-300', {
            'right-[320px]': isSheetOpen,
            'right-5': !isSheetOpen,
          })}
        >
          <img src="/LyricIcon.png" alt="Lyrics" className={cn('hover:bg-apple-bg-hover size-10 rounded p-2')} />
        </button>
        <div
          className={cn(
            'fixed top-[60px] mb-2 flex h-10 flex-row rounded p-2 duration-300',
            {
              'opacity-0': !isSheetOpen,
            },
            {
              'right-[320px]': isSheetOpen,
              'right-5': !isSheetOpen,
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
              'right-[320px]': isSheetOpen,
              'right-5': !isSheetOpen,
            },
          )}
        >
          <span className="text-apple-text-accent flex flex-row">
            <Lightbulb className="" />
            <p className="text-xl">
              : {displayedLyrics.filter((line) => !line.isLeft).length}/{NUM_GUESSES}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default App;
