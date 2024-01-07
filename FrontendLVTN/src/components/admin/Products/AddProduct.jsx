import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import "./Product.scss";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const [proName, setName] = useState("")    
    const [cate, setCate] = useState("")
    const [price, setPrice] = useState("")
    const [quality, setQuality] = useState("")
    const [trademark, setTrademark] = useState("")
    const [manufactureDate, setManufactureDate] = useState("")
    const [expiry, setExpiry] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)   

    const [categories, setCategory] = useState([]);
    const [trademarks, setTrademarks] = useState([]);

    const naigate = useNavigate();

    useEffect(() => {
        const fetchCategory = async () => {
          try {
            const res = await axios.get("http://localhost:5000/api/categories")
            setCategory(res.data)
          } catch (error) {
            console.log(error)
          }
        };
        fetchCategory();
        const fetchTrademarks = async () => {
            try {
              const res = await axios.get("http://localhost:5000/api/trademarks");              
              setTrademarks(res.data)
            } catch (error) {
              console.log(error)
            }
        };
        fetchTrademarks();
      }, [])    
    const options = []
    categories.forEach((category) => {
        options.push({ value: category.cate_id, label: category.cate_name})
    })
    
    const optionTMs = [];
    trademarks.forEach((trademark) => {
        optionTMs.push({ value: trademark.trademark_id, label: trademark.trademark_name});
    });

const upload = async () => {
    try {
        const formData = new FormData();
        formData.append("file", file)   
        const res = await axios.post("http://localhost:5000/api/upload", formData)
        return(res.data);      
    } catch (error) {
        console.log(error)
    }
}

const handleCreate = async e => {
    e.preventDefault()   
    const img = await upload()
    try {               
        await axios.post(
            'http://localhost:5000/api/products',
            [proName, description, file ? img : "", price, cate, quality, trademark, manufactureDate, expiry]
        )               
        naigate("/admin/Products");      
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
        <div className="addPro">
            <h1>THÊM SẢN PHẨM</h1>
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
            <div className='container my-3'>
                <form>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="pro_name" className="form-label">Tên sản phẩm</label>
                                    <input className='form-control' required type="text" placeholder='Tên sản phẩm' id='pro_name' onChange={e=>setName(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="cate_id" className="form-label">Chọn danh mục</label>
                                    <Select required className='selectPro' id='cate_id'
                                        placeholder='Chọn danh mục'
                                        options={options}                                        
                                        onChange={e=>setCate(e.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="pro_price" className="form-label">Giá bán</label>
                                    <input className='form-control' required type="number" placeholder='Giá bán' id='pro_price' onChange={e=>setPrice(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3"> 
                                    <label htmlFor="trademark_id" className="form-label">Chọn thương hiệu</label>
                                    <Select required className='selectPro' id='trademark_id'
                                        placeholder='Chọn thương hiệu'
                                        options={optionTMs}                                        
                                        onChange={e=>setTrademark(e.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="pro_quantity" className="form-label">Số lượng</label>
                                    <input className='form-control' type="number" placeholder='Số lượng' id='pro_quantity' onChange={e=>setQuality(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="pro_manufactureDate" className="form-label">Ngày sản xuất</label>
                                    <input className='form-control' type="date" placeholder='Ngày sản xuất' id='pro_manufactureDate' onChange={e=>setManufactureDate(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="pro_image" className="form-label">Hình ảnh</label>
                                    <input className='form-control' type="file" id="pro_image" onChange={e=>setFile(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="pro_expiry" className="form-label">Hạn sử dụng</label>
                                    <input className='form-control' type="date" placeholder='Hạn sử dụng' id='pro_expiry' onChange={e=>setExpiry(e.target.value)}/>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pro_description" className="form-label">Mô tả sản phẩm</label>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={description}
                                    id="pro_description"
                                    className="ckEditor"
                                    placeholder='Mô tả sản phẩm'
                                    onChange={( event, editor ) => {
                                        const data = editor.getData();
                                        setDescription(data);
                                    }}                    
                                />
                            </div>                            
                        </div>
                    </div>
                    <div className="modal-footer">                  
                        <div className="btnUpdate">
                            <Link to="/admin/Products"><button className='back'>Quay lại</button></Link>
                            <button onClick={handleCreate}>Thêm mới</button>
                        </div>
                    </div>                
                </form>
            </div>
        </div>
    );
}

export default AddProduct;