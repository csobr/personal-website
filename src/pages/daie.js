import React, { Component } from 'react';

import Head from 'next/head';
import Navbar from '../components/navigation';
import Footer from '../components/footer';

export default class Daie extends Component {
  render() {
    return (
      <>
        <Head>
          <title>Daie</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Daie app" />
        </Head>
        <main>
          <Navbar />
          <h4>Daie</h4>
          <h5>Project year: 2020 | Designer | Developer</h5>
          <p className="app-text"> Building...</p>
          <div className=" container container-app">
            <img src="./images/daie/daie.png" alt="daie"></img>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
