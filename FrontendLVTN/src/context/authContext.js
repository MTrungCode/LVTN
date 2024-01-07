import axios from "axios";
import { createContext } from "react";
import { useLocalState } from "../util/useLocalStorage";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useLocalState("", "user");
    const [currentStaff, setCurrentStaff] = useLocalState("", "staff");
    const [jwtUser, setJwtUser] = useLocalState("", "jwtUser");
    const [jwtAdmin, setJwtAdmin] = useLocalState("", "jwtAdmin");

    const login = async (inputs) => {
        if (!jwtUser) {
            const res = await axios.post("http://localhost:5000/api/auths/login", inputs);                 
            setCurrentUser(res.data[0])
            setJwtUser(res.data[1]);        
        }
    };

    const loginAdmin = async (inputs) => {
        if (!jwtAdmin) {
            const res = await axios.post("http://localhost:5000/api/staffs/login", inputs);        
            setCurrentStaff(res.data[0]);
            setJwtAdmin(res.data[1]);
        }
    };

    const logout = async () => {
        await axios.post("http://localhost:5000/api/auths/logout");
        setCurrentUser("");
        setJwtUser("");
    };

    const logoutAdmin = async () => {
        await axios.post("http://localhost:5000/api/staffs/logout");
        setCurrentStaff("");
        setJwtAdmin("");
    };

    const updateUser = async (userid) => {
        const res = await axios.get(`http://localhost:5000/api/auths/${userid}`);
        setCurrentUser(res.data[0]);
    }

    return <AuthContext.Provider value={{currentUser, currentStaff, login, loginAdmin, logout, logoutAdmin, updateUser}}>
            {children}
        </AuthContext.Provider>;
};