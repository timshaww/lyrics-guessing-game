import { songs as songImport } from '../songs';

const SongTable = () => {
  const songs = songImport;

  return (
    <div className="mb-12 overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="text-sm text-apple-text-accent">
          <tr>
            <th className="py-2 text-left font-semibold">Song</th>
            <th className="py-2 text-left font-semibold">Artist</th>
            <th className="py-2 text-left font-semibold sm:hidden md:flex">Album</th>
            <th className="py-2 text-left font-semibold">Time</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={index} className="rounded-md odd:bg-apple-bg-accent even:bg-inherit hover:bg-apple-bg-hover">
              <td className="flex items-center p-2 text-sm text-apple-text-main">
                <img src={song.cover} alt={song.title} className="mr-4 h-10 w-10 rounded" />
                {song.title}
              </td>
              <td className="text-sm text-apple-text-accent">{song.artist}</td>
              <td className="items-center text-sm text-apple-text-accent sm:hidden md:table-cell">{song.album}</td>
              <td className="text-sm text-apple-text-accent">{song.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongTable;
