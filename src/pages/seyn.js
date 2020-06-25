import React, { Component } from "react";
import "../styles/main.scss";
import Head from "next/head";
import Navbar from "../components/navigation";
import Footer from "../components/footer";
import Layout from "../components/layout";

export default class Seyn extends Component {
  render() {
    return (
      <Layout>
        <Head>
          <title>Seyn</title>
          <meta charSet='utf-8' />
          <meta name='description' content='Seyn app' />
        </Head>
        <main>
          <Navbar />
          <h4>Seyn</h4>
          <h5>Project year: 2020 | Designer | Developer </h5>
          <p className='app-text'>Building </p>
          <div className=' container container-app'>
            <img src='./images/seyn/seyn.png' alt='seyn'></img>
          </div>
        </main>
        <Footer />
      </Layout>
    );
  }
}
