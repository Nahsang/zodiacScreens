import { Key } from "react";

export default interface Movie{
    [x: string]: Key | null | undefined;
    movieId?:number,
    title: string,
    description: string,
    genre: string,
    releaseDate: string, // Use string for LocalDate; consider using ISO format
    rating: string,
    showtime: string,
    posterUrl: string
}