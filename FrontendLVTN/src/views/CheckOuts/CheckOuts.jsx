import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./CheckOuts.scss";
import axios from 'axios';
import { emptyCart } from '../../components/redux/cartReducer';
import { AuthContext } from '../../context/authContext';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import $ from 'jquery';
// import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

const CheckOuts = () => {
    // var provinces = document.getElementById("province")?.value;
    // var districts = document.getElementById("district")?.value;
    
    const { currentUser, updateUser } = useContext(AuthContext);
    
    const cart = useSelector(state => state.cart.products);    
    // const [province, setProvince] = useState([]);
    // const [district, setDistrict] = useState([]);
    // const [ward, setWard] = useState([]);
    const [method, setMethod] = useState("");
    const [pay, setPay] = useState();
    const [name, setName] = useState(currentUser?.username);
    const [email, setEmail] = useState(currentUser?.email);
    const [phone, setPhone] = useState(currentUser?.phone);
    // const [location, setLocation] = useState("");
    const [address, setAddress] = useState("");
    const [sale, setSale] = useState();    
    const [userSale, setUserSale] = useState([]);  
    // const [listaddr, setListAddr] = useState([]);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    useEffect(() => {
        // const fetchData = async () => {
        //   try {
        //     const res = await axios.get("http://localhost:3000/data/province_district_ward.json");
        //     setProvince(res.data)
        //   } catch (error) {
        //     console.log(error)
        //   }
        // };
        // fetchData();
        const fetchSale = async () => {
            try {
              const response = await axios.get(`http://localhost:5000/api/users/getsale/${currentUser?.user_id}`);              
              setUserSale(response.data);
            } catch (error) {
              console.log(error)
            }
          };
          fetchSale();
    }, [currentUser?.user_id, currentUser.listAddresses]);
    
// const handleProvince = e => {

//     if (e.target.value !== "") {
//         const result = province.filter(item => item.Id === e.target.value);        
//         setDistrict(result[0].Districts);
//     }
// }
// const handleDistrict = e => {
//     const dataProvince = province.filter(item => item.Id === provinces)
//     if (e.target.value !== "") {
//         const dataDistrict = dataProvince[0].Districts.filter(item => item.Id === e.target.value);
//         setWard(dataDistrict[0].Wards);
//     }
// }
// const handleAddress = e => {
//     const nameprovince = province.filter(item => item.Id === provinces);
//     const namedistrict = nameprovince[0].Districts.filter(item => item.Id === districts);
//     const nameward = namedistrict[0].Wards.filter(item => item.Id === e.target.value);    
//     setAddress(location + ", " + nameward[0].Name + ", " + namedistrict[0].Name + ", " + nameprovince[0].Name);    
// }

// const handleAdd = async () => {
//     try {
//         listaddr.push(address);        
//         // console.log("lít:", listaddr)
//         await axios.put('http://localhost:5000/api/auths', {
//             listAddress: listaddr, userid: currentUser?.user_id
//         });
        
//     } catch (error) {
//         console.log(error)
//     }
// }

const numberFormat = (value) =>
    new Intl.NumberFormat('en-VN').format(value);

const totalCost = () => {
    let total = 0
    cart.forEach(item => total += item.quantity * item.price);
    return total;
}

const calculatorPoint = () => {
    let point = 0;
    if (totalCost() < 2000000) {
        point += 200;
    } else if (totalCost() > 2000000 && totalCost() <= 5000000) {
        point += 500;
    } else if (totalCost() > 5000000 && totalCost() <= 10000000) {
        point += 1500;
    } else if (totalCost() > 10000000) {
        point += 2000;
    }    
    return point;
}

const handleSale = () => {
    if (userSale.length === 0) {
        var form = $("#coupon-form");    
        form.find("#notsale").text("Bạn chưa có phiếu giảm giá.");
    }
}

const handleUseSale = (e,id) => {
    e.preventDefault();
    const item = userSale.find((n) => n.coupon_id === id);
    setSale(item);
}

