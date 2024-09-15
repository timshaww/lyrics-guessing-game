import { FaPlay } from 'react-icons/fa';
import { FaShuffle } from 'react-icons/fa6';
import { HiMiniArrowRightCircle } from 'react-icons/hi2';
import LyricsSheet from './LyricsSheet';
import { useEffect, useState } from 'react';
import { songPaths, songs } from '../songs';

type StringIndex = {
  index: number;
  string: string;
};

export const parseLyrics = (lyricsString: string): string[] => {
  return lyricsString.split(/\r?\n/).filter((line) => line.trim() !== '');
};

interface HeaderProps {
  handlePlay: () => void;
}

const Header = ({ handlePlay }: HeaderProps) => {
  const [correctSong, setCorrectSong] = useState<StringIndex>({ string: '', index: -1 });
  const [guess, setGuess] = useState<string>('');
  const [lyrics, setLyrics] = useState<StringIndex>({ string: '', index: -1 });
  const [numAttempts, setNumAttempts] = useState<number>(1);

  const getRandomSongPath = (index?: number): StringIndex => {
    const randomIndex = index ?? Math.floor(Math.random() * 4);
    setCorrectSong({ index: randomIndex, string: songs[randomIndex].title });
    console.log('getRandomSongPath correct:', correctSong);
    return {
      index: randomIndex,
      string: songPaths[randomIndex],
    };
  };

  const getLyrics = async (): Promise<string[]> => {
    const response = await fetch(
      `https://api.lyrics.ovh/v1/${getRandomSongPath(correctSong.index === -1 ? undefined : correctSong.index).string}`,
    );
    const data = await response.json();
    return parseLyrics(data.lyrics);
  };

  const getRandomLyric = (lyrics: string[], index?: number, length?: number): StringIndex => {
    const randomIndex = index ?? Math.floor(Math.random() * lyrics.length);
    setLyrics;
    const selectedLyrics = lyrics.slice(randomIndex, randomIndex + (length ?? 1)).join('\n');
    return {
      index: randomIndex,
      string: selectedLyrics,
    };
  };

  const handleClick = () => {
    if (guess === correctSong.string) {
      alert('Correct!');
      setNumAttempts(1);
      setGuess('');
      setCorrectSong({ index: -1, string: '' });
    } else {
      setNumAttempts(numAttempts + 1);
    }
  };

  useEffect(() => {
    const fetchRes = getLyrics();
    fetchRes.then((lyr) => {
      setLyrics({
        string: getRandomLyric(lyr, lyrics.index === -1 ? undefined : lyrics.index, numAttempts).string,
        index: getRandomLyric(lyr, lyrics.index === -1 ? undefined : lyrics.index, numAttempts).index,
      });
      console.log(lyrics);
    });
  }, [numAttempts]);

  return (
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
          <button className="bg-apple-red text-apple-text-main flex h-fit w-[116px] flex-row items-center gap-2 rounded-md px-6 py-1">
            <FaShuffle className="size-3" />
            <p className="text-sm font-semibold">Shuffle</p>
          </button>
          <input
            type="text"
            className="bg-apple-bg-accent border-apple-text-accent text-apple-text-main font-apple w-full rounded-md border border-opacity-50 px-1"
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
          />
          <button
            className="text-apple-text-main absolute right-[5px] flex h-full flex-row items-center gap-2 rounded-md"
            onClick={handleClick}
          >
            <HiMiniArrowRightCircle className="size-5" />
          </button>
          {/* TODO: Make this be the submit button */}
        </div>
      </div>
    </div>
  );
};

export default Header;
