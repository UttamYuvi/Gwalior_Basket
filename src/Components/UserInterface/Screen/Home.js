import React from "react";
import Header from "../UserComponents/Header";
import Footer from "../UserComponents/Footer";
import MainSlider from "../UserComponents/MainSlider";
import DealsSlider from "../UserComponents/DealsSlider";
import Spacer from "../UserComponents/Spacer";
import Trending from "../UserComponents/Trending";
import ExplorCategory from "../UserComponents/ExploreCategory";

export default function Home() {

    return (<div>
        <div style={{ width: '100%' }}>
            <Header />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 10, }}>
            <div style={{ width: '96%', marginLeft: '2%' }}>
                <MainSlider />
            </div>
            <Spacer />
            <div style={{ width: '96%', marginLeft: '2%' }}>
                <DealsSlider />
            </div>
            <Spacer />
            <div style={{ width: '96%', marginLeft: '2%' }}>
                <ExplorCategory /> 
            </div>

            <Spacer />

            <div style={{ width: '96%', marginLeft: '2%' }}>
                <Trending />
            </div>

        </div>
        <div style={{ width: '100%' }}>
            <Footer />
        </div>
    </div>)
}