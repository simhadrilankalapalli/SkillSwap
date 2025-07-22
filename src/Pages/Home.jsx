import React from "react";
import skillImage from "../assets/skills.jpg";
import { Link } from "react-router-dom";
import HowItWorks from "../HomePageSections/HowItWorks";
import TrendingSkills from "../HomePageSections/TrendingSkills";
import WhyChooseUs from "../HomePageSections/WhyChooseUs";
import Testimonials from "../HomePageSections/Testimonials";
import Footer from "../Components/Footer";
import CallToAction from "../HomePageSections/CallToAction";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative w-auto h-screen overflow-hidden left-0 right-0 bg-blue-300">
        {/* Background Image */}
        <img
          src={skillImage}
          className="w-full h-full object-cover blur-md animate-float will-change-transform"
          alt="Background"
        />

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center px-6 bg-black bg-opacity-40 overflow-hidden pt-20 md:pt-10">
          <div className="max-w-4xl text-center text-white">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Learn What <span className="text-blue-600">You Need.</span>
              <br className="hidden md:block" />
              Teach What <span className="text-blue-600">You Know.</span>
            </h1>
            <p className="text-lg md:text-xl mb-8">
              SkillSwap connects learners and mentors in a collaborative
              skill-sharing community.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/Skills">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition">
                  Explore Skills
                </button>
              </Link>
              <Link to="/AddSkills">
                <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-2xl hover:bg-blue-50 transition">
                  Share a Skill
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* HowItWorks Section */}
      <HowItWorks />

      {/* TrendingSkills Section */}
      <TrendingSkills />

      {/* Why Choose Us Section*/}
      <WhyChooseUs />

      {/* Testimonial Section */}
      <Testimonials />

      {/* Call To Action Section */}
      <CallToAction />

      {/* Footer Section */}
      <Footer />

      
    </div>
  );
}

export default Home;
