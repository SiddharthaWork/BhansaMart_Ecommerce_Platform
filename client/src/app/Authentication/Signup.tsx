import loginBg from "../../assets/images/extras/loginBg.png"
import companylogo from "../../assets/images/companylogo.svg"
// import { Icon } from '@iconify/react/dist/iconify.js'
import * as Yup from 'yup';
import MasterForm from "../../components/shared/MasterForm";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/api/rest/authApi";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";


const Signup = () => {
    const [getRegister] = useRegisterMutation();
    // const dispatch = useDispatch();
    const navigate = useNavigate();

    const fields = [
        {
            name: "name",
            label: "Name",
            type: "text",
            placeholder: "",
            // icon: "iconamoon:profile-thin",
        },
        {
            name: "email",
            label: "Email Address",
            type: "email",
            placeholder: "",
            // icon: "mdi-light:email",
        },
        {
            name: "phone",
            label: "Phone Number",
            type: "string",
            placeholder: "",
        },
        {
            name: "address",
            label: "Address",
            type: "text",
            placeholder: "",
        },
        {
            name: "dob",
            label: "Date of Birth",
            type: "date",
            placeholder: "",
        },
        {
            name: "gender",
            label: "Gender",
            type: "select",
            placeholder: "Select a gender",
            options: [
                {
                    label: "Male",
                    value: "male"
                },
                {
                    label: "Female",
                    value: "female"
                },
                {
                    label: "Other",
                    value: "OTHER"
                },
                // {
                //     label: "Prefer Not To Say",
                //     value: "PREFER_NOT_TO_SAY"
                // }

            ],
        },
        {
            name: "referralCode",
            label: "Referral Code",
            type: "string",
            placeholder: "Enter Referral Code if referred by a user",
        },
        {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "",
            // icon: "material-symbols-light:lock-outline",
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "",
            // icon: "material-symbols-light:lock-outline",
        },

    ]

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Email must be a valid email address").required("Email is required"),
        address: Yup.string().required("Address is required"),
        phone: Yup.string()
            .matches(/^9\d{9}$/, "Phone number must be 10 digits and start with 9")
            .required("Phone Number is required"),
        dob: Yup.date().required("Date of birth is required"),
        gender: Yup.string().required("Gender is required"),
        referralCode: Yup.string(),
        password: Yup.string().required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number and be at least 8 characters long"),
        confirmPassword: Yup.string().required("Confirm Password is required")
            .oneOf([Yup.ref('password')], "Passwords Don't Match"),


    });

    const handleSubmit = async (values: any) => {
        console.log("Form Values:", values);

        try {
            const res = await getRegister(values).unwrap();
            console.log('ress', res)

            if (res?.success) {
                toast.success('Successfully Signed Up');
                navigate("/email-verification");
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Sign Up failed, Try Again");

        }


    }

    // const handleSignupSuccess = async () => {

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

    const handleSignupSuccess = async (response: any) => {
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

    const handleSignupError = () => {
        console.error("Google login failed");
    };

    return (

        <div className='flex flex-col w-full h-full lg:flex-row'>
            <div className='flex items-center justify-center w-full h-full lg:w-1/2'>
                <div className="flex items-center justify-center w-full p-5 bg-gray-50 lg:p-6">
                    <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md lg:bg-gray-50 lg:shadow-none lg:max-w-lg">
                        <div className="flex justify-center mb-2">
                            <img
                                src={companylogo}
                                alt="Bhansa Mart Logo"
                                className="h-[3.8rem]"
                            />
                        </div>

                        <h2 className="mb-3 text-2xl font-bold text-center text-gray-800">
                            Create an Account
                        </h2>
                        <MasterForm
                            fields={fields}
                            validationSchema={SignupSchema}
                            onSubmit={handleSubmit}
                            buttonLabel="Sign Up"
                            fieldStyle="border-b -mt-2 bg-white border-gray-400 rounded-none focus:outline-none focus:ring-0 focus:ring-[#024756]"
                            selectStyle="border-none ring-0 focus:ring-0 focus:outline-none"
                            additionalContent={
                                <>
                                    {/* <div className="flex items-center justify-between mb-4">
                                        <label className="flex items-center text-sm text-gray-600">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 mr-2 text-blue-500 border-gray-300 rounded"
                                            />
                                            Remember me
                                        </label>
                                        <Link
                                            to="/forgotpass"
                                            className="text-sm text-[#1E7486] hover:underline focus:outline-none"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <p className="mb-4 text-xs text-center text-gray-500">
                                        By continuing you agree to our{" "}
                                        <Link
                                            to="/forgotpass"
                                            className="text-blue-500 hover:underline"
                                        >
                                            Terms of Services
                                        </Link>
                                        <span> &</span>
                                        <Link
                                            to="/forgotpass"
                                            className="pl-1 text-blue-500 hover:underline"
                                        >
                                            Privacy Policy
                                        </Link>
                                        .
                                    </p> */}
                                </>
                            }
                        />

                        <div className="flex items-center mb-4">
                            <hr className="flex-grow border-gray-300" />
                            <span className="mx-4 text-sm text-gray-500">OR</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>
                        <GoogleOAuthProvider clientId="226521254567-llbjact64ihk84v0blp3ju1sjjs5bp3j.apps.googleusercontent.com">
                            {/* <button className="w-full flex items-center justify-center border border-gray-300 text-gray-800 font-medium py-2.5 gap-2 rounded-lg hover:bg-gray-100"
                                onClick={handleSignupSuccess}>
                                Sign Up with Google */}
                            <GoogleLogin
                                onSuccess={handleSignupSuccess}
                                onError={handleSignupError}
                                useOneTap
                                text="signup_with"

                            />
                            {/* <Icon icon="flat-color-icons:google" width="22" height="22" />
                            </button>*/}
                        </GoogleOAuthProvider>

                        <p className="mt-4 text-sm text-center text-gray-600">
                            Already have an Account?
                            <Link
                                to="/login"
                                className="text-[#1E7486] hover:underline focus:outline-none ml-1"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
            <div className='hidden w-0 h-[129dvh] lg:w-1/2 lg:flex'>
                <img src={loginBg} className='object-cover w-full h-full' />
            </div>
        </div>
    )
}

export default Signup
