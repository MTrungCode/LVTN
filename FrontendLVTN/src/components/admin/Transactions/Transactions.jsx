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
import "./Transaction.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
    { id: 'tran_id', label: 'ID', minWidth: 50 },
    { id: 'tran_username', label: 'Tên khách hàng', minWidth: 150 },
    { id: 'order_id', label: 'ID Đơn hàng', minWidth: 50 },
    {
        id: 'tran_total',
        label: 'Tổng chi phí',
        minWidth: 80,
        format: (value) => new Intl.NumberFormat('en-VN').format(value) + 'đ',
    },
    { id: 'payments', label: 'Hình thức thanh toán', minWidth: 200 },
    {
      id: 'created_at',
      label: 'Thời gian tạo',
      minWidth: 150,
      format: (value) => (new Date(value)).toLocaleString(undefined)
    },
    {
      id: 'updated_at',
      label: 'Thời gian cập nhật',
      minWidth: 150,
      format: (value) => (new Date(value)).toLocaleString(undefined)
    },
    {
      id: 'action',
      label: 'Thao tác',
      minWidth: 150,
      align: 'center',
      },
];

const Transactions = () => {
    const [transactions, setTransaction] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};

  useEffect(() => {
    const fetchTransaction = async () => {
        try {
        const res = await axios.get("http://localhost:5000/api/transactions")
        setTransaction(res.data)
        } catch (error) {
        console.log(error)
        }
    };
    fetchTransaction();
  }, []);

  const handleClick = async e => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:5000/api/transactions/${e.currentTarget.id}`, [1]);
        window.location.reload();
    } catch (error) {
      toast.error(error.response.data, {
        position: "bottom-right",
        autoClose: 100,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
    }
  }

  return (
    <div className='listCate'>
      <div className="cateCaption">
        <h1>DANH SÁCH GIAO DỊCH</h1> 
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
                {columns.map((column) => (
                  <>
                    <TableCell key={column.id} align={column.align}
                      style={{ minWidth: column.minWidth }} className="headerCate"
                    >
                        {column.label}
                    </TableCell>
                  </>
                ))}
                
              </TableRow>
            </TableHead>
            <TableBody>
            {transactions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((transaction) => {
                    return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={transaction.tran_id}>
                            {columns.map((column) => {
                                const value = transaction[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                        {column.id === 'created_at' || column.id === 'updated_at' || column.id === 'tran_total'
                                            ? column.format(value)
                                            : value
                                        }
                                        {column.id === 'payments'
                                            ? transaction.tran_pay === 0
                                                ? 'Thanh toán khi nhận hàng'
                                                : 'Thanh toán online'
                                            : null
                                        }
                                        {column.id === 'action'
                                            ? transaction.tran_state === 0
                                                ? <button className='unpay' id={transaction.tran_id} onClick={handleClick}>Chưa thanh toán</button>
                                                : <span className='paid'>Đã thanh toán</span>
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
          count={transactions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div> 
  );
}

export default Transactions;
