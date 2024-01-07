import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Delete } from "@mui/icons-material";
import "./User.scss"
import axios from 'axios';
import $ from 'jquery';
import { useLocalState } from '../../../util/useLocalStorage';

const columns = [
    { id: 'user_id', label: 'ID', minWidth: 20, align: 'center' },
    { id: 'username', label: 'Tên Người dùng', minWidth: 180, align: 'center' },
    { id: 'email', label: 'Email', minWidth: 180, align: 'center' },
    { id: 'pointsEG', label: 'Điểm tích lũy', minWidth: 120, align: 'center' },
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

const Users = () => {
    const [users, setUser] = useState([]);
    const [number, setNumber] = useState();
    const [unit, setUnit] = useState();
    const [expiryPoint, setExpiryPoint] = useLocalState("", "point");    

    useEffect(() => {
        const fetchUser = async () => {
            try {
              const res = await axios.get("http://localhost:5000/api/auths")
              setUser(res.data)
            } catch (error) {
              console.log(error)
            }
        };
        fetchUser();
    }, [])

    const resetPoint = async () => {
        var listId = users.map(x=>x.user_id);
        try {
            await axios.put("http://localhost:5000/api/auths", {listId: listId});
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    if (expiryPoint.unit === 'tháng') {
        var currentTime = new Date().getHours(2);
        var currentDay = new Date().getDay(2);
        var currentMonth = new Date().getMonth(2);             
        if (expiryPoint.number === 1) {
            if (currentDay === 1 && currentTime === 0) {
                console.log('reset');
                resetPoint();
            }        
        } else {
            if (currentDay === 1 && currentTime === 0 && currentMonth === currentMonth + expiryPoint.number) {
                console.log('reset');
                resetPoint();
            }
        } 
    } else if (expiryPoint.unit === 'năm') {
        var currentYear = new Date().getFullYear(4);
        if (expiryPoint.number === 1) {
            if (currentTime === 0 && currentDay === 1 && currentMonth === 1) {
                console.log('reset');
                resetPoint();
            }
        } else {
            if (currentTime === 0 && currentDay === 1 && currentMonth === 1 && currentYear === currentYear + expiryPoint.number) {
                console.log('reset');
                resetPoint();
            }
        }
    } else {
        if (currentMonth === 1|3|5|7|8|10|12) {
            var resetDay = 1 + expiryPoint.number
            if (resetDay <= 31) {
                if (currentTime === 0 && currentDay === resetDay) {
                    console.log('reset');
                    resetPoint();
                }
            } else {
                if (currentTime === 0 && currentDay === resetDay - 31) {
                    console.log('reset');
                    resetPoint();
                }
            }
        } else if (currentMonth === 4|6|9|11) {
            if (resetDay <= 30) {
                if (currentTime === 0 && currentDay === resetDay) {
                    console.log('reset');
                    resetPoint();
                }
            } else {
                if (currentTime === 0 && currentDay === resetDay - 30) {
                    console.log('reset');
                    resetPoint();
                }
            }
        } else {
            if (resetDay <= 28) {
                if (currentTime === 0 && currentDay === resetDay) {
                    console.log('reset');
                    resetPoint();
                }
            } else {
                if (currentTime === 0 && currentDay === resetDay - 28) {
                    console.log('reset');
                    resetPoint();
                }
            }
        }
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
  
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};

$('#selectUnit').change(() => {
    var selectedItem = $('#selectUnit').val();
    setUnit(selectedItem);
});

const handleApply = () => {
    if (unit === 'ngày' && number < 15) {
        alert("Giới hạn tối thiểu phải là 15 ngày!");
    }  
    setExpiryPoint({number: number, unit: unit});    
}

    return (
        <div className="listUser">
            <h1>DANH SÁCH THÀNH VIÊN</h1>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <div className="ms-2 mt-2 mb-2 row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="expiryusepoint" className="col-form-label fw-bold">Hạn sử dụng điểm</label>
                    </div>
                    <div className="col-auto">
                        <input type="number" id="expiryusepoint" placeholder='Nhập hạn sử dụng' className="form-control" onChange={e=>setNumber(e.target.value)}/>
                    </div>
                    <div className='col-auto'>
                        <select className="form-select" id='selectUnit'>
                            <option defaultValue="0">Chọn đơn vị</option>
                            <option value="ngày">Ngày</option>
                            <option value="tháng">Tháng</option>
                            <option value="năm">Năm</option>
                        </select>
                    </div>
                    <div className='col-auto'>
                        <button type="button" className="btn btn-primary" onClick={handleApply}>Áp dụng</button>
                    </div>
                    <div className='col-auto'>
                        <span className='fw-bold'>Hạn dùng điểm hiện tại: {expiryPoint.number} {expiryPoint.unit}</span>
                    </div>
                </div>
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
                            {users
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((user) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={user.code}>
                                    {columns.map((column) => {
                                    const value = user[column.id];
                                        return (
                                        <TableCell key={column.id} align={column.align}>
                                            {column.id === 'created_at' || column.id === 'updated_at'
                                                ? column.format(value)
                                                : value
                                            }
                                            {column.id === 'action' ?
                                                <button className='buttonUser'><Delete/></button>
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
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default Users;