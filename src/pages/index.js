import React from "react";
import Head from "next/head";
import ProjectsView from "./project";
import Navbar from "../components/navigation";
import Footer from "../components/footer";
import "../styles/main.scss";

const Home = () => {
  return (
    <div>
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
      <div className="about">
        <style type="text/css">{`
        body {
            background-color:#050505 ;

        }
        .main-nav{
          background-color:#050505 ;
        }
        .toggle{
          background-color: transparent;
        }
 
        p{
            color:#fff;
        }
        .socialicon a{
          color: #fff;

        }
        a:hover{
             border-bottom: 1px solid #fff !important;
        }
        .links a{
          color:#fff;
        }
        .hamburger span {
         background: #fff;

        }
        .footer p {
          color:#fff;
          ;
        }
    `}</style>
        <div className="about-me">
          <h1>
            I have learnt to use a set of tools that I now try to create value
            with.{" "}
          </h1>
          <p>
            {" "}
            I’m Siham a software developer and designer based in Stockholm,
            Sweden.
            {"\n"}Languages: Somali - Swedish - English
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
      <ProjectsView />
      <Footer />
    </div>
  );
};

export default Home;
