import React, {Component} from "react";
import { Helmet } from 'react-helmet';

class Error extends Component {
  render(){
  return (
    
    <div>
      <Helmet>
    <title>Error</title>
    <meta charSet="utf-8" />
    <meta name="description" content="Error" />
  </Helmet>
      <style type="text/css">{`
        body {
            background-color:#050505 ;
            min-height: 100vh;
            min-width: 100vw;
            margin: 0;
            padding: 0;
            overflow:hidden;
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
      <section className="error">
        {" "}
        <p className="error-title">Error 404</p> <p> Page not found!</p>{" "}
        <a href="/">Home</a>
      </section>
    </div>
  );
}};

export default Error;
