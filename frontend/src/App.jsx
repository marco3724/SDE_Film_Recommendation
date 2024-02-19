import './App.scss';
import {
  createBrowserRouter,
  RouterProvider 

} from "react-router-dom";
import { useState } from 'react';
import AuthenticationPage from "./pages/authentication/AuthenticationPage";
import Search from "./pages/search/Search";
import Film from "./pages/film/Film";
import History from './pages/history/History';
import { useEffect } from 'react';
const router = createBrowserRouter([
  {
    path: "/login",
    element: <AuthenticationPage/>,
  },  {
    path: "/",
    element: <Search/>,
  }, 
  {
    path: "/search",
    element: <Search/>,
  },
  {
    path: "film/:filmId",
    element: <Film/>,
  },
  {
    path: "/history",
    element: <History />
  },
]);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticatedFunction();
      setIsAuthenticated(auth);
    };
    checkAuth();
  }
  , []);
  const isAuthenticatedFunction = async () => {
    try {
      const response = await fetch(`http://localhost:8003/login/isAuthenticated`,{
        method: 'POST',
        credentials: 'include'
        
      });

      if (!response.ok) {
        return false
      }
      const data = await response.json();
      console.log(data)
      console.log(data.isAuthenticated)
      return data.isAuthenticated

    } catch (error) {
      console.error('Fetch error:', error);
      return false
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className='logo'><a href={`/`}>MOVIE</a></div>
        <div className='menu'>
          <div className='item'><a href={`/search`}>Search</a></div>
          <div className='item'><a href={`/`}>Recommend</a></div>
          <div className='item'>{
          isAuthenticated?
            <a href={`/history`}>History</a> 
            :
            <a href={`/login`}>Login</a>
            }</div>
        </div>
      </header>
      <div className='body'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
