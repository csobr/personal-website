import React, { useEffect, useRef } from 'react'
import Head from 'next/head'
import Navbar from '../components/navigation'
import Footer from '../components/footer'
import '../styles/main.scss'
import Layout from '../components/layout'

const Home = () => {
    return (
        <div>
            <Layout>
                <Head>
                    <title>Siham Hadi</title>
                    <link rel="icon" href="favicon.ico" type="image/x-icon" />
                    <link
                        rel="shortcut icon"
                        href="/favicon.ico"
                        type="image/x-icon"
                    />
                    <link rel="manifest" href="/manifest.json" />
                    <meta charSet="utf-8" />
                    <meta
                        name="description"
                        content="Siham Hadi Software Developer And Designer Based In Stockholm."
                    />
                    <meta
                        name="keywords"
                        content="JavaScript,Frontend,developer"
                    />
                    <meta name="author" content="Siham Hadi" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                </Head>
                <Navbar />
                <main>
                    <div className="about">
                        <div className="about-me">
                            <h1>Be curious and go deeper.</h1>
                            <p>
                                I’m Siham a software developer and designer
                                based in Stockholm, Sweden. I specialize in
                                JavaScript. I learn the tools required to build
                                a product.
                                {'\n'}Languages: Somali, Swedish and English
                            </p>

                            <span className="social">
                                <a href="mailto: siham.hadi@live.se">Email</a>
                                <a
                                    href="https://github.com/csobr"
                                    target="_blank"
                                >
                                    Github
                                </a>
                                <a
                                    href="https://www.instagram.com/texturlab/"
                                    target="_blank"
                                >
                                    Instagram
                                </a>
                            </span>
                        </div>
                    </div>
                </main>

                <Footer />
            </Layout>
        </div>
    )
}

export default Home
