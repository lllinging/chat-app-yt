import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext.jsx';

const useLogout = () => {
    //loading, setLoading are used to show the loading spinner when the user clicks the logout button to indicate that the request is being processed. Therefore, we need to keep track of the loading state. Otherwise, the user might click the logout button multiple times.
    const [loading, setLoading] = useState(false);//
    const {setAuthUser} = useAuthContext();

    const logout = async () => {
        //setLoading(true) is called to set the loading state to true when the user clicks the logout button.
        setLoading(true);
        try {
            // "http://localhost:5000/api/auth/logout"
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();
            console.log(data);

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user");
            setAuthUser(null);

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
        
        
    };

    return {loading, logout};
}

export default useLogout;