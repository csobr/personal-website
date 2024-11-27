'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '../components/footer';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h3 className="modal-title">{title}</h3>
        <div className="modal-scrollable">{children}</div>
      </div>
    </div>
  );
};

/* const GithubIcon = ({ size = 23 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 27 27"
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M13.511 0C6.04 0 0 6.084 0 13.612a13.6 13.6 0 0 0 9.239 12.912c.67.136.917-.293.917-.653 0-.316-.023-1.397-.023-2.524-3.758.811-4.54-1.623-4.54-1.623-.605-1.577-1.5-1.983-1.5-1.983-1.23-.834.09-.834.09-.834 1.365.09 2.08 1.398 2.08 1.398 1.208 2.073 3.155 1.487 3.937 1.126.112-.879.47-1.487.85-1.825-2.996-.316-6.15-1.487-6.15-6.716 0-1.487.537-2.704 1.387-3.65-.134-.338-.604-1.736.134-3.606 0 0 1.14-.36 3.713 1.397a12.99 12.99 0 0 1 3.378-.45c1.141 0 2.304.157 3.378.45 2.572-1.758 3.713-1.397 3.713-1.397.739 1.87.268 3.268.134 3.606.873.946 1.387 2.163 1.387 3.65 0 5.229-3.154 6.378-6.174 6.716.493.428.917 1.24.917 2.524 0 1.825-.022 3.29-.022 3.74 0 .361.246.79.917.654A13.601 13.601 0 0 0 27 13.612C27.022 6.084 20.96 0 13.51 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const LinkedinIcon = ({ size = 23 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 27 27"
  >
    <path
      fill="currentColor"
      d="M24.075 0H1.92C.858 0 0 .87 0 1.946v23.103C0 26.125.858 27 1.92 27h22.155C25.137 27 26 26.125 26 25.054V1.946A1.936 1.936 0 0 0 24.075 0ZM7.714 23.008h-3.86V10.12h3.86v12.888ZM5.784 8.364c-1.24 0-2.24-1.04-2.24-2.32 0-1.282 1-2.32 2.24-2.32 1.234-.001 2.234 1.038 2.234 2.32 0 1.276-1 2.32-2.234 2.32Zm16.372 14.644h-3.854v-6.265c0-1.492-.026-3.417-2.006-3.417-2.006 0-2.31 1.63-2.31 3.312v6.37h-3.85V10.12h3.697v1.761h.05c.514-1.012 1.773-2.083 3.647-2.083 3.905 0 4.626 2.668 4.626 6.138v7.072Z"
    />
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 27 27"
  >
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        d="M13.5 2.431c3.607 0 4.034.016 5.453.08 1.318.057 2.03.279 2.505.463a4.174 4.174 0 0 1 1.55 1.007c.475.475.765.923 1.007 1.55.185.475.406 1.193.464 2.506.064 1.424.08 1.85.08 5.452 0 3.607-.016 4.035-.08 5.453-.058 1.319-.28 2.03-.464 2.505a4.175 4.175 0 0 1-1.007 1.55 4.152 4.152 0 0 1-1.55 1.008c-.475.184-1.192.406-2.505.464-1.424.063-1.851.079-5.453.079-3.607 0-4.034-.016-5.453-.08-1.318-.057-2.03-.279-2.505-.463a4.176 4.176 0 0 1-1.55-1.008 4.152 4.152 0 0 1-1.007-1.55c-.185-.474-.406-1.192-.464-2.505-.064-1.424-.08-1.85-.08-5.453 0-3.607.016-4.034.08-5.452.058-1.319.28-2.03.464-2.505a4.175 4.175 0 0 1 1.007-1.55 4.152 4.152 0 0 1 1.55-1.008c.475-.184 1.192-.406 2.505-.464 1.419-.063 1.846-.079 5.453-.079ZM13.5 0C9.835 0 9.376.016 7.937.08 6.502.141 5.516.373 4.662.706a6.59 6.59 0 0 0-2.394 1.56 6.615 6.615 0 0 0-1.561 2.39C.374 5.515.142 6.496.079 7.93.016 9.376 0 9.835 0 13.5s.016 4.124.08 5.564c.062 1.434.294 2.42.627 3.274a6.589 6.589 0 0 0 1.56 2.394 6.6 6.6 0 0 0 2.39 1.556c.859.332 1.84.564 3.274.628 1.44.063 1.899.079 5.564.079s4.124-.016 5.563-.08c1.435-.063 2.42-.295 3.275-.627a6.6 6.6 0 0 0 2.389-1.556 6.598 6.598 0 0 0 1.555-2.388c.333-.86.565-1.84.628-3.275.063-1.44.08-1.899.08-5.564s-.017-4.124-.08-5.563c-.063-1.435-.295-2.42-.628-3.275a6.323 6.323 0 0 0-1.545-2.4A6.599 6.599 0 0 0 22.344.713c-.86-.332-1.84-.564-3.275-.628C17.624.016 17.165 0 13.5 0Z"
      />
      <path
        fill="currentColor"
        d="M13.5 6.565A6.936 6.936 0 0 0 6.565 13.5a6.936 6.936 0 0 0 6.935 6.935 6.936 6.936 0 0 0 6.935-6.935A6.936 6.936 0 0 0 13.5 6.565Zm0 11.433A4.499 4.499 0 1 1 13.501 9a4.499 4.499 0 0 1-.001 8.998Zm8.828-11.707a1.62 1.62 0 1 1-3.239 0 1.62 1.62 0 0 1 3.239 0Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M0 0h27v27H0z" />
      </clipPath>
    </defs>
  </svg>
);
 */
const Home = () => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <a href="https://www.linkedin.com/in/sihamhadi/" target="_blank">
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
                style={{ objectFit: 'contain' }}
              />
            ))}
          </div>
        </Modal>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
