import React from 'react';

interface ButtonProps {
    className?: string;
    buttonText: string;
    icon?: React.ReactNode;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ className, buttonText, icon, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 ${className}`}>
            {icon && <span className="icon-wrapper">{icon}</span>}
            <p>{buttonText}</p>
        </button>
    );
};

export default Button;
