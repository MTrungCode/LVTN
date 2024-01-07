import React, { useState, useEffect } from 'react';
import "./SearchPage.scss";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from "../../components/redux/cartReducer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddShoppingCart, Search } from '@mui/icons-material';
import axios from 'axios';
import { Rating } from '@mui/material';

const SearchPage = () => {
    const keywork = useLocation().search;
    const [searchKey, setSearchKey] = useState(keywork);
    const [searchResult, setSearchResult] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSearch = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${searchKey}`);
                setSearchResult(res.data);
            } catch (error) {
                console.log(error)
            }
        };
        fetchSearch();
    }, [searchKey]);

const numberFormat = (value) =>
    new Intl.NumberFormat('en-VN').format(value);

const handleSearch = e => {
        navigate(`/search?keywork=${searchKey}`);   
    }
    
    return (
        <div className="searchPage">
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
            <h1 className="titleSearch">Tìm kiếm</h1>
            <hr />
            {searchResult.length === 0
                ? <div className="contentSearch">
                    <span className='notification'>Không tìm thấy bất kỳ kết quả nào</span>
                    <div className="searchform">
                        <span className="searchbtn">
                            <Search className="searchIcon" onClick={handleSearch}/>                            
                        </span>
                        <input placeholder="Search for product" className="searchInput" onChange={e=>setSearchKey(e.target.value)}/>
                    </div>
                </div>
                : <div className="contentSearch">
                    <div className="productItem">
                        {searchResult.map((product) => {
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
                                            <span className="mt-3">
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
                </div>
            }
        </div>
    );
}

export default SearchPage;