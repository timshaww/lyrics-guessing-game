import { StringIndex } from '@/App';
import { songs } from '@/songs';
import React from 'react';

interface SongAutocompleteProps {
  guess: StringIndex;
  setGuess: React.Dispatch<React.SetStateAction<StringIndex>>;
  setIsInputFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

const SongAutocomplete = ({ guess, setGuess, setIsInputFocused }: SongAutocompleteProps) => {
  return (
    <div className="no-scrollbar absolute top-10 max-h-64 w-full overflow-auto rounded border border-apple-bg-hover bg-white">
      {songs
        .filter((song) => song.title.toLowerCase().includes(guess.string.toLowerCase()))
        .map((song, index) => (
          <div
            key={index}
            className={`flex w-full cursor-pointer items-start p-2 hover:bg-apple-bg-hover ${
              index % 2 === 0 ? 'bg-apple-bg-main' : 'bg-apple-bg-accent'
            }`}
            onMouseDown={() => {
              setGuess({ string: song.title, index: guess.index });
              console.log('set guess'); // Update input value on song selection
              setTimeout(() => {
                setIsInputFocused(false); // Close dropdown on selection
              }, 100);
            }}
          >
            <img src={import.meta.env.BASE_URL + song.cover} alt={song.title} className="mr-2 h-10 w-10 rounded" />
            <div>
              <p className="font-bold text-apple-text-main">{song.title}</p>
              <p className="text-sm text-apple-text-accent">{song.artist}</p>
            </div>
          </div>
        ))}
      {songs.filter((song) => song.artist.toLowerCase().includes(guess.string.toLowerCase())).length === 0 && (
        <div
          className={`flex w-full items-center p-2 ${
            songs.length % 2 === 0 ? 'bg-apple-bg-main' : 'bg-apple-bg-accent'
          }`}
          onClick={() => {
            setIsInputFocused(false);
          }}
        >
          <p className="text-sm text-apple-text-accent">No Results.</p>
        </div>
      )}
    </div>
  );
};

export default SongAutocomplete;
