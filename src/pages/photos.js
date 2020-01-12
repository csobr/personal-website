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
        <Navbar />
        <Head>
          <title>Selection of photos</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Photos taken by Siham Hadi" />
        </Head>{" "}
        <main>
          <h4>Some My Photos</h4>
          <div className="container container-photos ">
            <img src="./images/photos/landskap_srh.jpg" alt="landscape"></img>
            <img src="./images/photos/landskap_srh_1.jpg" alt="landscape"></img>
            <img
              src="./images/photos/tagstation_srh_2.jpg"
              alt="landscape"
            ></img>
            <img src="./images/photos/tagstation_srh_1.jpg" alt="station"></img>
            <img src="./images/photos/tagstation_srh.jpg" alt="station"></img>
            <img src="./images/photos/host_srh.jpg" alt="landscape"></img>
            <img src="./images/photos/srh1.jpg" alt="skyline"></img>
            <img src="./images/photos/srh2.jpg" alt="skyline"></img>
            <img src="./images/photos/srh3.jpg" alt="skyline"></img>
            <img src="./images/photos/srh4.jpg" alt="landscape"></img>
            <img src="./images/photos/srh5.jpg" alt="landscape"></img>
            <img src="./images/photos/srh6.jpg" alt="boxingring"></img>
            <img src="./images/photos/srh7.jpg" alt="landscape"></img>
            <img src="./images/photos/srh8.jpg" alt="landscape"></img>
          </div>{" "}
        </main>
        <Footer />
      </Layout>
    </div>
  );
};
export default Unit;
