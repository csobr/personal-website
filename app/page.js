'use client';
import { useState } from 'react';
import Image from 'next/image';

const Home = () => {
  const [selectedWork, setSelectedWork] = useState(null);

  const handleBackClick = () => {
    setSelectedWork(null);
  };

  const works = [
    {
      id: 1,
      year: '2024',
      title: 'Coated',
      thumbnail: '/images/coated/product-shot.jpg',
      images: [
        '/images/coated/product-shot.jpg',
        '/images/coated/coated-social.jpg',
        '/images/coated/coated-interior-sketch.jpg',
      ],
      description: 'With Coated, transform any space effortlessly. A platform for creating beautiful interiors.',
      link: 'https://coated-sihams-projects-d254c308.vercel.app',
    },
    {
      id: 2,
      year: '2022',
      title: 'Factor',
      thumbnail: '/images/factor/Overview.png',
      images: ['/images/factor/Overview.png'],
      description: 'Financial water risk assessment in real-time. Data-driven insights for environmental impact.',
      link: null,
    },
    {
      id: 3,
      year: '2020',
      title: 'Ani',
      thumbnail: '/images/ani/ani.jpg',
      images: ['/images/ani/ani.jpg'],
      description: 'Ani is a website for teens to learn about their amazing brain. Educational and engaging.',
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
      description: 'A community app. Think gig app for your neighborhood. Connecting people locally.',
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
      description: 'A fashion rental marketplace where local businesses rent out their products.',
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
      description: 'Curated fashion from the high street brands. Personal styling made accessible.',
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
      description: 'Some of my early furniture projects. Created with 3DS Max.',
      link: null,
    },
  ];

  return (
    <main className="brutalist-layout">
      <div className="left-column">
        <ul className="work-list">
          <li>
            <button
              className={`work-item ${selectedWork === 'current' ? 'active' : ''}`}
              onClick={() => setSelectedWork(selectedWork === 'current' ? null : 'current')}
            >
              [current] Rafphia
            </button>
          </li>
          {works.map((work) => (
            <li key={work.id}>
              <button
                className={`work-item ${selectedWork?.id === work.id ? 'active' : ''}`}
                onClick={() => setSelectedWork(selectedWork?.id === work.id ? null : work)}
              >
                [{work.year}] {work.title}
              </button>
            </li>
          ))}
        </ul>
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
            <a href="https://github.com/csobr" target="_blank" rel="noopener noreferrer">github</a> | <a href="https://www.linkedin.com/in/sihamhadi/" target="_blank" rel="noopener noreferrer">linkedin</a>
          </p>
        </div>
      </div>

      <div className="right-column">
        {selectedWork === 'current' ? (
          <div className="current-project">
            <p>AI-powered interior design tool</p>
            <a href="https://rafphia.com" target="_blank" rel="noopener noreferrer">
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
                <p className="work-description">{selectedWork.description}</p>
                {selectedWork.link && (
                  <a href={selectedWork.link} target="_blank" rel="noopener noreferrer" className="work-link">
                    {selectedWork.link}
                  </a>
                )}
              </div>
            )}
            <div className="image-grid">
              {selectedWork ? (
                selectedWork.images.map((img, index) => (
                  <div key={index} className="image-grid-item active">
                    <Image
                      src={img}
                      alt={`${selectedWork.title} ${index + 1}`}
                      width={300}
                      height={240}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                ))
              ) : (
                works.map((work) => (
                  <div
                    key={work.id}
                    className="image-grid-item"
                    onClick={() => setSelectedWork(work)}
                  >
                    <Image
                      src={work.thumbnail}
                      alt={work.title}
                      width={300}
                      height={240}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
