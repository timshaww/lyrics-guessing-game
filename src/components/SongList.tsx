import { songs as songImport } from '../songs';

const SongTable = () => {
  const songs = songImport;

  return (
    <div className="mb-12 overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="text-apple-text-accent text-sm">
          <tr>
            <th className="py-2 text-left font-semibold">Song</th>
            <th className="py-2 text-left font-semibold">Artist</th>
            <th className="py-2 text-left font-semibold sm:hidden md:flex">Album</th>
            <th className="py-2 text-left font-semibold">Time</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => (
            <tr key={index} className="odd:bg-apple-bg-accent hover:bg-apple-bg-hover rounded-md even:bg-inherit">
              <td className="text-apple-text-main flex items-center p-2 text-sm">
                <img src={song.cover} alt={song.title} className="mr-4 h-10 w-10 rounded" />
                {song.title}
              </td>
              <td className="text-apple-text-accent text-sm">{song.artist}</td>
              <td className="text-apple-text-accent items-center text-sm sm:hidden md:table-cell">{song.album}</td>
              <td className="text-apple-text-accent text-sm">{song.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongTable;
