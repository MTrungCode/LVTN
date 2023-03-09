import "./Leftbar.css"
import { ChevronRight } from "@mui/icons-material"

const Leftbar = () => {
    return (
        <div className="leftbar">
            <div className="leftbarWrapper">                
                <ul className="leftbarList">
                    <li className="leftbarListItem">
                        BÁNH KẸO CÁC LOẠI <ChevronRight className="leftbarIcon" />
                    </li>
                    <li className="leftbarListItem">
                        THỰC PHẨM CHỨC NĂNG <ChevronRight className="leftbarIcon" />
                    </li>
                    <li className="leftbarListItem">
                        RƯỢU BIA CÁC LOẠI <ChevronRight className="leftbarIcon" />
                    </li>
                    <li className="leftbarListItem">
                        HẢI SẢN CAO CẤP <ChevronRight className="leftbarIcon" />
                    </li>
                    <li className="leftbarListItem">
                        THỊT NHẬP KHẨU CHẤT LƯỢNG <ChevronRight className="leftbarIcon" />
                    </li>
                    <li className="leftbarListItem">
                        TRÁI CÂY TƯƠI SẠCH <ChevronRight className="leftbarIcon" />
                    </li>
                    <li className="leftbarListItem">
                        THỰC PHẨM CÁC LOẠI <ChevronRight className="leftbarIcon" />
                    </li>
                    <li className="leftbarListItem">
                        NƯỚC GIẢI KHÁT CÁC LOẠI <ChevronRight className="leftbarIcon" />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Leftbar;