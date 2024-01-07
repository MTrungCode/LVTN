import React, { useContext, useEffect, useState } from 'react';
import "./Profile.scss";
import { AuthContext } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBackIos, Delete, SwitchAccount, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircleAccount from './CircleAccount';
import axios from 'axios';
import moment from "moment";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ReactParser from 'html-react-parser';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'div'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Detail = (props) => {
    const { detail } = props;
    const [open, setOpen] = useState(false);
    const [stateOrder, setStateOrder] = useState();
    const timePassed = new Date() - new Date(detail.created_at) < 54000;
    const handleCancel = async e => {
        try {
            if (timePassed) {
                if (window.confirm("Bạn có muốn hủy đơn hàng này không?")) {
                    await axios.put(`http://localhost:5000/api/orders/${detail.order_id}`,-1);
                    setStateOrder(e.target.value)
                }
            } else {
                alert("Đơn hàng này đã quá thời gian hủy!");
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
            <TableCell>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
            </TableCell>
            <TableCell align='center'>{detail.order_id}</TableCell>
            <TableCell align="center">{detail.order_method === 1 ? "Giao tận nơi" : "Nhận tại cửa hàng"}</TableCell>
            <TableCell align="center">{new Date(detail.created_at).toLocaleDateString()}</TableCell>
            <TableCell align="center">{new Date(detail.updated_at).toLocaleDateString()}</TableCell>
            <TableCell align="center">
                <select
                    className='selectState'
                    defaultValue={detail.order_state}
                    name="order_state"
                    disabled     
                >
                    <option value="0">Chưa duyệt</option>
                    <option value="1">Đã duyệt</option>
                    <option value="2">Đã giao</option>
                    <option value="-1">Hủy</option>
                </select>
            </TableCell>
            <TableCell align='center'>
                {stateOrder !== -1 ? <button type='button' className='cancelbtn'onClick={handleCancel}><Delete/></button> : "Đã hủy"}
            </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                        Chi tiết đơn hàng
                    </Typography>
                    <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow>
                        <TableCell align='center'>ID</TableCell>
                        <TableCell align='center' width='100px'>Hình Ảnh</TableCell>
                        <TableCell align="left" width='280px'>Tên Sản Phẩm</TableCell>
                        <TableCell align="right" width='150px'>Số Lượng</TableCell>
                        <TableCell align="right">Đơn Giá</TableCell>
                        <TableCell align="right" width='200px'>Tổng Giá Trị (đồng)</TableCell>                    
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {JSON.parse(detail.order_items).map((historyRow) => (
                        <TableRow key={historyRow.id}>
                            <TableCell align='center'>{historyRow.id}</TableCell>
                            <TableCell align='center'>
                            <img src={`../../uploads/${historyRow.img}`} className='imgOrder' alt="" />
                            </TableCell>
                            <TableCell align='left'>{historyRow.name}</TableCell>
                            <TableCell align="right">{historyRow.quantity}</TableCell>
                            <TableCell align="right">{historyRow.price}</TableCell>
                            <TableCell align="right">
                            {Number((historyRow.quantity * historyRow.price).toFixed(2)).toLocaleString()}
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}

const createAwardRank = (rank, award) => {
    return { rank, award };
}

const awardRank = [
    createAwardRank(1, "Phiếu giảm giá 50% + Phiếu quà tặng 2 triệu"),
    createAwardRank(2, "Phiếu giảm giá 50% + Phiếu quà tặng 1 triệu"),
    createAwardRank(3, "Phiếu giảm giá 20% x 4 + Phiếu giảm giá 10% x 2"),
    createAwardRank(4, "Phiếu giảm giá 10% x 5"),
    createAwardRank(5, "Phiếu giảm giá 10% x 2"),
    createAwardRank("6 - 10", "Phiếu giảm giá 200K"),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontWeight: 700,              
    },
}));

const Profile = () => {
    const { currentUser, logout, updateUser } = useContext(AuthContext);
    const [value, setValue] = useState(0);
    const [username, setUsername] = useState(currentUser?.username);
    const [email, setEmail] = useState(currentUser?.email);
    const [gender, setGender] = useState(currentUser?.gender ?? "");
    const [birthday, setBirthday] = useState(moment(currentUser?.birthday).format('YYYY-MM-DD'));
    const [phone, setPhone] = useState(currentUser?.phone);
    const [avatar, setAvatar] = useState(null);

    const navigate = useNavigate();

    const [rows, setRows] = useState([]);
    const [coupons, setCoupons] = useState([]);    
    
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [ranks, setRank] = useState([]);      

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/orders/historyorder/${currentUser?.user_id}`);
                setRows(res.data);
            } catch (error) {
                console.log(error)
            }
        };
        fetchOrder();
        const fetchCoupon = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/coupons');
                setCoupons(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchCoupon();
        const fetchRanking = async () => {
            try {
                const result = await axios.get('http://localhost:5000/api/users');                                    
                setRank(result.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchRanking();
    }, [currentUser?.user_id]);

const handleChange = (event, newValue) => {
    setValue(newValue);
};

const upload = async () => {
    try {
        const formData = new FormData();
        formData.append("file", avatar)   
        const res = await axios.post("http://localhost:5000/api/upload", formData)
        return(res.data);      
    } catch (error) {
        console.log(error)
    }
}

const handleUpdateInfo = async e => {
    e.preventDefault()   
    const img = await upload();
    try {
        await axios.put(`http://localhost:5000/api/auths/${currentUser.user_id}`, {
            username: username,
            email: email,
            gender: gender,
            birthday: birthday,
            phone: phone,
            avatar: avatar ? img : null
        })        
        logout();
        navigate("/login");
        window.location.reload();    
    } catch (error) {
        console.log(error)
    }
}

