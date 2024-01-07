import "./TopBar.css";
import { Search, ShoppingCart } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useSelector } from "react-redux";
import CartMini from "../CartMini/CartMini";

const TopBar = () => {
    const { currentUser, logout } = useContext(AuthContext)
    const products = useSelector(state => state.cart.products)
    const [open, setOpen] = useState(false)    
    const [keywork, setKeywork] = useState("");
    const navigate = useNavigate();

    let menuRef = useRef()

    useEffect(() => {
        let handler = (e) => {            
            if (!menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, []);

const handleSearch = e => {
    if (keywork !== "") {        
        navigate(`/search?keywork=${keywork}`);
        window.location.reload();
    } else {
        alert("Vui lòng nhập từ khóa để tìm kiếm");
    }    
}

    return(
        <>
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <Link to="/">
                        <img src="/assets/logo4.PNG" alt="" className="logo" />
                    </Link>
                </div>
                <div className="topbarCenter">
                    <div className="searchbar">
                        <span className="btnsearch">
                            <Search className="searchIcon" onClick={handleSearch}/>                            
                        </span>
                        <input placeholder="Search for product" value={keywork} className="searchInput" onChange={e=>setKeywork(e.target.value)}/>
                    </div>
                </div>
                <div className="topbarRight">
                    <div className="topbarLink">
                        <span className="topbarHotLine">HotLine: 0984262528</span>
                        { currentUser ? (
                            <span className="topbarLink" onClick={logout}>Đăng xuất</span>
                        ) : (
                            <Link className="topbarLogin" to="/login">
                                <span >Đăng nhập/Đăng ký</span>
                            </Link>
                        )}
                    </div>
                    <div className="topbarIcons">
                        <div className="topbarIconItem" onClick={()=>setOpen(!open)}>
                            <ShoppingCart className="cartIcon" />
                            <span className="topbarIconBadge">{products.length}</span>
                        </div>
                    </div>
                    { currentUser
                        ? <>
                            <span className="topbarName">{currentUser?.username}</span>
                            {currentUser?.avatar !== null
                                ? <Link to="/profile"><img src={`uploads/${currentUser?.avatar}`} alt="" className="topbarImg" /></Link>
                                : <Link to="/profile"><img src="/assets/ava4.jpg" alt="" className="topbarImg" /></Link>
                            }
                        </>
                        : null
                    }
                </div>
            </div>
            <div className="cartminimodal" ref={menuRef}>
                {open && <CartMini/>}
            </div>        
        </>
    )
}

export default TopBar;