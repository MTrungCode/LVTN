import TopBar from "./components/TopBar/TopBar";
import Home from "./views/Home/Home";
import Footer from "./components/footer/Footer";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import RegainPassword from "./views/RegainPassword/RegainPassword";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import "./style.scss"

const Layout = () => {
  return (
    <>
      <TopBar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/regainpassword",
        element: <RegainPassword/>,
      },
    ]
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">        
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;
