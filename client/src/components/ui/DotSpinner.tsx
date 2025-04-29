import React from "react";
import "./DotSpinner.css"

interface SpinnerProps {
    customClassName: string;
}
const DotSpinner: React.FC<SpinnerProps> = ({ customClassName }) => {

    return (
        <div className={`dot-spinner ${customClassName}`}>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
            <div className="dot-spinner__dot"></div>
        </div>
    );
};

export default DotSpinner;
