import React, { Component } from 'react';
import Head from 'next/head';
import '../styles/main.scss';
import Navbar from '../components/navigation';
import Layout from '../components/layout';
import Footer from '../components/footer';
import items from '../../public/wore.json';
import { useTransition, animated } from 'react-spring';

const Wore = () => {
  // const [items, set] = useState([]);
  const transitions = useTransition(items, item => item.key, {
    from: { transform: 'translate3d(0,-40px,0)' },
    enter: { transform: 'translate3d(0,0px,0)' },
    leave: { transform: 'translate3d(0,-40px,0)' },
  });
  return transitions.map(({ item, props, key }) => (
    <div>
      <Layout>
        <Navbar />
        <Head>
          <title>Wore</title>
          <meta charSet='utf-8' />
          <meta
            name='description'
            content='Modest fashion from the high street shops'
          />
        </Head>{' '}
        <main>
          <h4>Wore </h4>
          <h5>Project year: 2017 | Designer | Fullstack developer </h5>

          <animated.div key={key} style={props}>
            <div className='container container-wore'>
              <p>
                “Wore started out from a problem I had whilst shopping. Finding
                modest clothes at the high street shops was not easy, so I
                started curating all the clothes I found modest. Then I designed
                and built Wore.”{'\n'}- Siham Hadi{' '}
              </p>{' '}
              {items.map((i, index) => (
                <div key={index}>
                  <img src={i.backgroundImage} alt='wore website' />
                </div>
              ))}
              <p>
                The website was place for women to find inspiration on how they
                could dress modestly.{' '}
              </p>
            </div>
          </animated.div>
        </main>
        <Footer />
      </Layout>
    </div>
  ));
};
export default Wore;
