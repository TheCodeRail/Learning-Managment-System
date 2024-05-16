import React from "react";
import Navbar from "@/webcomponents/Navbar";
import Hero from "@/webcomponents/Hero";
import Subscription from "@/webcomponents/Subscription";
import AboutMe from "@/webcomponents/AboutMe";
import OurMoto from "@/webcomponents/OurMoto";
import Footer from "@/webcomponents/Footer";
import Query from "@/webcomponents/Query";

const Home = () => {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <Hero />
        <Subscription />
        <AboutMe />
        <OurMoto />
        <Query />
        <Footer />
      </div>
    </>
  );
};

export default Home;
