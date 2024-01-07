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
import './Product.scss';

const columns = [
    { id: 'trademark_id', label: 'ID', minWidth: 50 },
    { id: 'trademark_name', label: 'Tên thương hiệu', minWidth: 200 },    
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

const TradeMarks = () => {
  const [trademarks, setTrademarks] = useState([])
  const [trademark_name, setTrademarkName] = useState();
  const [trademark, setTrademark] = useState();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchTrademark = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/trademarks")
        setTrademarks(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchTrademark();
  }, [])

const handleDelete = async e => {
  e.preventDefault();
  try {
    if (window.confirm("Bạn có muốn xóa \"" + e.currentTarget.name + "\" không!")) {
      await axios.delete(`http://localhost:5000/api/trademarks/${e.currentTarget.id}`)
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

  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
        const newSelected = trademarks.map((n) => n.trademark_id);    
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
        await axios.post("http://localhost:5000/api/trademarks", [trademark_name]);
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
    const data = trademarks.find((item) => item.trademark_id === id);
    var form = $("#update-form");    
    form.find("#trademark_name").val(data.trademark_name);
    setTrademarkName(data.trademark_name) ;   
    setTrademark(data);         
}

const onDelete = () => {
    var form = $("#delete-form");
    var content = '';
    if (selected.length === 1) {
        const data = trademarks.find((item) => item.trademark_id === selected[0]);
        content = data.trademark_name;
    } else {
        content = "Tất cả các danh mục đã chọn"; 
    }
    form.find("#content").text(content);
}

const handleUpdate = async e => {
  e.preventDefault()
  try {
      await axios.put(`http://localhost:5000/api/trademarks/${trademark.trademark_id}`,
        [trademark_name]);
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
            await axios.delete(`http://localhost:5000/api/trademarks/${selected[i]}`);
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
    <div className='listPro'>
      <div className="cateCaption">
        <h1>DANH SÁCH THƯƠNG HIỆU</h1>
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
                        indeterminate={selected.length > 0 && selected.length < trademarks.length}
                        checked={trademarks.length > 0 && selected.length === trademarks.length}
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
              {trademarks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((trademark, index) => {
                const isItemSelected = isSelected(trademark.trademark_id);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={trademark.trademark_id}
                    onClick={(e) => handleClick(e, trademark.trademark_id)}
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
                      const value = trademark[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === 'created_at' || column.id === 'updated_at'
                                ? column.format(value)
                                : value}
                            {column.id === 'action' ?
                              <>
                                <button className='editCate' data-bs-toggle="modal" data-bs-target="#updateModal" onClick={e => onUpdate(e, trademark.trademark_id)}><Edit/></button>
                                <button className='deleteCate' id={trademark.trademark_id} name={trademark.trademark_name} onClick={handleDelete}><Delete/></button>
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
            <button className='btn-addTrade' data-bs-toggle="modal" data-bs-target="#addModal"><Add/></button>
            {selected.length > 0 ?
                <button className='btn-deletepro' data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={onDelete()}><Delete/></button>
                : null
            }
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={trademarks.length}
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
                    <h5 className="modal-title" id="addModalLabel">Thêm mới thương hiệu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form>
                    <div className="modal-body">                        
                        <div className="row">
                          <div className="col-md-6 col-sm-12">
                            <div className="mb-3">
                                <label htmlFor="trademark_name" className="form-label">Tên thương hiệu</label>
                                <input required type="text" className="form-control" placeholder='Tên thương hiệu' id='trademark_name' onChange={e=>setTrademarkName(e.target.value)}/>
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
                                  <label htmlFor="trademark_name" className="form-label">Tên thương hiệu</label>
                                  <input required type="text" className="form-control" placeholder='Tên thương hiệu' id='trademark_name' onChange={e=>setTrademarkName(e.target.value)}/>
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
                      <h5 className="modal-title" id="deleteModalLabel">Xóa thương hiệu</h5>
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

export default TradeMarks;
