import React from "react";
import developer1 from "../assets/dev1.png";
import developer2 from "../assets/dev2.jpg";
import chef from "../assets/cheff.png";

function Testimonials() {
  return (
    <section className="bg-blue-200 w-full py-16 px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0C4484]">
          Testimonials
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div className="overflow-x-auto mx-[102px]">
        <div className="flex gap-6 px-4 w-max h-[185px]">
          {/* Card 1 */}
          <div className="w-[620px] bg-white p-6 rounded-2xl border border-blue-400">
            <div className="flex flex-col-2 items-center justify-between">
              <img
                src={developer1}
                alt="Developer"
                className="w-[105px] h-[105px] rounded-full ml-3 border border-blue-400"
              />
              <p className="text-gray-700 pb-1 text-justify pl-6 pr-4">
                The creative classes transformed my photography approach.
                Hands-on lessons in composition, lighting, and editing helped me
                build a strong portfolio, boosting my confidence and attracting
                more clients to grow professionally.
              </p>
            </div>
            <p className="text-left mt-4">
              <span className="text-white bg-blue-400 p-1 rounded-md">
                Photographer
              </span>
              <span className="font-bold italic float-right">- Aarav Mehta</span>
            </p>
          </div>

          {/* Card 2 */}
          <div className="w-[620px] bg-white p-6 rounded-2xl border border-blue-400">
            <div className="flex flex-col-2 items-center justify-between">
              <img
                src={developer2}
                alt="Developer"
                className="w-[100px] h-[105px] rounded-full ml-1 border border-blue-400 ml-3"
              />
              <p className="text-gray-700 pb-1 text-justify pl-6 pr-4">
                The coding classes improved my front-end skills through hands-on
                practice. I built real projects, boosted my portfolio, and
                gained confidence—leading to freelance opportunities and growth
                in my web development career.
              </p>
            </div>
            <p className="text-left mt-4">
              <span className="text-white bg-blue-400 p-1 rounded-md">
                UI/UX Designer
              </span>
              <span className="font-bold italic float-right">- Rohan Desai</span>
            </p>
          </div>

          {/* Card 3 */}
          <div className="w-[720px] bg-white p-6 rounded-2xl border border-blue-400">
            <div className="flex flex-col-2 items-center justify-between">
              <img
                src={chef}
                alt="Cheff"
                className="w-[95px] h-[105px] rounded-full ml-1 border border-blue-400"
              />
              <p className="text-gray-700 pb-1 text-justify pl-6 pr-4">
                The culinary classes elevated my cooking skills and creativity.
                I learned new techniques, explored global cuisines, and improved
                my presentation. The hands-on training helped me build a strong
                menu and gain more recognition in my culinary journey.
              </p>
            </div>
            <p className="text-left mt-4 pl-7">
              <span className="text-white bg-blue-400 p-1 rounded-md">
                Chef
              </span>
              <span className="font-bold italic float-right">- Ananya Rao</span>
            </p>
          </div>

          {/* Card 4 */}
          <div className="w-[620px] bg-white p-6 rounded-2xl border border-blue-400">
            <div className="flex flex-col-2 items-center justify-between">
              <img
                src={developer2}
                alt="Developer"
                className="w-[100px] h-[105px] rounded-full ml-1 border border-blue-400 ml-3"
              />
              <p className="text-gray-700 pb-1 text-justify pl-6 pr-4">
                The coding classes improved my front-end skills through hands-on
                practice. I built real projects, boosted my portfolio, and
                gained confidence—leading to freelance opportunities and growth
                in my web development career.
              </p>
            </div>
            <p className="text-left mt-4">
              <span className="text-white bg-blue-400 p-1 rounded-md">
                UI/UX Designer
              </span>
              <span className="font-bold italic float-right">- Rohan Desai</span>
            </p>
          </div>

          {/* Card 5 */}

          <div className="w-[620px] bg-white p-6 rounded-2xl border border-blue-400">
            <div className="flex flex-col-2 items-center justify-between">
              <img
                src={developer1}
                alt="Developer"
                className="w-[105px] h-[105px] rounded-full ml-3 border border-blue-400"
              />
              <p className="text-gray-700 pb-1 text-justify pl-6 pr-4">
                The creative classes transformed my photography approach.
                Hands-on lessons in composition, lighting, and editing helped me
                build a strong portfolio, boosting my confidence and attracting
                more clients to grow professionally.
              </p>
            </div>
            <p className="text-left mt-4">
              <span className="text-white bg-blue-400 p-1 rounded-md">
                Photographer
              </span>
              <span className="font-bold italic float-right">- Aarav Mehta</span>
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
