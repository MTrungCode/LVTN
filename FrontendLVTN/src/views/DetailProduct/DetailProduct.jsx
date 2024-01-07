import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./DetailProduct.scss";
import { AddShoppingCart, VerifiedUserTwoTone, ThumbUpTwoTone, RestorePageTwoTone, WifiCalling3TwoTone, WysiwygTwoTone, Add, Remove } from "@mui/icons-material";
import axios from 'axios';
import { addToCart } from '../../components/redux/cartReducer';
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comments from '../../components/comment/Comments';
import { AuthContext } from "../../context/authContext";
import ReactParser from 'html-react-parser';
import { Rating } from '@mui/material';

const DetailProduct = () => {    
    const [quantity, setQuantity] = useState(1)
    const state = useLocation().state;
    const cateId = state.cate_id;
    const proId = state.pro_id;
    const tradeId = state.trademark_id;
    const dispatch = useDispatch();
    
    const [suggestProducts, setSuggestProduct] = useState([])
    const [cateName, setCateName] = useState([])
    const [trademarkName, setTrademarkName] = useState([]);
    const { currentUser } = useContext(AuthContext);    
    const [isShow, setIsShow] = useState(false);
    const [num, setNum] = useState(5);
    const [rating, setRating] = useState(0);
    const [rates, setRates] = useState([]);

    useEffect(() => {
        const getcateName = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/categories/catename/${cateId}`);                       
                setCateName(res.data)
            } catch (error) {
                console.log(error)
            }
        };
        getcateName();

        const getTrademarkName = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/trademarks/tradename/${tradeId}`)
                setTrademarkName(res.data);
            } catch (error) {
                console.log(error)
            }
        };
        getTrademarkName();
    }, [cateId, tradeId])

    useEffect(() => {
        const fetchSuggestProduct = async () => {
          try {
            const res = await axios.get(`http://localhost:5000/api/products/${cateId}/${proId}`);
            setSuggestProduct(res.data)
          } catch (error) {
            console.log(error)
          }
        };
        fetchSuggestProduct();

        const fetchRating = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/imports/rating');
                setRates(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchRating();
    }, [cateId, proId])

const numberFormat = (value) =>
    new Intl.NumberFormat('en-VN').format(value);

const handleIncr = e => {
    if (quantity >= state?.pro_quantity) setQuantity(state?.pro_quantity)
    else setQuantity(quantity + 1);
}
const handleDesc = e => {
    if (quantity === 1) setQuantity(quantity + 0);
    else setQuantity(quantity - 1);
}
const handleAddtoCart = () => {
    dispatch(addToCart({
        id: state?.pro_id,
        name: state?.pro_name,
        price: state?.pro_price,
        img: state?.pro_image,
        quantity,
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
}

const handleShow = e => {
    if (isShow === false) {
        setNum(suggestProducts.length);
    } else {
        setNum(5);
    }
    setIsShow(!isShow);
}

const handleRating = async e => {
    e.preventDefault();
    try {        
        await axios.post('http://localhost:5000/api/imports/rating',[
            currentUser?.user_id, state?.pro_id, rating
        ]);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
}

const showRating = () => {
    let rate = null;
    const item = rates.find(x => x.user_id === currentUser.user_id && x.pro_id === state?.pro_id)
    if (item) {
        rate = item.rating;
    }
    return rate;
}

// const ratingProduct = (proid) => {
//     let rating = 0;
//     const list = rates;
//     list = list.filter(x => x.pro_id === proid);   
// }

    return (
        <div className='detailContainer'>
            <ToastContainer
                position="top-right"
                autoClose={100}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="topbarDetail">
                <span><Link to="/" className='linkspan'>Trang chủ</Link></span><span>/</span>
                    <span>
                        <Link to="" className='linkspan'>
                            {cateName.map((cate) => {
                                return cate.cate_name
                            })}
                        </Link>
                    </span>
                    <span>/</span><span>{state?.pro_name}</span>
            </div>
            <div className="mainDetail">
                <div className="imagePro">
                    <img src={`../uploads/${state?.pro_image}`} alt="" />
                </div>
                <p className='line'></p>
                <div className="bodyDetail">
                    <div className='captionPro'>
                        <h2>{state?.pro_name}</h2>
                        <p className='statusPro'>Thương hiệu: <span>
                            {trademarkName.map((trade) => {
                                return trade.trademark_name
                            })}</span> | Tình trạng: <span>{state?.pro_quantity > 0 ? "còn hàng" : "hết hàng"}</span></p>
                    </div>
                    <div className="wrapBody">
                        <div className="content">
                            <p className='pricePro'>Giá: <span className='price'>{numberFormat(state?.pro_price)}<span className='unit'>đ</span></span></p>
                            <span className='quantity'>Còn lại: </span><span className='quantity'>{state?.pro_quantity} sản phẩm</span>
                            <div className='quantityPro'>
                                <span className='title'>Số lượng:</span>
                                <div className="valuebtn">
                                    <button className='btnsubtract' onClick={handleDesc}><Remove/></button>
                                    <span className='quantity'>{quantity}</span>
                                    <button className='btnadd' onClick={handleIncr}><Add/></button>                                    
                                </div>                        
                            </div>
                            <div className='buttonDetail'>
                                <button className='addcart' onClick={handleAddtoCart}>Thêm vào giỏ</button>
                                {/* <span className='buynow' >Mua ngay</span> */}
                            </div>
                        </div>
                        <div className="publish">
                            <h6>Chính sách bán hàng</h6>
                            <p><WysiwygTwoTone className='policyIcon'/> Cam kết 100% chính hãng</p>
                            <p><WifiCalling3TwoTone className='policyIcon'/> Hỗ trợ 24/7</p>
                            <h6>Thông tin thêm</h6>
                            <p><VerifiedUserTwoTone className='infoIcon'/> Hoàn tiền 120% nếu hàng giả</p>
                            <p><ThumbUpTwoTone className='infoIcon'/> Mở hộp kiểm tra khi nhận hàng</p>
                            <p><RestorePageTwoTone className='infoIcon'/>Đổi trả trong 7 ngày</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="endowDetail">
                <h5>Ưu đãi dành cho bạn</h5>                
            </div>
            <div className="contentDetail">
                <div className="description">
                    <h5>MÔ TẢ SẢN PHẨM</h5>
                    <hr />
                    {ReactParser(state?.pro_description)}
                </div>
                <div className="specification">
                    <h5>THÔNG TIN THÊM</h5>
                    <hr />
                    <span className='title'>Ngày sản xuất: {new Date(state?.pro_manufactureDate).toLocaleDateString()}</span>
                    <span className='title'>Hạn sử dụng: {new Date(state?.pro_expiry).toLocaleDateString()}</span>
                </div>
            </div>
            {currentUser && <div className="reviewDetail">
                <h5>Nhận xét và Đánh giá</h5>
                <hr />
                <div className='d-flex flex-row'>
                    <span className='me-3 mt-1'>Đánh giá của bạn về sản phẩm: </span>
                    <Rating
                        name="half-rating"
                        precision={0.5} 
                        value={showRating() ?? rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                          }}
                        style={{ marginTop: '-5px' }}
                        size="large"
                    />
                </div>
                <button className='btn btn-primary' onClick={handleRating}>Lưu đánh giá</button>
                <hr />
                <Comments currentUser={currentUser} productId={state?.pro_id} />
            </div>}
            <div className="suggestProduct">
                <h3>Sản phẩm liên quan</h3>
                <div className="productItem">
                    {suggestProducts
                    .slice(0, num)
                    .map((product) => {
                        return (
                            <div className="homeProductItem" key={product.pro_id}>
                                <Link to={`/detailProduct/${product.pro_name}`} state={product}>
                                    <img src={`../uploads/${product.pro_image}`} className="imgProduct" alt="" />
                                </Link>
                                <div className="content">
                                    <Link className="title" to={`/detailProduct/${product.pro_name}`} state={product}>
                                        {product.pro_name}
                                    </Link>
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
    );
}

export default DetailProduct;