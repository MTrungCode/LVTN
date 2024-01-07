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
import "./User.scss";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Checkbox } from '@mui/material';
import { Add, Delete, Edit } from '@mui/icons-material';
import $ from 'jquery';

const columns = [
    { id: 'coupon_id', label: 'ID', minWidth: 50 },
    { id: 'coupon_title', label: 'Tên phiếu', minWidth: 150 },
    { id: 'coupon_values', label: 'Phần trăm giảm giá (%)', minWidth: 80 },
    { id: 'coupon_expiry', label: 'Hạn sử dụng (ngày)', minWidth: 100 },
    { id: 'exchange_price', label: 'Giá đổi (điểm EG)', minWidth: 150 },
    {
      id: 'created_at',
      label: 'Thời gian tạo',
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

const Coupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [coupon, setCoupon] = useState();
    const [title, setTitle] = useState();
    const [values, setValues] = useState();
    const [description, setDescription] = useState();
    const [expiry, setExpiry] = useState();
    const [exchange, setExchange] = useState();
    const [limit, setLimit] = useState();   
    const [extra, setExtra] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selected, setSelected] = useState([]);

const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};

useEffect(() => {
    const fetchCoupon = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/coupons");
            setCoupons(res.data);
        } catch (error) {
            console.log(error)
        }
    };
    fetchCoupon();
}, []);

const handleSelectAllClick = (e) => {
    if (e.target.checked) {
        const newSelected = coupons.map((n) => n.coupon_id);    
        setSelected(newSelected);
        return;
    }
    setSelected([]);
  };

const handleClick = (e, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
};
const isSelected = (id) => selected.indexOf(id) !== -1;

