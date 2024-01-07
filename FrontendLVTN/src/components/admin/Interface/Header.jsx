import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocalState } from '../../../util/useLocalStorage';

const Header = () => {
    const { currentStaff, logoutAdmin } = useContext(AuthContext);    
    const navigate = useNavigate();
    const [staName, setStaName] = useState(currentStaff.sta_name);
    const [staEmail, setStaEmail] = useState(currentStaff.sta_email);
    const [staPhone, setStaPhone] = useState(currentStaff.sta_phone);
    const [password, setPassword] = useState();
    const [newPass, setNewPass] = useState();
    const [confirmPass, setConfirmPass] = useState();
    const [token, setToken] = useLocalState('', 'jwtAdmin');
    
    if (token === undefined) setToken('');    
  
const handleClick = e => {
    e.preventDefault();
    try {
        logoutAdmin();
        navigate("/login-admin");
        window.location.reload();
    } catch (error) {
        console.log(error)
    }
}

const handleUpdateInfo = async e => {
    e.preventDefault();
    if (token !== '') {
        try {
            await axios.put("http://localhost:5000/api/staffs/update-info", [staName, staEmail, staPhone]);
            logoutAdmin();
            navigate("/login-admin");
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    } else {
        logoutAdmin();
    }
}

const handleChangePass = async e => {
    e.preventDefault();
    if (token !== '') {
        try {
            await axios.put("http://localhost:5000/api/staffs/change-password", [password, newPass, confirmPass]);
            logoutAdmin();
            navigate("/login-admin");
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    } else {
        logoutAdmin();
    }
}
    return (
        <div>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars" />
                </button>              
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown no-arrow d-sm-none">
                        <a className="nav-link dropdown-toggle" href="/admin" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-search fa-fw" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                            <form className="form-inline mr-auto w-100 navbar-search">
                                <div className="input-group">
                                    <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" type="button">
                                            <i className="fas fa-search fa-sm" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="/admin" id="alertsDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-bell fa-fw" />
                            <span className="badge badge-danger badge-counter">0</span>
                        </a>
                        <div className="dropdown-list dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="alertsDropdown">
                            <h6 className="dropdown-header">
                                Alerts Center
                            </h6>
                            <a className="dropdown-item text-center small text-gray-500" href="/admin">Show All Alerts</a>
                        </div>
                    </li>   
                    <li className="nav-item dropdown no-arrow mx-1">
                        <a className="nav-link dropdown-toggle" href="/admin" id="messagesDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-envelope fa-fw" />
                            <span className="badge badge-danger badge-counter">0</span>
                        </a>
                        <div className="dropdown-list dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="messagesDropdown">
                            <h6 className="dropdown-header">
                                Message Center
                            </h6>
                            <a className="dropdown-item text-center small text-gray-500" href="/admin">Read More Messages</a>
                        </div>
                    </li>
                    <div className="topbar-divider d-none d-sm-block" />
                    <li className="nav-item dropdown no-arrow">
                        <a className="nav-link dropdown-toggle" href="/admin" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">{currentStaff?.sta_name}</span>
                            <img className="img-profile rounded-circle" src="/assets/ava4.jpg" alt=''/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="userDropdown">
                            <a className="dropdown-item" href="/admin" data-bs-toggle="modal" data-bs-target="#viewInfoModal">
                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                                Thông tin tài khoản
                            </a>
                            <a className="dropdown-item" href="/admin" data-bs-toggle="modal" data-bs-target="#updateInfoModal">
                                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                                Cập nhập thông tin tài khoản
                            </a>
                            <a className="dropdown-item" href="/admin" data-bs-toggle="modal" data-bs-target="#changePasswordModal">
                                <i className="fas fa-key fa-sm fa-fw mr-2 text-gray-400" />
                                Đổi mật khẩu
                            </a>
                            <div className="dropdown-divider" />
                            <a className="dropdown-item" href="/logout" data-bs-toggle="modal" data-bs-target="#logoutModal">
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                                Đăng xuất
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
            {/* modal: logout */}
            <div className="modal fade" id="logoutModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Bạn muốn đăng xuất?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Chọn "Đăng xuất" nếu bạn thật sự muốn thoát khỏi trang này.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Hủy</button>
                                <span className="btn btn-primary" onClick={handleClick}>Đăng xuất</span>
                            </div>
                        </div>
                    </div>
                </div>
            {/* Modal: view info */}
            <div className="modal fade" id="viewInfoModal" tabIndex="-1" aria-labelledby="viewInfoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="viewInfoModalLabel">Thông tin tài khoản</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-3">
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12"><b>Tên người dùng: </b></div>
                                <div className="col-xl-9 col-lg-8 col-md-6 col-sm-12">{currentStaff.sta_name}</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12"><b>Email: </b></div>
                                <div className="col-xl-9 col-lg-8 col-md-6 col-sm-12">{currentStaff.sta_email}</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12"><b>Điện thoại: </b></div>
                                <div className="col-xl-9 col-lg-8 col-md-6 col-sm-12">{currentStaff.sta_phone}</div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12"><b>Quyền hạn: </b></div>
                                <div className="col-xl-9 col-lg-8 col-md-6 col-sm-12">????</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal: update info */}
            <div className="modal fade" id="updateInfoModal" tabIndex="-1" aria-labelledby="updateInfoModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="updateInfoModalLabel">Cập nhật thông tin tài khoản</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="updateInfo-form">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="sta_name" className="form-label">Tên người dùng</label>
                                            <input type="text" className="form-control" id="sta_name" name="sta_name" value={staName} onChange={e=>setStaName(e.target.value)} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="sta_email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="sta_email" name="sta_email" value={staEmail} onChange={e=>setStaEmail(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="sta_phone" className="form-label">Điện thoại</label>
                                            <input type="text" className="form-control" id="sta_phone" name="sta_phone" value={staPhone} onChange={e=>setStaPhone(e.target.value)} required />
                                        </div>
                                    </div>
                                </div>
                                <input id="Id" type="hidden" name="Id" value={currentStaff.sta_id} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="button" className="btn btn-primary" onClick={handleUpdateInfo}>Lưu thay đối</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* Modal: change password */}
            <div className="modal fade" id="changePasswordModal" tabIndex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="changePasswordModalLabel">Đổi mật khẩu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="changepassword-form">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Mật khẩu hiện tại</label>
                                            <input type="password" className="form-control" id="password" name="password" onChange={e=>setPassword(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-sm-12"></div>

                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="newpassword" className="form-label">Mật khẩu mới</label>
                                            <input type="password" className="form-control" id="newpassword" name="newpassword" onChange={e=>setNewPass(e.target.value)} required />
                                        </div>
                                    </div>

                                    <div className="col-md-6 col-sm-12">
                                        <div className="mb-3">
                                            <label htmlFor="confirmpassword" className="form-label">Xác nhận mật khẩu</label>
                                            <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" onChange={e=>setConfirmPass(e.target.value)} required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                <button type="button" className="btn btn-primary" onClick={handleChangePass}>Lưu thay đối</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;