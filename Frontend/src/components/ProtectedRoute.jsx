import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../axiosConfig";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        checkForLogin();
    }, []);


    async function checkForLogin() {
        try {
            const response = await instance .get("/user/check", { withCredentials: true });
            if (response.status === 200) {
                setIsLoggedIn(true);
            }
        } catch (error) {
            setIsLoggedIn(false);
            setLoading(true);
        } finally {
            setLoading(false);
        }
    }
    if (loading) return <div>Loading...</div>;

    if (!isLoggedIn) navigate("/login");

    return children;

}
export default ProtectedRoute;