const handleExchange = async (e, point, coupon_id) => {
    e.preventDefault();
    const missingPoint = currentUser.pointsEG >= point;    
    try {
        if (missingPoint) {
            const remainpoint = currentUser.pointsEG - point;
            await axios.put(`http://localhost:5000/api/users/exchange/${currentUser?.user_id}`,
                { point: point, couponId: coupon_id, remain: remainpoint }
            );
            updateUser(currentUser.user_id);
            window.location.reload();            
        } else {
            alert("Bạn không có đủ điểm!");
        }
    } catch (error) {
        console.log(error)
    }
}

const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};

const myRank = () => {
    let myrank = { rank: 0, point: 0 };
    if (ranks.length !== 0) {
        ranks.map((n, index) => 
                (n.user_id === currentUser.user_id 
                    ? myrank = { rank: index + 1, point: n.current_point }
                    : null             
        ));
    }
    return myrank;
}
    return (
        <div className='profile'>
            <div className="row navbar">
                <div className="navigatebar">
                    <Link className='backtohome' to='/'>
                        <span><ArrowBackIos className='iconback' />Quay lại trang chủ</span>
                    </Link>
                </div>
                <div className='navigatebar'>
                    <Link className='switchaccount' to='/login' onClick={logout}>
                        <span><SwitchAccount className='iconswitch' />Đổi tài khoản</span>
                    </Link>
                </div>
            </div>
            <div className="maincontainer">
                <CircleAccount user={currentUser} />
                <Box
                    sx={{ flexGrow: 1, display: 'flex', height: 680 }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab className="tablabel" label="Thông tin cá nhân" {...a11yProps(0)} />
                        <Tab className="tablabel" label="Lịch sử đặt hàng" {...a11yProps(1)} />
                        <Tab className="tablabel" label="Bảng xếp hạng" {...a11yProps(2)} />                        
                        <Tab className="tablabel" label="Đổi điểm" {...a11yProps(3)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>                 
                        <div className="container">
                            <h1>CẬP NHẬT THÔNG TIN KHÁCH HÀNG</h1>
                            <form action=''>                            
                                <div className="row">
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Tên khách hàng</label>
                                            <input required type="text" className="form-control" placeholder='Tên khách hàng' value={username} id='username' onChange={e=>setUsername(e.target.value)}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="values" className="form-label">Địa chỉ email</label>
                                            <input required type="email" className="form-control" placeholder='Địa chỉ email' id='email' value={email} onChange={e=>setEmail(e.target.value)}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="birthday" className="form-label">Ngày sinh</label>
                                            <input required type="date" className="form-control" id='birthday' value={birthday} onChange={e=>setBirthday(e.target.value)}/>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exchange" className="form-label">Số điện thoại</label>
                                            <input required type="number" className="form-control" placeholder='Số điện thoại' id='phone' value={phone} onChange={e=>setPhone(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="avatar" className="form-label">Mô tả</label>
                                            <input type="file" className="form-control" id="avatar"
                                                onChange={e=>setAvatar(e.target.files[0])}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <img className='previewImg img-thumbnail' src={avatar ? URL.createObjectURL(avatar) : "/assets/no-image.jpg"} alt="" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="gender" className="form-label">Giới tính</label>
                                        <div className='mb-1'>
                                            <div className="form-check form-check-inline">
                                                <input type="radio" className="form-check-input" value="0" id='gender' checked={gender === 0} onChange={e=>setGender(e.target.value)} />
                                                <label htmlFor="gender" className="form-check-label">Nam</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input type="radio" className="form-check-input" value="1" id='gender' checked={gender === 1} onChange={e=>setGender(e.target.value)} />
                                                <label htmlFor="gender" className="form-check-label">Nữ</label>
                                            </div>
                                        </div>                                           
                                    </div>
                                </div>                                
                                <button type="button" className="btn btn-primary" onClick={handleUpdateInfo}>Cập nhật</button>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className="container">
                            <h1>LỊCH SỬ ĐƠN ĐẶT HÀNG</h1>
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell />
                                            <StyledTableCell className="headerCap" align='center' width='80px'>ID</StyledTableCell>                                    
                                            <StyledTableCell className="headerCap" align="center" width='200px'>Hình Thức Giao Hàng</StyledTableCell>
                                            <StyledTableCell className="headerCap" align="center" width='180px'>Thời Gian Tạo</StyledTableCell>
                                            <StyledTableCell className="headerCap" align="center" width='180px'>Thời Gian Cập Nhật</StyledTableCell>
                                            <StyledTableCell className="headerCap" align="center" width='180px'>Trạng thái đơn hàng</StyledTableCell>
                                            <StyledTableCell className="headerCap" align="center" width='150px'>Action</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row) => (
                                            <Detail key={row.order_id} detail={row} />
                                        ))}
                                        
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className="container">
                            <h1>BẢNG XẾP HẠNG</h1>
                            <div className="d-flex">
                                <div className="row mr-4 ms-1">
                                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                        <TableContainer sx={{ minWidth: 400, maxHeight: 340, minHeight: 250 }}>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell className="headerCap" align="center">Hạng</StyledTableCell>                                                        
                                                        <StyledTableCell className="headerCap" align="center">Tên khách hàng</StyledTableCell>
                                                        <StyledTableCell className="headerCap" align="center">Điểm</StyledTableCell>                                                        
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {ranks.length !== 0
                                                    ? ranks
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((item, index) => (
                                                        <TableRow
                                                        key={item.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}                                                    
                                                        >
                                                            <TableCell sx={{ mx: 10 }} align="center"><span className='Number'>No. </span><span className='rank'>{index + 1}</span></TableCell>
                                                            <TableCell component="th" scope="item" align='center'>
                                                                {item.user_name}
                                                            </TableCell>                                                        
                                                            <TableCell align="center">{item.current_point}</TableCell>                                                  
                                                        </TableRow>
                                                    ))
                                                    : <TableRow height='210'>
                                                        <TableCell align='center' colSpan={3}><h3 className='fw-bold'>Chưa xếp hạng</h3></TableCell>
                                                    </TableRow>
                                                }
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <TableContainer>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>                                                        
                                                        <StyledTableCell className="headerCap" align="left" width='180px'>{ myRank().rank !== 0 ? <><span className='Number'>Hạng của tôi. </span> <span className='rank'>{myRank().rank}</span></> : "Không được xếp hạng"}</StyledTableCell>
                                                        <StyledTableCell className="headerCap" align="center" width='240px'>{currentUser.username}</StyledTableCell>
                                                        <StyledTableCell className="headerCap" align="right" width='140px'>{myRank().point}</StyledTableCell>
                                                        <StyledTableCell></StyledTableCell>                                                                                                             
                                                    </TableRow>
                                                </TableHead>
                                            </Table>
                                        </TableContainer>
                                        <TablePagination
                                            rowsPerPageOptions={[10, 25, 100]}
                                            component="div"
                                            count={ranks.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />            
                                    </Paper>                                
                                </div>
                                <div className="row">
                                    <Paper sx={{ width: '100%', overflow: 'hidden', maxHeight: 400 }}>
                                        <TableContainer sx={{ minWidth: 350 }}>
                                            <Table stickyHeader aria-label="sticky table">
                                                <TableHead>
                                                    <TableRow>
                                                        <StyledTableCell className="headerCap" align='center'>Hạng</StyledTableCell>
                                                        <StyledTableCell className="headerCap" align="center">Phần thưởng</StyledTableCell>                                                                                                               
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                {awardRank.map((row) => (
                                                    <TableRow
                                                        key={row.rank}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <StyledTableCell scope="row" align='center'>{row.rank}</StyledTableCell>
                                                        <TableCell component="th" align="center">{row.award}</TableCell>                                                        
                                                    </TableRow>
                                                ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Paper>
                                </div>
                            </div>
                            <div className='d-flex mt-3' style={{ width: '155vh' }}>
                                <span className='fst-italic'>Ghi chú: Hạng chính thức sẽ có vào cuối tháng và phần thưởng tương ứng sẽ tự động gửi đến tài khoản của khách hàng. Vui lòng kiểm tra và phản hồi với chúng tôi nếu có lỗi xảy ra trong vòng 7 ngày kể từ ngày có kết quả.</span>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <div className="container">
                            <h1>CỬA HÀNG ĐIỂM EG</h1>
                            <div className="d-flex flex-wrap">
                                {coupons
                                .map((cards) => (
                                    <Card className='mr-4 mb-2 shadow p-3 bg-body rounded' key={cards.coupon_id} sx={{ maxWidth: 290, maxHeight: 220 }}>
                                        <CardContent>
                                            <Typography className='row' gutterBottom variant="h5" component="div">
                                                {cards.coupon_title}
                                            </Typography>
                                            <Typography className='row' variant="body2" color="text.secondary" component="div">
                                                {ReactParser(cards.coupon_description)}
                                            </Typography>                                            
                                        </CardContent>
                                        <CardActions>
                                            <span className='fw-bold ms-1 mr-5'>Giá đổi: <span className='text-primary'>{cards.exchange_price}</span></span>
                                            <Button className='btnexchange btn' onClick={e=>handleExchange(e,cards.exchange_price, cards.coupon_id)}>
                                                {currentUser.pointsEG >= cards.exchange_price
                                                    ? "Đổi điểm"
                                                    : "Không đủ điểm"
                                                }
                                            </Button>
                                        </CardActions>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
}

export default Profile;