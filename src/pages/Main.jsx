import axios from "axios";
import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "../context/AuthContextProvider";


const API_KEY = "a9a90e58da935e5528540782b69aa0cf"
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(AuthContext)

  const getMovies = (API) => {
    setLoading(true);
    axios.get(API)
      .then((res) => setMovies(res.data.results))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }


  useEffect(() => {
    getMovies(FEATURED_API)
  }, []);

console.log(movies)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search && currentUser) {
      getMovies(SEARCH_API + search)
      search("")
    } else if (!currentUser) {
      alert("please log in to see details")
    } else {
      alert("please enter a text")
    }
  }

  return (
    <>
      <form
        className="flex justify-center p-2"
        onSubmit={handleSubmit}
      >
        <input
          type="search"
          className="w-80 h-8 rounded-md outline-none border p-1 m-2"
          placeholder="Search a movie..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button className="dark:text-white" type="submit">
          Search
        </button>
      </form>
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600 mt-52"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
        movies.map((movie) =><MovieCard key={movie.id} {...movie}/>)
        )}
      </div>
    </>
  )
}

export default Main