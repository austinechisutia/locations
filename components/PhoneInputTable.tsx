"use client";

import React, { useState, useRef, useEffect } from "react";

import { Country, countries } from "../data/countries";

const PhoneInputTable: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<Country>(countries.find(c => c.code === "KE") || countries[0]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [capital, setCapital] = useState("");
    const [states, setStates] = useState<{ name: string; state_code: string }[]>([]);
    const [selectedState, setSelectedState] = useState<{ name: string; state_code: string } | null>(null);
    const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
    const [stateSearchQuery, setStateSearchQuery] = useState("");
    const [isLoadingCapital, setIsLoadingCapital] = useState(false);
    const [isLoadingStates, setIsLoadingStates] = useState(false);
    const stateDropdownRef = useRef<HTMLDivElement>(null);

    const [phoneNumber, setPhoneNumber] = useState("");

    const filteredCountries = countries
        .filter(country =>
            country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            country.code.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const query = searchQuery.toLowerCase();
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const aStarts = aName.startsWith(query);
            const bStarts = bName.startsWith(query);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return aName.localeCompare(bName);
        });

    const filteredStates = states
        .filter(state =>
            state.name.toLowerCase().includes(stateSearchQuery.toLowerCase())
        )
        .sort((a, b) => {
            const query = stateSearchQuery.toLowerCase();
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            const aStarts = aName.startsWith(query);
            const bStarts = bName.startsWith(query);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return aName.localeCompare(bName);
        });

    useEffect(() => {
        if (selectedCountry && !phoneNumber.startsWith(selectedCountry.dialCode)) {
            // When country changes, if phone is empty or doesn't start with new code, update it
            if (phoneNumber === "" || countries.some(c => phoneNumber.startsWith(c.dialCode))) {
                setPhoneNumber(selectedCountry.dialCode + " ");
            }
        }
    }, [selectedCountry]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (stateDropdownRef.current && !stateDropdownRef.current.contains(event.target as Node)) {
                setIsStateDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await fetch("https://ipapi.co/json/");
                const data = await response.json();
                if (data.country_code) {
                    const country = countries.find(c => c.code === data.country_code);
                    if (country) {
                        setSelectedCountry(country);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch IP-based country:", error);
            }
        };
        fetchCountry();
    }, []);

    useEffect(() => {
        const fetchCapitalAndStates = async () => {
            if (!selectedCountry) return;

            setIsLoadingCapital(true);
            setIsLoadingStates(true);
            setCapital("");
            setStates([]);
            setSelectedState(null);

            try {
                // Fetch Capital
                const capitalRes = await fetch("https://countriesnow.space/api/v0.1/countries/capital", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ country: selectedCountry.name })
                });
                const capitalData = await capitalRes.json();
                if (!capitalData.error) {
                    setCapital(capitalData.data.capital);
                }

                // Fetch States
                const statesRes = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ country: selectedCountry.name })
                });
                const statesData = await statesRes.json();
                if (!statesData.error) {
                    setStates(statesData.data.states);
                }
            } catch (error) {
                console.error("Failed to fetch capital/states:", error);
            } finally {
                setIsLoadingCapital(false);
                setIsLoadingStates(false);
            }
        };

        fetchCapitalAndStates();
    }, [selectedCountry]);

    return (
        <div className="w-full max-w-2xl overflow-visible rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-800/50">
                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100 w-1/3">
                            Field
                        </th>
                        <th className="px-6 py-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            Selection / Input
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                        <td className="px-6 py-4 align-middle text-sm text-zinc-600 dark:text-zinc-400">
                            Country
                        </td>
                        <td className="px-6 py-4 align-top">
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white py-2 px-3 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">{selectedCountry.emoji}</span>
                                        <span className="font-medium">{selectedCountry.code}</span>
                                        <span className="text-zinc-500 truncate ml-1">{selectedCountry.name}</span>
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
                    </tr>

                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                        <td className="px-6 py-4 align-middle text-sm text-zinc-600 dark:text-zinc-400">
                            Capital City
                        </td>
                        <td className="px-6 py-4 align-middle">
                            {isLoadingCapital ? (
                                <div className="h-4 w-24 animate-pulse rounded bg-zinc-100 dark:bg-zinc-800" />
                            ) : (
                                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                    {capital || "Not available"}
                                </span>
                            )}
                        </td>
                    </tr>

                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                        <td className="px-6 py-4 align-middle text-sm text-zinc-600 dark:text-zinc-400">
                            State / Province
                        </td>
                        <td className="px-6 py-4 align-top">
                            <div className="relative" ref={stateDropdownRef}>
                                <button
                                    onClick={() => !isLoadingStates && states.length > 0 && setIsStateDropdownOpen(!isStateDropdownOpen)}
                                    disabled={isLoadingStates || states.length === 0}
                                    className={`flex w-full items-center justify-between rounded-lg border border-zinc-200 bg-white py-2 px-3 text-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-blue-400 ${isLoadingStates || states.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                                >
                                    <span className="font-medium truncate">
                                        {isLoadingStates ? "Loading states..." : (selectedState ? selectedState.name : (states.length > 0 ? "Select State" : "No states found"))}
                                    </span>
                                    <svg
                                        className={`h-4 w-4 text-zinc-400 transition-transform ${isStateDropdownOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isStateDropdownOpen && (
                                    <div className="absolute left-0 mt-2 z-50 w-64 rounded-xl border border-zinc-200 bg-white p-2 shadow-xl dark:border-zinc-700 dark:bg-zinc-800">
                                        <div className="mb-2 px-2">
                                            <input
                                                type="text"
                                                placeholder="Search state..."
                                                value={stateSearchQuery}
                                                onChange={(e) => setStateSearchQuery(e.target.value)}
                                                className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="max-h-60 overflow-y-auto">
                                            {filteredStates.length > 0 ? (
                                                filteredStates.map((state) => (
                                                    <button
                                                        key={`${state.name}-${state.state_code}`}
                                                        onClick={() => {
                                                            setSelectedState(state);
                                                            setIsStateDropdownOpen(false);
                                                            setStateSearchQuery("");
                                                        }}
                                                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700/50 ${selectedState?.name === state.name ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400" : "text-zinc-700 dark:text-zinc-300"
                                                            }`}
                                                    >
                                                        <span className="flex-1 truncate">{state.name}</span>
                                                        <span className="text-xs text-zinc-400">{state.state_code}</span>
                                                    </button>
                                                ))
                                            ) : (
                                                <div className="px-3 py-4 text-center text-sm text-zinc-500">
                                                    No states found
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </td>
                    </tr>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800/50">
                        <td className="px-6 py-4 align-middle text-sm text-zinc-600 dark:text-zinc-400">
                            Phone Number
                        </td>
                        <td className="px-6 py-4 align-top">
                            <input
                                type="tel"
                                placeholder="712 345 678"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
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
        </div >
    );
};

export default PhoneInputTable;
