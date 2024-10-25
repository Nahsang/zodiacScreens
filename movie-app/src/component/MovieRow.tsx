import { TableCell, TableRow } from '@mui/material';

import Movie from '../types/Movie';

function MovieRow({data}:{data:Movie}) {
    const {movieId, title, genre, releaseDate, rating, description} = data
    return (
        <TableRow key={movieId}hover tabIndex={-1} >
            <TableCell>
             {title}
            </TableCell>
            <TableCell>
             {genre}
            </TableCell>
            <TableCell>
           {releaseDate}
           </TableCell>
           <TableCell>
             {rating}
           </TableCell>
           <TableCell>
           {description}
           </TableCell>
           
        </TableRow>
    );
}

export default MovieRow;