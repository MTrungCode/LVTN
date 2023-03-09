import "./Sidebar.css"
import Banner from "../banner/Banner";

const Sidebar = () => {
    return (
        <div className="sidebar">            
            <div className="sidebarWrapper">
                <Banner />
            </div>
        </div>
    );
}

export default Sidebar;