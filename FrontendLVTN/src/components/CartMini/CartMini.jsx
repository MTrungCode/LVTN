import { Add, Remove, Clear } from '@mui/icons-material';
import React from 'react';
import "./CartMini.scss"
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { decrement, emptyCart, increment, removeItem } from '../redux/cartReducer';
import { Link } from 'react-router-dom';

const CartMini = () => {
    const products = useSelector(state => state.cart.products)
    const dispatch = useDispatch()

    const totalCost = () =>{
        let total = 0
        products.forEach(item => total += item.quantity * item.price);
        return total;
    }
const numberFormat = (value) =>
    new Intl.NumberFormat('en-VN').format(value);

    return (
        <div className='cartMini'>
            <h1>GIỎ HÀNG</h1>
            <hr />
            {products?.map((product)=> (
                <div className="item" key={product.id}>
                    <img src={`../uploads/${product.img}`} alt="" />
                    <div className="details">
                        <div className="titles">
                            <h1>{product.name}</h1>
                            <Clear className='delete' onClick={()=>dispatch(removeItem(product.id))}/>
                        </div>
                        <div className="prices">
                            <div className="quantity">
                                <button onClick={()=>dispatch(decrement({...product, id:product.id}))}><Remove/></button>
                                <span>{product.quantity}</span>
                                <button onClick={()=>dispatch(increment({...product, id:product.id}))}><Add/></button>
                            </div>
                            <div className="cost">
                                {numberFormat(product.price*product.quantity)}<span className='dong'>đ</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <hr />
            <div className="total">
                <p className='captionTotal'>TỔNG TIỀN:</p>
                <span>{numberFormat(totalCost())}<span className='dong'>đ</span></span>
            </div>
            <div className="gotoCart">
                <button><Link to="/shoppingcart" className='gocart'>XEM GIỎ HÀNG</Link></button>
                <span className="empty" onClick={()=>dispatch(emptyCart())}>Xóa Hết</span>
            </div>
        </div>
    );
}

export default CartMini;