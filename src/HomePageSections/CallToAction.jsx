import React from "react";
import { Briefcase, GraduationCap, Clock, Rocket } from 'lucide-react';
function CallToAction(){
    return (
        <section className="bg-gradient-to-br from-blue-50 to-slate-200 text-[#0C4484] py-16 px-8 shadow-lg text-center">
  <h2 className="text-4xl font-bold mb-4">Start Your Learning Journey Today!!</h2>
  <p className="text-lg mb-6">
    Access unlimited courses, expert feedback, and a growing community — all in one platform.
  </p>

  <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
    <button className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-400 transition">
      Start Learning Now
    </button>
    <button className="border border-blue-500 px-6 py-3 rounded-full bg-white hover:bg-slate-100 hover:text-indigo-600 transition">
      Browse All Courses
    </button>
  </div>

  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm opacity-90 mt-10 mx-[200px]">
    <li className="flex items-center gap-3 justify-center">
      <Briefcase className="w-5 h-5 text-[#0C4484]" />
      Real-world projects
    </li> 
    <li className="flex items-center gap-3 justify-center">
      <GraduationCap className="w-5 h-5 text-[#0C4484]" />
      Expert instructors
    </li>
    <li className="flex items-center gap-3 justify-center">
      <Clock className="w-5 h-5 text-[#0C4484]" />
      Learn at your own pace
    </li>
    <li className="flex items-center gap-3 justify-center">
      <Rocket className="w-5 h-5 text-[#0C4484]" />
      7-day free trial
    </li>
  </ul>
</section>

    );
}
export default CallToAction;