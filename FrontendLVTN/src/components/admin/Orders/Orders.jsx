import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import axios from "axios";
import "./Order.css";
import { TablePagination } from '@mui/material';

const Detail = (props) => {
  const { detail } = props;
  const [open, setOpen] = useState(false);
  const [stateOrder, setStateOrder] = useState();

const handleChange = async e => {
  try {
    await axios.put(`http://localhost:5000/api/orders/${detail.order_id}`, [e.target.value]);
    setStateOrder(e.target.value)    
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
        <TableCell align='left'>
          {detail.order_username}
        </TableCell>
        <TableCell align="left">{detail.order_phone}</TableCell>
        <TableCell align="center">{detail.order_method === 0 ? "Giao tận nơi" : "Nhận tại cửa hàng"}</TableCell>
        <TableCell align="center">{detail.order_address}</TableCell>
        <TableCell align="center">{new Date(detail.created_at).toLocaleDateString()}</TableCell>
        <TableCell align="center">{new Date(detail.updated_at).toLocaleDateString()}</TableCell>
        <TableCell align="center">          
          <select
            className='selectState'
            defaultValue={stateOrder ?? detail.order_state}
            name="order_state"
            onChange={handleChange}       
          >
            <option value="0">Chưa duyệt</option>
            <option value="1">Đã duyệt</option>
            <option value="2">Đã giao</option>
            <option value="-1">Hủy</option>
          </select>
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
                    <TableCell align="left">Tên Sản Phẩm</TableCell>
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

const Orders = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setRows(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchOrder();
  }, [])
    return (
      <>
        <div className="cateCaption">
          <h1>DANH SÁCH ĐƠN HÀNG</h1>
        </div>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="collapsible table">
                  <TableHead>
                      <TableRow>
                          <TableCell />
                          <TableCell align='center'>ID</TableCell>
                          <TableCell align="left">Khách Hàng</TableCell>
                          <TableCell align="left">Điện Thoại</TableCell>
                          <TableCell align="center">Hình Thức Giao Hàng</TableCell>
                          <TableCell align="center">Địa chỉ giao hàng</TableCell>
                          <TableCell align="center">Thời Gian Tạo</TableCell>
                          <TableCell align="center">Thời Gian Cập Nhật</TableCell>
                          <TableCell align="center" width='150px'>Action</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                          <Detail key={row.order_id} detail={row} />
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
      </>
    );
}

export default Orders;