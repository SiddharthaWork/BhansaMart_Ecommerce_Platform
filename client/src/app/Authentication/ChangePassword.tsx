import loginBg from "../../assets/images/extras/loginBg.png"
import companylogo from "../../assets/images/companylogo.svg"
// import { Icon } from '@iconify/react/dist/iconify.js'
import * as Yup from 'yup';
import MasterForm from "../../components/shared/MasterForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "../../redux/api/rest/authApi";



const ChangePassword = () => {
    const [getResetPassword] = useResetPasswordMutation();

    const fields = [
        {
            name: "newPassword",
            label: "Password",
            type: "password",
            // placeholder: "Email address",
            // icon: "mdi-light:email",
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            // placeholder: "Email address",
            // icon: "mdi-light:email",
        },
    ]

    const ResetSchema = Yup.object().shape({
        newPassword: Yup.string().required("Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number and be at least 8 characters long"
            ),
        confirmPassword: Yup.string().required("Confirmed Password is required")
            .oneOf([Yup.ref('newPassword')], "Passwords Don't Match"),
    });

    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        try {
            console.log("Form Values:", values);
            const res = await getResetPassword(values).unwrap();
            console.log('ress', res)
            if (res?.success) {
                toast.success(res?.message || "Password Changed Successfully!");
                navigate("/login");
            }

        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Password Change failed, Try Again");
        }


    }





    return (
        <div className='flex flex-col w-full h-full lg:flex-row'>
            <div className='flex items-center justify-center w-full lg:w-1/2 h-[100vh]'>
                <div className="flex items-center justify-center w-full h-full p-5 lg:p-6 bg-gray-50">
                    <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md lg:bg-gray-50 lg:shadow-none lg:max-w-lg">
                        <div className="flex justify-center mb-6">
                            <img
                                src={companylogo}
                                alt="Bhansa Mart Logo"
                                className="h-16"
                            />
                        </div>

                        <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
                            Change Password
                        </h2>
                        <p className="mb-5 text-sm text-center">Enter your email, and we’ll send you a link to change your password</p>
                        <MasterForm
                            fields={fields}
                            validationSchema={ResetSchema}
                            onSubmit={handleSubmit}
                            buttonLabel="Change Password"
                            fieldStyle="border-b border-gray-400 focus:outline-none focus:ring-0 focus:ring-[#024756] bg-white"
                            buttonStyle="mt-6"
                            additionalContent={
                                <>
                                </>
                            }
                        />
                    </div>
                </div>

            </div>
            <div className='hidden w-0 lg:w-1/2 lg:flex h-[100vh]'>
                <img src={loginBg} className='object-cover w-full h-full' />
            </div>
        </div>
    )
}

export default ChangePassword;
