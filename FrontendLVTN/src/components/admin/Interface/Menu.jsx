import React from 'react';
import { Category, Store, Group, LocalShipping, Warehouse, Receipt } from "@mui/icons-material";

const Menu = () => {   
    return (
        <div>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/admin">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink" />
                    </div>
                    <div className="sidebar-brand-text mx-3">Trang Admin</div>
                </a>
                <hr className="sidebar-divider my-0" />
                <li className="nav-item active">
                    <a className="nav-link" href="/admin" >
                        <i className="fas fa-fw fa-tachometer-alt" />
                        <span>Dashboard</span>
                    </a>
                </li>
                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Interface
                </div>                                    
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/admin" data-bs-toggle="collapse" data-bs-target="#collapseCategories" aria-expanded="true" aria-controls="collapseCategories">
                        <Category/>
                        <span> Danh mục</span>
                    </a>
                    <div id="collapseCategories" className="collapse" aria-labelledby="headingCategories" data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tùy chọn:</h6>
                            <a className="collapse-item" href="/admin/Categories">Danh sách danh mục</a>
                            <a className="collapse-item" href="/admin/TypeCates">Danh sách nhóm danh mục</a>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/admin" data-bs-toggle="collapse" data-bs-target="#collapseProducts" aria-expanded="true" aria-controls="collapseProducts">
                        <Store/>
                        <span> Sản phẩm</span>
                    </a>
                    <div id="collapseProducts" className="collapse" aria-labelledby="headingProducts" data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tùy chọn:</h6>
                            <a className="collapse-item" href="/admin/Products">Danh sách sản phẩm</a>
                            <a className="collapse-item" href="/admin/trademarks">Danh sách thương hiệu</a>
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/admin" data-bs-toggle="collapse" data-bs-target="#collapseMembers" aria-expanded="true" aria-controls="collapseMembers">
                        <Group/>
                        <span> Thành viên</span>
                    </a>
                    <div id="collapseMembers" className="collapse" aria-labelledby="headingMembers" data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tùy chọn:</h6>
                            <a className="collapse-item" href="/admin/Users">Danh sách</a>                            
                            <a className="collapse-item" href="/admin/Coupons">Phiếu giảm giá</a>                          
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/admin" data-bs-toggle="collapse" data-bs-target="#collapseOrders" aria-expanded="true" aria-controls="collapseOrders">
                        <LocalShipping/>
                        <span> Đơn hàng</span>
                    </a>
                    <div id="collapseOrders" className="collapse" aria-labelledby="headingOrders" data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tùy chọn:</h6>
                            <a className="collapse-item" href="/admin/Orders">Danh sách</a>                            
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/admin" data-bs-toggle="collapse" data-bs-target="#collapseTransactions" aria-expanded="true" aria-controls="collapseTransactions">
                        <Receipt/>
                        <span> Giao dịch</span>
                    </a>
                    <div id="collapseTransactions" className="collapse" aria-labelledby="headingTransactions" data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tùy chọn:</h6>
                            <a className="collapse-item" href="/admin/Transactions">Danh sách</a>                            
                        </div>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/admin" data-bs-toggle="collapse" data-bs-target="#collapseStaffs" aria-expanded="true" aria-controls="collapseStaffs">
                        <Group/>
                        <span> Nhân viên</span>
                    </a>
                    <div id="collapseStaffs" className="collapse" aria-labelledby="headingStaffs" data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">
                            <h6 className="collapse-header">Tùy chọn:</h6>
                            <a className="collapse-item" href="/admin/Staffs">Danh sách</a>
                            <a className="collapse-item" href="/admin/authorityStaff">Phân quyền</a>                            
                        </div>
                    </div>
                </li>                  
                <hr className="sidebar-divider" />
                <div className="sidebar-heading">
                    Addons
                </div>
                <li className="nav-item">
                    <a className="nav-link collapsed" href="/admin" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                        <Warehouse/>
                        <span> Kho hàng</span>
                    </a>
                    <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-bs-parent="#accordionSidebar">
                        <div className="bg-white py-2 collapse-inner rounded">                       
                            <a className="collapse-item" href="/admin/statisticsProduct">Thống kê theo sản phẩm</a>
                            <a className="collapse-item" href="/admin/expiry">Sản phẩm gần hết hạn</a>
                        </div>
                    </div>
                </li>
                <hr className="sidebar-divider d-none d-md-block" />
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"/>
                </div>                
            </ul>
        </div>
    );
}

export default Menu;