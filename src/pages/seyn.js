import React, { Component } from 'react'
import "../styles/main.scss";
import Head from "next/head";
import Navbar from "../components/navigation";
import Footer from "../components/footer";
import Layout from "../components/layout";

export default class Seyn extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Head>
                        <title>Seyn</title>
                        <meta charSet="utf-8" />
                        <meta name="description" content="Seyn app coming soon" />
                    </Head>
                    <main>
                        <Navbar />
                        <h4>Seyn</h4>
                        <h5>Project year: 2020 | Designer | Developer | React Native</h5>
                        <p className="app-text">
                            Coming soon.  </p>
                        <div className=" container container-app">
                            <div className = "seyn-img">
                            <img src="./images/seyn/seynHand.png" alt="app" ></img> </div>



                        </div>
                    </main>
                    <Footer />
                </Layout>
            </div>
        )
    }
}
