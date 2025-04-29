import React from "react";

interface PaginationPropType {
    totalPage: number;
    onClick: (params: { page: number, limit: number }) => void;
    currentPage: number;
    limit: number;
};

const Pagination: React.FC<PaginationPropType> = ({ totalPage, onClick, currentPage, limit }) => {
    const generatePageNumbers = () => {
        const pages: (number | string)[] = [];
        if (totalPage <= 5) {
            for (let i = 1; i <= totalPage; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPage);
            } else if (currentPage >= totalPage - 2) {
                pages.push(1, "...", totalPage - 3, totalPage - 2, totalPage - 1, totalPage);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPage);
            }
        }
        return pages;
    };

    const handleClick = (page: number | string) => {
        if (typeof page === "number") {
            onClick({ page, limit });
        }
    };

    // const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const newLimit = parseInt(e.target.value);
    //     onClick({ page: 1, limit: newLimit }); // Reset to page 1 when limit changes
    // };

    return (
        <div className="flex-col w-full px-10 mt-4">
            <ul className="">
                {/* <li className="flex items-center gap-3">
                    <span className="text-sm text-navbarColor">
                        Page {currentPage} of {totalPage}
                    </span>
                    <select
                        className="text-xs"
                        onChange={handleLimitChange}
                        value={limit}
                    >
                        <option className="text-xs" value="5">5</option>
                        <option className="text-xs" value="10">10</option>
                        <option className="text-xs" value="15">15</option>
                        <option className="text-xs" value="20">20</option>
                    </select>
                </li> */}
                <div className="flex justify-center gap-2">
                    {currentPage > 1 && (
                        <li className="flex items-center">
                            <button
                                className="px-3 py-1 text-black border rounded-md"
                                onClick={() => handleClick(currentPage - 1)}
                            >
                                &lt;
                            </button>
                        </li>
                    )}
                    {generatePageNumbers().map((page, index) => (
                        <li key={index} className="flex items-center">
                            <button
                                className={`px-3 py-1 text-[14px] rounded-md ${currentPage === page
                                    ? "bg-[#4A9D4C] text-white border-primary"
                                    : "bg-transparent text-black border"
                                    } ${page === "..." ? "cursor-default" : ""}`}
                                onClick={() => handleClick(page)}
                                disabled={page === "..."}
                            >
                                {page}
                            </button>
                        </li>
                    ))}
                    {currentPage < totalPage && (
                        <li className="flex items-center">

                            <button
                                className="px-3 py-1 text-black border rounded-md"
                                onClick={() => handleClick(currentPage + 1)}
                            >
                                &gt;
                            </button>
                        </li>
                    )}
                </div>
            </ul>
        </div>
    );
};

export default Pagination;
