import './App.scss';
import {
  createBrowserRouter,
  RouterProvider 

} from "react-router-dom";
import AuthenticationPage from "./pages/authentication/AuthenticationPage";
import Search from "./pages/search/Search";
import Film from "./pages/film/Film";
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
  }, {
    path: "film/:filmId",
    element: <Film/>,
  },
]);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='logo'><a href={`/`}>MOVIE</a></div>
        <div className='menu'>
          <div className='item'><a href={`/search`}>Search</a></div>
          <div className='item'><a href={`/`}>Recommend</a></div>
          <div className='item'><a href={`/login`}>Login</a></div>
        </div>
      </header>
      <div className='body'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
