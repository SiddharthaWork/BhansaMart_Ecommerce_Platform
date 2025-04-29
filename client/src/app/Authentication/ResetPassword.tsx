import loginBg from "../../assets/images/extras/loginBg.png"
import companylogo from "../../assets/images/companylogo.svg"
// import { Icon } from '@iconify/react/dist/iconify.js'
import * as Yup from 'yup';
import MasterForm from "../../components/shared/MasterForm";
import { Link, useNavigate } from "react-router-dom";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "../../redux/api/rest/authApi";
import { useDispatch } from "react-redux";
import { setEmail } from "../../redux/slices/emailSlice";

const ResetPassword = () => {

    const [getForgotPass] = useForgotPasswordMutation();
    const dispatch = useDispatch();

    const fields = [
        {
            name: "email",
            label: "Email",
            type: "email",
            // placeholder: "Email address",
            // icon: "mdi-light:email",
        },
    ]

    const ResetSchema = Yup.object().shape({
        email: Yup.string().email("Email must be a valid email address").required("Email is required"),
    });
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        try {
            console.log("Form Values:", values);
            const res = await getForgotPass(values).unwrap();
            console.log('ress', res)
            if (res?.success) {
                toast.success(res?.message || "Email Sent Successfully!");
                dispatch(setEmail(values.email));
                navigate("/otp-verification");
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Could't send OTP, Try Again");
        }

    }


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
                            Reset Password
                        </h2>
                        <p className="mb-5 text-sm text-center">Enter your email, and we’ll send you a link to change your password</p>
                        <MasterForm
                            fields={fields}
                            validationSchema={ResetSchema}
                            onSubmit={handleSubmit}
                            buttonLabel="Send"
                            fieldStyle="border-b border-gray-400 focus:outline-none focus:ring-0 focus:ring-[#024756] bg-white"
                            buttonStyle="mt-6"
                            additionalContent={
                                <>
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
                                text="signup_with"
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

export default ResetPassword;
