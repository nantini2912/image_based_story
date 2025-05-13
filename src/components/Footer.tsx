import React from 'react';
import { BookOpen, Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-6 w-6 text-purple-400" />
              <h2 className="text-xl font-bold">StoryVision</h2>
            </div>
            <p className="text-gray-400">
              Transform images into captivating stories with our AI-powered storytelling platform.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Features</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Story Creator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Story Library</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Genre Explorer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Writing Tips</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">API</a></li>
              <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-gray-400">Subscribe to our newsletter</p>
              <div className="mt-2 flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="px-3 py-2 text-gray-900 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow"
                />
                <button className="bg-purple-600 hover:bg-purple-700 transition-colors px-4 py-2 rounded-r-md">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} StoryVision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;