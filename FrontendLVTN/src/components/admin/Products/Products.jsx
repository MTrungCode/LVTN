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
import { Edit, Delete, Add, KeyboardArrowUp, KeyboardArrowDown } from "@mui/icons-material"
import { Link } from 'react-router-dom';
import { Box, Collapse, IconButton, Typography } from '@mui/material';
import './Product.scss';

const columns = [
    { id: 'pro_id', label: 'ID', minWidth: 20, align: 'center' },
    { id: 'pro_name', label: 'Tên sản phẩm', minWidth: 150, align: 'left' },    
    {
      id: 'pro_price',
      label: 'Giá bán',
      minWidth: 50,
      align: 'center',
      format: (value) => new Intl.NumberFormat('en-VN').format(value) + 'đ',
    },
    { id: 'pro_quantity', label: 'Số lượng', minWidth: 50, align: 'center' },
    { id: 'cate_id', label: 'Danh mục', minWidth: 50, align: 'center' },
    { id: 'hot', label: 'Nổi bật', minWidth: 50, align: 'center' },
    {
      id: 'created_at',
      label: 'Thời gian tạo',
      minWidth: 100,      
      align: 'center'
    },
    {
      id: 'updated_at',
      label: 'Thời gian cập nhật',
      minWidth: 100,      
      align: 'center'
    },
    {
      id: 'action',
      label: 'Thao tác',
      minWidth: 120,
      align: 'center',
    },
];

const Desc = (props) => {
  const { desc } = props;
  const [open, setOpen] = useState(false); 

const handleDelete = async e => {
  e.preventDefault()
  try {
    if (window.confirm("Bạn có muốn xóa \"" + e.currentTarget.name + "\" không!")) {
      await axios.delete(`http://localhost:5000/api/products/${e.currentTarget.id}`)
      this.setState({})
    }
  } catch (error) {
    console.log(error)
  }
}

const handleNone = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/hot/${e.currentTarget.id}`, [0]);
      window.location.reload(); 
    } catch (error) {
      console.log(error);
    }
}
  
const handleHot = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/hot/${e.currentTarget.id}`, [1]);
      window.location.reload();   
    } catch (error) {
      console.log(error);
    }
}
  
const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent
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
        <TableCell align='center'>{desc.pro_id}</TableCell>
        <TableCell align='left'>
          {desc.pro_name}
        </TableCell>
        <TableCell align="left">{new Intl.NumberFormat('en-VN').format(desc.pro_price) + 'đ'}</TableCell>
        <TableCell align="center">{desc.pro_quantity}</TableCell>
        <TableCell align="center">{desc.cate_id}</TableCell>
        <TableCell align="center">
          {desc.pro_hot === 1
            ? <button className='proHot' id={desc.pro_id} onClick={handleNone}>Hot</button>
            : <button className='proNone' id={desc.pro_id} onClick={handleHot}>None</button>
          }
        </TableCell>
        <TableCell align="center">{new Date(desc.created_at).toLocaleDateString()}</TableCell>
        <TableCell align="center">{new Date(desc.updated_at).toLocaleDateString()}</TableCell>
        <TableCell align="center">          
          <button className='editCate'><Link className='linkedit' to="/admin/editProduct" state={desc}><Edit/></Link></button>
          <button className='deleteCate' id={desc.pro_id} name={desc.pro_name} onClick={handleDelete}><Delete/></button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Mô tả sản phẩm
              </Typography>
              <Table size="small" aria-label="purchases">                
                <TableBody align='justify'>
                  {getText(desc.pro_description)}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const Products = () => {
  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products")
        setProduct(res.data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchProduct();
  }, []);

const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};

  return (
    <div className='listPro'>
      <div className="cateCaption">
        <h1>DANH SÁCH SẢN PHẨM</h1>        
      </div>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>        
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell />
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
                    {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((product) => {
                      return (
                        <Desc key={product.pro_id} desc={product}/>                     
                      );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        <div className='toolbar'>
          <div>
              <button className='btn-addpro'><Link className='linkadd' to="/admin/addProduct"><Add/></Link></button>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      </Paper>
    </div> 
  );
}

export default Products;
