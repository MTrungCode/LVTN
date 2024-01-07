import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

const columns = [
    { id: 'sta_id', label: 'ID', minWidth: 20, align: 'center' },
    { id: 'sta_name', label: 'Tên Nhân Viên', minWidth: 180, align: 'center' },
    { id: 'sta_email', label: 'Email', minWidth: 180, align: 'center' },
    {
      id: 'action',
      label: 'Thao tác',
      minWidth: 120,
      align: 'center',
    },
];

const AuthorityStaff = () => {
    const [staffs, setStaff] = useState([]);
    const [authority, setAuthority] = useState();    

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

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
  
const handleChangePage = (event, newPage) => {
    setPage(newPage);
};
  
const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};
const handleChange = async (value, staId) => {    
    try {
      await axios.put(`http://localhost:5000/api/staffs/authority/${staId}`, [value]);
      setAuthority(value)  
    } catch (error) {
      console.log(error)
    }
}
    return (
        <div className='liststaff'>
            <div className="staffCaption">
                <h1>DANH SÁCH NHÂN VIÊN</h1>                
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
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((staff) => {
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={staff.sta_id}>
                                    {columns.map((column) => {
                                    const value = staff[column.id];
                                        return (
                                        <TableCell key={column.id} align={column.align}>
                                            {value}
                                            {column.id === 'action'
                                                ? <select
                                                    className='selectState'
                                                    defaultValue={authority ?? staff.sta_isadmin}
                                                    name="order_state"
                                                    onChange={e=>handleChange(e.target.value, staff.sta_id)}
                                                >
                                                    <option value="0">Chưa cấp quyền</option>
                                                    <option value="1">Admin</option>
                                                    <option value="2">Nhân viên bán hàng</option>
                                                    <option value="3">Nhân viên kho</option>
                                                </select>
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
                    count={staffs.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default AuthorityStaff;