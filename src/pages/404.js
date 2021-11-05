import React, { Component } from 'react';
import Head from 'next/head';
import Navbar from '../components/navigation';
import Footer from '../components/footer';

class Error extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Head>
          <title>Error</title>
          <meta charSet="utf-8" />
          <meta name="description" content="Error" />
        </Head>

        <main>
          <section className="error">
            <p className="error-title">Error 404</p> <p> Page not found!</p>{' '}
            <a href="/">Go back home</a>
          </section>
        </main>
        <Footer />

        <style type="text/css">
          {`
    html,body {
      background-color: #050505;

    }
      a:hover:after {
    width: 0 !important;
  }
   nav, .toggle, .links
   {background-color: #050505;

   }
   .hamburger span{
       background-color: #fff;
   }
   nav a, footer{
     color:#fff;
   }
   `}
        </style>
      </>
    );
  }
}

export default Error;
