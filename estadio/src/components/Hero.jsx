import React from 'react';
import footballVideo from '../assets/football3.mp4';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Hero() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (isAuthenticated) {
      navigate('/upload');
    } else {
      navigate('/signup', { state: { from: '/upload' } });
    }
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{width: '2000px', objectFit: 'cover'}}
          className="w-full h-full object-cover"
        >
          <source src={footballVideo} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
          RELIVE FOOTBALL'S GREATEST MOMENTS
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          Watch, Upload & Share the Most Insane Football Moments
        </p>
        <button 
          onClick={handleUploadClick}
          className="cta-button"
        >
          {isAuthenticated ? 'Upload Your Clip' : 'Join Now to Upload'}
        </button>
      </div>
    </section>
  );
}