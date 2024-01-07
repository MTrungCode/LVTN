import "./Footer.css"
import { LocationOn, LocalPhone, Email, MailOutline} from "@mui/icons-material"

const Footer = () => {
    return (        
        <div className="footerContainer">
            <div className="footerTop">                
                <div className="footerWrapper">
                    <div className="footerWrapperItem">
                        <div className="endowtitle">
                            <span className="endowcap">Ưu Đãi Khủng</span>
                            <p>Quý Khách Hàng nhập email vào ô bên cạnh và nhấn ĐĂNG KÝ để nhận các thông tin về ưu  đãi khuyến mãi mới nhất!</p>
                        </div>                 
                        <div className="endowform">
                            <MailOutline className="Iconsearch" />
                            <input placeholder="Vui lòng nhập email của bạn ..." className="searchInput" />
                            <span className="searchbtn">
                                ĐĂNG KÝ                      
                            </span>
                        </div>
                    </div>                 
                </div>
            </div>
            <div className="footerCenter">                            
                <div className="footerItem1">
                    <h4 className="footerTitle">ExportGoods - Chợ hàng nhập khẩu</h4>                    
                    <p className="footerContent">Chuyên cung cấp các loại mặt hàng Rượu Bia, Bánh Kẹo, Thực Phẩm Chức Năng cao cấp ngoại nhập</p>
                </div>
                <div className="footerItem2">
                    <h4 className="footerTitle">Thông tin liên hệ</h4>
                    <ul className="footerContactList">
                        <li className="footerContact">
                            <LocationOn className="footerIcon"/> 38/45C, Mậu Thân, P.An Hòa, Q.Ninh Kiều, Cần Thơ
                        </li>
                        <li className="footerContact">
                            <LocationOn className="footerIcon"/> 95/27, hẻm 95, Mậu Thân, An Phú, Ninh Kiều, Cần Thơ
                        </li>
                        <li className="footerContact">
                            <LocalPhone className="footerIcon"/> 0834 6941 45
                        </li>
                        <li className="footerContact">
                            <Email className="footerIcon"/> trungb1910474@student.ctu.edu.vn
                        </li>
                    </ul>               
                </div>
                <div className="footerItem3">
                    <h4 className="footerTitle">Hỗ trợ khách hàng</h4>
                    <ul className="footerList">
                        <li className="footerListItem">
                            Chính sách đổi trả
                        </li>
                        <li className="footerListItem">
                            Chính sách bảo mật
                        </li>
                        <li className="footerListItem">
                            Điều khoản dịch vụ
                        </li>
                        <li className="footerListItem">
                            Liên hệ
                        </li>
                        <li className="footerListItem">
                            Đăng ký đối tác
                        </li>
                        <li className="footerListItem">
                            Đăng nhập đối tác
                        </li>
                    </ul>                    
                </div>
                <div className="footerItem4">
                    <h4 className="footerTitle">Liên kết</h4>
                    <ul className="footerList">
                        <li className="footerListItem">
                            Sản phẩm cao cấp
                        </li>
                        <li className="footerListItem">
                            Sản phẩm khuyến mãi
                        </li>
                        <li className="footerListItem">
                            Tất cả sản phẩm
                        </li>
                    </ul>
                </div>         
            </div>
            <hr className="footerHr"/>
            <div className="footerCopyright">
                <p className="copyrightContent">Copyright © 2023 
                    <a className="footerLink" href="/"> ExportGoods - Chợ hàng nhập khẩu chất lượng</a>. 
                    <a className="footerLink" href="/" rel="noreferrer"> Powered by ExportGoods - Chợ hàng nhập khẩu chất lượng</a>
                </p>
            </div>
        </div>
    );
}

export default Footer;