import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { ArrowUpward } from "@mui/icons-material";
import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Dashboard from "./components/admin/Interface/Dashboard";
import Menu from "./components/admin/Interface/Menu";
import Header from "./components/admin/Interface/Header";
import FooterAdmin from "./components/admin/Interface/FooterAdmin";
import Categories from "./components/admin/Categories/Categories";
import TypeCates from "./components/admin/Categories/TypeCates";
import AddProduct from "./components/admin/Products/AddProduct";
import EditProduct from "./components/admin/Products/EditProduct";
import Products from "./components/admin/Products/Products";
import Orders from "./components/admin/Orders/Orders";
import Users from "./components/admin/Users/Users";
import DetailProduct from "./views/DetailProduct/DetailProduct";
import Cart from "./views/ShoppingCart/Cart";
import CheckOuts from "./views/CheckOuts/CheckOuts";
import SearchPage from "./components/TopBar/SearchPage";
import FilterProduct from "./views/FilterProduct/FilterProduct";
import TradeMarks from "./components/admin/Products/TradeMarks";
import Transactions from "./components/admin/Transactions/Transactions";
import Profile from "./views/Profille/Profile";
import StatisticsByProduct from "./components/admin/warehouse/StatisticsByProduct";
import Staff from "./components/admin/Staff/Staff";
import AuthorityStaff from "./components/admin/Staff/AuthorityStaff";
import LoginAdmin from "./components/admin/Interface/LoginAdmin";
import CheckExpiry from "./components/admin/warehouse/CheckExpiry";
import PaymentVNPay from "./views/CheckOuts/PaymentVNPay";
import EnterEmail from "./views/ResetPassword/EnterEmail";
import ResetPassword from "./views/ResetPassword/ResetPassword";
import "./app.css";
import PrivateRoute from "./components/admin/Interface/PrivateRoute";
import VNPayReturn from "./views/CheckOuts/VNPayReturn";
import Coupons from "./components/admin/Users/Coupons";

const Layout = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <TopBar />
      <Outlet />
      <Footer />
    </>
  );
};

const AdminLayout = () => {
  return (
    <>
      <div>        
          <div id="wrapper">
              <Menu/>
              <div id="content-wrapper" className="d-flex flex-column">
                  <div id="content">
                      <Header/>
                      <Outlet/>
                  </div>
                  <FooterAdmin/>
              </div>
          </div>
          <a className="scroll-to-top rounded" href="#page-top">
              <i className="fas fa-angle-up" />
          </a>
      </div>
    </>
  )
}

const ProfileLayout = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <>      
      <Profile/>
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
        path: "/reset",
        element: <EnterEmail/>,
      },      
      {
        path: "/reset/resetpassword",
        element: <ResetPassword/>,
      },
      {
        path: "/detailproduct/:proName",
        element: <DetailProduct/>,
      },
      {
        path: "/shoppingcart",
        element: <Cart/>,
      },
      {
        path: "/search",
        element: <SearchPage />
      },
      {
        path: "/typecate",
        element: <FilterProduct />
      },
      {
        path: "/category",
        element: <FilterProduct />
      },
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout/>,
    children: [
      {
        path: "/admin",
        element:
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>,
      },
      {
        path: "/admin/Categories",
        element: <Categories/>
      },
      {
        path: "/admin/TypeCates",
        element: <TypeCates/>
      },
      {
        path: "/admin/addProduct",
        element: <AddProduct/>,
      },
      {
        path: "/admin/Products",
        element: <Products/>
      },
      {
        path: "/admin/TradeMarks",
        element: <TradeMarks/>
      },
      {
        path: "/admin/editProduct",
        element: <EditProduct/>
      },
      {
        path: "/admin/Users",
        element: <Users/>
      },
      {
        path: "/admin/Coupons",
        element: <Coupons/>
      },
      {
        path: "/admin/Staffs",
        element: <Staff/>
      },
      {
        path: "/admin/authorityStaff",
        element: <AuthorityStaff/>
      },
      {
        path: "/admin/Orders",
        element: <Orders/>
      },
      {
        path: "/admin/Transactions",
        element: <Transactions/>
      },      
      {
        path: "/admin/statisticsProduct",
        element: <StatisticsByProduct/>,
      },
      {
        path: "/admin/expiry",
        element: <CheckExpiry/>,
      },
    ]   
  },
  {
    path: "/profile",
    element: <ProfileLayout/>
  },
  {
    path: "/checkout",
    element: <CheckOuts/>
  },
  {
    path: "/createPaymentVnpay",
    element: <PaymentVNPay/>
  },
  {
    path: "/vnpayReturn",
    element: <VNPayReturn/>
  },
  {
    path: "/login-admin",
    element: <LoginAdmin/>,
  },
]);

const App = () => {
  const [showBtn, setShowBtn] = useState(false);
  // const [loading, setLoading] = useState(true);

  // setTimeout(() => {
  //   setLoading(false);
  // }, 1000);

const onScroll = () => {
  const scroll = document.documentElement.scrollTop;
  if (scroll > 700) {
    setShowBtn(true);
  }
}
const scrollToTop = () => {
    window.scrollTo({
        top: 0, 
        behavior: 'smooth',
    });
    setShowBtn(false);
}
    window.addEventListener('scroll', onScroll);

  return (
    // loading && 
    <div>
      <RouterProvider router={router}/>       
      <div className="scrollToTop" style={showBtn ? {display: "inline"} : {display: "none"}}>
        <ArrowUpward
          onClick={scrollToTop}
          className="iconScroll"
          style={showBtn ? {display: "inline"} : {display: "none"}}
        />
      </div>
    </div>
  );
}

export default App;
