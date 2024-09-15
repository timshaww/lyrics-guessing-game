import { useEffect, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { HiMiniArrowRightCircle } from 'react-icons/hi2';
import SongList from './components/SongList';
import { cn } from './lib/utils';
import { songPaths, songs } from './songs';

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

  // states for styling the sheet
  const [sheetClassName, setSheetClassName] = useState('w-0');
  const [lyricsClassName, setLyricsClassName] = useState('right-2');

  // States for the game
  const [correctSongs, setCorrectSongs] = useState<string[]>([]);
  const [correctLyrics, setCorrectLyrics] = useState<LyricsIndex>({ lyrics: [], index: -1 });
  const [guess, setGuess] = useState<StringIndex>({ string: '', index: 0 });
  const [displayedLyrics, setDisplayedLyrics] = useState<LyricDisplay[]>([]);

  useEffect(() => {
    getLyrics();
  }, []);

  const getSong = async (): Promise<string[]> => {
    const remainingSongs = songs.filter((song) => !correctSongs.includes(song.title));
    if (remainingSongs.length === 0) {
      alert('You have guessed all the songs!');
      return [];
    }
    const randomIndex = Math.floor(Math.random() * remainingSongs.length);
    const selectedSong = remainingSongs[randomIndex];

    const apiResponse = await fetch(`https://api.lyrics.ovh/v1/${songPaths[randomIndex]}`);
    const responseData = await apiResponse.json();

    setCorrectSongs([...correctSongs, selectedSong.title]);
    return parseLyrics(responseData.lyrics);
  };

  const getLyrics = async () => {
    const lyrics: string[] = await getSong();
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
    if (guess.string === correctSongs[correctSongs.length - 1]) {
      setCorrectLyrics({ index: -1, lyrics: [] });
      setGuess({ string: '', index: 0 });
      alert('Correct!');
    } else {
      setGuess({ string: '', index: guess.index + 1 });
    }
    // check if the guess is correct
    // adjust attempts
    // add to display state
  };

  const handleCorrect = () => {
    // show celebration
  };

  useEffect(() => {
    getLyrics();
  }, []);

  const openLyrics = () => {
    if (sheetClassName === 'w-[500px]') {
      setSheetClassName('w-0');
      setLyricsClassName('right-2');
    } else {
      setSheetClassName('w-[500px]');
      setLyricsClassName(`right-[385px]`);
    }
  };

  const handlePlay = () => {
    setSheetClassName('w-[500px]'); // open the sheet.
    setLyricsClassName(`right-[385px]`); // move the lyrics button.
    displayAdditionalLyric();
  };

  return (
    <div className="no-scrollbar flex">
      <div className="bg-apple-bg-main max-w-screen-3xl no-scrollbar h-full w-full px-12 pt-48">
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
              {/* TODO: Change this to a description of 2010s songs */}
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
              <input
                type="text"
                className="bg-apple-bg-accent border-apple-text-accent text-apple-text-main font-apple w-full rounded-md border border-opacity-50 px-1 outline-none"
                value={guess.string}
                onChange={(event) => setGuess({ string: event.target.value, index: guess.index })}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleGuess();
                  }
                }}
                disabled={correctLyrics.index === -1}
              />
              <button
                className="text-apple-text-main absolute right-[5px] flex h-full flex-row items-center gap-2 rounded-md"
                onClick={handleGuess}
              >
                <HiMiniArrowRightCircle className="size-5" />
              </button>
              {/* TODO: Make this be the submit button */}
            </div>
          </div>
        </div>
        <SongList />
      </div>
      <div
        className={cn('border-apple-bg-hover bg-apple-bg-lyrics border-l duration-200', sheetClassName)}
        id={'Sheet'}
      >
        <div className="mt-12 p-3">
          {displayedLyrics.map((line, index) =>
            line.isLeft ? (
              <p
                key={index}
                className="text-apple-text-accent hover:bg-apple-bg-hover hover:text-apple-text-main my-2 rounded-xl p-3 text-2xl font-bold"
              >
                {line.lyric}
              </p>
            ) : (
              <p
                key={index}
                className="text-apple-text-accent hover:bg-apple-bg-hover hover:text-apple-text-main my-2 rounded-xl p-3 text-right text-lg font-bold"
              >
                {line.lyric}
              </p>
            ),
          )}
        </div>
      </div>
      <button onClick={openLyrics} className={cn('text-apple-text-main absolute p-2 duration-200', lyricsClassName)}>
        Lyrics
      </button>
    </div>
  );
};

export default App;
