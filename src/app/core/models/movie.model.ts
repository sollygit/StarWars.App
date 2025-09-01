export interface MovieModel {
  id: string;
  title: string;
  year: string;
  poster: string;
  price: number;
  movieRatings: MovieRating[];
}
export interface MovieRating {
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  language: string;
  metascore: number;
  rating: number;
}

