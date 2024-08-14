import { useNavigate } from "react-router-dom";
export const CheckToken=()=>{
    const navigate=useNavigate();
    const token=localStorage?.getItem('token');
    if(!token){
        navigate('/login');
    }
    return token;
}