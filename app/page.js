'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#e5e0da"/>
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const blurDataURL = (w, h) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

const Home = () => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const rightColumnRef = useRef(null);

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

    Same obsession, better application.
    sihamhadi.com/slojd.jpg
    `);
  }, []);

  const handleBackClick = () => {
    setSelectedWork(null);
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
      thumbnail: '/images/furniture/srh11.jpg',
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
      description: 'My furniture designs.',
      role: '3D Visualization',
      link: null,
    },
  ];

  return (
    <main className="brutalist-layout">
      <div className="left-column">
        <ul className="work-list">
          <li>
            <button
              className={`work-item ${
                selectedWork === 'current' ? 'active' : ''
              }`}
              onClick={() => {
                setSelectedWork(selectedWork === 'current' ? null : 'current');
                if (selectedWork !== 'current') scrollToRightColumn();
              }}
            >
              [current] Rafphia
            </button>
          </li>
          {works.map((work) => (
            <li key={work.id}>
              <button
                className={`work-item ${
                  selectedWork?.id === work.id ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedWork(selectedWork?.id === work.id ? null : work);
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
            </li>
          ))}
        </ul>
        {selectedWork && selectedWork !== 'current' && (
          <div className="spacer">
            <p className="legend">🌥️ = sunsetted</p>
            <p className="legend">
              Side projects = ventures, experiments & musings
            </p>
          </div>
        )}
        <div className="about-section">
          <h1>Siham Hadi</h1>
          <p>
            I am a developer who enjoys exploring and building applications at
            the intersection of cutting-edge technology, design, and business.
          </p>
          <p>
            "Be curious and go deeper" is a motto I strive to live by. It
            embodies my commitment to continuous learning and exploration, both
            personally and professionally.
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
            </a>{' '}
            |{' '}
            <a
              href="https://sihamhadi.substack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              newsletter
            </a>
          </p>
        </div>
      </div>

      <div className="right-column" ref={rightColumnRef}>
        {selectedWork === 'current' ? (
          <div className="current-project">
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
                <p className="work-role">{selectedWork.role}</p>
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
            <div className="image-grid">
              {selectedWork
                ? selectedWork.images.map((img, index) => (
                    <div
                      key={index}
                      className="image-grid-item detail"
                      onClick={() => setLightboxImage(img)}
                    >
                      <Image
                        src={img}
                        alt={`${selectedWork.title} ${index + 1}`}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                        priority={index === 0}
                        placeholder="blur"
                        blurDataURL={blurDataURL(600, 400)}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))
                : works.map((work, index) => (
                    <div
                      key={work.id}
                      className="image-grid-item thumbnail"
                      onClick={() => setSelectedWork(work)}
                    >
                      <Image
                        src={work.thumbnail}
                        alt={work.title}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                        priority={index < 3}
                        placeholder="blur"
                        blurDataURL={blurDataURL(300, 300)}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ))}
            </div>
          </>
        )}
      </div>

      {lightboxImage && (
        <div className="lightbox" onClick={() => setLightboxImage(null)}>
          <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
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
  );
};

export default Home;
