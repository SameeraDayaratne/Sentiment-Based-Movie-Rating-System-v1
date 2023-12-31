/* eslint-disable no-unused-vars */
import React from 'react';
import {GoogleAuthProvider, signInWithPopup , getAuth} from 'firebase/auth'
import {app} from '../firebase.js'
import authUser from '../api/auth.js';
import {useDispatch} from 'react-redux'
import { signInSuccess , signInFaliure } from '../redux/user/userSlice.js'
import {useNavigate} from 'react-router-dom'

function OAuth(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate()

    async function handleGoogleClick() {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth , provider);
            const reqBody = {
                name : result.user.displayName,
                email : result.user.email
            }
            const response = await authUser.post('/google',reqBody ,{withCredentials : true});
            
            if(response.status == 200){
                const accessToken =  response.data.accessToken;
                localStorage.setItem('accessToken' , accessToken);
                dispatch(signInSuccess(response.data.user));
                navigate('/')

            }

        } catch (error) {
            console.log('Could not login with Google' , error);
            dispatch(signInFaliure(error))
        }
    }
    return (
        <button onClick={handleGoogleClick} type='button' className='bg-red-700 font-semibold text-white py-4 px-3 rounded-lg text-center w-full uppercase  border-primary-green-600'>Continue With Google</button>
    );
}

export default OAuth;