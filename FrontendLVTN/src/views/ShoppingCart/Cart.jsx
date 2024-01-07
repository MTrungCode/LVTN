import React, { useContext } from 'react';
import "./Cart.scss";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Add, Remove, Delete, AccessTime } from "@mui/icons-material";
import { decrement, increment, removeItem } from '../../components/redux/cartReducer';
// import dayjs from 'dayjs';
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'bootstrap/dist/css/bootstrap.css';
// import moment from 'moment';
import { AuthContext } from '../../context/authContext';

const Cart = () => {
    const { currentUser } = useContext(AuthContext);
    const cart = useSelector(state => state.cart.products);    
    // const [selecttime, setSelecttime] = useState("");
    // const [timeship, setTimeShip] = useState();
    // const [dateship, setDateShip] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

const totalCost = () =>{
    let total = 0
    cart.forEach(item => total += item.quantity * item.price);
    return total;
}
const handleCheckout = () => {
    if (currentUser) {
        // if (selecttime) {

        //     if (selecttime === "0") {
        //         dispatch(addNote({
        //             note: 'Giao khi có hàng',
        //         }));
        //         navigate("/checkout");        
        //     } else if (selecttime === "1") {
        //         if (moment(dateship).isSameOrAfter(dayjs(new Date()).add(7, 'day').format('YYYY-MM-DD'))) {            
        //             dispatch(addNote({
        //                 note: 'Giao hàng vào ngày ' + dateship + '' + timeship,
        //             }));
        //             navigate("/checkout");            
        //         } else {
        //             alert('Thời gian phải sau tối thiểu là 7 ngày!');
        //         }
        //     }
        // } else {
        //     alert('Bạn chưa chọn thời gian giao hàng!');
        // }
        navigate("/checkout");
    } else {
        alert('Vui lòng đăng nhập để tiếp tục thanh toán!');
    }
}
    return (
        <div className='cartContainer'>
            <div className="navCart">
                <Link className='text-decoration-none' to="/"><span>Trang chủ</span></Link><span>/</span><span>Giỏ hàng ({cart.length ?? 0})</span>
            </div>
            <div className="cartWrapper">
                <div className="mainCart">
                    <h3>Giỏ hàng của bạn</h3>
                    <hr />
                    <div className="contentCart">
                        {cart.length === 0
                            ? <p>Giỏ hàng đang trống</p>
                            : <> 
                                {cart.map(product =>(
                                    <div className="productCartItem" key={product.id}>
                                        <img className='imgProduct' src={`../uploads/${product.img}`} alt="" />
                                        <span className='nameProduct'>{product.name}</span>
                                        <span className='priceProduct'>{Number((product.price * product.quantity).toFixed(2)).toLocaleString()}<span className='unit3'>đ</span></span>
                                        <div className="valuebtn">
                                            <button className='btnsubtract' onClick={()=>dispatch(decrement({...product, id:product.id}))}><Remove/></button>
                                            <span className='quantity'>{product.quantity}</span>
                                            <button className='btnadd' onClick={()=>dispatch(increment({...product, id:product.id}))}><Add/></button>                                    
                                        </div>
                                        <button className='btnDelete' onClick={()=>dispatch(removeItem(product.id))}><Delete/></button>
                                    </div>
                                ))}
                            </> 
                        }
                    </div>
                </div>
                <div className="extraCart">
                    <div className="paymentCart">
                        <h4>Thông tin đơn hàng</h4>
                        <div className="timeship">
                            <div className="timepicker"> 
                                <div className="row">
                                    <div className="timetitle col-lg-6 col-md-6 col-sm-12">
                                        <h6>THỜI GIAN GIAO HÀNG</h6>
                                        <span><AccessTime className="timeicon" /> Chọn thời gian</span>
                                    </div>
                                    <div className="timeselect col-lg-6 col-md-6 col-sm-12">
                                        <div className="notime">
                                            <input type="radio" name="SelectTimer" id="SelectTimer" value="0" />
                                            <label htmlFor="SelectTimer">Giao khi có hàng</label>
                                        </div>
                                        <div className="selecttime">
                                            <input type="radio" name="SelectTimer" id="SelectTimer" value="1"/>
                                            <label htmlFor="SelectTimer">Chọn thời gian</label>
                                        </div>
                                    </div>                          
                                </div>                             
                                {/* {selecttime === "1"
                                    ? <div className="timerPicker w-100 h-50 mt-2">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <MobileDatePicker className='me-2' defaultValue={dayjs(new Date())} onChange={(date) => setDateShip(dayjs(date).format('YYYY-MM-DD'))}/>
                                            <MobileTimePicker defaultValue={dayjs(new Date())} onChange={(time) => setTimeShip(dayjs(time).hour()+':'+dayjs(time).minute())}/>
                                        </LocalizationProvider>
                                    </div>                                        
                                    : null
                                }*/}
                            </div>
                            <div className="totalMoney">
                                <h6>Tổng tiền:</h6>
                                <span>{Number((totalCost()).toFixed(2)).toLocaleString()}<span className='unit1'>đ</span></span>
                            </div>
                            <hr />
                            <ul className='note'>
                                <li>Phí vận chuyển sẽ được tính ở trang Thanh toán.</li>
                                <li>Bạn cũng có thể nhập mã giảm giá ở trang Thanh toán.</li>
                            </ul>
                            {(totalCost() < 500000)
                                ? <p className='warning'>Giá trị đơn hàng của bạn hiện chưa đạt mức tối thiểu để thanh toán</p>
                                : null
                            }
                            <button className='checkout' style={totalCost() < 500000 ? {backgroundColor: "grey"} :  {backgroundColor: "red"}} disabled={totalCost() < 500000 ? true : false} onClick={handleCheckout}>THANH TOÁN</button>
                        </div>
                    </div>
                    <div className="policy">
                        <p className="captionCart">Chính sách mua hàng:</p>
                        <p>Hiện chúng tôi chỉ áp dụng thanh toán đơn hàng có giá trị tối thiểu <span>{Number((500000).toFixed(2)).toLocaleString()}</span><span className="unit2">đ</span> trở lên</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;