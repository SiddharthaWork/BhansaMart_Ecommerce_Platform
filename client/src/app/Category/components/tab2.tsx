import React, { useEffect, useState } from "react";
interface TabItem {
    label: string;
    value: string;
    icon?: React.ReactNode;
    content: any;
}

// Define the types for the props of the component
interface TabProps {
    tabs: TabItem[];
    setTab: (tabValue: string) => void;
}

const CustomTabs: React.FC<TabProps> = ({ tabs, setTab }) => {
    const [activeTab, setActiveTab] = useState<string>(tabs?.[0]?.label || '');

    useEffect(() => {
        setTab(tabs?.[0]?.value);
    }, [tabs, setTab]);

    const handleClick = (e: React.MouseEvent, newActiveTab: string, activeTabValue: string) => {
        e.preventDefault();
        setActiveTab(newActiveTab);
        setTab(activeTabValue);
    };

    return (
        <div className="flex flex-col items-center justify-between w-full px-6 bg-red-400 md:px-14 lg:px-24">
            <div className="flex flex-row w-full py-5 bg-[#FCFCFC]">
                {tabs.map((tab) => (
                    <div
                        key={tab.label}
                        className={`flex items-center border gap-2 px-2 py-2 cursor-pointer ${activeTab === tab.label
                            ? `bg-gray-100 text-black border border-none`
                            : "text-gray-600 border-none"
                            }`}
                        onClick={(e) => handleClick(e, tab.label, tab.value)}
                    >
                        {tab.icon && <span className="text-[12px] scale-125">{tab.icon}</span>}
                        <span className="text-[10px] md:text-base">{tab.label}</span>
                    </div>
                ))}
            </div>
            <div className="w-full bg-blue-400">
                {tabs.map((tab) => {
                    if (tab.label === activeTab) {
                        return <div key={tab.label}>
                            {tab.content.map((item: any, index: number) => (
                                <div key={index} className="flex flex-row items-center justify-between">
                                    <div className="flex flex-row items-center justify-between">
                                        <div className="bg-green-400 h-full w-[30%]">
                                            {item.subCategory && (
                                                <div className="mt-4">
                                                    <h3 className="font-semibold text-md">Subcategories:</h3>
                                                    <ul className="list-disc list-inside">
                                                        {item.subCategory.map((sub: string, idx: number) => (
                                                            <li key={idx}>{sub}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col w-[70%] h-full bg-yellow-400">
                                            <div>
                                                {item.title && <h2 className="text-lg font-bold">{item.title}</h2>}
                                            </div>


                                            {item.products && (
                                                <div className="mt-4">
                                                    <h3 className="font-semibold text-md">Products:</h3>
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        {item.products.map((product: any) => (
                                                            <div
                                                                key={product.id}
                                                                className="flex flex-col items-center p-4 border"
                                                            >
                                                                <img
                                                                    src={product.image}
                                                                    alt={product.name}
                                                                    className="object-cover w-24 h-24"
                                                                />
                                                                <p className="mt-2 text-sm font-semibold">
                                                                    {product.name}
                                                                </p>
                                                                <p className="text-sm text-gray-600">{product.size}</p>
                                                                <p className="text-sm font-bold">Rs. {product.price}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>;
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default CustomTabs;
