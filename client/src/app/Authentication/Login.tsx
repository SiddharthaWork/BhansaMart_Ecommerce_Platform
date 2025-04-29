import loginBg from "../../assets/images/extras/loginBg.png"
import companylogo from "../../assets/images/companylogo.svg"
// import { Icon } from '@iconify/react/dist/iconify.js'
import * as Yup from 'yup';
import MasterForm from "../../components/shared/MasterForm";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useLoginMutation } from "../../redux/api/rest/authApi";
import { setToken, setUser } from "../../redux/slices/configUser";


const Login = () => {

    const [getLogin] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fields = [
        {
            name: "email",
            label: "Email Address",
            type: "email",
            placeholder: "Email address",
            icon: "mdi-light:email",
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Password",
            icon: "material-symbols-light:lock-outline",
        },
    ]

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email("Email must be a valid email address").required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const handleSubmit = async (values: any) => {
        try {
            console.log("Form Values:", values);
            const res = await getLogin(values).unwrap();
            console.log('resss', res)
            if (res?.success) {
                dispatch(setToken(res?.data?.token));
                dispatch(setUser(res?.data?.user))
                Cookies.set("RSM", res?.data?.token);
                localStorage.setItem("token", res?.data?.token);
                localStorage.setItem("user", JSON.stringify(res?.data?.user));

                toast.success(res.message);
                navigate("/dashboard");


            }
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Login failed, Try Again");

        }


    }

    // const handleLoginSuccess = async () => {
    //     const width = 500;
    //     const height = 600;
    //     const left = window.screenX + (window.outerWidth - width) / 2;
    //     const top = window.screenY + (window.outerHeight - height) / 2;

    //     const popup = window.open(
    //         "http://192.168.1.86:8080/google",
    //         "Google Login",
    //         `width = ${width}, height = ${height}, left = ${left}, top = ${top}`
    //     );

    //     window.addEventListener("message", (event) => {
    //         if (event.origin === "http://your-backend-url") {
    //             if (event.data.success) {
    //                 console.log("Google login successful");
    //                 popup?.close();
    //             } else {
    //                 console.error("Google login failed");
    //             }
    //         }
    //     });

    // };


    const handleLoginSuccess = async (response: any) => {
        try {
            const { credential } = response;
            console.log(response, "credential");
            const res = await fetch("http://localhost:8080/api/v1/en/google", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ credential }),
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.statusText}`);
            }

            const data = await res.json();
            console.log("Tokens from backend:", data);
        } catch (error: any) {
            console.error("Error during login:", error.message);
        }
        console.log("Google login succes", response);
    };

    const handleLoginError = () => {
        console.error("Google login failed");
    };



    return (
        <div className='flex flex-col w-full h-full lg:flex-row'>
            <div className='flex items-center justify-center w-full lg:w-1/2 h-[100vh]'>
                <div className="flex items-center justify-center w-full h-full p-5 lg:p-6 bg-gray-50">
                    <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md lg:bg-gray-50 lg:shadow-none lg:max-w-lg">
                        <div className="flex justify-center mb-6">
                            <img
                                src={companylogo}
                                alt="Bhansa Mart Logo"
                                className="h-16"
                            />
                        </div>

                        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
                            Welcome Back
                        </h2>
                        <MasterForm
                            fields={fields}
                            validationSchema={LoginSchema}
                            onSubmit={handleSubmit}
                            buttonLabel="Log In"
                            fieldStyle="border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#024756]"
                            additionalContent={
                                <>
                                    <div className="flex items-center justify-between mb-4">
                                        <label className="flex items-center text-sm text-gray-600">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 mr-2 text-blue-500 border-gray-300 rounded"
                                            />
                                            Remember me
                                        </label>
                                        <Link
                                            to="/reset-password"
                                            className="text-sm text-[#1E7486] hover:underline focus:outline-none"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <p className="mb-4 text-xs text-center text-gray-500">
                                        By continuing you agree to our{" "}
                                        <Link
                                            to=""
                                            className="text-blue-500 hover:underline"
                                        >
                                            Terms of Services
                                        </Link>
                                        <span> &</span>
                                        <Link
                                            to=""
                                            className="pl-1 text-blue-500 hover:underline"
                                        >
                                            Privacy Policy
                                        </Link>
                                        .
                                    </p>
                                </>
                            }
                        />

                        <div className="flex items-center mb-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="mx-4 text-sm text-gray-500">OR</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <GoogleOAuthProvider clientId="226521254567-llbjact64ihk84v0blp3ju1sjjs5bp3j.apps.googleusercontent.com">
                            {/* <button
                                onClick={handleLoginSuccess}
                                className="w-full flex items-center justify-center border border-gray-300 text-gray-800 font-medium py-2.5 gap-2 rounded-lg hover:bg-gray-100">
                                Sign in with Google */}
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                                onError={handleLoginError}
                                useOneTap
                            />
                            {/* <Icon icon="flat-color-icons:google" width="22" height="22" />
                            </button> */}
                        </GoogleOAuthProvider>

                        <p className="mt-4 text-sm text-center text-gray-600">
                            Don’t have an Account?{" "}
                            <Link
                                to="/signup"
                                className="text-[#1E7486] hover:underline focus:outline-none"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
            <div className='hidden w-0 lg:w-1/2 lg:flex h-[100vh]'>
                <img src={loginBg} className='object-cover w-full h-full' />
            </div>
        </div>
    )
}

export default Login
