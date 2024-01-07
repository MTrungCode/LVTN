import React, { useEffect, useState } from 'react';
import { Person } from "@mui/icons-material";
import axios from "axios";
import Chart from '../Chart/Chart';
import $ from 'jquery';

const Dashboard = () => {
    const [orders, setOrder] = useState([]);
    const [transactions, setTransaction] = useState([]);
    const [users, setUser] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear(4)); 

    useEffect(() => {        
        const fetchOrder = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/orders");
                setOrder(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchOrder();
        const fetchTransaction = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/transactions");
                setTransaction(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchTransaction();
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/auths");
                setUser(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser();
    }, []);

const totalRevenue = () => {
    let total = 0
    transactions.forEach(item => total += item.tran_total);
    return total;
}

const orderComplete = () => {
    let total = 0
    orders.forEach(item => {
        if (item.order_state === 2)
            total += 1;            
    });
    if (total !== 0)
        total = ((total / orders.length) * 100).toFixed(0);
    return total;
}

const numberFormat = (value) =>
    new Intl.NumberFormat('en-VN').format(value);

$(".dropdown-header span").click(() => {
    var selText = $(this).text();
    setYear(Number(selText));
});

console.log(year)

    return (
        <div>
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h2 className="mb-0 fw-bold" style={{ color: 'blueviolet'}}>Dashboard</h2>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-primary shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row g-0 align-items-center">
                                    <div className="col me-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Tổng đơn hàng (Weekly)</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            {orders.length}
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-success shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row g-0 align-items-center">
                                    <div className="col me-2">
                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Tổng doang thu (Weekly)</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            {numberFormat(totalRevenue())} Đồng
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-info shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row g-0 align-items-center">
                                    <div className="col me-2">
                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Đã hoàn thành (Đơn hàng)</div>
                                        <div className="row g-0 align-items-center">
                                            <div className="col-auto">
                                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                    {orderComplete()}%
                                                </div>
                                            </div>
                                            <div className="col">
                                                <div className="progress progress-sm me-2">
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        style={{width: `${orderComplete()}%` }}
                                                        aria-valuenow={orderComplete()}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-clipboard-list fa-2x text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-warning shadow h-100 py-2">
                            <div className="card-body">
                                <div className="row g-0 align-items-center">
                                    <div className="col me-2">
                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Thành viên
                                        </div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                            {users.length}
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <Person className="text-gray-300" style={{ fontSize: 43 }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-9 col-lg-9">
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Thống kê doanh thu</h6>
                                <div className="dropdown no-arrow">
                                    <a className="dropdown-toggle" href="/admin" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" />
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
                                        <div className="dropdown-header">Tùy chọn:</div>
                                        <span className="dropdown-item" >2023</span>
                                        <span className="dropdown-item" >2024</span>
                                        <span className="dropdown-item" >2025</span>
                                        <span className="dropdown-item" >2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Chart yearSelected />
                    </div>
                </div>                
            </div>
        </div>
    );
}

export default Dashboard;