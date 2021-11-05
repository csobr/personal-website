import React, { Fragment, useRef, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/navigation';
import Footer from '../components/footer';
import ImageApi from '../components/api';
import { TweenMax, TimelineLite, Power3 } from 'gsap';

const Wore = () => {
  const [{ data, loading, error }] = ImageApi();
  const wore = data.wore;

  let images = useRef(null);
  // let image = useRef(null);
  let tl = new TimelineLite();
  useEffect(() => {
    TweenMax.from(images, 0.1, { opacity: 0 });
    tl.to(images, 2, {
      opacity: 1,
      y: 30,
      ease: Power3.easeInOut,
    });
    // tl.to(image, {
    //   opacity: 1,
    //   ease: Power3.easeInOut,
    // });
  });

  return (
    <>
      <Navbar />
      <Head>
        <title>Wore</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Modest fashion from the high street shops"
        />
      </Head>
      <main>
        <h4>Wore </h4>
        <h5>Project year: 2017 | Designer | Fullstack developer </h5>

        <div
          className="container container-wore"
          ref={(element) => (images = element)}
        >
          {error && <div className="error-msg">Something went wrong...</div>}
          {loading ? (
            <div className="loader">
              <div className="circle circle-fill"></div>
            </div>
          ) : (
            <Fragment>
              <p>Curated fashion from the high st brands.</p>
              {wore &&
                wore.map((item) => (
                  <div key={item.id}>
                    <img src={item.image} alt="fashion"></img>
                  </div>
                ))}
              <p>
                The website was place for women to find inspiration on how they
                could dress modestly.
              </p>
            </Fragment>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Wore;
