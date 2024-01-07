import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./warehouse.scss";
import axios from 'axios';
import { TablePagination } from '@mui/material';
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const CheckExpiry = () => {
    const [rows, setRow] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchExpiry = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");               
                setRow(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchExpiry();
    }, []);

const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};

const expiryDate = (date_string) => {
    var expiration = moment(date_string).format("YYYY-MM-DD");
    var current_date = moment().format("YYYY-MM-DD");
    var times = moment(expiration).diff(current_date, 'days');
    return times;
}  

    return (
        <div className='expiry'>
            <h1>THỐNG KÊ SẢN PHẨM THEO HẠN SỬ DỤNG</h1>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>     
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="center">Tên sản phẩm</StyledTableCell>
                            <StyledTableCell align="left">Ngày sản xuất</StyledTableCell>
                            <StyledTableCell align="left">Hạn sử dụng</StyledTableCell>
                            <StyledTableCell align="right">Trạng thái</StyledTableCell>                            
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                            <StyledTableRow key={row.pro_id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.pro_id}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row.pro_name}</StyledTableCell>
                                <StyledTableCell align="left">{new Date(row.pro_manufactureDate).toLocaleDateString()}</StyledTableCell>
                                <StyledTableCell align="left">{new Date(row.pro_expiry).toLocaleDateString()}</StyledTableCell>
                                <StyledTableCell align="right">
                                    { expiryDate(row.pro_expiry) <= 30 && expiryDate(row.pro_expiry) > 0
                                        ? <span className='shortdue'>Còn gần 1 tháng</span>
                                        : expiryDate(row.pro_expiry) < 0
                                            ? <span className='due'>Hết hạn</span>
                                            : <span className='notdue'>Còn hạn</span>
                                    }
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

export default CheckExpiry;