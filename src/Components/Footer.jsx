import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-gray-300 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-10 sm:gap-x-8">
          {/* Platform Links */}
          <div>
            <h5 className="mb-4 text-lg font-semibold text-white">Platform</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-white transition-colors duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h5 className="mb-4 text-lg font-semibold text-white">Resources</h5>
            <ul className="space-y-2">
              <li>
                <a
                  href="/faqs"
                  className="hover:text-white transition-colors duration-200"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information & Social Icons */}
          <div>
            <h5 className="mb-4 text-lg font-semibold text-white">
              Contact Us
            </h5>
            <p className="mb-2">Email: tech@skillshare.org</p>
            <p className="mb-4">Mobile: +91 939-240-4094</p>
            <div className="flex gap-8 text-white">
              <FaLinkedin className="w-5 h-5" />
              <FaTwitter className="w-5 h-5" />
              <FaFacebook className="w-5 h-5" />
              <FaInstagram className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-10 mt-10 border-t border-neutral-700 text-sm text-center">
          © {new Date().getFullYear()} SkillShare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
