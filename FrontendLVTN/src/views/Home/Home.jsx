import Sidebar from "../../components/Rightbar/Sidebar";
import Leftbar from "../../components/Leftbar/Leftbar";
import {
    FormatListBulleted, WorkspacePremium, NoCrash, Money, AddShoppingCart
} from "@mui/icons-material"
import "./Home.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../components/redux/cartReducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import dayjs from 'dayjs';
import moment from "moment";
import Rating from '@mui/material/Rating';

const Home = () => {
    const [products, setProduct] = useState([]);
    const [producthots, setProductHot] = useState([]);      
    const dispatch = useDispatch()   
    const cateName = 'Sản phẩm cao cấp';
    const [isShowHot, setIsShowHot] = useState(false);
    const [isShow, setIsShow] = useState(false);
    const [num, setNum] = useState(5);
    
const handleShowHot = e => {
    if (isShowHot === false) {
        setNum(producthots.length);
    } else {
        setNum(5);
    }
    setIsShowHot(!isShowHot);
}

const handleShow = e => {
    if (isShow === false) {
        setNum(products.length);
    } else {
        setNum(5);
    }
    setIsShow(!isShow);
}
     
    useEffect(() => {
        const fetchHotProduct = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products/hot");
                setProductHot(res.data)
              } catch (error) {
                console.log(error)
              }
        }
        fetchHotProduct();
        const fetchProduct = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/products/${cateName}`)            
            setProduct(res.data)
          } catch (error) {
            console.log(error)
          }
        };
        fetchProduct();
    }, []);

const expiryDate = (date_string) => {
    var expiration = moment(date_string).format("YYYY-MM-DD");
    var current_date = moment().format("YYYY-MM-DD");
    var times = moment(expiration).diff(current_date, 'days');
    return times;
}

const productPromotion = () => {
    let proPromotion = products;
    proPromotion = proPromotion.filter(
        item => expiryDate(item.pro_expiry) <= 30 && expiryDate(item.pro_expiry) > 0);
    return proPromotion;
}

const numberFormat = (value) =>
    new Intl.NumberFormat('en-VN').format(value);
    return (
        <>
            <div className="topbarMenu">
                <ToastContainer
                    position="top-right"
                    autoClose={100}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
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
                    {productPromotion().length !== 0 && <div className="productpromotion">
                        <div className="d-flex flex-row">
                            <div className="caption2 me-3">SẢN PHẨM KHUYỄN MÃI HẠN GIỜ</div>
                            <FlipClockCountdown
                                className='flip-clock'
                                to={(dayjs(new Date()).add(29, 'days')) + 24 * 3600 * 1000 + 5000}
                                labels={['Ngày', 'Giờ', 'Phút', 'Giây']}
                                labelStyle={{ fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', color: 'rgb(248, 115, 7)' }}
                                digitBlockStyle={{ width: 30, height: 40, fontSize: 20, fontWeight: 'bold' }}
                                dividerStyle={{ color: 'white', height: 1 }}
                                separatorStyle={{ color: 'rgb(248, 115, 7)', size: '6px' }}
                                duration={1}
                            />                            
                        </div>
                        <div className="productItem">
                            {productPromotion()
                            .slice(0, productPromotion().length)
                            .map((product) => {
                                return (
                                    <div className="homeProductItem1 shadow-sm" key={product.pro_id}>
                                        <Link to={`/detailProduct/${product.pro_name}`} state={product}>
                                            <img src={`uploads/${product.pro_image}`} className="imgProduct" alt="" />
                                        </Link>
                                        <div className="content">
                                            <span>
                                                <Link className="title" to={`/detailProduct/${product.pro_name}`} state={product}>
                                                    {product.pro_name}
                                                </Link>
                                            </span>
                                            <div className="d-flex justify-content-between">
                                                <p className="price">{numberFormat(product.pro_price)}<span className="unit">đ</span></p>                                            
                                                <span className="mt-2">
                                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                                </span>
                                            </div>
                                            <button className="addtocart" onClick={()=>{
                                                dispatch(addToCart({
                                                    id: product.pro_id,
                                                    name: product.pro_name,
                                                    price: product.pro_price,
                                                    img: product.pro_image,
                                                    quantity: 1,
                                                }));
                                                toast.success("Đã thêm sản phẩm vào giỏ hàng!", {
                                                    position: "top-right",
                                                    autoClose: 100,
                                                    hideProgressBar: true,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "colored",
                                                });
                                            }}><AddShoppingCart className="btnIcon"/> THÊM VÀO GIỎ</button>                                            
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}
                    <div className="homeProduct">
                        <div className="caption1">SẢN PHẨM NỔI BẬT</div>
                        <div className="productItem">
                            {producthots
                            .slice(0, num)
                            .map((product) => {
                                return (
                                    <div className="homeProductItem" key={product.pro_id}>
                                        <Link to={`/detailProduct/${product.pro_name}`} state={product}>
                                            <img src={`uploads/${product.pro_image}`} className="imgProduct" alt="" />
                                        </Link>
                                        <div className="content">
                                            <span>
                                                <Link className="title" to={`/detailProduct/${product.pro_name}`} state={product}>
                                                    {product.pro_name}
                                                </Link>
                                            </span>
                                            <div className="d-flex justify-content-between">
                                                <p className="price">{numberFormat(product.pro_price)}<span className="unit">đ</span></p>                                            
                                                <span className="mt-2">
                                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                                </span>
                                            </div>
                                            <button className="addtocart" onClick={()=>{
                                                dispatch(addToCart({
                                                    id: product.pro_id,
                                                    name: product.pro_name,
                                                    price: product.pro_price,
                                                    img: product.pro_image,
                                                    quantity: 1,
                                                }));
                                                toast.success("Đã thêm sản phẩm vào giỏ hàng!", {
                                                    position: "top-right",
                                                    autoClose: 100,
                                                    hideProgressBar: true,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "colored",
                                                });
                                            }}><AddShoppingCart className="btnIcon"/> THÊM VÀO GIỎ</button>                                            
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <button className="buttonMore" onClick={handleShowHot}>{ isShowHot ? "Thu gọn" : "Xem thêm"}</button>
                    </div>
                    <div className="productHigh">
                        <div className="caption1">SẢN PHẨM CAO CẤP</div>
                        <div className="productItem">
                            {products
                            .slice(0, num)
                            .map((product) => {
                                return (
                                    <div className="homeProductItem" key={product.pro_id}>
                                        <Link to={`/detailProduct/${product.pro_name}`} state={product}>
                                            <img src={`uploads/${product.pro_image}`} className="imgProduct" alt="" />
                                        </Link>
                                        <div className="content">
                                            <span>
                                                <Link className="title" to={`/detailProduct/${product.pro_name}`} state={product}>
                                                    {product.pro_name}
                                                </Link>
                                            </span>
                                            <div className="d-flex justify-content-between">
                                                <p className="price">{numberFormat(product.pro_price)}<span className="unit">đ</span></p>                                            
                                                <span className="mt-2">
                                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                                </span>
                                            </div>
                                            <button className="addtocart" onClick={()=>{
                                                dispatch(addToCart({
                                                    id: product.pro_id,
                                                    name: product.pro_name,
                                                    price: product.pro_price,
                                                    img: product.pro_image,
                                                    quantity: 1,
                                                }));
                                                toast.success("Đã thêm sản phẩm vào giỏ hàng!", {
                                                    position: "top-right",
                                                    autoClose: 100,
                                                    hideProgressBar: true,
                                                    closeOnClick: true,
                                                    pauseOnHover: true,
                                                    draggable: true,
                                                    progress: undefined,
                                                    theme: "colored",
                                                });
                                            }}><AddShoppingCart className="btnIcon"/> THÊM VÀO GIỎ</button>                                            
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <button className="buttonMore" onClick={handleShow}>{ isShow ? "Thu gọn" : "Xem thêm"}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;