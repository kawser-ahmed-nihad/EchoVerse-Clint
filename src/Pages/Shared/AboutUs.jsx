import React from 'react';
import { Helmet } from 'react-helmet';

const AboutUs = () => {
    return (
        <div>
            <Helmet>
                <title>EchoVerse || About Us</title>
            </Helmet>
            <div className="flex flex-col items-center text-center">
                <h3 className="text-lg font-medium text-[#ff6933] mb-2">About Us</h3>
                <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-800">Meet Our People</h1>
                <p className="w-3/5 mb-14 text-gray-500 text-sm">By upholding integrity, innovation, and an unwavering commitment to excellence, we aspire to become a world-class leader.</p>
                <div className="flex flex-wrap gap-6 items-center justify-center">


                    <div className="group flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 rounded-md cursor-pointer hover:border-[#ff6933] hover:bg-[#ff6933] ansition">
                        <img className="w-24 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="userImage2" />
                        <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-2">Kawser Ahmed Nihad</h2>
                        <p className="text-gray-500 group-hover:text-white/80">Full Stack Developer</p>
                        <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">I build web apps using modern technologies, focusing on clean code, user-friendly interfaces, and efficient backends.</p>
                        <div className="flex items-center space-x-4 mt-6 text-gray-500 group-hover:text-white">
                            <a href="https://www.linkedin.com/in/kawser-ahmed-nihad" target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z" fill="currentColor" />
                                </svg>
                            </a>

                            <a href="https://github.com/kawser-ahmed-nihad" target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.292 6.532 5.47 7.59.4.074.547-.174.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.727-.497.055-.487.055-.487.803.056 1.225.825 1.225.825.715 1.223 1.872.87 2.33.666.072-.517.28-.87.508-1.07-1.777-.202-3.644-.888-3.644-3.953 0-.873.31-1.588.823-2.15-.083-.202-.357-1.016.078-2.117 0 0 .672-.215 2.2.82a7.653 7.653 0 0 1 2-.27c.68.003 1.36.092 2 .27 1.527-1.035 2.198-.82 2.198-.82.437 1.101.162 1.915.08 2.117.513.562.823 1.277.823 2.15 0 3.073-1.87 3.748-3.65 3.947.288.247.543.735.543 1.48 0 1.07-.01 1.932-.01 2.193 0 .213.144.462.55.384C13.708 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" fill="currentColor" />
                                </svg>
                            </a>

                            <a href="https://kawser-ahmed-nihad.netlify.app/" target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M12 2C14.5 6 14.5 18 12 22C9.5 18 9.5 6 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="group flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 rounded-md cursor-pointer hover:border-[#ff6933] hover:bg-[#ff6933] transition">
                        <img className="w-24 rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="userImage3" />
                        <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-2">Kawser Ahmed Nihad</h2>
                        <p className="text-gray-500 group-hover:text-white/80">Mern Stack Developer</p>
                        <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">I build web apps using modern technologies, focusing on clean code, user-friendly interfaces, and efficient backends.</p>
                        <div className="flex items-center space-x-4 mt-6 text-gray-500 group-hover:text-white">
                            <a href="https://www.linkedin.com/in/kawser-ahmed-nihad" target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z" fill="currentColor" />
                                </svg>
                            </a>

                            <a href="https://github.com/kawser-ahmed-nihad" target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.292 6.532 5.47 7.59.4.074.547-.174.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.727-.497.055-.487.055-.487.803.056 1.225.825 1.225.825.715 1.223 1.872.87 2.33.666.072-.517.28-.87.508-1.07-1.777-.202-3.644-.888-3.644-3.953 0-.873.31-1.588.823-2.15-.083-.202-.357-1.016.078-2.117 0 0 .672-.215 2.2.82a7.653 7.653 0 0 1 2-.27c.68.003 1.36.092 2 .27 1.527-1.035 2.198-.82 2.198-.82.437 1.101.162 1.915.08 2.117.513.562.823 1.277.823 2.15 0 3.073-1.87 3.748-3.65 3.947.288.247.543.735.543 1.48 0 1.07-.01 1.932-.01 2.193 0 .213.144.462.55.384C13.708 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" fill="currentColor" />
                                </svg>
                            </a>

                            <a href="https://kawser-ahmed-nihad.netlify.app/" target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M12 2C14.5 6 14.5 18 12 22C9.5 18 9.5 6 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div className="group flex flex-col items-center py-8 text-sm bg-white border border-gray-300/60 w-64 rounded-md cursor-pointer hover:border-[#ff6933] hover:bg-[#ff6933] transition">
                        <img className="w-24 rounded-full" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="userImage1" />
                        <h2 className="text-gray-700 group-hover:text-white text-lg font-medium mt-2">Kawser Ahmed Nihad</h2>
                        <p className="text-gray-500 group-hover:text-white/80">Front-End Developer
                        </p>
                        <p className="text-center text-gray-500/60 group-hover:text-white/60 w-3/4 mt-4">I build web apps using modern technologies, focusing on clean code, user-friendly interfaces, and efficient backends.</p>
                        <div className="flex items-center space-x-4 mt-6 text-gray-500 group-hover:text-white">
                            <a href="https://www.linkedin.com/in/kawser-ahmed-nihad" target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z" fill="currentColor" />
                                </svg>
                            </a>

                            <a href="https://github.com/kawser-ahmed-nihad" target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.292 6.532 5.47 7.59.4.074.547-.174.547-.385 0-.19-.007-.693-.01-1.36-2.226.483-2.695-1.073-2.695-1.073-.364-.924-.89-1.17-.89-1.17-.727-.497.055-.487.055-.487.803.056 1.225.825 1.225.825.715 1.223 1.872.87 2.33.666.072-.517.28-.87.508-1.07-1.777-.202-3.644-.888-3.644-3.953 0-.873.31-1.588.823-2.15-.083-.202-.357-1.016.078-2.117 0 0 .672-.215 2.2.82a7.653 7.653 0 0 1 2-.27c.68.003 1.36.092 2 .27 1.527-1.035 2.198-.82 2.198-.82.437 1.101.162 1.915.08 2.117.513.562.823 1.277.823 2.15 0 3.073-1.87 3.748-3.65 3.947.288.247.543.735.543 1.48 0 1.07-.01 1.932-.01 2.193 0 .213.144.462.55.384C13.708 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" fill="currentColor" />
                                </svg>
                            </a>

                            <a href="https://kawser-ahmed-nihad.netlify.app/" target="_blank" rel="noopener noreferrer">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                                    <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M12 2C14.5 6 14.5 18 12 22C9.5 18 9.5 6 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;