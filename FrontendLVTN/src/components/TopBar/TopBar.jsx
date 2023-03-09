import "./TopBar.css"
import { Search, ShoppingCart, Notifications } from "@mui/icons-material"
import { Link } from "react-router-dom"

const TopBar = () => {
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
                        <Search className="searchIcon" />
                        <input placeholder="Search for product" className="searchInput" />
                    </div>
                </div>
                <div className="topbarRight">
                    <div className="topbarLink">
                        <span className="topbarLink">SignUp/LogIn</span>
                        <span className="topbarLink">HotLine:0984262528</span>
                    </div>
                    <div className="topbarIcons">
                        <div className="topbarIconItem">
                            <ShoppingCart />
                            <span className="topbarIconBadge">0</span>
                        </div>
                        <div className="topbarIconItem">
                            <Notifications />
                            <span className="topbarIconBadge">2</span>
                        </div>
                    </div>
                    <img src="/assets/ava1.jpg" alt="" className="topbarImg" />
                </div>
            </div>
        </>
    )
}

export default TopBar;