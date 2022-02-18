import React from "react";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css";
import "../global_styles/styles.scss";
import { AppProps } from "next/app";
import TopNav from "../global_building_blocks/top_nav/top_nav";
import Footer from "../global_building_blocks/footer/footer";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Head>
                <title>MassLFG</title>
            </Head>
            <div className="outer-container">
                <TopNav />
                <div className="container">
                    <Component {...pageProps} />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default MyApp;
