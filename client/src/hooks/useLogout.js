
import {useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logOutSuccess } from '../redux/user/userSlice.js';
import auth from '../api/auth.js';
function useLogout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function handleLogOut() {

        try {
           const response = await auth.delete('/logout' , {withCredentials : true})

           if(response.status === 204)
           {
               localStorage.removeItem('accessToken');
               // cookies.remove('jwt');
               dispatch(logOutSuccess());
               navigate('/');

           }
        } catch (error) {
           
           console.log(error);
           localStorage.removeItem('accessToken');
               // cookies.remove('jwt');
               dispatch(logOutSuccess());
               navigate('/');
        }

   }

   return handleLogOut;
}

export default useLogout;