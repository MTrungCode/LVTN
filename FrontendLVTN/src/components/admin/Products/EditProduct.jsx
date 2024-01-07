import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import "./Product.scss";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = () => {
    const state = useLocation().state
    const [proName, setName] = useState(state?.pro_name)    
    const [cate, setCate] = useState(state?.cate_id)
    const [price, setPrice] = useState(state?.pro_price)
    const [quantity, setQuantity] = useState(state?.pro_quantity)
    const [trade, setTrade] = useState(state?.trademark_id)
    const [manufactureDate, setManufactureDate] = useState(moment(state?.pro_manufactureDate).format('YYYY-MM-DD'))
    const [expiry, setExpiry] = useState(moment(state?.pro_expiry).format('YYYY-MM-DD'))
    const [description, setDescription] = useState(state?.pro_description)
    const [file, setFile] = useState(null)
    
    const naigate = useNavigate();      

    const [categories, setCategory] = useState([]);
    const [trademarks, setTrademarks] = useState([]);

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
              const res = await axios.get("http://localhost:5000/api/trademarks")
              setTrademarks(res.data)
            } catch (error) {
              console.log(error)
            }
        };
        fetchTrademarks();
      }, [])
    const options = [];
    categories.forEach((category) => {
        options.push({ value: category.cate_id, label: category.cate_name})
    });

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

const handleEdit = async e => {
    e.preventDefault()
    const img = file != null ? await upload() : state?.pro_image;    
    try {               
        await axios.put(
            `http://localhost:5000/api/products/${state?.pro_id}`,
            [proName, description, img, price, cate, quantity, trade, manufactureDate, expiry]
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
            <h1>CẬP NHẬT SẢN PHẨM</h1>
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
                                    <input className='form-control' required type="text" value={proName} placeholder='Tên sản phẩm' id='pro_name' onChange={e=>setName(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="cate_id" className="form-label">Chọn danh mục</label>
                                    <Select required className='selectPro' id='cate_id'
                                        placeholder='Chọn danh mục'
                                        options={options}
                                        value={options.find(obj => obj.value === cate)}                                       
                                        onChange={e=>setCate(e.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="pro_price" className="form-label">Giá bán</label>
                                    <input className='form-control' required type="number" value={price} placeholder='Giá bán' id='pro_price' onChange={e=>setPrice(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3"> 
                                    <label htmlFor="trademark_id" className="form-label">Chọn thương hiệu</label>
                                    <Select required className='selectPro' id='trademark_id'
                                        placeholder='Chọn thương hiệu'
                                        options={optionTMs}
                                        value={optionTMs.find(obj => obj.value === trade)}                                       
                                        onChange={e=>setTrade(e.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="pro_quantity" className="form-label">Số lượng</label>
                                    <input className='form-control' type="number" value={quantity} placeholder='Số lượng' id='pro_quantity' onChange={e=>setQuantity(e.target.value)}/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <div className="mb-3">
                                    <label htmlFor="pro_manufactureDate" className="form-label">Ngày sản xuất</label>
                                    <input className='form-control' type="date" value={manufactureDate} placeholder='Ngày sản xuất' id='pro_manufactureDate' onChange={e=>setManufactureDate(e.target.value)}/>
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
                                    <input className='form-control' type="date" value={expiry} placeholder='Hạn sử dụng' id='pro_expiry' onChange={e=>setExpiry(e.target.value)}/>
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
                            <button onClick={handleEdit}>Cập nhật</button>
                        </div>
                    </div>                
                </form>
            </div>            
        </div>
    );
}

export default EditProduct;