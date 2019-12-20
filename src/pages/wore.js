import React, { Component } from "react";
import Head from "next/head";
import "../styles/main.scss";
import Navbar from "../components/navigation";
export default class Wore extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Head>
          <title>Wore</title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Modest fashion from the high street shops"
          />
        </Head>
        <h5>Project year: 2017 | Designer | Developer </h5>
        <div className="container container-wore">
          <p>
            “Wore started out from a problem I had whilst shopping. Finding
            modest clothes at the high street shops was not easy, so I started
            curating all the clothes I found modest. Then I designed and built
            Wore.”{"\n"}- Siham Hadi{" "}
          </p>
          <img src="./images/wore/wore1.jpg" alt="website"></img>
          <img src="./images/wore/wore2.jpg" alt="website"></img>
          <p>
            The website was place for women to find inspiration on how they
            could dress modestly.{" "}
          </p>
          <img src="./images/wore/wore3.jpg" alt="website"></img>{" "}
          <img src="./images/wore/wore4.jpg" alt="website"></img>{" "}
          <img src="./images/wore/wore5.jpg" alt="website"></img>
          <img src="./images/wore/wore6.jpg" alt="website"></img>
          <img src="./images/wore/wore7.jpg" alt="website"></img>
          <img src="./images/wore/wore8.jpg" alt="website"></img>
          <img src="./images/wore/wore9.jpg" alt="website"></img>
          <img src="./images/wore/wore10.jpg" alt="website"></img>
        </div>
      </div>
    );
  }
}
