"use client";

import React, { useState, useRef, useEffect } from "react";

interface Country {
    name: string;
    code: string;
    emoji: string;
}

const countries: Country[] = [
    { "name": "Ascension Island", "code": "AC", "emoji": "🇦🇨" },
    { "name": "Andorra", "code": "AD", "emoji": "🇦🇩" },
    { "name": "United Arab Emirates", "code": "AE", "emoji": "🇦🇪" },
    { "name": "Afghanistan", "code": "AF", "emoji": "🇦🇫" },
    { "name": "Antigua & Barbuda", "code": "AG", "emoji": "🇦🇬" },
    { "name": "Anguilla", "code": "AI", "emoji": "🇦🇮" },
    { "name": "Albania", "code": "AL", "emoji": "🇦🇱" },
    { "name": "Armenia", "code": "AM", "emoji": "🇦🇲" },
    { "name": "Angola", "code": "AO", "emoji": "🇦🇴" },
    { "name": "Argentina", "code": "AR", "emoji": "🇦🇷" },
    { "name": "Austria", "code": "AT", "emoji": "🇦🇹" },
    { "name": "Australia", "code": "AU", "emoji": "🇦🇺" },
    { "name": "Azerbaijan", "code": "AZ", "emoji": "🇦🇿" },
    { "name": "Belgium", "code": "BE", "emoji": "🇧🇪" },
    { "name": "Brazil", "code": "BR", "emoji": "🇧🇷" },
    { "name": "Canada", "code": "CA", "emoji": "🇨🇦" },
    { "name": "Switzerland", "code": "CH", "emoji": "🇨🇭" },
    { "name": "Chile", "code": "CL", "emoji": "🇨🇱" },
    { "name": "China", "code": "CN", "emoji": "🇨🇳" },
    { "name": "Germany", "code": "DE", "emoji": "🇩🇪" },
    { "name": "Denmark", "code": "DK", "emoji": "🇩🇰" },
    { "name": "Egypt", "code": "EG", "emoji": "🇪🇬" },
    { "name": "Spain", "code": "ES", "emoji": "🇪🇸" },
    { "name": "Ethiopia", "code": "ET", "emoji": "🇪🇹" },
    { "name": "Finland", "code": "FI", "emoji": "🇫🇮" },
    { "name": "France", "code": "FR", "emoji": "🇫🇷" },
    { "name": "United Kingdom", "code": "GB", "emoji": "🇬🇧" },
    { "name": "Ghana", "code": "GH", "emoji": "🇬🇭" },
    { "name": "Greece", "code": "GR", "emoji": "🇬🇷" },
    { "name": "Hong Kong", "code": "HK", "emoji": "🇭🇰" },
    { "name": "Indonesia", "code": "ID", "emoji": "🇮🇩" },
    { "name": "Ireland", "code": "IE", "emoji": "🇮🇪" },
    { "name": "Israel", "code": "IL", "emoji": "🇮🇱" },
    { "name": "India", "code": "IN", "emoji": "🇮🇳" },
    { "name": "Italy", "code": "IT", "emoji": "🇮🇹" },
    { "name": "Japan", "code": "JP", "emoji": "🇯🇵" },
    { "name": "Kenya", "code": "KE", "emoji": "🇰🇪" },
    { "name": "South Korea", "code": "KR", "emoji": "🇰🇷" },
    { "name": "Morocco", "code": "MA", "emoji": "🇲🇦" },
    { "name": "Mexico", "code": "MX", "emoji": "🇲🇽" },
    { "name": "Malaysia", "code": "MY", "emoji": "🇲🇾" },
    { "name": "Nigeria", "code": "NG", "emoji": "🇳🇬" },
    { "name": "Netherlands", "code": "NL", "emoji": "🇳🇱" },
    { "name": "Norway", "code": "NO", "emoji": "🇳🇴" },
    { "name": "New Zealand", "code": "NZ", "emoji": "🇳🇿" },
    { "name": "Philippines", "code": "PH", "emoji": "🇵🇭" },
    { "name": "Pakistan", "code": "PK", "emoji": "🇵🇰" },
    { "name": "Poland", "code": "PL", "emoji": "🇵🇱" },
    { "name": "Portugal", "code": "PT", "emoji": "🇵🇹" },
    { "name": "Qatar", "code": "QA", "emoji": "🇶🇦" },
    { "name": "Russia", "code": "RU", "emoji": "🇷🇺" },
    { "name": "Rwanda", "code": "RW", "emoji": "🇷🇼" },
    { "name": "Saudi Arabia", "code": "SA", "emoji": "🇸🇦" },
    { "name": "Sweden", "code": "SE", "emoji": "🇸🇪" },
    { "name": "Singapore", "code": "SG", "emoji": "🇸🇬" },
    { "name": "South Africa", "code": "ZA", "emoji": "🇿🇦" },
    { "name": "Tanzania", "code": "TZ", "emoji": "🇹🇿" },
    { "name": "Uganda", "code": "UG", "emoji": "🇺🇬" },
    { "name": "United States", "code": "US", "emoji": "🇺🇸" },
    { "name": "Vietnam", "code": "VN", "emoji": "🇻🇳" },
    { "name": "Zimbabwe", "code": "ZW", "emoji": "🇿🇼" },
];

const PhoneInputTable: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries.find(c => c.code === "KE") || countries[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full max-w-2xl overflow-visible rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-800/50">
                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100 w-1/3">
                            Country Code
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            Phone Number
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                        <td className="px-6 py-4 align-top">
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white py-2 px-3 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">{selectedCountry.emoji}</span>
                                        <span className="font-medium">{selectedCountry.code}</span>
                                    </div>
                                    <svg
                                        className={`h-4 w-4 text-zinc-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute left-0 mt-2 z-50 w-64 rounded-xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
                                        <div className="mb-2 px-2">
                                            <input
                                                type="text"
                                                placeholder="Search country..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="max-h-60 overflow-y-auto">
                                            {filteredCountries.length > 0 ? (
                                                filteredCountries.map((country) => (
                                                    <button
                                                        key={country.code}
                                                        onClick={() => {
                                                            setSelectedCountry(country);
                                                            setIsDropdownOpen(false);
                                                            setSearchQuery("");
                                                        }}
                                                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700/50 ${selectedCountry.code === country.code ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" : "text-zinc-700 dark:text-zinc-300"
                                                            }`}
                                                    >
                                                        <span className="text-lg">{country.emoji}</span>
                                                        <span className="flex-1 truncate">{country.name}</span>
                                                        <span className="text-xs text-zinc-400">{country.code}</span>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-3 py-4 text-center text-sm text-zinc-500">
                                                    No countries found
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </td>
                        <td className="px-6 py-4 align-top">
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
