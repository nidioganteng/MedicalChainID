import React from "react";
import { login } from "./utils/auth";
import "./style/index.css";
import "animate.css";
import AOS from "aos";

AOS.init();

function Login({ onLogin }) {
  const handleLogin = async () => {
    await login(onLogin);
  };

  return (
    <>
      {/* <div className="login-container">
        <h1>Login with Internet Identity</h1>
        <button onClick={handleLogin}>Login</button>
      </div> */}

      {/* Awalan */}
      <div className="overflow-x-hidden xl:gap-0 gap-6">
        <div className="hero h-[100vh] flex flex-col items-center justify-center text-center px-4 pt-10 ">
          <h1 className="text-9xl md:text-[102px] font-black text-black ">MEDICAL CHAIN ID</h1>
          <p className="text-xl md:text-[32px] mt-4 text-[#1DAEFF] font-bold">BLOCKCHAIN BASED DIGITAL HEALTH IDENTITY</p>
          <button onClick={handleLogin} className="mt-4 bg-[#1DAEFF] text-white font-bold text-md px-[60px] py-3 rounded-full border-2 border-white hover:bg-[#0c8bd1] transition">
            Launch
          </button>
        </div>
      </div>

      {/* tentang */}
      <div className="about-section py-40">
        <div className="container mx-auto px-4">
          <h2 className="text-[32px] font-bold text-center mb-2" data-aos="fade-up">
            What is Medical Chain ID?
          </h2>
          <p className="text-[20px] text-center" data-aos="fade-up">
            Medical Chain ID is a blockchain-powered platform that gives patients full control of their health records. <br />
            It allows secure, passwordless access and safe data sharing with doctors anytime, anywhere.
          </p>
        </div>
      </div>

      {/* Section: Why Use It? */}
      <div className="animate__animated animate__fadeInUp animated__delay-3s text-center mb-10">
        <h2 className="text-[28px] md:text-[32px] font-bold" data-aos="fade-up">
          Why Use It?
        </h2>
      </div>

      {/* Garis tengah & isi fitur */}
      <div className="animate__animated animate__fadeInUp animated__delay-3s relative w-full max-w-6xl mx-auto" data-aos="fade-up">
        {/* Vertical line */}
        <div className="animate__animated animate__fadeInUp animated__delay-3s absolute left-1/2 top-0 h-full w-[2px] bg-[#E5E7EB] -translate-x-1/2 z-0" data-aos="fade-up"></div>

        {/* Features list */}
        <div className="animate__animated animate__fadeInUp animated__delay-3s flex flex-col z-10 relative" data-aos="fade-up">
          {/* Feature 1 */}
          <div className="grid grid-cols-12 items-center">
            <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 pl-6">
              <img src="/assets/1.1.png" alt="Share Securely" className="w-full max-w-md mx-auto" data-aos="fade-up" />
            </div>
            <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-2 flex justify-center relative z-5">
              <img src="/assets/birunobg.png" alt="checkpoint" className="w-7 h-7 bg-white z-5 rounded-full border border-blue-300" data-aos="fade-up" />
            </div>
            <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 text-left pl-6">
              <h3 className="text-xl font-bold mb-2" data-aos="fade-up">
                Own your medical data
              </h3>
              <p className="text-md text-gray-600" data-aos="fade-up">
                You have full control over your health records. <br />
                No one can access them without your permission.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid grid-cols-12 items-center">
            <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 text-right pr-6">
              <h3 className="text-xl font-bold mb-2" data-aos="fade-up">
                Share securely with doctors
              </h3>
              <p className="text-md text-gray-600" data-aos="fade-up">
                Easily share your data with trusted doctors using <br />
                encrypted and permission-based access.
              </p>
            </div>
            <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-2 flex justify-center relative z-5">
              <img src="/assets/birunobg.png" alt="checkpoint" className="w-7 h-7 bg-white z-5 rounded-full border border-blue-300" data-aos="fade-up" />
            </div>
            <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 pl-6">
              <img src="/assets/1.2.png" alt="Own Medical Data" className="w-full max-w-md mx-auto" data-aos="fade-up" />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="animate__animated animate__fadeInUp animated__delay-3s grid grid-cols-12 items-center">
            <div className="col-span-5 pl-6">
              <img src="/assets/1.3.png" alt="Share Securely" className="w-full max-w-sm mx-auto" data-aos="fade-up" />
            </div>
            <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-2 flex justify-center relative z-5">
              <img src="/assets/birunobg.png" alt="checkpoint" className="w-7 h-7 bg-white z-5 rounded-full border border-blue-300" data-aos="fade-up" />
            </div>
            <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 text-left pl-6">
              <h3 className="text-xl font-bold mb-2" data-aos="fade-up">
                Access records from any device
              </h3>
              <p className="text-md text-gray-600" data-aos="fade-up">
                Easily access your health records from any device, <br />
                ensuring you have your information when you need it.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="grid grid-cols-12 items-center">
            <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 text-right pr-6">
              <h3 className="text-xl font-bold mb-2" data-aos="fade-up">
                Connect across hospitals
              </h3>
              <p className="text-md text-gray-600" data-aos="fade-up">
                No more repeated tests or missing data—your records <br />
                follow you, even between hospitals.
              </p>
            </div>
            <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-2 flex justify-center relative z-5">
              <img src="/assets/birunobg.png" alt="checkpoint" className="w-7 h-7 bg-white z-5 rounded-full border border-blue-300" data-aos="fade-up" />
            </div>
            <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 pl-6">
              <img src="/assets/1.4.png" alt="Access Records" className="w-full max-w-sm mx-auto" data-aos="fade-up" />
            </div>
          </div>
        </div>
      </div>

      {/* How to Use it */}
      <div className="background w-full py-10 relative z-10">
        <div className="animate__animated animate__fadeInUp animated__delay-3s max-w-6xl mx-auto px-4">
          <h2 className="text-[32px] font-bold text-center mb-6 text-white text-shadow" data-aos="fade-up">
            How It Works
          </h2>
          {/* Garis tengah & isi fitur */}
          <div className="relative w-full max-w-6xl mx-auto" data-aos="fade-up">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 h-full w-[2px] bg-[#E5E7EB] -translate-x-1/2 z-0" data-aos="fade-up"></div>

            {/* Features list */}
            <div className="flex flex-col z-10 relative" data-aos="fade-up">
              {/* Feature 1 */}
              <div className="grid grid-cols-12 items-center mb-24">
                <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 pl-6">
                  <img src="/assets/11.png" alt="Share Securely" className="w-full max-w-sm mx-auto" data-aos="fade-up" />
                </div>
                <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-2 flex justify-center relative z-10">
                  <img src="/assets/birunobg.png" alt="checkpoint" className="w-7 h-7 bg-white rounded-full z-20" data-aos="fade-up" />
                </div>
                <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 text-left pl-5">
                  <h3 className="text-xl md:text-[20px] font-bold text-gradient" data-aos="fade-up">
                    Login with Internet Identity (no password)
                  </h3>
                  <p className="text-sm md:text-[12px]  text-white" data-aos="fade-up">
                    Securely access your account without using passwords. Internet Identity uses the Internet Computer blockchain to verify your identity through trusted devices like your phone or laptop. No need to remember login
                    credentials your identity is encrypted, private, and only accessible by you. It’s a fast, secure, and modern way to log in, safe from hacks and phishing.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="grid grid-cols-12 items-center mb-24">
                <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 pl-6">
                  <img src="/assets/add_record1.png" alt="Share Securely" className="w-full max-w-sm mx-auto" data-aos="fade-up" />
                </div>
                <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-2 flex justify-center relative z-5">
                  <img src="/assets/birunobg.png" alt="checkpoint" className="w-7 h-7 bg-white z-5 rounded-full" data-aos="fade-up" />
                </div>
                <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 text-left pl-5">
                  <h3 className="text-xl md:text-[20px] mt-1 font-bold text-gradient" data-aos="fade-up">
                    Access or update your health data
                  </h3>
                  <p className="text-sm md:text-[12px]  text-white" data-aos="fade-up">
                    You have the ability to view and update your health records whenever you need. Whether it's checking your latest medical history or adding new information, everything is just a few clicks away. Sharing your data with
                    trusted doctors is secure and seamless, using encryption and permission-based access to keep your information private.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="grid grid-cols-12 items-center mb-24">
                <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 pl-6">
                  <img src="/assets/view_record.png" alt="Share Securely" className="w-full max-w-sm mx-auto" data-aos="fade-up" />
                </div>
                <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-2 flex justify-center relative z-5">
                  <img src="/assets/birunobg.png" alt="checkpoint" className="w-7 h-7 bg-white z-5 rounded-full" data-aos="fade-up" />
                </div>
                <div className="animate__animated animate__fadeInUp animated__delay-3s col-span-5 text-left pl-5">
                  <h3 className="text-xl md:text-[20px] mt-1 font-bold text-gradient" data-aos="fade-up">
                    Control who can see your records
                  </h3>
                  <p className="text-sm md:text-[12px]  text-white" data-aos="fade-up">
                    Your medical data is entirely under your control. You can choose which doctors or healthcare providers are allowed to view your records. This ensures that only the people you trust can access your sensitive health
                    information, giving you full ownership and privacy over your medical history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-screen flex items-center justify-center ">
          {/* Background Image */}
          <img src="/assets/1.5.png" alt="background" className="absolute inset-0 w-full h-full object-cover opacity-40 z-0" />

          {/* Dot Grid Layer (pakai div, bukan img) */}
          <div className="absolute inset-x-0 top-[17%] h-[60%] z-10 pointer-events-none dot-grid" />

          {/* Overlay Content */}
          <div className="relative z-10 text-center px-4">
            <h1 className="animate__animated animate__fadeInUp animated__delay-3s text-white md:text-[48px] font-bold mb-6 text-shadow">
              “We’re building for a future where your
              <br />
              health data belongs to you”
            </h1>
            <button onClick={handleLogin} className="bg-[#1DAEFF] text-white font-bold text-md px-[60px] py-3 rounded-full border-2 border-white hover:bg-[#0c8bd1] transition">
              Launch
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div>
                <img src="/assets/mchainid.png" alt="Medical Chain Logo" className="h-20 md:h-8" />
                <p className="text-xs text-gray-300">Start Taking Control Today</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="text-center">
              <p className="text-sm font-semibold text-white mb-2">Social Media</p>
              <div className="flex justify-center space-x-4">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/ig.webp" alt="Instagram" className="h-5 w-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/yutub.png" alt="YouTube" className="h-5 w-7" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/git.png" alt="GitHub" className="h-5 w-5.5" />
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center md:text-right">
              <p className="text-sm font-bold text-white mb-2">Contacts</p>
              <div className="flex justify-center md:justify-end items-center space-x-2">
                <img src="/assets/mail.png" alt="Mail" className="h-5 w-5" />
                <p className="text-xs font-medium text-white">medicalchain2025@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-white mt-6">
            <br />
            MedicalChain ID © 2025. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}

export default Login;
