import React from 'react';
import { STORY_GENRES } from '../constants/genres';
import { StoryGenre } from '../types';

interface GenreSelectorProps {
  selectedGenre: StoryGenre;
  onSelectGenre: (genre: StoryGenre) => void;
}

const GenreSelector: React.FC<GenreSelectorProps> = ({ 
  selectedGenre, 
  onSelectGenre 
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-medium mb-3 text-gray-800">Choose a story genre</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {STORY_GENRES.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre.id)}
            className={`
              p-4 rounded-lg text-left transition-all duration-300
              ${selectedGenre === genre.id 
                ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300' 
                : 'bg-white hover:bg-purple-50 border border-gray-200'
              }
            `}
          >
            <h4 className={`font-semibold ${selectedGenre === genre.id ? 'text-white' : 'text-gray-800'}`}>
              {genre.name}
            </h4>
            <p className={`text-sm mt-1 ${selectedGenre === genre.id ? 'text-purple-100' : 'text-gray-500'}`}>
              {genre.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;