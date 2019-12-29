import React from "react";
import Head from "next/head";
import ProjectsView from "./project";
import Navbar from "../components/navigation";
import Footer from "../components/footer";
import "../styles/main.scss";
import Layout from "../components/layout";

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
            <style type="text/css">{`
        .main-nav{
          background-color:#0b0b0b ;
        }
        main{
                  background-color:#0b0b0b ;
        }
        .toggle{
           background-color:#0b0b0b ;
        }
 
        p{
            color:#fff;
        }
        .socialicon a{
          color: #fff;

        }
       a:after{
          background-color: #fff;
        }
        .links{
          background-color:#0b0b0b;
        }
        .links a{
          color:#fff;
        }
        .hamburger span {
         background-color: #fff;

        }
        footer {
                 background-color:#0b0b0b ;
          color:#fff;
          ;
        }
    `}</style>
            <div className="about-me">
              <h1>
                I have learnt to use a set of tools that I now try to create
                value with.{" "}
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
        </main>
        <ProjectsView />
        <Footer />
      </Layout>{" "}
    </div>
  );
};

export default Home;
