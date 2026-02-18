"use client";

import React from "react";

const PhoneInputTable: React.FC = () => {
    return (
        <div className="w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-800/50">
                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            Country Code
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            Phone Number
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                        <td className="px-6 py-4">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 text-sm">
                                    +
                                </span>
                                <input
                                    type="text"
                                    placeholder="254"
                                    className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-7 pr-3 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                                />
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <input
                                type="tel"
                                placeholder="712 345 678"
                                className="w-full rounded-lg border border-zinc-200 bg-white py-2 px-3 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="p-4 bg-zinc-50/30 border-t border-zinc-100 dark:bg-zinc-800/20 dark:border-zinc-800/50">
                <button className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
                    Save Contact
                </button>
            </div>
        </div>
    );
};

export default PhoneInputTable;
