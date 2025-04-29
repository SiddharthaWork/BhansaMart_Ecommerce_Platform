import React, { useEffect } from "react";
import MasterForm from "../../../components/shared/MasterForm";
import * as Yup from 'yup';
import { Icon } from "@iconify/react";
import { useChangePasswordMutation } from "../../../redux/api/rest/authApi";
import { toast } from "react-toastify";


interface ChangePassType {
    isOpen?: boolean;
    onClose?: () => void;
}

const ChangePassDialog: React.FC<ChangePassType> = ({ isOpen, onClose }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen])

    const [getChangePassword] = useChangePasswordMutation();

    const fields = [
        {
            name: "oldPassword",
            label: "Old Password",
            type: "password",
            placeholder: "Password",
            // icon: "material-symbols-light:lock-outline",
        },
        {
            name: "newPassword",
            label: "New Password",
            type: "password",
            placeholder: "Password",
            // icon: "material-symbols-light:lock-outline",
        },
    ]
    const ChangPassSchema = Yup.object().shape({
        oldPassword: Yup.string().required("Old Password is required"),
        newPassword: Yup.string().required("New Password is required")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number and be at least 8 characters long"),
    });

    const handleSubmit = async (values: any) => {
        try {
            console.log("Form Values:", values);
            const res = await getChangePassword(values).unwrap();
            console.log('resss', res)
            if (res?.success) {
                toast.success(res?.message || "Password Changed SuccessFully");
                if (onClose) onClose();

            }

        } catch (error: any) {
            const errorMessage = error?.data?.message || "Password Change Failed";
            toast.error(errorMessage);

        }

    };

    if (!isOpen) return null;

    return (
        <div className="fixed md:px-0 px-5 inset-0 flex items-center justify-center bg-gray-700 bg-opacity-30 backdrop-blur-[1px] z-40">
            <div className="relative p-6 bg-white rounded-lg shadow-lg w-96">
                <div className="flex flex-row items-center justify-between pb-4">
                    <h2 className="text-xl font-semibold ">Change Password</h2>
                    <Icon icon="line-md:close-circle-filled" width="24" height="24" onClick={onClose} />
                </div>
                <MasterForm
                    fields={fields}
                    validationSchema={ChangPassSchema}
                    onSubmit={handleSubmit}
                    fieldStyle="outline-1 outline-[#024756]"
                    buttonLabel="Submit"
                    buttonStyle="text-sm mt-5"
                />
            </div>
        </div>
    );
};

export default ChangePassDialog;
