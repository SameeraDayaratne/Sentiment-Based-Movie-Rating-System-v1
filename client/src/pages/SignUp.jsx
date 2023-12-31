/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Input from "../components/Input";
import { validateForm } from "../utils/formValidate.js";
import MoviePoster from "../components/MoviePoster";
import { Form, json, useActionData, useNavigation , redirect } from "react-router-dom";
import auth from "../api/auth.js";
import OAuth from "../components/OAuth";
import axios from "axios";


// import {Facebook,GitHub,Google} from '@mui/material/Icon';

function SignUp(props) {
  const [form, setForm] = useState([
    {
      id: "first-name",
      name: "first-name",
      type: "text",
      placeholder: "First name",
      validate: ["isNotEmpty"],
      isValidated: false,
      errorFormName: "First name",
      error: "",
    },
    {
      id: "last-name",
      name: "last-name",
      type: "text",
      placeholder: "Last name",
      validate: ["isNotEmpty"],
      isValidated: false,
      errorFormName: "Last name",
      error: "",
    },
    {
      id: "email",
      name: "email",
      type: "",
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
  const isSigningUp = navigation.state === "submitting";

  // function handleSubmit(event) {
  //     event.preventDefault();
  //     const formData = new FormData(event.target);

  //     setForm(
  //         form.map(eachForm => {
  //             const formStatus = validateForm(
  //                 formData.get(eachForm.name),
  //                 eachForm.validate,
  //                 eachForm.errorFormName
  //             );
  //             eachForm.isValidated = !formStatus.isPass;
  //             eachForm.error = formStatus.message;
  //             return eachForm;
  //         })
  //     );
  // }

  if (data) {
    console.log("data err");
    console.log(data.error);
  }

  return (
    <div className="App">
      <MoviePoster />
      <div className="pt-20 absolute top-0 left-0 right-0 mx-auto lg:min-h-screen font-poppins bg-primary-red-500 bg-intro-mobile lg:bg-intro-desktop overflow-hidden bg-desktop-intro lg:flex py-12">
        <div className="max-w-[1240px] mx-auto container flex flex-grow">
          <div className="mx-3 flex flex-wrap h-full">
            <div className="px-3 py-20 lg:py-0 w-full lg:w-1/2 h-full flex flex-col justify-center items-center">
              <div className="text-white space-y-8 my-auto xl:w-10/12">
                <h1 className="text-4xl lg:text-5xl text-center lg:text-left font-bold">
                  Learn to code by watching others
                </h1>
                <p>
                  See how experienced developers solve problems in real-time.
                  Watching scripted tutorials is great, but understanding how
                  developers think is invaluable.
                </p>
              </div>
            </div>
            <div className="px-3 w-full lg:w-1/2 flex items-center">
              <div className="space-y-8 w-full">
                <Form
                  method="post"
                  className="bg-white rounded-lg shadow-hard-gray"
                >
                  <div className="p-8 text-sm space-y-2">
                    {data && data.errors && (
                      <ul>
                        {Object.values(data.error).map((err) => (
                          <li key={err}>{err}</li>
                        ))}
                      </ul>
                    )}
                    {data && data.error.message && (
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
                    <button
                      disabled={isSigningUp}
                      className="bg-[#ff5100] hover:bg-[#c63600]  font-semibold text-white py-4 px-3 rounded-lg text-center w-full uppercase "
                    >
                      {isSigningUp ? "Signing Up" : "Sign Up"}
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

export default SignUp;

export async function action({ request, params }) {
  const data = await request.formData();

  const userData = {
    firstName: data.get("first-name"),
    lastName: data.get("last-name"),
    email: data.get("email"),
    password: data.get("password"),
  };

  console.log(userData);

  // const res =await fetch("http://localhost:5000/users/register" , {
  //     method : 'POST',
  //     headers : {
  //         'Content-Type' : 'application/json'
  //     },
  //     body : JSON.stringify(userData)
  // })

  try {
    const res = await auth.post("register" , userData );

    console.log(res);

    let responseOK = res && res.status === 201 && res.statusText === "Created";
    if(responseOK)
    {
        console.log('okayyy');
        return redirect('/login');
    }

    // console.log("res data are ");
    // console.log(res);

    // let responseOK = res && res.status === 201 && res.statusText === "OK";

    

    // if (!responseOK) {
    //   throw json({ message: "Could not Sign Up user" }, { status: 500 });
    // }
  } catch (error) {

    if (error.response.status === 422 || error.response.status === 401 || error.response.status === 409) {
        console.log('in res error');
      return error.response.data;
    }
    else{
        return error.response.data;
    }
    
  }

  // const accessToken = resData.accessToken;
  // const refreshToken = resData.refreshToken;
  // localStorage.setItem("accessToken" , accessToken);
  // localStorage.setItem("refreshToken" , refreshToken);

  return null;
}
