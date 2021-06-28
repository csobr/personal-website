import React from 'react'
import Head from 'next/head'
import Navbar from '../components/navigation'
import Footer from '../components/footer'
import Layout from '../components/layout'
import { useSpring, animated } from 'react-spring'
const Unit = () => {
    const props = useSpring({ opacity: 1, from: { opacity: 0 } })
    return (
        <Layout>
            <Head>
                <title>Unit</title>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Rent fashion from local business"
                />
            </Head>
            <Navbar />
            <main>
                <h4>Unit</h4>
                <h5>Project year: 2018 | Designer | Developer</h5>

                <animated.div style={props}>
                    <div className="container container-app">
                        <p className="app-text">
                            A fashion rental marketplace where local businesses
                            rent out their products.
                        </p>
                        <img src="./images/unit/unit1.png" alt="app"></img>
                        <img src="./images/unit/unit2.png" alt="app"></img>
                        <img src="./images/unit/unit3.jpg" alt="app"></img>
                        <img src="./images/unit/unit4.png" alt="app"></img>
                        <p className="app-text">Unit evolved from Wore.</p>
                    </div>
                </animated.div>
            </main>
            <Footer />
        </Layout>
    )
}
export default Unit
