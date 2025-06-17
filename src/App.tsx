import { useState, useEffect } from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';


const BASE_URL = 'https://api.themoviedb.org/3';

// const API_KEY = import.meta.env.VITE_API_KEY;

// const API_OPTIONS = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: `Bearer ${API_KEY}`
//   }
// }

const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MzlkZDliNzUxN2VkY2RhNTkyNTRhODdlZjljYzBlOSIsIm5iZiI6MTc1MDE4MzcxMy42MTMsInN1YiI6IjY4NTFhZjIxZmIyNWY4MGUwY2JiZDkxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hestRH_pe7C08Eu4fxDp0ome3jChnRPcDJMkgzBmHhQ'
  }
};

function App() {

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [movieList, setMovieList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchMovies = async () => {

    setIsLoading(true);

    try {
      const endpoint = url;

      const res = await fetch(endpoint, options);

      if (!res.ok) {
        throw new Error('Erro ao buscar filmes');
      }

      const data = await res.json();

      if(data.Response === false){
        setErrorMessage(data.Error ||'Nenhum filme encontrado');
        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);

      console.log('Filmes encontrados:', data);

      return data;

    }catch (error){
      console.error('Erro ao buscar filmes:', error);
      return null;
    } finally {
      setIsLoading(false);
    }

  }

  useEffect( () => {
      fetchMovies();
  }, []);

  return(
    <main>

      <div className='pattern'/>

      <div className='wrapper'>

        <header>

          <img src="./hero.png" alt="Hero Banner" />
          <h1>Procure <span className='text-gradient'>Filmes</span> que você ama sem problemas!</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />  

        </header>

        <section className='all-movies'>
          <h2 className='mt-[20px]'>Todos Filmes</h2>

          {isLoading ? (
           <Spinner/>
          ) : errorMessage ? (
            <p className='text-red-500'> {errorMessage} </p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                  <p className='text-white'>{movie.title}</p>
              ))}
            </ul>
          )}
        
        </section>

        <h1 className='text-3xl'> {searchTerm} </h1>


      </div>

    </main>
  )
}

export default App
  