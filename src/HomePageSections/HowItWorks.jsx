import React from "react";
import { Lightbulb, Share2, Users } from "lucide-react"; // Optional: install lucide-react or replace with emojis/icons

function HowItWorks() {
  return (
    <section className="bg-white py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0C4484] mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Step 1 */}
          <div className="p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
            <p className="text-gray-600">
              Sign up and create your profile to start connecting with other
              learners and mentors.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="mb-4">
              <Share2 className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Share or Discover Skills
            </h3>
            <p className="text-gray-600">
              List a skill you want to share or browse skills to learn from
              passionate peers.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-gray-100 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="mb-4">
              <Lightbulb className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect & Learn</h3>
            <p className="text-gray-600">
              Send requests, connect with mentors or learners, and grow your
              knowledge together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
