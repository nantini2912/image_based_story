import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import StoryGenerator from './components/StoryGenerator';
import StoryDisplay from './components/StoryDisplay';
import { Story } from './types';

function App() {
  const [generatedStory, setGeneratedStory] = useState<Story | null>(null);

  const handleStoryGenerated = (story: Story) => {
    setGeneratedStory(story);
    // Scroll to top when a new story is generated
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setGeneratedStory(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {generatedStory ? (
          <StoryDisplay story={generatedStory} onBack={handleBack} />
        ) : (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Transform Images into Stories
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Upload an image and let our AI create a captivating story based on what it sees.
                Choose your genre and watch as your visual inspiration becomes narrative magic.
              </p>
            </div>
            
            <StoryGenerator onStoryGenerated={handleStoryGenerated} />
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;