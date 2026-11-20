import { getAllNotes, NOTES_URL } from '../../lib/notes';

export const metadata = {
  title: { absolute: 'Modest Curiosity' },
  description: 'Notes on design, taste, objects and making.',
  alternates: { canonical: NOTES_URL },
  openGraph: {
    type: 'website',
    url: NOTES_URL,
    title: 'Modest Curiosity',
    siteName: 'Modest Curiosity',
  },
};

const NotesIndex = () => {
  const notes = getAllNotes();

  return (
    <main className="brutalist-layout bare notes">
      <div className="left-column">
        <div className="about-section">
          <h1>Modest Curiosity</h1>
        </div>
        <p className="list-heading">Notes</p>
        <ul className="work-list expanded">
          {notes.map((note) => (
            <li key={note.slug}>
              <a className="work-item" href={`/${note.slug}`}>
                [{note.date}] {note.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default NotesIndex;
