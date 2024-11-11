import { useNavigate,Link } from "react-router-dom";
import logo from "../../images/logo.jpeg"
import "./agentnav.css"


export const AgentNavbar = () => {
  const navigate = useNavigate();


return(
    <div className="agetn-nav-bg">
     <img onClick={()=>navigate("/agenthome")} className="logo-agent-nav" src={logo}/>
     <h1 className="agent-system-heading-nav">Agent System</h1>

    </div>
)

}