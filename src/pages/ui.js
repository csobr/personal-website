import React, { Component } from "react";
import "../styles/main.scss";
import Head from "next/head";
import Navbar from "../components/navigation";
import Footer from "../components/footer";
import Layout from "../components/layout";

export default class Ui extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Head>
            <title>Ui</title>
            <meta charSet="utf-8" />
            <meta name="description" content="Seyn app coming soon" />
          </Head>
          <main>
            <Navbar />
            <h4> Ui exploration</h4>
            <h5>Project year: 2020 | Designer | Figma | More to come </h5>
            <p className="app-text"> Neumorphism </p>
            <div className=" container container-app">
              <img src="./images/swedbank.png" alt="app"></img>
              <img src="./images/bev.png" alt="app"></img>
            </div>
          </main>
          <Footer />
        </Layout>
      </div>
    );
  }
}
