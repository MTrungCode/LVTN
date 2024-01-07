import React from 'react';

const CircleAccount = ({ user }) => {
    return (
        <div>
            <nav className="navbar navbar-expand navbar-light topbar mb-4 static-top">
                <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                    <i className="fa fa-bars" />
                </button>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item no-arrow">
                        <div className="nav-link d-flex flex-column">
                            {user.avatar !== null
                                ? <img className=" mt-2 img-thumbnail rounded-circle"
                                    src={`uploads/${user.avatar}`} alt=''
                                    style={{ padding: "0.2rem", maxWidth: "20mm" }}
                                />
                                : <img className=" mt-2 img-thumbnail rounded-circle"
                                        src="/assets/ava4.jpg" alt=''
                                        style={{ padding: "0.2rem", maxWidth: "20mm" }}
                                    />
                            }                            
                            <span className="mt-0 d-none d-lg-inline fw-bold text-gray-600 small">{user.username}</span>
                            <span className="mt-3 mr-0 d-none d-lg-inline fw-bold text-gray-600 small">Điểm EG: {user.pointsEG}</span>                            
                        </div>                        
                    </li>
                </ul>                
            </nav>
        </div>
    );
}

export default CircleAccount;