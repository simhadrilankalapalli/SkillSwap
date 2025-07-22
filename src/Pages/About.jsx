import React from "react";
import ourmission from "../assets/ourmission.jpg";
import problemsolving from "../assets/problemsolving.jpg";
import ourstory from "../assets/ourstory.jpg";
import { FaGlobe, FaChalkboardTeacher } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import { HiOutlineChartBar } from "react-icons/hi";
import { MdGroups, MdLightbulbOutline } from "react-icons/md";
import Footer from "../Components/Footer";

function About() {

   const stats = [
    {
      icon: <HiOutlineChartBar className="text-4xl text-blue-600" />,
      label: "Skill Sessions Completed",
      value: "10,000+",
    },
    {
      icon: <FaGlobe className="text-4xl text-blue-600" />,
      label: "Countries Reached",
      value: "25+",
    },
    {
      icon: <BsChatDotsFill className="text-4xl text-blue-600" />,
      label: "Community Rating",
      value: "4.8 / 5",
    },
    {
      icon: <FaChalkboardTeacher className="text-4xl text-blue-600" />,
      label: "Active Mentors",
      value: "500+",
    },
    {
      icon: <MdGroups className="text-4xl text-blue-600" />,
      label: "Partner Hubs",
      value: "30+",
    },
    {
      icon: <MdLightbulbOutline className="text-4xl text-blue-600" />,
      label: "Skills Offered",
      value: "750+",
    },
  ];


  return (
    <div>
      {/* Our Mission Section */}

      <section className="bg-blue-200 py-20 mt-9">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-16 pt-10 flex flex-col md:flex-row items-center gap-10">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="border-r-8 border-blue-500 transition-all duration-500 ease-in-out rounded-xl overflow-hidden drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)]">
              <img
                src={ourmission}
                alt="Learners collaborating creatively"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 text-[#0C4484]">
            <h1 className="text-5xl font-bold mb-6">
              Our <span className="text-blue-600">Mission</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              Empowering Learners Everywhere
            </h2>
            <p className="text-base sm:text-lg leading-relaxed">
              We believe everyone should have access to high‑quality, affordable
              education that helps them unlock their creative and professional
              potential. Our mission is to make practical, project‑based
              learning accessible to anyone, anywhere — whether you're learning
              to code, design, cook, or create.
            </p>
          </div>
        </div>
      </section>

      {/* Problem We Solve Section */}

      <section className="bg-slate-100 py-16">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-16 pt-10 flex flex-col md:flex-row items-center gap-10">
          {/* Text */}
          <div className="w-full md:w-1/2 text-[#0C4484] px-2 md:px-6">
            <h1 className="text-5xl font-bold mb-6">
              The Problem <span className="text-blue-600">We’re Solving</span>
            </h1>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-center md:text-left">
              Traditional learning doesn’t meet real-world demands.
            </h3>
            <p className="text-base sm:text-lg leading-relaxed text-justify">
              Most platforms are too academic, costly, or disconnected from
              practical needs. Learners want hands-on, flexible education that
              delivers skills they can use immediately.
            </p>

            <p className="text-base sm:text-lg leading-relaxed mt-6">
              We’re solving this by offering:
            </p>

            <ul className="list-disc list-inside mt-4 space-y-1">
              <li>Real-world, project-based learning</li>
              <li>Beginner-friendly, bite-sized lessons</li>
              <li>Affordable and flexible access</li>
              <li>Courses by professionals and creators</li>
            </ul>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="border-l-8 border-blue-500 transition-all duration-500 ease-in-out rounded-xl overflow-hidden drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)]">
              <img
                src={problemsolving}
                alt="Students engaging in project-based learning"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>


      {/* Our Story Section */}

      <section className="bg-blue-200 py-20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-16 pt-10 flex flex-col md:flex-row items-center gap-10">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="border-r-8 border-blue-500 transition-all duration-500 ease-in-out rounded-xl overflow-hidden drop-shadow-[4px_4px_10px_rgba(0,0,0,0.2)]">
              <img
                src={ourstory}
                alt="Learners collaborating creatively"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 text-[#0C4484]">
            <h1 className="text-5xl font-bold mb-6">
              Our <span className="text-blue-600">Story</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
              At SkillSwap, we began with a simple idea: everyone has something
              valuable to teach — and something new to learn.
            </h2>
            <p className="text-base sm:text-lg leading-relaxed">
              Founded by passionate creators and technologists, our goal is to
              break down the barriers of traditional education by making
              skill-sharing more human, more practical, and more accessible.
              What started as a small initiative is now a growing learning
              community built on collaboration, curiosity, and empowerment.
            </p>
          </div>
        </div>
      </section>

      {/* Milestones Section */}

      <section className="bg-white py-20 px-6 md:px-16">
      <div className="max-w-screen-2xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-[#0C4484] mb-20">
          🌟 Milestones & <span className="text-blue-600">Achievements</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10  max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="mb-4 flex justify-center">{stat.icon}</div>
              <h3 className="text-3xl font-extrabold text-blue-600 mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-medium text-gray-700">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

{/* Footer Section */}

    <Footer />

    </div>
  );
}

export default About;
