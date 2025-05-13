export interface Story {
  id: string;
  title: string;
  content: string;
  genre: StoryGenre;
  imageUrl: string;
  createdAt: Date;
}

export type StoryGenre = 
  | 'fantasy' 
  | 'sci-fi' 
  | 'romance' 
  | 'mystery' 
  | 'adventure'
  | 'horror';

export interface StoryGenreOption {
  id: StoryGenre;
  name: string;
  description: string;
}