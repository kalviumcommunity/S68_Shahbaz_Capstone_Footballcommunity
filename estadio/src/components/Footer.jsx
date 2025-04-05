import React from 'react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-darker text-white py-12 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            ESTADIO
          </h3>
          <p className="mt-2 text-gray-400">Football's digital stadium</p>
        </div>
        
        <div className="flex gap-4">
          <a href="#" className="text-2xl hover:text-primary transition-colors">
            <FaInstagram />
          </a>
          <a href="#" className="text-2xl hover:text-primary transition-colors">
            <FaTwitter />
          </a>
          <a href="#" className="text-2xl hover:text-primary transition-colors">
            <FaYoutube />
          </a>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-bold">Links</h4>
          <a href="#" className="block text-gray-400 hover:text-white">About</a>
          <a href="#" className="block text-gray-400 hover:text-white">Terms</a>
          <a href="#" className="block text-gray-400 hover:text-white">Privacy</a>
        </div>
        
        <div className="md:col-span-2 lg:col-span-1">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Estadio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}