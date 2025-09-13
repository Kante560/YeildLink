// src/components/Footer.tsx
import { FaInstagram, FaFacebook, FaTiktok, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-600 text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-cols md:flex-row justify-space-between  gap-[50rem]  items-start text-center md:text-left">
          
          {/* Left: Logo + tagline */}
          <div>
            <h2 className="text-xl font-bold flex items-center space-x-1">
              <span>🌱</span>
              <span>YieldLink</span>
              
            </h2>
            <p className="mt-2 text-sm">Smarter Farming. Stronger Harvest.</p>
          </div>


          <div className=" flex ">


          {/* Middle: Links */}
          <div className="space-y-2 md:mx-auto">
            <h3 className="font-semibold">About Us</h3>
            <div>
              <ul className="space-y-1 text-sm">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>

          {/* Right: Socials & Contact */}
          <div className="md:ml-auto w-full flex flex-col items-center md:items-end">
            <h3 className="font-semibold mb-2">CONNECT WITH US</h3>
            <div className="flex space-x-4 text-xl mb-3">
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTiktok /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          
          </div>
          </div>
  
        </div>
      </div>

      {/* Bottom line */}
      <div className="flex items-center justify-center mt-10 text-sm opacity-90">
        <div className="flex w-full max-w-7xl mx-auto items-center space-x-4">
          <span className="flex-grow h-px bg-white" style={{ height: "0.4px" }}></span>
          <p>© 2025 YieldLink.com All rights reserved.</p>
          <span className="flex-grow h-px bg-white" style={{ height: "0.4px" }}></span>
        </div>
      </div>
    </footer>
  );
}
