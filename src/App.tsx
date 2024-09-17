import { useEffect, useState } from 'react';
import FixedButtons from './components/FixedButtons';
import Header from './components/Header';
import LyricsSheet from './components/LyricsSheet';
import SettingsPopover from './components/SettingsPopover';
import SongList from './components/SongList';
import { cn } from './lib/utils';
import { songs } from './songs';

export type LyricDisplay = {
  lyric: string;
  isLeft: boolean;
};

export type LyricsIndex = {
  index: number;
  lyrics: string[];
};

export type StringIndex = {
  index: number;
  string: string;
};

export const parseLyrics = (lyricsString: string): string[] => {
  return lyricsString.split(/\r?\n/).filter((line) => line.trim() !== '');
};

const App = () => {
  const [numLyrics, setNumLyrics] = useState(6);
  const [numGuesses, setNumGuesses] = useState(6);
  const [isAutoShuffle, setIsAutoShuffle] = useState(false);
  const [isAutoReveal, setIsAutoReveal] = useState(true);
  const [isHardMode, setIsHardMode] = useState(false);

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
    if (guess.string === '') {
      alert('Please enter a guess!');
      return;
    }
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
    <div className="relative flex overflow-hidden bg-apple-bg-main">
      {isCelebrating && <div className={cn('pulsing-glow-border fixed left-0 top-0 h-screen w-full')} />}
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
        isHardMode={isHardMode}
        setIsHardMode={setIsHardMode}
      />
      {/* Main content that will shrink when the sheet opens */}
      <div
        className={cn('px-24 pt-48 transition-all duration-300 ease-in-out', {
          'w-full': !isSheetOpen,
          'w-[calc(100%-300px)]': isSheetOpen,
        })}
      >
        <div className="max-w-screen-3xl no-scrollbar h-full bg-apple-bg-main">
          <Header
            correctLyrics={correctLyrics}
            getLyrics={getLyrics}
            guess={guess}
            handleGuess={handleGuess}
            handleInputChange={handleInputChange}
            handlePlay={handlePlay}
            isHardMode={isHardMode}
            isInputFocused={isInputFocused}
            setGuess={setGuess}
            setIsInputFocused={setIsInputFocused}
          />
          <SongList />
        </div>
      </div>
      <LyricsSheet
        isOpen={isSheetOpen}
        displayedLyrics={displayedLyrics}
        isAnswerRevealed={isAnswerRevealed}
        correctSong={correctSongs[correctSongs.length - 1]}
      />

      {/* Button to toggle the sheet */}
      <FixedButtons
        correctLyrics={correctLyrics}
        displayedLyrics={displayedLyrics}
        isAnswerRevealed={isAnswerRevealed}
        isSettingsOpen={isSettingsOpen}
        isSheetOpen={isSheetOpen}
        numGuesses={numGuesses}
        setIsAnswerRevealed={setIsAnswerRevealed}
        setIsSettingsOpen={setIsSettingsOpen}
        toggleSheet={toggleSheet}
      />
    </div>
  );
};

export default App;
