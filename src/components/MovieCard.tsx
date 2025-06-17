interface Movie{
    id: number,
    title: string,
    overview: string,
    release_date: string,
    poster_path: string,
    vote_average: number,
    vote_count: number,
    popularity: number,
    
}

type MovieCardProp = {
    movie: Movie;
}


const MovieCard = ({movie}: MovieCardProp) => {
  return (
    <div className="movie-card">
        <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`: '/no-movie.png'} alt={movie.title} />

        <div className="mt-4">
            <h3>{movie.title}</h3>
        </div>

        <div className="content">
            <div className="rating">
                <img src="star.svg" alt="Estrela Ícone" />
                <p>{movie.vote_average ? movie.vote_average.toFixed(1): 'N/A'}</p>
            </div>

            <span>•</span>

            <p className="year">
                {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
            </p>


        </div>

    </div>
  )
}
export default MovieCard