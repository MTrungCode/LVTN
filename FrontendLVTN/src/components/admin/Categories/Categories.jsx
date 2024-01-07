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
import { Edit, Delete, Add } from "@mui/icons-material"
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import { Checkbox } from '@mui/material';
import './Category.scss';

const columns = [
    { id: 'cate_id', label: 'ID', minWidth: 50 },
    { id: 'cate_name', label: 'Tên danh mục', minWidth: 200 },
    { id: 'typecate_name', label: 'Loại danh mục', minWidth: 180 },
    { id: 'hot', label: 'Nổi bật', minWidth: 80, align: 'center' },
    {
      id: 'created_at',
      label: 'Thời gian tạo',
      minWidth: 200,
      format: (value) => (new Date(value)).toLocaleString(undefined)
    },
    {
      id: 'updated_at',
      label: 'Thời gian cập nhật',
      minWidth: 200,
      format: (value) => (new Date(value)).toLocaleString(undefined)
    },
    {
      id: 'action',
      label: 'Thao tác',
      minWidth: 200,
      align: 'center',
      },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [cate, setCategory] = useState();
  const [cate_name, setCateName] = useState("");
  const [cate_type, setCateType] = useState("");
  const [typecates, setTypeCate] = useState([]);  

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories")
        setCategories(res.data)
      } catch (error) {
        console.log(error)        
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    const fetchTypeCate = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/typecates");
            setTypeCate(res.data);
        } catch (error) {
            console.log(error)
        }
    };
    fetchTypeCate();
  }, []);

  const options =
    typecates.map((typecate) => (
        { value: typecate.typecate_id, label: typecate.typecate_name }
    ));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selected, setSelected] = React.useState([]);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };

  const handleNone = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/categories/hot/${e.currentTarget.id}`, [0]);
      window.location.reload(); 
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleHot = async e => {    
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/categories/hot/${e.currentTarget.id}`, [1]);
      window.location.reload();   
    } catch (error) {
      console.log(error);
    }
  }

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelected = categories.map((n) => n.cate_id);    
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
        await axios.post("http://localhost:5000/api/categories", [cate_name, cate_type]);        
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

  const handleDelete = async e => {
    e.preventDefault()
    try {
        if (window.confirm("Bạn có muốn xóa \"" + e.currentTarget.name + "\" không!")) {
            await axios.delete(`http://localhost:5000/api/categories/${e.currentTarget.id}`);
            window.location.reload();
      }
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

  const handleUpdate = async e => {
    e.preventDefault()
    try {
        await axios.put(`http://localhost:5000/api/categories/${cate.cate_id}`, [cate_name, cate_type])
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

const onUpdate = (e, id) => {
  e.preventDefault();
  const data = categories.find((item) => item.cate_id === id);
  var form = $("#update-form");    
  form.find("#cate_name").val(data.cate_name);
  setCateType(data.typecate_id);
  setCategory(data);       
}

  const onDelete = () => {
    var form = $("#delete-form");
    var content = '';    
    if (selected.length === 1) {
        const data = categories.find((item) => item.cate_id === selected[0]);        
        content = data.cate_name;
    } else {
        content = "Tất cả các danh mục đã chọn"; 
    }
    form.find("#content").text(content);  
  }

  const deleteData = async e => {
    e.preventDefault();    
    try {
      for (let i = 0; i < selected.length; i++) {        
        await axios.delete(`http://localhost:5000/api/categories/${selected[i]}`);
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
    <div className='listCate'>
      <div className="cateCaption">
        <h1>DANH SÁCH DANH MỤC</h1>        
      </div>
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
                    indeterminate={selected.length > 0 && selected.length < categories.length}
                    checked={categories.length > 0 && selected.length === categories.length}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      'aria-label': 'select all categories',
                    }}
                  />
                </TableCell>
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
              {categories
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((category, index) => {
                const isItemSelected = isSelected(category.cate_id);
                const labelId = `enhanced-table-checkbox-${index}`;             
                return (
                  <TableRow
                    hover
                    onClick={(e) => handleClick(e, category.cate_id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={category.cate_id}
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
                      const value = category[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'created_at' || column.id === 'updated_at'
                                ? column.format(value)
                                : value
                            }                            
                            {column.id === 'hot' ?
                              category.cate_hot === 1
                                ? <button className='cateHot' id={category.cate_id} onClick={handleNone}>Hot</button>
                                : <button className='cateNone' id={category.cate_id} onClick={handleHot}>None</button>
                              : null
                            }
                            {column.id === 'action' ?
                              <>
                                <button className='editCate' data-bs-toggle="modal" data-bs-target="#updateModal" onClick={e => onUpdate(e, category.cate_id)}><Edit/></button>                                                             
                                <button className='deleteCate' id={category.cate_id} name={category.cate_name} onClick={handleDelete}><Delete/></button>
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
            <button className='btn-addcate' data-bs-toggle="modal" data-bs-target="#addModal"><Add/></button>
            {selected.length > 0 ?
              <button className='btn-deletecate' data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={onDelete()}><Delete/></button>
            : null
            }
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={categories.length}
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
                    <h5 className="modal-title" id="addModalLabel">Thêm mới danh mục</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form>
                    <div className="modal-body">                        
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                              <div className="mb-3">
                                  <label htmlFor="cate_name" className="form-label">Tên danh mục</label>
                                  <input required type="text" className="form-control" placeholder='Tên danh mục' id='cate_name' name='cate_name' onChange={e=>setCateName(e.target.value)}/>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="mb-3">
                                <label htmlFor="cate_type" className="form-label">Loại danh mục</label>
                                <Select required className='selectCate' id='cate_type' name='cate_type'
                                    placeholder='Loại danh mục'
                                    options={options}                                    
                                    onChange={e=>setCateType(e.value)}
                                />
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
                    <h5 className="modal-title" id="addModalLabel">Cập nhật danh mục</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id='update-form'>
                    <div className="modal-body">                        
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                              <div className="mb-3">
                                  <label htmlFor="cate_name" className="form-label">Tên danh mục</label>
                                  <input required type="text" className="form-control" placeholder='Tên danh mục' id='cate_name' onChange={e=>setCateName(e.target.value)}/>
                              </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                              <div className="mb-3">
                                <label htmlFor="cate_type" className="form-label">Loại danh mục</label>
                                <Select required className='selectCate' id='cate_type'
                                    placeholder='Loại danh mục'
                                    options={options}
                                    value={options.find(obj => obj.value === cate_type)}                                  
                                    onChange={e=>setCateType(e.value)}
                                />
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
                      <h5 className="modal-title" id="deleteModalLabel">Xóa danh mục</h5>
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

export default Categories;
