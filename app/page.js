'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import PlausibleProvider from 'next-plausible';
import { Modal } from '../components/Modal';

const Home = () => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getYear = () => {
    return new Date().getFullYear();
  };

  const works = [
    {
      id: 1,
      title: 'Coated',
      image: '/images/coated/coated-interior-sketch.jpg',
      modal: {
        images: [
          '/images/coated/product-shot.jpg',
          '/images/coated/coated-social.jpg',
        ],
        title: 'Coated',
        description: 'With Coated, transform any space effortlessly.',
        link: 'coated.ai',
        projectYear: ['2023', '2024'],
      },
    },
    {
      id: 2,
      title: 'Ani',
      image: '/images/ani/ani-thumbnail.jpg',
      modal: {
        images: ['/images/ani/ani.jpg'],
        title: 'Ani',
        description:
          'Ani is a website for teens to learn about their amazing brain.',
        link: 'ani-brain.com',
        projectYear: ['2020'],
      },
    },
    {
      id: 3,
      title: 'Factor',
      image: '/images/factor/factor-thumbnail.jpg',
      modal: {
        images: ['/images/factor/Overview.png'],
        title: 'Factor',
        description: 'Financial water risk assessment in real-time',
        link: null,
        projectYear: '2022',
      },
    },
    {
      id: 4,
      title: 'Wore',
      image: '/images/wore/wore10.jpg',
      modal: {
        images: [
          '/images/wore/wore9.jpg',
          '/images/wore/wore8.jpg',
          '/images/wore/wore1.jpg',
          '/images/wore/wore2.jpg',
          '/images/wore/wore4.jpg',
          '/images/wore/wore6.jpg',
        ],
        title: 'Wore',
        description: 'Curated fashion from the high street brands.',
        link: null,
        projectYear: '2017',
      },
    },
    {
      id: 5,
      title: 'Daie',
      image: '/images/daie/home.jpg',
      modal: {
        images: [
          '/images/daie/home.jpg',
          '/images/daie/chat-view.jpg',
          '/images/daie/search.jpg',
        ],
        title: 'Daie',
        description: 'A community app. Think gig app for your neighborhood.',
        link: null,
        projectYear: '2020',
      },
    },
    {
      id: 6,
      title: 'Unit',
      image: '/images/unit/unit1.png',
      modal: {
        images: [
          '/images/unit/unit1.png',
          '/images/unit/unit2.jpg',
          '/images/unit/unit3.jpg',
        ],
        title: 'Unit',
        description:
          'A fashion rental marketplace where local businesses rent out their products.',
        link: null,
        projectYear: '2018',
      },
    },
    {
      id: 7,
      title: 'Furniture',
      image: '/images/furniture/srh11.jpg',
      modal: {
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
        title: 'Furniture',
        description: 'Some of my early furniture projects.',
        link: null,
        projectYear: ['2016', '2017'],
      },
    },
  ];

  const handleWorkClick = (work) => {
    setSelectedWork(work);
    setIsModalOpen(true);
  };

  return (
    <PlausibleProvider domain="sihamhadi.com">
      <div>
        <main>
          <div style={{ textAlign: 'center', top: 10 }} className="fade-in">
            <h1>Be curious and go deeper.</h1>
          </div>
          <div className="about fade-in-bottom">
            <div className="about-me">
              <h2>Developer & Designer</h2>
            </div>
            <div className="social">
              <div
                className="github fade-in-bottom"
                style={{ animationDelay: '0.2s' }}
              >
                <a href="https://github.com/csobr" target="_blank">
                  github
                </a>
              </div>

              <div
                className="linkedin fade-in-bottom"
                style={{ animationDelay: '0.3s' }}
              >
                <a
                  href="https://www.linkedin.com/in/sihamhadi/"
                  target="_blank"
                >
                  linkedin
                </a>
              </div>
              <div
                className="instagram fade-in-bottom"
                style={{ animationDelay: '0.4s' }}
              >
                <a href="https://www.instagram.com/texturlab/" target="_blank">
                  ig
                </a>
              </div>
            </div>
          </div>

          <h4>Selected work</h4>
          <div className="selected-works">
            <div className="selected-works-container">
              {works.map((work) => (
                <div
                  key={work.id}
                  className="selected-works-item"
                  onClick={() => handleWorkClick(work)}
                >
                  <Image
                    src={work.image}
                    alt={work.title}
                    width={468}
                    height={300}
                  />
                  <h5>{work.title}</h5>
                </div>
              ))}
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedWork?.title}
            image={selectedWork?.image}
          >
            <div className="modal-description-container">
              <div className="modal-description-top">
                <p>Developer and Designer: Siham Hadi</p>|{' '}
                <p>
                  Project Year:{' '}
                  {Array.isArray(selectedWork?.modal.projectYear)
                    ? selectedWork?.modal.projectYear?.join(' - ')
                    : selectedWork?.modal.projectYear}
                </p>
                {selectedWork?.modal.link !== null && (
                  <>
                    |{' '}
                    <a
                      href={`https://${selectedWork?.modal.link}`}
                      target="_blank"
                    >
                      URL: {selectedWork?.modal.link}
                    </a>
                  </>
                )}
              </div>
              <div className="item-description">
                <p>{selectedWork?.modal.description}</p>
              </div>
            </div>
            <div className="item-images">
              {selectedWork?.modal.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={selectedWork?.title}
                  width={800}
                  height={600}
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                    height: 'auto',
                  }}
                />
              ))}
            </div>
          </Modal>
        </main>
        <footer> © {getYear()} Siham Hadi</footer>
      </div>
    </PlausibleProvider>
  );
};

export default Home;
