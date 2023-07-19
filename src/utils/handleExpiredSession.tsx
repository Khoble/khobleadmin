import { useNavigate } from "react-router-dom";


export default function handleExpiredSession() {
    const navigate = useNavigate();
    localStorage.removeItem("khoble-session")
    navigate("/login", { replace: true })
}