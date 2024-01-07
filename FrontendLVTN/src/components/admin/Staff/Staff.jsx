import React, { useContext, useEffect, useState } from 'react';
import "./Staff.scss";
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Add, Delete, Edit } from "@mui/icons-material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import { AuthContext } from '../../../context/authContext';

const columns = [
    { id: 'sta_id', label: 'ID', minWidth: 20, align: 'center' },
    { id: 'sta_name', label: 'Tên Nhân Viên', minWidth: 180, align: 'center' },
    { id: 'sta_email', label: 'Email', minWidth: 180, align: 'center' },
    { id: 'sta_phone', label: 'Số Điện Thoại', minWidth: 100, align: 'center'},
    { id: 'status', label: 'Trạng thái', minWidth: 120, align: 'center' },
    {
      id: 'created_at',
      label: 'Thời gian tạo',
      minWidth: 100,
      format: (value) => (new Date(value)).toLocaleString(undefined),
      align: 'center'
    },
    {
      id: 'updated_at',
      label: 'Thời gian cập nhật',
      minWidth: 100,
      format: (value) => (new Date(value)).toLocaleString(undefined),
      align: 'center'
    },
    {
      id: 'action',
      label: 'Thao tác',
      minWidth: 120,
      align: 'center',
    },
];

const Staff = () => {
    const { currentStaff } = useContext(AuthContext);
    const [staffs, setStaff] = useState([]);
    const [staffitem, setStaffItem] = useState();
    const [staName, setStaName] = useState();
    const [staEmail, setStaEmail] = useState();
    const [staPhone, setStaPhone] = useState();
    const [staPass, setStaPass] = useState();
    const [staConfirmPass, setStaConfirmPass] = useState();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
              const res = await axios.get("http://localhost:5000/api/staffs")
              setStaff(res.data)
            } catch (error) {
              console.log(error)
            }
        };
        fetchStaff();
    }, []);
  
const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
  
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};

const handleDisable = async e => {
    e.preventDefault();
    try {
        if (window.confirm("Bạn có muốn vô hiệu hóa \"" + e.currentTarget.name + "\" không!")) {
            await axios.put(`http://localhost:5000/api/staffs/disablestaff/${e.currentTarget.id}`, [0]);
            window.location.reload();
        }
    } catch (error) {
        toast.error(error.response.data, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

const handleClick = async e => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:5000/api/staffs/${e.currentTarget.id}`, [1]);
        window.location.reload();
    } catch (error) {
        toast.error(error.response.data, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

const handleSubmit = async e => {
    e.preventDefault()
    try {
        await axios.post("http://localhost:5000/api/staffs/addStaff",
            [staName, staEmail, staPhone, staPass, staConfirmPass]
        );
        window.location.reload();
    } catch (error) {        
        toast.error(error.response.data, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

const handleUpdate = async e => {
    e.preventDefault();
    try {
        const res = await axios.put(`http://localhost:5000/api/staffs/${staffitem.sta_id}`,
            { 
                staName: staName ?? staffitem.sta_name,
                staEmail: staEmail ?? staffitem.sta_email,
                staPhone: staPhone ?? staffitem.sta_phone
            });
        console.log(res);
        window.location.reload();
    } catch (error) {            
        toast.error(error.response.data, {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }
}

const onUpdate = (e, id) => {
    e.preventDefault()
    const data = staffs.find((item) => item.sta_id === id);
    var form = $("#update-form");    
    form.find("#sta_name").val(data.sta_name);
    form.find("#sta_email").val(data.sta_email);
    form.find("#sta_phone").val(data.sta_phone);        
    setStaffItem(data);        
}

    return (
        <div className='liststaff'>
            <div className="staffCaption">
                <h1>DANH SÁCH NHÂN VIÊN</h1>
                <ToastContainer
                    position="bottom-right"
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
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => {
                                    return(
                                    <>
                                        <TableCell key={column.id} align={column.align}
                                        style={{ minWidth: column.minWidth }} className="headerCate"
                                        >
                                            {column.label}
                                        </TableCell>
                                    </>
                                    )
                                })}                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {staffs
                            .filter(x => x.sta_id !== currentStaff.sta_id)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((staff) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={staff.sta_id}>
                                    {columns.map((column) => {
                                    const value = staff[column.id];
                                        return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.id === 'created_at' || column.id === 'updated_at'
                                                ? column.format(value)
                                                : value
                                            }
                                            {column.id === 'status'
                                                ? staff.sta_status === 1
                                                    ? <span className='staActive'>Hoạt động</span>
                                                    : <button className='staDisable' id={staff.sta_id} onClick={handleClick}>Vô hiệu hóa</button>
                                                : null
                                            }
                                            {column.id === 'action' ?
                                                <>
                                                    <button className='buttonEdit' data-bs-toggle="modal" data-bs-target="#updateModal" onClick={e => onUpdate(e, staff.sta_id)}><Edit/></button>
                                                    <button className='buttonStaff' id={staff.sta_id} name={staff.sta_name} onClick={handleDisable}><Delete/></button>
                                                </>
                                            : null
                                            }
                                        </TableCell>
                                        );
                                    })}
                                </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className='toolbar'>
                    <div>
                        <button className='btn-addStaff' data-bs-toggle="modal" data-bs-target="#addModal"><Add/></button>
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={staffs.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </Paper>
            {/* Modal: add */}
            <div className="modal fade" id="addModal" aria-labelledby="addModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addModalLabel">Thêm mới nhân viên</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">                        
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="sta_name" className="form-label">Tên nhân viên</label>
                                            <input required type="text" className="form-control" placeholder='Tên nhân viên' id='sta_name' onChange={e=>setStaName(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="sta_email" className="form-label">Email</label>
                                            <input required type="email" className="form-control" placeholder='Email' id='sta_email' onChange={e=>setStaEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="sta_password" className="form-label">Mật khẩu</label>
                                            <input required type="password" className="form-control" placeholder='Mật khẩu' id='sta_password' onChange={e=>setStaPass(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="sta_phone" className="form-label">Số điện thoại</label>
                                            <input required type="number" className="form-control" placeholder='Số điện thoại' id='sta_phone' onChange={e=>setStaPhone(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="sta_confirmpassword" className="form-label">Nhập lại mật khẩu</label>
                                            <input required type="password" className="form-control" placeholder='Nhập lại mật khẩu' id='sta_confirmpassword' onChange={e=>setStaConfirmPass(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Modal: update */}
            <div className="modal fade" id="updateModal" aria-labelledby="updateModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addModalLabel">Cập nhật nhân viên</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id='update-form'>
                            <div className="modal-body">                        
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="sta_name" className="form-label">Tên nhân viên</label>
                                            <input required type="text" className="form-control" placeholder='Tên nhân viên' id='sta_name' onChange={e=>setStaName(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="sta_email" className="form-label">Email</label>
                                            <input required type="email" className="form-control" placeholder='Email' id='sta_email' onChange={e=>setStaEmail(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="sta_phone" className="form-label">Số điện thoại</label>
                                            <input type="number" className="form-control" placeholder='Số điện thoại' id='sta_phone' onChange={e=>setStaPhone(e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Staff;