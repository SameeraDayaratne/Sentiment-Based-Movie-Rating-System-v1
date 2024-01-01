/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { validateForm } from "../utils/formValidate.js";
import MoviePoster from "../components/MoviePoster";
import { Form, useActionData , useNavigation , redirect , useNavigate} from "react-router-dom";
import auth from "../api/auth.js";
import {useDispatch} from 'react-redux'
import {signInSuccess ,signInFaliure} from '../redux/user/userSlice.js'
import OAuth from "../components/OAuth";
import MainPageBackdrop from "../components/MainPageBackdrop";
// import {Facebook,GitHub,Google} from '@mui/material/Icon';

function Login(props) {
  const [form, setForm] = useState([
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "Email",
      validate: ["isNotEmpty", "isEmail"],
      isValidated: false,
      errorFormName: "Email",
      error: "",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      validate: ["isNotEmpty"],
      isValidated: false,
      errorFormName: "Password",
      error: "",
    },
  ]);

  const data = useActionData();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogginIn = navigation.state == 'submitting' 

  useEffect(()=> {
    if(data && data.success){
        dispatch(signInSuccess(data.user));
        navigate('/');
    }
    else if(data && data.error){
        dispatch(signInFaliure(data.error))
    }

  }, [data , dispatch , navigate]);

  

//   function handleSubmit(event) {
//     event.preventDefault();
//     const formData = new FormData(event.target);

//     setForm(
//       form.map((eachForm) => {
//         const formStatus = validateForm(
//           formData.get(eachForm.name),
//           eachForm.validate,
//           eachForm.errorFormName
//         );
//         eachForm.isValidated = !formStatus.isPass;
//         eachForm.error = formStatus.message;
//         return eachForm;
//       })
//     );
//   }

  return (
    <div className="App">
      <MainPageBackdrop backdrop_path='/xJHokMbljvjADYdit5fK5VQsXEG.jpg' />
      <div className="pt-20 absolute top-0 left-0 right-0 mx-auto  lg:min-h-screen font-poppins bg-primary-red-500 bg-intro-mobile lg:bg-intro-desktop overflow-hidden bg-desktop-intro lg:flex py-12">
        <div className="max-w-[1240px] mx-auto container flex flex-grow">
          <div className="mx-3 flex flex-wrap h-full">
            <div className="px-3 py-20 lg:py-0 w-full lg:w-1/2 h-full flex flex-col justify-center items-center">
              <div className="text-white space-y-8 my-auto xl:w-10/12">
                <h1 className="text-4xl lg:text-5xl text-center lg:text-left font-bold">
                  Welcome back, movie lover.
                </h1>
                <p>
                Log in to explore your personalized movie recommendations and ratings. Discover a world of cinematic wonders curated just for you.
                </p>
              </div>
            </div>
            <div className="px-3 w-full lg:w-1/2 flex items-center">
              <div className="space-y-8 w-full">
                <Form
                  className="bg-white rounded-lg shadow-hard-gray"
                  method="post"
                >
                  <div className="p-8 text-sm space-y-2">
                    {data && !data.success && data.errors && (
                      <ul>
                        {Object.values(data.error).map((err) => (
                          <li key={err}>{err}</li>
                        ))}
                      </ul>
                    )}
                    {data && !data.success && data.error.message && (
                      <p className="text-center text-red-600">
                        {data.error.message}
                      </p>
                    )}

                    {form.map((_form, _index) => {
                      return (
                        <Input
                          key={`form-${_index}`}
                          id={_form.id}
                          name={_form.name}
                          type={_form.type}
                          placeholder={_form.placeholder}
                          isValidated={_form.isValidated}
                          error={_form.error}
                        />
                      );
                    })}
                    <button className="bg-[#ff5100] hover:bg-[#c63600]  font-semibold text-white py-4 px-3 rounded-lg text-center w-full uppercase">
                      {isLogginIn ?'Logging In' :'Login'}
                    </button>
                    <OAuth />
                    <p className="text-center text-neutral-grayish-blue-500 text-[12px]">
                      By clicking the button, you are agreeing to our
                      <a
                        className="text-primary-red-500 font-semibold ml-1"
                        href="/"
                        onClick={(e) => e.preventDefault()}
                      >
                        Terms and Services
                      </a>
                    </p>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

export async function action({ request, params }) {
  const formData = await request.formData();

  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await auth.post("/login", user , {withCredentials : true});

    let responseOK = response && response.status === 200 && response.statusText === "OK";
    if(responseOK)
    {
        const accessToken =  response.data.accessToken;
        localStorage.setItem('accessToken' , accessToken);
        // console.log(response.data);
        return response.data;
        // return redirect('/');
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
      return error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return error.response.data;
    } else {
      // Something happened in setting up the request that triggered an Error
      // console.log('Error', error.message);

      return error.response.data;
    }
  }



}
