import React from 'react';
import Head from 'next/head';
import ProjectsView from './project';
import Navbar from '../components/navigation';
import Footer from '../components/footer';
import '../styles/main.scss';
import Layout from '../components/layout';

const Home = () => {
  return (
    <div>
      <Layout>
        <Head>
          <title>Siham Hadi</title>
          <link rel="icon" href="favicon.ico" type="image/x-icon" />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="A software developer and designer based in Stockholm."
          />
        </Head>
        <Navbar />
        <main>
          <div className="about">
            <div className="about-me">
              <h1>
                I have learnt to use a set of tools that I now try to create
                value with.
              </h1>
              <p>
                I’m Siham a software developer and designer based in Stockholm,
                Sweden.{'\n'}
                Comfortable with both frontend and backend and always working on
                a side project ;).
                {'\n'}Languages: Somali - Swedish - English
              </p>

              <span className="social">
                <a href="mailto: siham.hadi@live.se">Email</a>
                <a href="https://github.com/csobr" target="_blank">
                  Github
                </a>
                <a href="https://www.instagram.com/texturlab/" target="_blank">
                  Instagram
                </a>
              </span>
            </div>
          </div>
        </main>
        <ProjectsView />
        <Footer />
      </Layout>
    </div>
  );
};

export default Home;
