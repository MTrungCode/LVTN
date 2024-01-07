import React, { useEffect, useState } from 'react';
import "./FilterProduct.scss";
import { Link, useLocation } from 'react-router-dom';
import axios from "axios";
import { AddShoppingCart, ArrowDropDown, Close, SortByAlpha } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart } from '../../components/redux/cartReducer';
import { useDispatch } from 'react-redux';
import Slider from '@mui/material/Slider';
import { Rating } from '@mui/material';

const FilterProduct = () => {
    const path = useLocation().pathname;
    const filter = useLocation().state;  
    const [namefilter, setNameFilter] = useState();     
    const [trademarks, setTrademark] = useState([]);
    const [resultFilters, setResultFilter]= useState([]);
    const [listFilters, setListFilter] = useState([]);  
    const [active, setActive] = useState();
    const [filterCheckBox, setFilterCheckBox] = useState([]);
    const [filtername, setFiltername] = useState([]);
    const [checked, setChecked] = useState([]);
    const [checklist, setCheckList] = useState([]);  
    const [cates, setCate] = useState([]);
    const [value, setValue] = useState([100000, 3000000]);
    const [searchkey, setSearchKey] = useState('');
    const [sort, setSort] = useState();
    const [seemore, SetSeeMore] = useState(false);
    const [num, setNum] = useState(10);
    const dispatch = useDispatch();

    const listSort = [
        {id: 1, label: "Giá: Tăng dần", value: "ascending" },
        {id: 2, label: "Giá: Giảm dần", value: "descending" },               
    ];   
    
    const resultSort = () => {
        let filterProduct;
        if (listFilters.length === 0) {
            filterProduct = resultFilters;
            if (sort) {
                filterProduct = filterProduct.sort((a, b) => {
                    return sort === 'ascending' ? a.pro_price - b.pro_price : b.pro_price - a.pro_price;
                })
            }
        } else {
            filterProduct = listFilters;
            if (sort) {
                filterProduct = filterProduct.sort((a, b) => {
                    return sort === 'ascending' ? a.pro_price - b.pro_price : b.pro_price - a.pro_price;
                })
            }
        }
        return filterProduct;
    }
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleSeeMore = e => {
        if (seemore === false) {
            setNum(resultSort().length);
        } else {
            setNum(10);
        }
        SetSeeMore(!seemore);
    }

    useEffect(() => {
        const fetchDataFilter = async () => {
            try {
                if (path === '/category') {
                    setNameFilter(filter.cate_name);
                    const res = await axios.get(`http://localhost:5000/api/categories/${filter.typecate_id}${filter.cate_id}`);
                    setCate(res.data);
                    const result = await axios.get(`http://localhost:5000/api/products/filterCate/${filter.cate_id}`);                    
                    setResultFilter(result.data);
                    const response = await axios.get(`http://localhost:5000/api/trademarks/cate/${filter.cate_id}`);            
                    setTrademark(response.data);
                } else if (path === '/typecate') {
                    const nameTcate = await axios.get(`http://localhost:5000/api/typecates/getname/${filter.typecate_id}`);
                    setNameFilter(nameTcate.data[0].typecate_name);                    
                    const res = await axios.get(`http://localhost:5000/api/categories/typecate/${filter.typecate_id}`);
                    setCate(res.data);
                    const result = await axios.get(`http://localhost:5000/api/products/filterTcate/${filter.typecate_id}`);
                    setResultFilter(result.data);
                    const response = await axios.get(`http://localhost:5000/api/trademarks/typecate/${filter.typecate_id}`);            
                    setTrademark(response.data);
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchDataFilter();
    }, [filter, path, resultFilters]);

const numberFormat = (value) =>
    new Intl.NumberFormat('en-VN').format(value);

const handleFilterTagname = e => {
    const value = e.target.value;
    const name = e.target.name;    
    if (filterCheckBox.length === 0){
        setFilterCheckBox([...filterCheckBox, value]);
        setChecked([...checked, value]);
    } else {
        const itemCheckbox = filterCheckBox.find((item) => item === value);
        if (!itemCheckbox){
            setFilterCheckBox([...filterCheckBox, value]);
            setChecked([...checked, value]);
        }
    }
    if (filtername.length === 0) {
        setFiltername([...filtername, name]);
    } else {
        const itemName = filtername.find((item) => item === name);        
        if (!itemName) {
            setFiltername([...filtername, name]);            
        }
    }    
    const itemChecked = checked.find((item) => item === e.target.value);
    if (itemChecked){
        const updateFilter = filterCheckBox.filter((item) => item !== itemChecked);
        setFilterCheckBox(updateFilter);
        const updateNamefilter = filtername.filter((item) => item !== e.target.name);
        setFiltername(updateNamefilter);
        const updateChecked = checked.filter((item) => item !== itemChecked);
        setChecked(updateChecked);
    }
}

const handleFilter = e => {
    e.preventDefault();    
    filterCheckBox.forEach((trademark) => {             
        resultFilters.forEach((item) => {            
            if (item.trademark_id === Number(trademark)) {
                if (!checklist.includes(item.pro_id)) {
                    listFilters.push(item);            
                    checklist.push(item.pro_id);                    
                }
            }            
        })
    })    
}

const handleClear = () => {
    setChecked([]);
    setFilterCheckBox([]);
    setFiltername([]);
    setListFilter([]);
    setCheckList([]);
    window.location.reload();    
}

    return (
        <div className='filterproduct'>
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
            <div className="navbartop">
                <span><Link to="/" className='linkspan'>Trang chủ</Link></span><span>/</span><span className='text-uppercase'>{namefilter}</span>             
            </div>
            <div className="mainfilterproduct">
                <div className="leftmenufilter">
                    <div className="categoryfilter">
                        <h2 className='titlecate'>Danh mục sản phẩm</h2>
                        <hr />
                        {cates.map((cate) => (
                            <Link
                                className='categoryItem'
                                to={`/category?cate=${cate.cate_name}`}
                                state={cate}
                                key={cate.cate_id}
                            >
                                {cate.cate_name}
                            </Link>
                        ))}
                    </div>
                    <div className="trademarkfilter">
                        <h2 className='titlecate'>Thương hiệu</h2>
                        <hr />
                        <div className="contentTrademark">
                            {trademarks.length !== 0
                                ? trademarks.map((trademark) => (
                                    <div className="contentTrademarkItem" key={trademark.trademark_id}>
                                        <input
                                            type="checkbox"                                                                                
                                            value={trademark.trademark_id}
                                            name={trademark.trademark_name}
                                            onChange={handleFilterTagname}
                                        />
                                        <label htmlFor={trademark.trademark_id}>{trademark.trademark_name}</label>
                                    </div>
                                ))
                                : <div>Không có thương hiệu</div>
                            }                            
                        </div>
                    </div>
                    <div className="costfilter">
                        <h2 className='titlecate'>Lọc giá</h2>
                        <hr />
                        <div className="contentcost">    
                            <Slider
                                getAriaLabel={() => 'Filter price range'}
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                min={100000}
                                max={3000000}
                                step={50000}                       
                            />
                            <button className='btnFilterPrice' onClick={()=>setValue([100000, 3000000])}>Bỏ lọc giá</button>
                        </div>
                    </div>
                </div>
                <div className="rightfilter">
                    <div className="toprightfilter container">
                        <div className="sortTitle col-lg-6">
                            <h2 className='titlecateright'>
                                {namefilter}
                            </h2>
                            {filtername.length !== 0
                                ? <div className="filterwrapper">
                                        <div className="tagfilter">
                                            <div className="trademarktagname">
                                                <span className='tagnametitle'>Thương hiệu:</span>
                                                {filtername.map((item) => (
                                                    <span className='tagnameitem' key={item}>
                                                        {item}
                                                        {(filtername.length >= 2 && item !== filtername[filtername.length-1])
                                                            ? ","
                                                            : " "
                                                        }
                                                    </span>
                                                ))}
                                                <Close className='closeIcon' onClick={handleClear} />
                                            </div>
                                        </div>
                                        <button className='btnFilter' onClick={handleFilter}>Lọc</button>
                                    </div>
                                : null
                            }
                        </div>
                        <div className="searchProductFilter col-lg-3">                            
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Tìm kiếm" aria-label="Search" onChange={e=>setSearchKey(e.target.value)}/>                                
                            </form>
                        </div>                       
                        <div className="sortbutton col-lg-5">
                            <div className="sortProduct">
                                <div className="startsort">
                                    <SortByAlpha className='sortIcon' />
                                    <span className='sorttitle'>Sắp xếp</span>
                                </div>
                                <ArrowDropDown className='sortIconClose' />
                                <div className="sortdropdownmenu">
                                    {listSort.map((item) => (
                                        <li 
                                            key={item.id}
                                            className={
                                                active === item.id ? 'active' : ''
                                            }
                                            onClick={()=>{
                                                setActive(item.id);
                                                setSort(item.value);
                                            }}
                                        >
                                            {item.label}
                                        </li>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="resultfilter container">                        
                        {resultSort()
                            .slice(0, num)
                            .filter((item) =>                           
                                item.pro_name.toLowerCase().includes(searchkey) &&
                                item.pro_price >= value[0] && item.pro_price <= value[1]
                            )
                            .map((product) => {
                                return (
                                    <div className="resultfilterItem" key={product.pro_id}>
                                        <Link to={`/detailProduct/${product.pro_name}`} state={product}>
                                            <img src={`uploads/${product.pro_image}`} className="resultfilterImg" alt="" />
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
                                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} size='small' readOnly />
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
                            })
                        }
                    </div>
                    {resultSort().length !== 0
                        ? <button className="buttonMore" onClick={handleSeeMore}>{ seemore ? "Thu gọn" : "Xem thêm"}</button>
                        : null
                    }
                </div>
            </div>
        </div>
    );
}

export default FilterProduct;