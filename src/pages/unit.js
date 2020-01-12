import React from "react";
import Head from "next/head";
import "../styles/main.scss";
import Navbar from "../components/navigation";
import Footer from "../components/footer";
import Layout from "../components/layout";
const Unit = () => {
  return (
    <div>
      <Layout>
        <Head>
          <title>Unit</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Rent fashion from local business" />
        </Head>
        <Navbar />
        <main>

      
          <h4>Unit app</h4>
          <h5>Project year: 2018 | Designer | Developer</h5>
          <p className="app-text">
            Unit is a fashion rental marketplace where local businesses rent out
            their clothes to anyone through the app.
          </p>
          <div className=" container container-app">
            <img src="./images/unit/unit1.jpg" alt="app"></img>
            <img src="./images/unit/unit2.jpg" alt="app"></img>
            <img src="./images/unit/futur-rent.gif" alt="gif"></img>
            <img src="./images/unit/unit3.jpg" alt="app"></img>
            <img src="./images/unit/unit4.jpg" alt="app"></img>

            <p className="app-text">
              Unit evolved from Wore and it's a more sustainable idea.
            </p>
          </div>{" "}
        </main>
        <Footer />
      </Layout>
    </div>
  );
};
export default Unit;
