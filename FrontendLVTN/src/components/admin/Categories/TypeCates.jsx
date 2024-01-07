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
import { Edit, Delete, Add } from "@mui/icons-material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from 'jquery';
import { Checkbox } from '@mui/material';

const columns = [
    { id: 'typecate_id', label: 'ID', minWidth: 80 },
    { id: 'typecate_name', label: 'Tên danh mục', minWidth: 200 },    
    {
      id: 'created_at',
      label: 'Thời gian tạo',
      minWidth: 200,
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
      minWidth: 200,
      align: 'center',
      },
];

const TypeCates = () => {
  const [typecates, setTypeCate] = useState([])
  const [typecate_name, setTypeCateName] = useState();
  const [typecategory, setTypeCategory] = useState();
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const fetchTypeCate = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/typecates")
        setTypeCate(res.data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchTypeCate();
  }, [])

const handleDelete = async e => {
  e.preventDefault()
  try {
    if (window.confirm("Bạn có muốn xóa \"" + e.currentTarget.name + "\" không!")) {
        await axios.delete(`http://localhost:5000/api/typecates/${e.currentTarget.id}`);
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
        const newSelected = typecates.map((n) => n.typecate_id);    
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
        await axios.post("http://localhost:5000/api/typecates", [typecate_name]);
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
    e.preventDefault()
    const data = typecates.find((item) => item.typecate_id === id);
    var form = $("#update-form");    
    form.find("#typecate_name").val(data.typecate_name);
    setTypeCateName(data.typecate_name) ;   
    setTypeCategory(data);         
}

const onDelete = () => {
    var form = $("#delete-form");
    var content = '';
    if (selected.length === 1) {
        const data = typecates.find((item) => item.typecate_id === selected[0]);
        content = data.typecate_name;
    } else {
        content = "Tất cả các danh mục đã chọn"; 
    }
    form.find("#content").text(content);
}

const handleUpdate = async e => {
  e.preventDefault()
  try {
      await axios.put(`http://localhost:5000/api/typecates/${typecategory.typecate_id}`,
        [typecate_name]);
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

const deleteData = async e => {
    e.preventDefault();    
    try {
        for (let i = 0; i < selected.length; i++) {        
            await axios.delete(`http://localhost:5000/api/typecates/${selected[i]}`);
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
        <h1>DANH SÁCH NHÓM DANH MỤC</h1>
        <ToastContainer
            position="top-right"
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
                <TableCell padding="checkbox">                  
                    <Checkbox
                        color="primary"
                        indeterminate={selected.length > 0 && selected.length < typecates.length}
                        checked={typecates.length > 0 && selected.length === typecates.length}
                        onChange={handleSelectAllClick}
                        inputProps={{ 'aria-label': 'select all typecate', }}
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
              {typecates
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((typecate, index) => {
                const isItemSelected = isSelected(typecate.typecate_id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    key={typecate.typecate_id}
                    hover
                    role="checkbox"
                    tabIndex={-1}                                        
                    onClick={(e) => handleClick(e, typecate.typecate_id)}
                    aria-checked={isItemSelected}
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
                      const value = typecate[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'created_at' || column.id === 'updated_at'
                                ? column.format(value)
                                : value}
                            {column.id === 'action' ?
                              <>
                                <button className='editCate' data-bs-toggle="modal" data-bs-target="#updateModal" onClick={e => onUpdate(e, typecate.typecate_id)}><Edit/></button>
                                <button className='deleteCate' id={typecate.typecate_id} name={typecate.typecate_name} onClick={handleDelete}><Delete/></button>
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
            count={typecates.length}
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
                    <h5 className="modal-title" id="addModalLabel">Thêm mới nhóm danh mục</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form>
                    <div className="modal-body">                        
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <div className="mb-3">
                                <label htmlFor="typecate_name" className="form-label">Tên nhóm danh mục</label>
                                <input required type="text" className="form-control" placeholder='Tên nhóm danh mục' id='typecate_name' onChange={e=>setTypeCateName(e.target.value)}/>
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
                      <h5 className="modal-title" id="addModalLabel">Cập nhật nhóm danh mục</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form id='update-form'>
                      <div className="modal-body">                        
                          <div className="row"> 
                            <div className="col-md-6 col-sm-12">                        
                              <div className="mb-3">
                                  <label htmlFor="typecate_name" className="form-label">Tên nhóm danh mục</label>
                                  <input required type="text" className="form-control" placeholder='Tên nhóm danh mục' id='typecate_name' onChange={e=>setTypeCateName(e.target.value)}/>
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
                      <h5 className="modal-title" id="deleteModalLabel">Xóa nhóm danh mục</h5>
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

export default TypeCates;