const handleSubmit = async () => {    
    try {
        await axios.post("http://localhost:5000/api/coupons",
            [title, values, description, expiry, exchange, limit ]);        
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

const handleUpdate = async (e) => {
    e.preventDefault()
    try {                
        await axios.put(`http://localhost:5000/api/coupons/${coupon.coupon_id}`, {
            title: title ?? coupon.coupon_title,
            value: values ?? coupon.coupon_values,
            description: description ?? coupon.coupon_description,
            expiries: expiry ?? coupon.coupon_expiry,
            exchanges: exchange ?? coupon.exchange_price,
            limit: coupon.exchange_limit
        });
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

const handleDelete = async e => {
    e.preventDefault()
    try {
        if (window.confirm("Bạn có muốn xóa \"" + e.currentTarget.name + "\" không!")) {
            await axios.delete(`http://localhost:5000/api/coupons/${e.currentTarget.id}`);
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

const onUpdate = (e, id) => {
    e.preventDefault()
    const data = coupons.find((item) => item.coupon_id === id);
    var form = $("#update-form");    
    form.find("#title").val(data.coupon_title);
    form.find("#values").val(data.coupon_values);
    form.find("#expiry").val(data.coupon_expiry);
    form.find("#exchange").val(data.exchange_price);      
    setCoupon(data);
    setExtra(data.coupon_description);        
}

const onDelete = () => {
    var form = $("#delete-form");
    var content = '';
    if (selected.length === 1) {
        const data = coupons.find((item) => item.coupon_id === selected[0]);
        content = data.coupon_title;
    } else {
        content = "Tất cả các danh mục đã chọn"; 
    }
    form.find("#content").text(content);
}

const deleteData = async e => {
    e.preventDefault();    
    try {
        for (let i = 0; i < selected.length; i++) {        
            await axios.delete(`http://localhost:5000/api/coupons/${selected[i]}`);
        }
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
        <div className='listCoupon'>
            <h1>DANH SÁCH PHIẾU GIẢM GIÁ</h1>               
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
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">                  
                                    <Checkbox
                                        color="primary"
                                        indeterminate={selected.length > 0 && selected.length < coupons.length}
                                        checked={coupons.length > 0 && selected.length === coupons.length}
                                        onChange={handleSelectAllClick}
                                        inputProps={{ 'aria-label': 'select all coupons', }}
                                    />
                                </TableCell>
                                {columns.map((column) => (
                                <>
                                    <TableCell key={column.id} align={column.align}
                                    style={{ minWidth: column.minWidth }} className="headerCate">
                                        {column.label}
                                    </TableCell>
                                </>
                                ))}
                                
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {coupons
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((coupon, index) => {
                                const isItemSelected = isSelected(coupon.coupon_id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow 
                                        key={coupon.coupon_id}
                                        hover
                                        onClick={(e) => handleClick(e, coupon.coupon_id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}                                        
                                        selected={isItemSelected}
                                        sx={{ cursor: 'pointer' }}
                                    >
                                        <TableCell padding="checkbox">                      
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                'aria-labelledby': labelId,
                                                }}
                                            />
                                        </TableCell>
                                        {columns.map((column) => {
                                            const value = coupon[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'created_at'
                                                        ? column.format(value)
                                                        : value
                                                    }
                                                    {column.id === 'coupon_expiry'
                                                        ? coupon.coupon_expiry === null
                                                            ? <span className='expiried'>Vĩnh viễn</span>
                                                            : null
                                                        : null
                                                    }                                                
                                                    {column.id === 'action' ?
                                                        <>
                                                            <button className='editCoupon' data-bs-toggle="modal" data-bs-target="#updateModal" onClick={e => onUpdate(e, coupon.coupon_id)}><Edit/></button>
                                                            <button className='deleteCoupon' id={coupon.coupon_id} name={coupon.coupon_title} onClick={handleDelete}><Delete/></button>
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
                        <button className='btn-addcoupon' data-bs-toggle="modal" data-bs-target="#addModal"><Add/></button>
                        {selected.length > 0 ?
                            <button className='btn-deletecoupon' data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={onDelete()}><Delete/></button>
                            : null
                        }
                    </div>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={coupons.length}
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
                            <h5 className="modal-title" id="addModalLabel">Thêm mới phiếu giảm giá</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">                        
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Tên phiếu</label>
                                            <input required type="text" className="form-control" placeholder='Tên phiếu' id='title'onChange={e=>setTitle(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="values" className="form-label">Phần trăm giảm giá</label>
                                            <input required type="number" className="form-control" placeholder='Phần trăm giảm giá' id='values' onChange={e=>setValues(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Mô tả</label>
                                        <CKEditor
                                            required                                            
                                            editor={ ClassicEditor }
                                            id="description"                                            
                                            placeholder="Mô tả"
                                            className="ckEditor"
                                            onChange={( event, editor ) => {
                                                const data = editor.getData();
                                                setDescription(data);                            
                                            }}                    
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="expiry" className="form-label">Hạn sử dụng</label>
                                            <input type="number" className="form-control" placeholder='Hạn sử dụng' id='expiry' onChange={e=>setExpiry(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="exchange" className="form-label">Giá đổi</label>
                                            <input type="number" className="form-control" placeholder='Giá đổi' id='exchange' onChange={e=>setExchange(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="limit" className="form-label">Giới hạn đổi</label>
                                            <input type="number" className="form-control" placeholder='Giới hạn đổi' id='limit' onChange={e=>setLimit(e.target.value)}/>
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
                            <h5 className="modal-title" id="addModalLabel">Cập nhật phiếu giảm giá</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id='update-form'>
                            <div className="modal-body">                        
                            <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Tên phiếu</label>
                                            <input required type="text" className="form-control" placeholder='Tên phiếu' id='title'onChange={e=>setTitle(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="values" className="form-label">Phần trăm giảm giá</label>
                                            <input required type="number" className="form-control" placeholder='Phần trăm giảm giá' id='values' onChange={e=>setValues(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Mô tả</label>
                                        <CKEditor
                                            required                                            
                                            editor={ ClassicEditor }
                                            id="description" 
                                            data={extra}                                           
                                            placeholder="Mô tả"
                                            className="ckEditor"
                                            onChange={( event, editor ) => {                                                                                                           
                                                const data = editor.getData();
                                                setDescription(data);
                                            }}                    
                                        />
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="expiry" className="form-label">Hạn sử dụng</label>
                                            <input required type="number" className="form-control" placeholder='Hạn sử dụng' id='expiry' onChange={e=>setExpiry(e.target.value)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="exchange" className="form-label">Giá đổi</label>
                                            <input required type="number" className="form-control" placeholder='Giá đổi' id='exchange' onChange={e=>setExchange(e.target.value)}/>
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
            {/* Modal: delete */}
            <div className="modal fade" id="deleteModal" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="deleteModalLabel">Xóa phiếu giảm giá</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id='delete-form'>
                            <div className="modal-body">
                                <p>Bạn có chắc chắn muốn xóa?</p>
                                <p className="text-danger" id="content"></p>                        
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="button" className="btn btn-primary" onClick={deleteData}>Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Coupons;