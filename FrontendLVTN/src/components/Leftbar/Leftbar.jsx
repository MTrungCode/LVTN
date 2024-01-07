import { useEffect, useState } from "react";
import "./Leftbar.scss";
import axios from "axios";
import { Link } from "react-router-dom";

const Leftbar = () => {
    const [typecates, setTypecate] = useState([]);
    const [categories, setCategory] = useState([]);
    
    useEffect(() => {
        const fetchTypecate = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/typecates");
                setTypecate(res.data);
            } catch (error) {
                console.log(error)
            }
        };
        fetchTypecate();

        const fetchCategory = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/categories");                
                setCategory(response.data);
            } catch (error) {
                console.log(error)
            }
        };
        fetchCategory();
    }, []);
        
    return (
        <div className="leftbar">
            <div className="leftbarWrapper">                
                <ul className="leftbarList">
                    {typecates.map((typecate) => (                        
                        <li className="leftbarListItem" key={typecate.typecate_id}>
                            <Link className="leftbarLink" to={`/typecate?tcate=${typecate.typecate_name}`} state={typecate}>
                                {typecate.typecate_name}                                
                            </Link>
                            <div className="drop-down">
                                <div className="d-flex flex-wrap">
                                    {categories.map(category => (
                                        category.typecate_id === typecate.typecate_id
                                            ? <div className="col-lg-3" key={category.cate_id}>
                                                <h3><Link className="cateLink" to={`/category?cate=${category.cate_name}`} state={category}>{category.cate_name}</Link></h3>
                                            </div>
                                            : null
                                    ))}
                                </div>
                            </div>
                        </li>                      
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Leftbar;