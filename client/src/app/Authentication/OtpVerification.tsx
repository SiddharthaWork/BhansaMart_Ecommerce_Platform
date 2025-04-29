import loginBg from "../../assets/images/extras/loginBg.png";
import companylogo from "../../assets/images/companylogo.svg";
import * as Yup from "yup";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import React, { useState } from "react";
import DotSpinner from "../../components/ui/DotSpinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForgotPasswordMutation, useOtpVerificationMutation } from "../../redux/api/rest/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../redux/slices/configUser";


const OtpVerification = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [getForgotPass] = useForgotPasswordMutation();
    const [getVerifyOTP] = useOtpVerificationMutation();
    const [isOtpRequestAllowed, setIsOtpRequestAllowed] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { email } = useSelector((state: any) => state.email);


    const fields = [
        { name: "otp1", label: "OTP Digit 1" },
        { name: "otp2", label: "OTP Digit 2" },
        { name: "otp3", label: "OTP Digit 3" },
        { name: "otp4", label: "OTP Digit 4" },
        { name: "otp5", label: "OTP Digit 5" },
        { name: "otp6", label: "OTP Digit 6" },
    ];

    // Validation schema using Yup
    const OtpSchema = Yup.object().shape(
        fields.reduce((schema: Record<string, Yup.AnySchema>, field) => {
            schema[field.name] = Yup.string()
                .required("Required")
                .matches(/^[0-9]$/, "Must be a digit");
            return schema;
        }, {})
    );

    const handleSubmit = async (values: Record<string, string>) => {
        setIsSubmitting(true);
        try {
            const otp = Object.values(values).join("");
            const res = await getVerifyOTP(otp).unwrap();
            console.log("resz", res)
            if (res?.success) {
                toast.success("OTP Verified Successfully!");
                dispatch(setToken(res?.data))
                navigate("/change-password");
            }


        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "OTP Verification Failed!");
        } finally {
            setIsSubmitting(false);
        }
    };
    const formik = useFormik({
        initialValues: fields.reduce((values: Record<string, string>, field) => {
            values[field.name] = "";
            return values;
        }, {}),
        validationSchema: OtpSchema,
        onSubmit: handleSubmit,
    });

    const handleOtpRequest = async () => {
        if (!email) {
            toast.error("No email found. Please submit the form first.");
            navigate('/reset-password');
            return;
        }
        if (!isOtpRequestAllowed) {
            toast.error(`Please wait ${timeRemaining} seconds before requesting a new OTP.`);
            return;
        }

        try {
            const res = await getForgotPass({ email }).unwrap();
            if (res?.success) {
                toast.success(res?.message || "New OTP Sent Successfully!");

                setIsOtpRequestAllowed(false);
                setTimeRemaining(60);

                const interval = setInterval(() => {
                    setTimeRemaining((prevTime) => {
                        if (prevTime <= 1) {
                            clearInterval(interval);
                            setIsOtpRequestAllowed(true);
                            return 0;
                        }
                        return prevTime - 1;
                    });
                }, 1000);
            }
        } catch (err: any) {
            console.log(err);
            toast.error(err?.data?.message || "Could't send OTP, Try Again");
        }

    }


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        const maxLength = 1;

        // Only allow single digit numbers
        if (value.match(/^\d{0,1}$/)) {
            formik.setFieldValue(fields[index].name, value);

            // Move to the next input if the current one is filled
            if (value.length === maxLength && index < fields.length - 1) {
                document.getElementsByName(fields[index + 1].name)[0].focus();
            }
        }
    };

    return (
        <div className="flex flex-col w-full h-full lg:flex-row">
            <div className="flex items-center justify-center w-full lg:w-1/2 h-[100vh]">
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
                            Enter Your Verification
                        </h2>
                        <p className="mb-5 text-sm text-center">
                            We sent an OTP to your email, enter it here
                        </p>

                        <form onSubmit={formik.handleSubmit} autoComplete="off">
                            <div className="flex justify-center gap-[6px] mb-5 md:gap-2">
                                {fields.map((field, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <input
                                            name={field.name}
                                            type="number"
                                            maxLength={1}
                                            className={`lg:w-12 lg:h-12 md:w-11 md:h-11 w-9 h-9 text-center border rounded-md focus:outline-none focus:ring-1 ${formik.errors[field.name] && formik.touched[field.name]
                                                ? "border-red-500 focus:ring-red-500"
                                                : "focus:ring-[#024756] focus:border-[#024756]"
                                                }`}
                                            value={formik.values[field.name]}
                                            onChange={(e) => handleInputChange(e, index)}
                                            onBlur={formik.handleBlur}
                                            onKeyDown={(e) => {
                                                if (e.key === "Backspace" && !formik.values[field.name] && index > 0) {
                                                    document.getElementsByName(fields[index - 1].name)[0].focus();
                                                }
                                            }}
                                        />
                                        {formik.errors[field.name] &&
                                            formik.touched[field.name] &&
                                            (
                                                <span className="mt-1 md:text-xs sm:text-[10px] text-[9px] text-red-500">
                                                    {formik.errors[field.name] as string}
                                                </span>
                                            )}
                                    </div>
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center bg-[#024756] hover:bg-teal-700 text-white font-medium py-2.5 rounded-lg mb-4"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <DotSpinner customClassName="w-10" /> : "Verify"}
                            </button>
                        </form>

                        <p className="mt-4 text-sm text-left text-gray-600">
                            <button onClick={handleOtpRequest} disabled={!isOtpRequestAllowed} className="text-[#1E7486] flex flex-row hover:underline focus:outline-none gap-2 items-center"
                            >
                                {isOtpRequestAllowed ? "Request a new one" : `Request new OTP in ${timeRemaining}s`}
                                <Icon
                                    icon="humbleicons:arrow-right"
                                    width="18"
                                    height="18"
                                    style={{ color: "#1E7486" }}
                                />
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden w-0 lg:w-1/2 lg:flex h-[100vh]">
                <img src={loginBg} className="object-cover w-full h-full" />
            </div>
        </div>
    );
};

export default OtpVerification;
