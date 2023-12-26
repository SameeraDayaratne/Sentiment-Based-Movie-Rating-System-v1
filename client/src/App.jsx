/* eslint-disable no-unused-vars */

import { SkeletonTheme } from "react-loading-skeleton";
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Navbar from "./components/Navbar";
import TV from "./pages/TV";
import MovieDetails from "./pages/MovieDetails";
import SignUp , {action, action as handleSignUp} from "./pages/SignUp";
import Login , {action as handleLogin} from "./pages/Login";
import {loader as genreLoader} from './pages/Home'

const router = createBrowserRouter([
  {path: '/' ,
   element : <Navbar />,
   children : [
    {path: '/' , element : <Home /> , loader: genreLoader},
    {path: '/movies' , element : <Movies />},
    {path: '/tv' , element : <TV />},
    {path: '/movies/id' , element : <MovieDetails />},
    {path: '/signup' , element : <SignUp />,action : handleSignUp },
    {path: '/login' , element : <Login />, action:handleLogin},
   ]
  }
 
])


function App() {
  

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <RouterProvider router={router}>

      </RouterProvider>
    
  </SkeletonTheme>
  )
}

export default App
