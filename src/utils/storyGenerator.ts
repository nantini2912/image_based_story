import { Story, StoryGenre } from '../types';
import { v4 as uuidv4 } from 'uuid';
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

let model: mobilenet.MobileNet | null = null;

export const generateStoryFromImage = async (
  imageUrl: string, 
  genre: StoryGenre,
  setProgress?: (progress: number) => void
): Promise<Story> => {
  try {
    // Initialize TensorFlow.js and load model
    await tf.ready();
    if (setProgress) setProgress(20);

    if (!model) {
      model = await mobilenet.load();
      if (setProgress) setProgress(40);
    }

    // Load and process image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });
    if (setProgress) setProgress(60);

    // Classify image
    const tfImg = tf.browser.fromPixels(img);
    const predictions = await model.classify(tfImg);
    tfImg.dispose(); // Clean up tensor memory
    if (setProgress) setProgress(80);

    // Generate story based on predictions
    const story = generateStoryFromPredictions(predictions, genre);
    if (setProgress) setProgress(100);

    return {
      id: uuidv4(),
      title: story.title,
      content: story.content,
      genre,
      imageUrl,
      createdAt: new Date()
    };
  } catch (error) {
    console.error('Error generating story:', error);
    throw new Error('Failed to analyze image and generate story. Please try again.');
  }
};

interface StoryTemplate {
  title: string;
  content: string;
}

function generateStoryFromPredictions(
  predictions: mobilenet.MobileNetPrediction[],
  genre: StoryGenre
): StoryTemplate {
  const objects = predictions.map(p => p.className.split(',')[0].trim());
  const mainObject = objects[0] || 'mysterious scene';
  const secondaryObject = objects[1] || 'intriguing detail';
  const atmosphere = objects[2] || 'unique environment';

  const storyTemplates: Record<StoryGenre, (objects: string[]) => StoryTemplate> = {
    fantasy: (objects) => ({
      title: `The Enchanted ${capitalize(mainObject)}`,
      content: `In a realm where magic permeated every shadow and whisper, an extraordinary ${mainObject} stood as a beacon of ancient power. The ${secondaryObject} nearby seemed to pulse with an otherworldly energy, casting ethereal reflections across the ${atmosphere}. Legends spoke of such places, where the veil between worlds grew thin and the impossible became reality.

As our hero approached, the air itself began to shimmer with arcane potential. The ${mainObject} held secrets that had been guarded by generations of mystical beings, each leaving their mark on this sacred space. The ${secondaryObject} appeared to respond to their presence, its energy intertwining with the ancient magics that permeated the area.

What started as a simple journey had led to this moment of discovery, where destiny and magic converged in ways that would forever alter the fabric of this enchanted realm. The ${atmosphere} itself seemed to hold its breath, waiting to witness what would unfold in this nexus of power and possibility.`
    }),
    'sci-fi': (objects) => ({
      title: `${capitalize(mainObject)} Protocol`,
      content: `The quantum readings from the ${mainObject} defied every known law of physics. Dr. Chen's holographic displays erupted with cascading data as the ${secondaryObject} began emitting previously unrecorded energy signatures. The ${atmosphere} around the site crackled with electromagnetic anomalies that shouldn't have been possible in this dimension.

Initial scans suggested technology far beyond current human capabilities, perhaps even evidence of non-terrestrial origin. The ${mainObject}'s structure appeared to shift and reconfigure at the quantum level, adapting to some unknown protocol or directive. The nearby ${secondaryObject} seemed to be responding in kind, creating a synchronized pattern that our instruments barely registered.

As the research team worked to decode these phenomena, one thing became clear: this discovery would revolutionize humanity's understanding of the universe and our place within it. The ${atmosphere} continued to fluctuate with each new breakthrough, hinting at possibilities that were once confined to the realm of science fiction.`
    }),
    romance: (objects) => ({
      title: `Love by the ${capitalize(mainObject)}`,
      content: `The ${mainObject} had always been their special place, but today it held a different kind of magic. The way the light played across the ${secondaryObject} created a moment that seemed to exist outside of time itself. The ${atmosphere} perfectly captured the delicate balance between familiarity and the exciting unknown that defined their relationship.

Years of friendship had built to this moment, where words became secondary to the unspoken understanding between them. The ${mainObject} stood as a silent witness to their story, just as it had witnessed countless moments of their growing connection. The ${secondaryObject} caught the last rays of sunset, painting everything in hues that matched the warmth in their hearts.

Sometimes love reveals itself in the most ordinary places, transforming them into something extraordinary. As they stood there, surrounded by the gentle embrace of the ${atmosphere}, both knew that this was just the beginning of their greatest adventure together.`
    }),
    mystery: (objects) => ({
      title: `The ${capitalize(mainObject)} Enigma`,
      content: `Detective Sarah Morgan studied the ${mainObject} intently, knowing it held the key to unraveling this perplexing case. The presence of the ${secondaryObject} couldn't be coincidental - nothing about this scene followed the expected pattern. The ${atmosphere} only added to the unsettling nature of the discovery.

Years of experience told her that every detail mattered, from the peculiar positioning of the ${mainObject} to the subtle disturbances around the ${secondaryObject}. Each element seemed carefully arranged, yet something about the scene felt fundamentally wrong. The ${atmosphere} preserved clues that others might have missed, but what story were they telling?

As rain began to fall, Morgan realized this was more than just another case. Someone had orchestrated this elaborate puzzle, and she was determined to uncover the truth hidden within its layers of deception.`
    }),
    adventure: (objects) => ({
      title: `Quest for the ${capitalize(mainObject)}`,
      content: `After months of following ancient maps and cryptic clues, the expedition team finally stood before the legendary ${mainObject}. The weathered ${secondaryObject} marked the entrance to what they believed was the greatest discovery of the century. The ${atmosphere} hummed with the promise of adventure and discovery.

Generations of explorers had sought this place, but none had managed to decipher the complex trail of breadcrumbs left by the lost civilization. The ${mainObject} stood as a testament to their advanced knowledge, while the ${secondaryObject} hinted at secrets still waiting to be uncovered. The surrounding ${atmosphere} seemed to guard its mysteries jealously.

As they prepared to take the first steps into the unknown, each team member knew that this moment would be remembered in history. The real challenge, however, was only beginning.`
    }),
    horror: (objects) => ({
      title: `The ${capitalize(mainObject)} Haunting`,
      content: `At first glance, the ${mainObject} appeared ordinary enough, but something about it sent chills down their spine. The ${secondaryObject} they discovered only confirmed their growing sense of dread. Even the ${atmosphere} seemed to twist and distort in ways that defied natural law.

As night fell, the true nature of the place began to reveal itself. Shadows moved against their light sources, and sounds that shouldn't exist echoed through the ${mainObject}. The ${secondaryObject} appeared to change positions when no one was watching, and the ${atmosphere} grew thick with an ancient, malevolent presence.

They quickly realized their grave mistake: some doors, once opened, can never be closed again. Whatever dwelled within the ${mainObject} had been waiting for them, and now it was too late to turn back.`
    })
  };

  return storyTemplates[genre](objects);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}