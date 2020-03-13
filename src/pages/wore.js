import React, { Fragment } from 'react';
import '../styles/main.scss';
import Head from 'next/head';
import Navbar from '../components/navigation';
import Layout from '../components/layout';
import Footer from '../components/footer';
import ImageApi from '../components/Data/data';
import { set } from 'react-ga';
import { createPortal } from 'react-dom';
const Wore = () => {
  const [{ data, loading, error }] = ImageApi();
  const wore = data.wore;
  return (
    <div>
      <Layout>
        <Navbar />
        <Head>
          <title>Wore</title>
          <meta charSet='utf-8' />
          <meta
            name='description'
            content='Modest fashion from the high street shops'
          />
        </Head>
        <main>
          <h4>Wore </h4>
          <h5>Project year: 2017 | Designer | Fullstack developer </h5>

          <div className='container container-wore'>
            <p>
              “Wore started out from a problem I had whilst shopping. Finding
              modest clothes at the high street shops was not easy, so I started
              curating all the clothes I found modest. Then I designed and built
              Wore.”{'\n'}- Siham Hadi
            </p>

            <Fragment>
              {error && <div>Something went wrong...</div>}
              {loading ? (
                <div className='loader'>
                  <div className='circle circle-fill'></div>
                </div>
              ) : (
                <Fragment>
                  {wore &&
                    wore.map(item => (
                      <div key={item.id}>
                        <img src={item.image}></img>{' '}
                      </div>
                    ))}
                </Fragment>
              )}
            </Fragment>
            <p>
              The website was place for women to find inspiration on how they
              could dress modestly.
            </p>
          </div>
        </main>
        <Footer />
      </Layout>
    </div>
  );
};
export default Wore;
