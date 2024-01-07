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
import Select from 'react-select';
import { Add } from "@mui/icons-material";

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

const StatisticsProduct = () => {
  const [prods, setProd] = useState([]);
  const [orders, setOrder] = useState([]);
  const [imports, setImports] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [proId, setProId] = useState();
  const [imPrice, setImPrice] = useState();
  const [imQuantity, setImQuantity] = useState();

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProd(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchproduct();

    const fetchOrder = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrder(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOrder();

    const fetchImport = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/imports");        
        setImports(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchImport();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};

  const listOver = () => {
    var listpro = prods;
    listpro = listpro.filter((n) => n.pro_quantity <= 10);
    return listpro;
  }

  const options = listOver().map((item) => (
    { value: item.pro_id, label: item.pro_name }));

  const soldOut = (id) => {
    var sold_out = 0;
    orders.map((item) => {      
      return JSON.parse(item.order_items).map((prod) => 
        prod.id === id ? sold_out += prod.quantity : sold_out += 0
      )      
    })
    return sold_out;
  }

  const showImport = (id) => {
    var Importquantity = 0
    const item = imports.find(x => x.pro_id === id);
    if (item) {
      Importquantity = item.import_quantity;
    }
    return Importquantity;
  }

  const priceImport = (id) => {
    var price = 0;
    const item = imports.find(x => x.pro_id === id);
    if (item) {
      price = item.import_price;
    }
    return price;
  }

  const handleImport = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/imports", [proId, imPrice, imQuantity]);        
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-VN').format(price) + 'đ';
  }

  return (
    <div>
      <h1>THỐNG KÊ THEO SẢN PHẨM</h1>        
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>        
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                    <StyledTableCell minwidth="80" align='center'>ID</StyledTableCell>
                    <StyledTableCell minwidth="180" align="center">Tên sản phẩm</StyledTableCell>
                    <StyledTableCell minwidth="180" align="left">Giá bán</StyledTableCell>
                    <StyledTableCell minwidth="100" align="left">Bán ra</StyledTableCell>
                    <StyledTableCell minwidth="100" align="left">Còn lại</StyledTableCell>
                    <StyledTableCell minwidth="100" align="left">Nhập vào</StyledTableCell>
                    <StyledTableCell minwidth="100" align="left">Giá nhập</StyledTableCell>
                    <StyledTableCell minwidth="150" align="center">Ghi chú</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {prods
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                  <StyledTableRow key={product.pro_id}>
                    <StyledTableCell minwidth="80" align='center' component="th" scope="row">
                        {product.pro_id}
                    </StyledTableCell>
                    <StyledTableCell minwidth="180" align="left">{product.pro_name}</StyledTableCell>
                    <StyledTableCell minwidth="180" align="left">{formatPrice(product.pro_price)}</StyledTableCell>
                    <StyledTableCell minwidth="100" align="left">{soldOut(product.pro_id)}</StyledTableCell>
                    <StyledTableCell minwidth="100" align="left">{product.pro_quantity}</StyledTableCell>
                    <StyledTableCell minwidth="100" align="left">{showImport(product.pro_id)}</StyledTableCell>
                    <StyledTableCell minwidth="100" align="left">{formatPrice(priceImport(product.pro_id))}</StyledTableCell>
                    <StyledTableCell minwidth="150" align="center">
                      {product.pro_quantity <= 10
                      ? <span className='nearly_sold_out'>Gần hết hàng</span>
                      : product.pro_quantity === 0
                        ? <span className='out_of_stock'>Hết hàng</span>
                        : <span className='stocking'>Còn hàng</span>
                      }
                    </StyledTableCell>
                  </StyledTableRow>
              ))}
              </TableBody>
          </Table>
        </TableContainer>
        <div className='toolbar'>
          <div>
              <button className='btn-importPro' data-bs-toggle="modal" data-bs-target="#importModal"><Add/></button>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={prods.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
      {/* Modal: import */}
      <div className="modal fade" id="importModal" aria-labelledby="importModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="addModalLabel">Nhập thêm sản phẩm</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form>
                    <div className="modal-body">                        
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="selectPro" className="form-label">Chọn sản phẩm</label>
                                <Select required className='selectCate' id='selectPro'
                                    placeholder='Chọn sản phẩm'
                                    options={options}                                  
                                    onChange={e=>setProId(e.value)}
                                />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="Imprice" className="form-label">Giá nhập</label>
                                    <input required type="number" className="form-control" placeholder='Giá nhập' id='Imprice' onChange={e=>setImPrice(e.target.value)}/>
                                </div>
                            </div>                            
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="Imquantity" className="form-label">Số lượng</label>
                                    <input type="number" className="form-control" placeholder='Số lượng' id='Imquantity' onChange={e=>setImQuantity(e.target.value)}/>
                                </div>
                            </div>                           
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                        <button type="button" className="btn btn-primary" onClick={handleImport}>Lưu thay đổi</button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}

export default StatisticsProduct;