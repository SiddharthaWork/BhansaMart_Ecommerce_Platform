import React, { useEffect } from "react";
import * as Yup from 'yup';
import MasterForm from "../../../components/shared/MasterForm";
import { Icon } from "@iconify/react/dist/iconify.js";

// interface Review {
//     rating: number;
//     reviewText: string;
// }

interface ReviewProps {
    open: boolean;
    handleClose: () => void;
    handleSubmit: (reviewText: string, rating: number) => void;
}

const ReviewDialog: React.FC<ReviewProps> = ({ open, handleClose, handleSubmit }) => {

    if (!open) return null;

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open])

    const fields = [
        {
            name: "rating",
            label: "Rating (1-5) Star",
            type: "text",
            placeholder: "",
        },
        {
            name: "reviewText",
            label: "Review",
            type: "text",
            placeholder: "",
        }
    ]
    const ReviewSchema = Yup.object().shape({
        rating: Yup.number().required('Rating is required')
            .min(1, "Rating must be at least 1")
            .max(5, "Rating must be less than 5")
            .integer("Rating must be a whole number"),
        reviewText: Yup.string().required("Review Text is Required")
            .matches(/^\S.*/, "Review text cannot start with a space"),

    });

    const submitReview = async (values: any) => {
        const { reviewText, rating } = values;
        handleSubmit(reviewText, rating);
        console.log(values);
        handleClose();
    };




    return (
        <div className="fixed md:px-0 px-5 inset-0 z-40 flex items-center justify-center bg-gray-700 bg-opacity-30 backdrop-blur-[0.5px]">
            <div className="p-6 bg-white rounded-lg shadow-lg w-96">
                <div className="flex flex-row items-center justify-between pb-4">
                    <h2 className="text-xl font-semibold">Submit a Review</h2>
                    <Icon icon="line-md:close-circle-filled" width="24" height="24" onClick={handleClose} />
                </div>



                <MasterForm
                    fields={fields}
                    fieldStyle="border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#024756]"
                    buttonLabel="Submit"
                    buttonStyle="py-[4px]"
                    validationSchema={ReviewSchema}
                    onSubmit={submitReview}
                    additionalContent={
                        <>
                            <button className="w-full px-1 py-[4px] mt-3 mb-3 text-white bg-red-500 rounded-md"
                                onClick={handleClose}>Cancel</button>
                        </>
                    } />
            </div>
        </div>
    );
};

export default ReviewDialog;
