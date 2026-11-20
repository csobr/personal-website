import { notFound } from 'next/navigation';
import { getAllNotes, NOTES_URL } from '../../../lib/notes';

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const findNote = (slug) => getAllNotes().find((note) => note.slug === slug);

export const dynamicParams = false;

export const generateStaticParams = () =>
  getAllNotes().map((note) => ({ slug: note.slug }));

export const generateMetadata = async ({ params }) => {
  const { slug } = await params;
  const note = findNote(slug);
  if (!note) return {};

  const url = `${NOTES_URL}/${note.slug}`;
  return {
    title: { absolute: `${note.title} | Modest Curiosity` },
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: note.title,
      siteName: 'Modest Curiosity',
      publishedTime: note.date,
    },
  };
};

const NotePage = async ({ params }) => {
  const { slug } = await params;
  const note = findNote(slug);
  if (!note) notFound();

  return (
    <main className="brutalist-layout bare notes">
      <div className="right-column">
        <article className="note">
          <a className="back-button" href="/">
            Back
          </a>
          <h2>{note.title}</h2>
          {note.date && <p className="work-role">{formatDate(note.date)}</p>}
          <div
            className="note-body"
            dangerouslySetInnerHTML={{ __html: note.html }}
          />
        </article>
      </div>
    </main>
  );
};

export default NotePage;
