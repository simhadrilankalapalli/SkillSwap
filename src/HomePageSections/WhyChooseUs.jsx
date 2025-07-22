import React from "react";

function WhyChooseUs() {
  const features = [
    {
      icon: "🎯",
      title: "Learn From the Best",
      description:
        "Get access to expert-led courses taught by industry professionals who bring real-world experience into every lesson.",
    },
    {
      icon: "🚀",
      title: "Skill Up Anytime, Anywhere",
      description:
        "With 24/7 access to our platform, learn at your own pace on mobile, tablet, or desktop — anytime, anywhere.",
    },
    {
      icon: "🛠️",
      title: "Practical, Hands-On Learning",
      description:
        "Our project-based approach ensures you're not just watching — you're creating, building, and applying your skills right away.",
    },
    {
      icon: "🌱",
      title: "For Beginners to Pros",
      description:
        "Whether you're starting fresh or sharpening your expertise, our courses cater to all levels with clear, structured learning paths.",
    },
    {
      icon: "👥",
      title: "Join a Creative Community",
      description:
        "Connect with like-minded learners, get feedback, and collaborate through discussion boards and project showcases.",
    },
    {
      icon: "✅",
      title: "No Ads, Just Learning",
      description:
        "Enjoy a distraction-free experience designed to help you focus and grow — no interruptions, just value.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-blue-50 to-slate-200 py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-[#0C4484]">Why Choose Us?</h2>
        <p className="text-lg text-gray-600 mt-2">Your success starts with smart learning.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-blue-600 mb-3">
              {feature.icon} {feature.title}
            </h3>
            <p className="text-gray-700 text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
