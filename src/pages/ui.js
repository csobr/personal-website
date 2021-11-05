import React, { Component } from 'react';
import Head from 'next/head';
import Navbar from '../components/navigation';
import Footer from '../components/footer';

export default class Ui extends Component {
  render() {
    return (
      <>
        <Head>
          <title>UI Exploration</title>
          <meta charSet="utf-8" />
          <meta name="description" content="ui" />
        </Head>
        <main>
          <Navbar />
          <h4> UI Exploration</h4>
          <h5>Project year: 2020 | Designer | Figma </h5>
          <div className=" container container-app">
            <img src="./images/ui/swedbank.png" alt="app"></img>
            <img src="./images/ui/bev.png" alt="app"></img>
          </div>
        </main>
        <Footer />
      </>
    );
  }
}
