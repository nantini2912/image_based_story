import React, { useEffect, useRef, useState } from 'react';
import { Story } from '../types';
import { ArrowLeft, Share2, Download, Save } from 'lucide-react';

interface StoryDisplayProps {
  story: Story;
  onBack: () => void;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onBack }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add a slight delay before showing content for a better animation sequence
    if (isImageLoaded) {
      const timer = setTimeout(() => {
        setIsContentVisible(true);
      }, 400);
      
      return () => clearTimeout(timer);
    }
  }, [isImageLoaded]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const getGenreColor = (genre: string): string => {
    const colors: Record<string, string> = {
      'fantasy': 'text-purple-600',
      'sci-fi': 'text-blue-600',
      'romance': 'text-pink-600',
      'mystery': 'text-indigo-600',
      'adventure': 'text-amber-600',
      'horror': 'text-red-800'
    };
    
    return colors[genre] || 'text-purple-600';
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-gray-600 hover:text-purple-600 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-1" />
        Create Another Story
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative w-full h-80 md:h-96 overflow-hidden">
          <img 
            src={story.imageUrl} 
            alt={story.title} 
            className={`
              w-full h-full object-cover transition-all duration-1000
              ${isImageLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}
            `}
            onLoad={handleImageLoad}
          />
          <div className={`
            absolute inset-0 bg-gradient-to-t from-black/70 to-transparent
            transition-opacity duration-1000
            ${isImageLoaded ? 'opacity-100' : 'opacity-0'}
          `}></div>
          <div className={`
            absolute bottom-0 left-0 right-0 p-6 text-white
            transition-all duration-1000 delay-300
            ${isImageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}>
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getGenreColor(story.genre)} bg-white mb-2`}>
              {story.genre.charAt(0).toUpperCase() + story.genre.slice(1)}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold">{story.title}</h1>
            <p className="text-sm text-white/80 mt-2">
              Created on {story.createdAt.toLocaleDateString()}
            </p>
          </div>
        </div>

        <div 
          ref={contentRef}
          className={`
            p-6 md:p-8 space-y-4 transition-all duration-1000 delay-500
            ${isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <div className="prose prose-lg max-w-none">
            {story.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 leading-relaxed text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-200 mt-8 flex flex-wrap gap-3 justify-end">
            <button className="flex items-center gap-1 px-3 py-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-1 px-3 py-2 rounded-md border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDisplay;