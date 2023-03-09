import Sidebar from "../../components/sidebar/Sidebar";
import Leftbar from "../../components/leftbar/Leftbar";
import {
    FormatListBulleted, WorkspacePremium, NoCrash, Money
} from "@mui/icons-material"
import "./Home.css"

const Home = () => {
    return (
        <>
            <div className="topbarMenu">
                <div className="topbarMenuLeft">
                    <FormatListBulleted className="categoryIcon" />DANH MỤC SẢN PHẨM
                </div>
                <div className="topbarMenuRight">
                    <span className="topbarMenuRightItem"><WorkspacePremium className="topbarIcon"/>Đảm bảo chất lượng</span>
                    <span className="topbarMenuRightItem"><NoCrash className="topbarIcon"/>Miễn phí vận chuyển</span>
                    <span className="topbarMenuRightItem"><Money className="topbarIcon"/>Kiểm tra khi nhận hàng</span>
                </div>
            </div>
            <div className="homePage">
                <div className="homeContainer">
                    <Leftbar/>
                    <Sidebar/>
                </div>
                <div className="product_category">
                    <div className="categoryHot">
                        <div className="caption">DANH MỤC NỔI BẬT</div>
                        <hr className="captionHr"/>
                    </div>
                    <div className="homeProduct">
                        <div className="caption1">SẢN PHẨM NỔI BẬT</div>
                        <img src="assets/ava1.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava2.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava3.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava4.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava1.jpg" alt="" className="homeProductItem" />
                        <button className="buttonMore">Xem thêm</button>                     
                    </div>
                    <div className="productHigh">
                        <div className="caption1">SẢN PHẨM CAO CẤP</div>
                        <img src="assets/ava1.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava2.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava3.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava4.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava1.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava2.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava3.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava4.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava1.jpg" alt="" className="homeProductItem" />
                        <img src="assets/ava2.jpg" alt="" className="homeProductItem" />
                        <button className="buttonMore">Xem thêm</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;