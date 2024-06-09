import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";


const LogoutButton = () => {

    const {loading, logout} = useLogout();
    console.log("logoutbutton loading", loading);
    return (
        <button className='mt-auto'>
            {/* <BiLogOut className='w-6 h-6 text-white cursor-pointer' 
                onclick={logout}/> */}
            {!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
        </button>
    );
}

export default LogoutButton;