const handlePayment = async e => {
    e.preventDefault()
    try {
        if (method === "") { alert("Vui lòng chọn hình thức giao hàng"); }     
        if (pay){
            if(pay === "0") {
                const result = await axios.post("http://localhost:5000/api/orders", [
                    JSON.stringify(cart),
                    currentUser?.user_id,
                    name,
                    email,
                    phone,
                    address,
                    method,
                    sale ? sale.coupon_values : 0,                    
                ])
                if (sale) {
                    await axios.delete(`http://localhost:5000/api/users/getsale/${currentUser?.user_id}?data=${sale?.coupon_id}`, );
                } 
                await axios.post("http://localhost:5000/api/transactions", [
                    result.data[1],
                    name,
                    pay,
                    totalCost() - ((totalCost()*sale.coupon_values)/100),
                    0,
                ])
                await cart.forEach(item => axios.put("http://localhost:5000/api/products", [
                    item.quantity,
                    item.id,
                ]))
                await axios.put('http://localhost:5000/api/users', {
                    point: calculatorPoint(),
                    userid: currentUser?.user_id,
                    userpoint: calculatorPoint() + currentUser.pointsEG
                })
                dispatch(emptyCart());
                updateUser(currentUser.user_id);
                alert("Đặt hàng thành công! Đơn hàng của bạn đang được chờ duyệt");
                navigate("/");
                await axios.post('http://localhost:5000/api/users', {
                    point: currentUser.pointsEG,
                    emailUser: currentUser?.email,
                    pointadd: calculatorPoint(), 
                    total: totalCost()                   
                })
            }else {
                const result = await axios.post("http://localhost:5000/api/orders", [
                    JSON.stringify(cart),
                    currentUser?.user_id,
                    name,
                    email,
                    phone,
                    address,
                    method,
                    sale != null ? sale.coupon_values : 0,                  
                ])
                if (sale) {
                    await axios.delete(`http://localhost:5000/api/users/getsale/${currentUser?.user_id}?data=${sale?.coupon_id}`, );
                }                
                await axios.post("http://localhost:5000/api/transactions", [
                    result.data[1],
                    name,
                    pay,
                    sale != null ? totalCost() - ((totalCost()*sale.coupon_values)/100) : totalCost(),
                    1,
                ])
                await cart.forEach(item => axios.put("http://localhost:5000/api/products", [
                    item.quantity,
                    item.id,
                ]))
                await axios.put('http://localhost:5000/api/users', {
                    point: calculatorPoint() + 100,
                    userid: currentUser?.user_id,
                    userpoint: calculatorPoint() + currentUser.pointsEG
                })
                dispatch(emptyCart());
                updateUser(currentUser.user_id);
                navigate("/createPaymentVnpay", {state: totalCost()});
                await axios.post('http://localhost:5000/api/users', {
                    point: currentUser.pointsEG,
                    emailUser: currentUser?.email,
                    pointadd: calculatorPoint(), 
                    total: totalCost()                   
                })               
            }
        } else {
            alert("Vui lòng chọn phương thức thanh toán");
        }
    } catch (error) {
        console.log(error)
    }
}
    return (
        <div className='checkoutContainer'>           
            <div className="infoCheckout">
                <h1 className='titlename'>ExportGoods - Chợ hàng nhập khẩu chất lượng</h1>
                <div className="navbarcheck">
                    <span>
                        <Link to="/shoppingcart" className='linkcart'>Giỏ hàng</Link>
                    </span>
                    <span>/</span>
                    <span>Thông tin giao hàng</span>                    
                </div>
                <div className="infodelivery">
                    <h1 className="info">Thông tin giao hàng</h1>                    
                    <form>
                        <input type="text" className='username' name='username' value={currentUser ? currentUser?.username : ''} placeholder='Họ và tên' onChange={e=>setName(e.target.value)}/>
                        <div className="formtext">
                            <input type="email" className='email' value={currentUser ? currentUser?.email : ''} name='email' placeholder='Email' onChange={e=>setEmail(e.target.value)}/>
                            <input type="text" className='phone' value={currentUser ? currentUser?.phone : ''} name='phone' placeholder='Điện thoại' onChange={e=>setPhone(e.target.value)}/>
                        </div>
                        <div className="methodtransport">
                            <input type="radio" name='methodtran' id='methodtran' value="0" onChange={e=>setMethod(e.target.value)}/>
                            <label htmlFor="methodtran">Giao tận nơi</label>
                                {method === "0"
                                    ? <div className="addressdelivery">
                                        {/* <span><button type='button' className='border-0 bg-light p-2 mt-1 rounded-3' data-bs-toggle="modal" data-bs-target="#addressModal"><AddLocationAltIcon /> Thêm địa chỉ mới</button></span> */}
                                        <input type="text" className='form-control' placeholder='Nhập địa chỉ giao hàng của bạn' onChange={e=>setAddress(e.target.value)}/>
                                    </div>
                                    : <hr />
                                }
                            <input type="radio" name='methodtran' id='methodtran' value="1" onChange={e=>setMethod(e.target.value)}/>
                            <label htmlFor="methodtran" className='instore'>Nhận tại cửa hàng</label>
                            {method === "1"
                                ? <div className="infostore">
                                    <p className='store'>Hiện tại chưa có bất kỳ thông tin cửa hàng nào</p>
                                </div>
                                : null
                            }
                        </div>
                        <div className="methodpayment">
                            <div className="offline">
                                <input type="radio" name='payment' id='payment' value={0} onChange={e=>setPay(e.target.value)}/>
                                <label htmlFor="payment">Thanh toán khi nhận hàng</label>
                            </div>
                            <hr />
                            <div className="online">
                                <input type="radio" name='payment' id='payment' value={1} onChange={e=>setPay(e.target.value)}/>
                                <label htmlFor="payment">Thanh toán online</label>
                            </div>
                        </div>
                        <div className="btnAction">
                            <Link to="/shoppingcart"><button className='backcart'>Quay lại giỏ hàng</button></Link>
                            <button className='completeorder' onClick={handlePayment}>Xác nhận đơn hàng</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="infoCart">
                <div className="productcart">
                    {cart.map((item) => (
                        <div className="itemcart" key={item.id}>
                            <img className='imgitem' src={`uploads/${item.img}`} alt="" />                           
                            <span className="nameitem col-md-5">{item.name} </span>
                            <b className='quantityitem col-md-1'>(x{item.quantity})</b>
                            <span className="priceitem">{numberFormat(item.price * item.quantity)}<span className='vnd'>đ</span></span>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="codeSale">
                    <button className='use' data-bs-toggle="modal" data-bs-target="#couponModal" onClick={handleSale}>Dùng phiếu giảm giá</button>
                    {sale &&  <Card className='shadow p-1 bg-body rounded' sx={{ maxWidth: 190, maxHeight: 60 }}>
                            <CardContent>
                                <Typography className='row fs-6' gutterBottom variant="p" component="div">
                                    {sale.coupon_title}
                                </Typography>
                            </CardContent>
                        </Card>}
                </div>
                <hr />
                <div className="calculator">
                    <div className="temp">
                        <span>Tạm tính</span>
                        <span className='priceitem'>{numberFormat(totalCost())}<span className='vnd'>đ</span></span>
                    </div>
                    <div className='sales'>
                        <span>Giảm giá</span>
                        {sale
                            ? <span>{sale.coupon_values}%</span>
                            :<span>0%</span>}
                    </div>
                    <div className="costtran">
                        <span>Phí vận chuyển</span>
                        <span>Miễn phí</span>
                    </div>
                </div>
                <hr />
                <div className="totalCheckout">
                    <span>Tổng tiền</span>
                    <span className='totalpay'>
                        {sale   ? numberFormat(totalCost() - ((totalCost()*sale.coupon_values)/100))
                                : numberFormat(totalCost())
                        }
                    <span className='vnd'>đ</span></span>
                </div>
            </div>
            <div className="modal fade" id="couponModal" aria-labelledby="couponModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold" id="deleteModalLabel">Phiếu giảm giá</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id='coupon-form'>
                            <div className="modal-body">
                                <div className="d-flex flex-wrap">
                                    {userSale.length !== 0 &&
                                    userSale
                                    .map((cards) => (
                                        <Card className='mr-4 mb-2 shadow p-1 bg-body rounded' key={cards.coupon_id} sx={{ maxWidth: 250, maxHeight: 200 }}>
                                            <CardContent>
                                                <Typography className='row fw-bold fs-5' gutterBottom variant="h5" component="div">
                                                    {cards.coupon_title}
                                                </Typography>
                                                <Typography className='row' style={{ fontSize: '13px' }} variant="span" color="text.dark" component="div">
                                                    {cards.coupon_expiry !== null
                                                        ? "Hạn sử dụng: " + cards.coupon_expiry
                                                        : "Hạn sử dụng: Không có thời hạn"
                                                    }                                            
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button className='btn ms-2'
                                                    onClick={e=>handleUseSale(e,cards.coupon_id)}
                                                    style={{ color: 'white', backgroundColor: 'rgb(58, 58, 247)', marginTop: '-15px' }}
                                                    data-bs-dismiss="modal"
                                                >Dùng</Button>
                                            </CardActions>
                                        </Card>
                                    ))}
                                    <p id='notsale' className='fw-bold fst-italic mt-3 ms-5' style={{ fontSize: '19px' }}></p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>                                
                            </div>                        
                        </form>
                    </div>
                </div>
            </div>
            {/* <div className="modal fade" id="addressModal" aria-labelledby="addressModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addModalLabel">Thêm địa chỉ mới</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">                        
                                <div className="row">
                                    <div className="col-md-12 col-sm-12 mb-2">
                                        <input type="text" className='form-control' placeholder='Nhập địa chỉ giao hàng của bạn' onChange={e=>setAddress(e.target.value)}/>
                                    </div>                                    
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="button" className="btn btn-primary" onClick={handleAdd}>Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default CheckOuts;