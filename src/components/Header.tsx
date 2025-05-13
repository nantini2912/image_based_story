import React from 'react';
import { BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-purple-300" />
            <h1 className="text-2xl font-bold">StoryVision</h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                  Create
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                  Library
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                  Explore
                </a>
              </li>
              <li>
                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;