import React, { Fragment, useRef, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/navigation'
import Footer from '../components/footer'
import Layout from '../components/layout'
import imageApi from '../components/api'
import { TweenMax, TimelineLite, Power3 } from 'gsap'
const Photos = () => {
    const [{ data, loading, error }] = imageApi()
    const photo = data.photos
    let photos = useRef(null)
    let tl = new TimelineLite()
    useEffect(() => {
        TweenMax.from(photos, 0.5, { opacity: 0 })
        tl.to(photos, 2, {
            opacity: 1,
            y: 30,
            ease: Power3.easeInOut,
        })
    })
    return (
        <Layout>
            <Navbar />
            <Head>
                <title>Selection of photos</title>
                <meta charSet="utf-8" />
                <meta name="description" content="Photos taken by Siham Hadi" />
            </Head>{' '}
            <main>
                <h4>Selection of photos</h4>

                <div
                    className="container container-photos "
                    ref={el => (photos = el)}
                >
                    {error && (
                        <div className="error-msg">Something went wrong...</div>
                    )}
                    {loading ? (
                        <div className="loader">
                            <div className="circle circle-fill"></div>
                        </div>
                    ) : (
                        <Fragment>
                            {photo &&
                                photo.map(item => (
                                    <div key={item.id}>
                                        <img src={item.image}></img>
                                    </div>
                                ))}
                        </Fragment>
                    )}
                </div>
            </main>
            <Footer />
        </Layout>
    )
}
export default Photos
