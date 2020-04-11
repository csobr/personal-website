import React from 'react';
import '../styles/main.scss';
import Head from 'next/head';
import Navbar from '../components/navigation';
import Footer from '../components/footer';
import Layout from '../components/layout';
import { useSpring, animated } from 'react-spring';

const Furniture = () => {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } });
  return (
    <Layout>
      <Navbar />
      <Head>
        <title>Furniture</title>
        <meta charSet='utf-8' />
        <meta name='description' content='Furniture by Siham Hadi' />
      </Head>
      <main>
        <animated.div style={props}>
          <h4>Furniture</h4>
          <h5>Project year: 2016-2017 | Designer | CG Work</h5>
          <div className=' container-furniture'>
            <img src='./images/furniture/srh1.jpg' alt='pendant'></img>
            <img src='./images/furniture/srh2.png' alt='chair'></img>
            <img src='./images/furniture/srh3.jpg' alt='pendants'></img>
            <img src='./images/furniture/srh4.jpg' alt='vase'></img>
            <img src='./images/furniture/srh5.jpg' alt='hangers'></img>
            <img src='./images/furniture/srh6.jpg' alt='chair'></img>
            <img src='./images/furniture/srh7.jpg' alt='chair'></img>
            <img src='./images/furniture/srh8.jpg' alt='floorlamp'></img>
            <img src='./images/furniture/srh9.jpg' alt='vase'></img>
            <img src='./images/furniture/srh10.jpg' alt='sidetable'></img>
            <img src='./images/furniture/srh11.jpg' alt='floorlamp'></img>
            <img src='./images/furniture/srh12.jpg' alt='pendants'></img>
          </div>{' '}
        </animated.div>
      </main>
      <Footer />
    </Layout>
  );
};
export default Furniture;
