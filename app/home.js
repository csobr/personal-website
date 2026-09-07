'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#e6e4dc"/>
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const blurDataURL = (w, h) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const Home = ({ notes = [] }) => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [bgOffset, setBgOffset] = useState({ x: 0, y: 0 });
  const [bgVisible, setBgVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const dragRef = useRef(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const rightColumnRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    console.log(`
                 M
                 ' \`
                |  :|\`-._
                |  :|\`-._\`-._
               /   ::\\   \`-._\`-._
              /     ::\\      \`-(_)
             |_________|      / /
                 \`-'         / /
                            / /
                           / /
                          / /
         ________________/ _&_______
        /8P'             \`'      S/
       /P'        ____________   /
      /'  /\\     /           /   /
     /  . \\ \\   /           /   /
    /  //  \\ \\ /           /   /
   /  //    \\ \\___________/   /
  / ///      \\ \\       __    /
 /8 \`'        \\/      /_/  ./
/88b.____________________.8/

   a long love for craftsmanship.
    sihamhadi.com/slojd.jpg
    `);
  }, []);

  const BG_LIMIT = 140;
  const clampOffset = (value) => Math.max(-BG_LIMIT, Math.min(BG_LIMIT, value));

  const handleBgPointerDown = (e) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: bgOffset.x,
      originY: bgOffset.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleBgPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;

    setBgOffset({
      x: clampOffset(drag.originX + (e.clientX - drag.startX)),
      y: clampOffset(drag.originY + (e.clientY - drag.startY)),
    });
  };

  const handleBgPointerUp = (e) => {
    dragRef.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleBackClick = () => {
    setSelectedWork(null);
    setSelectedNote(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToRightColumn = () => {
    if (rightColumnRef.current) {
      rightColumnRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const works = [
    {
      id: 1,
      year: '2023',
      title: 'Coated',
      thumbnail: '/images/coated/product-shot.jpg',
      images: [
        '/images/coated/product-shot.jpg',
        '/images/coated/coated-social.jpg',
        '/images/coated/coated-interior-sketch.jpg',
      ],
      description:
        'Coated AI native platform for creating beautiful interiors.',
      role: 'Design & Development',
      link: 'https://coated-sihams-projects-d254c308.vercel.app',
    },
    {
      id: 2,
      year: '2022',
      title: 'Factor',
      thumbnail: '/images/factor/Overview.png',
      images: ['/images/factor/Overview.png'],
      description:
        'Financial water risk assessment in real-time. Data-driven insights for environmental impact.',
      role: 'Design & Development',
      link: null,
    },
    {
      id: 3,
      year: '2020',
      title: 'Ani',
      thumbnail: '/images/ani/ani.jpg',
      images: ['/images/ani/ani.jpg'],
      description:
        'Ani is a website for teens to learn about their amazing brain. Educational and engaging.',
      role: 'Design & Development',
      link: 'https://ani-brain.com/',
    },
    {
      id: 4,
      year: '2020',
      title: 'Daie',
      thumbnail: '/images/daie/home.jpg',
      images: [
        '/images/daie/home.jpg',
        '/images/daie/chat-view.jpg',
        '/images/daie/search.jpg',
      ],
      description:
        'A community app. Think gig app for your neighborhood. Connecting people locally.',
      role: 'Design & Development',
      link: null,
    },
    {
      id: 5,
      year: '2018',
      title: 'Unit',
      thumbnail: '/images/unit/unit1.png',
      images: [
        '/images/unit/unit1.png',
        '/images/unit/unit2.jpg',
        '/images/unit/unit3.jpg',
      ],
      description:
        'A fashion rental marketplace where local businesses rent out their products.',
      role: 'Design & Development',
      link: null,
    },
    {
      id: 6,
      year: '2017',
      title: 'Wore',
      thumbnail: '/images/wore/wore9.jpg',
      images: [
        '/images/wore/wore9.jpg',
        '/images/wore/wore8.jpg',
        '/images/wore/wore1.jpg',
        '/images/wore/wore2.jpg',
        '/images/wore/wore4.jpg',
        '/images/wore/wore6.jpg',
      ],
      description:
        'Curated fashion from the high street brands. Personal styling made accessible.',
      role: 'Design & Development',
      link: null,
    },
    {
      id: 7,
      year: '2016',
      title: 'Furniture',
      thumbnail: '/images/furniture/rafphia-sinehuette--tied.png',
      description:
        'My furniture designs — from early 3D visualization studies to pieces produced today.',
      role: 'Design & 3D Visualization',
      link: null,
      sections: [
        {
          title: 'Rafphia + Siham',
          year: '2026',
          description:
            'The Sinehuette series — a set of bedside and side tables designed and visualized for Rafphia.',
          images: [
            '/images/furniture/rafphia-sinehuette--tied.png',
            '/images/furniture/rafphia-sinehuette-gallery.png',
            '/images/furniture/rafphia-sinehuette-bedroom.png',
            '/images/furniture/rafphia-sinehuette-bedside-lake.png',
            '/images/furniture/rafphia-sinehuette-bedside-plaid.png',
            '/images/furniture/rafphia-sinehuette-monitor.png',
          ],
        },
        {
          title: '3D Visualization',
          year: '2016',
          description:
            'Furniture concepts modelled and rendered in 3D, exploring form, material and light.',
          images: [
            '/images/furniture/srh11.jpg',
            '/images/furniture/srh12.jpg',
            '/images/furniture/srh1.jpg',
            '/images/furniture/srh2.png',
            '/images/furniture/srh4.jpg',
            '/images/furniture/srh5.jpg',
            '/images/furniture/srh6.jpg',
            '/images/furniture/srh10.jpg',
          ],
        },
      ],
    },
  ];

  return (
    <>
      {bgVisible && !isMobile && (
        <>
          <button
            className="bg-close"
            onClick={() => setBgVisible(false)}
            aria-label="Hide background video"
            title="Hide background"
          >
            &times;
          </button>
          <div
            className="video-background"
            aria-hidden="true"
            onPointerDown={handleBgPointerDown}
            onPointerMove={handleBgPointerMove}
            onPointerUp={handleBgPointerUp}
            onPointerCancel={handleBgPointerUp}
            onDoubleClick={() => setBgOffset({ x: 0, y: 0 })}
            style={{
              transform: `translate(${bgOffset.x}px, ${bgOffset.y}px) scale(1.3)`,
            }}
          >
            {[1, 2].map((n) => (
              <video
                key={n}
                src={`/videos/bg-${n}.mp4`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ))}
          </div>
        </>
      )}
      <main className="brutalist-layout">
        <div className="left-column">
          <div className="about-section">
            <h1>Siham Hadi</h1>
            <p className="greeting">Greetings, visitor!</p>
            <p>
              I am a developer who enjoys exploring and building applications at
              the intersection of cutting-edge technology, design, and business.
            </p>
            <p>
              "Be curious and go deeper" is a motto I strive to live by. It
              embodies my commitment to continuous learning and exploration,
              both personally and professionally.
            </p>
            <p>
              I'm the founder of <a href="https://rafphia.com">Rafphia</a>, a
              platform for creating beautiful interiors.
            </p>
            <p>
              <a
                href="https://github.com/csobr"
                target="_blank"
                rel="noopener noreferrer"
              >
                github
              </a>{' '}
              |{' '}
              <a
                href="https://www.linkedin.com/in/sihamhadi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin
              </a>
            </p>
          </div>
          <div className="list-header">
            <p className="list-heading">Projects</p>
            <button
              className="show-all"
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
            >
              {showAll ? 'show less' : `show all (${works.length})`}
            </button>
          </div>
          <ul
            className={`work-list grid-two ${
              showAll ? 'expanded' : 'collapsed'
            }`}
          >
            <li>
              <button
                className={`work-item ${
                  selectedWork === 'current' ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedWork(
                    selectedWork === 'current' ? null : 'current'
                  );
                  setSelectedNote(null);
                  if (selectedWork !== 'current') scrollToRightColumn();
                }}
              >
                [current] Rafphia
              </button>
              <p className="list-excerpt">AI-powered interior design tool</p>
            </li>
            {works.map((work) => (
              <li key={work.id}>
                <button
                  className={`work-item ${
                    selectedWork?.id === work.id ? 'active' : ''
                  }`}
                  onClick={() => {
                    setSelectedWork(selectedWork?.id === work.id ? null : work);
                    setSelectedNote(null);
                    if (selectedWork?.id !== work.id) scrollToRightColumn();
                  }}
                >
                  {selectedWork?.id === work.id ? (
                    <span title="Sunsetted project">🌥️ </span>
                  ) : (
                    ''
                  )}
                  [{work.year}] {work.title}
                </button>
                <p className="list-excerpt">{work.description}</p>
              </li>
            ))}
          </ul>
          {notes.length > 0 && (
            <>
              <p className="list-heading">Notes</p>
              <ul className={`work-list ${showAll ? 'expanded' : ''}`}>
                {notes.map((note) => (
                  <li key={note.slug}>
                    <button
                      className={`work-item ${
                        selectedNote?.slug === note.slug ? 'active' : ''
                      }`}
                      onClick={() => {
                        const next =
                          selectedNote?.slug === note.slug ? null : note;
                        setSelectedNote(next);
                        setSelectedWork(null);
                        if (next) scrollToRightColumn();
                      }}
                    >
                      [{note.date}] {note.title}
                    </button>
                    {note.description && (
                      <p className="list-excerpt">{note.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
          {selectedWork && selectedWork !== 'current' && (
            <div className="spacer">
              <p className="legend">🌥️ = sunsetted</p>
              <p className="legend">
                Side projects = ventures, experiments & musings
              </p>
            </div>
          )}
        </div>

        <div className="right-column" ref={rightColumnRef}>
          {selectedNote ? (
            <article className="note">
              <button className="back-button" onClick={handleBackClick}>
                Back
              </button>
              <h2>{selectedNote.title}</h2>
              {selectedNote.date && (
                <p className="work-role">{formatDate(selectedNote.date)}</p>
              )}
              <div
                className="note-body"
                dangerouslySetInnerHTML={{ __html: selectedNote.html }}
              />
            </article>
          ) : selectedWork === 'current' ? (
            <div className="current-project">
              <button className="back-button" onClick={handleBackClick}>
                Back
              </button>
              <p>AI-powered interior design tool</p>
              <a
                href="https://rafphia.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                rafphia.com
              </a>
            </div>
          ) : (
            <>
              {selectedWork && (
                <div className="work-details">
                  <button className="back-button" onClick={handleBackClick}>
                    Back
                  </button>
                  {selectedWork.role && (
                    <p className="work-role">{selectedWork.role}</p>
                  )}
                  <p className="work-description">{selectedWork.description}</p>
                  {selectedWork.link && (
                    <a
                      href={selectedWork.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-link"
                    >
                      {selectedWork.link}
                    </a>
                  )}
                </div>
              )}
              {selectedWork && selectedWork.sections
                ? selectedWork.sections.map((section) => (
                    <div key={section.title} className="work-section">
                      <p className="work-role">
                        {section.title}
                        {section.year && ` · ${section.year}`}
                      </p>
                      {section.description && (
                        <p className="work-description">
                          {section.description}
                        </p>
                      )}
                      <div className="image-grid">
                        {section.images.map((img, index) => (
                          <div
                            key={index}
                            className="image-grid-item detail"
                            onClick={() => setLightboxImage(img)}
                          >
                            <Image
                              src={img}
                              alt={`${selectedWork.title} ${index + 1}`}
                              fill
                              sizes="(max-width: 700px) 50vw, 350px"
                              priority={index === 0}
                              loading={index === 0 ? undefined : 'eager'}
                              placeholder="blur"
                              blurDataURL={blurDataURL(600, 400)}
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                : selectedWork && (
                    <div className="image-grid">
                      {selectedWork.images.map((img, index) => (
                        <div
                          key={index}
                          className="image-grid-item detail"
                          onClick={() => setLightboxImage(img)}
                        >
                          <Image
                            src={img}
                            alt={`${selectedWork.title} ${index + 1}`}
                            fill
                            sizes="(max-width: 700px) 50vw, 350px"
                            priority={index === 0}
                            loading={index === 0 ? undefined : 'eager'}
                            placeholder="blur"
                            blurDataURL={blurDataURL(600, 400)}
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
            </>
          )}
        </div>

        {lightboxImage && (
          <div className="lightbox" onClick={() => setLightboxImage(null)}>
            <button
              className="lightbox-close"
              onClick={() => setLightboxImage(null)}
            >
              &times;
            </button>
            <div className="lightbox-image">
              <Image
                src={lightboxImage}
                alt="Full size"
                fill
                sizes="70vw"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </div>
        )}
      </main>
      {isMobile && bgVisible && (
        <div className="video-strip" aria-hidden="true">
          {[1, 2].map((n) => (
            <video
              key={n}
              src={`/videos/bg-${n}.mp4`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
