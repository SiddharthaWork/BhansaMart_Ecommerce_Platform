import React from "react";
import LoadingImg from '../../assets/images/extras/loadingGif.gif'

interface LoadingProps {

    children?: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ children }) => {
    return (
        <div className="relative">
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-10">
                <img src={LoadingImg} alt="Loading..." className="w-[16rem] h-[22rem]" />
            </div>
            {children}
        </div>
    );
};

export default Loading;
