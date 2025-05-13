import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import ImageUploader from './ImageUploader';
import GenreSelector from './GenreSelector';
import { StoryGenre } from '../types';
import { generateStoryFromImage } from '../utils/storyGenerator';

interface StoryGeneratorProps {
  onStoryGenerated: (story: any) => void;
}

const StoryGenerator: React.FC<StoryGeneratorProps> = ({ onStoryGenerated }) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<StoryGenre>('fantasy');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const handleGenerate = async () => {
    if (!selectedImage) {
      alert('Please select an image first');
      return;
    }

    setIsGenerating(true);
    
    try {
      const story = await generateStoryFromImage(
        selectedImage, 
        selectedGenre,
        setGenerationProgress
      );
      
      onStoryGenerated(story);
    } catch (error) {
      console.error('Error generating story:', error);
      alert('Failed to generate story. Please try again.');
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Your Story</h2>
        <p className="text-gray-600">Upload an image and we'll generate a captivating story</p>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-medium mb-3 text-gray-800">Upload your inspiration</h3>
          <ImageUploader onImageSelected={setSelectedImage} />
        </section>

        {selectedImage && (
          <section className="animate-fadeIn">
            <GenreSelector
              selectedGenre={selectedGenre}
              onSelectGenre={setSelectedGenre}
            />
          </section>
        )}

        {selectedImage && (
          <section className="flex justify-center animate-fadeIn">
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className={`
                px-6 py-3 rounded-md text-white font-medium flex items-center
                ${isGenerating 
                  ? 'bg-purple-400 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700 transition-colors'
                }
              `}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Story... {generationProgress}%
                </>
              ) : (
                <>
                  Generate Story
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default StoryGenerator;