"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function BFHLPage() {
  const [mounted, setMounted] = useState(false);
  const [jsonInput, setJsonInput] = useState(
    '{"data":["M","1","334","4","B"]}'
  );
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filterOptions = [
    { value: "numbers", label: "Numbers" },
    { value: "highest", label: "Highest Alphabet" },
    { value: "alphabets", label: "Alphabets" },
  ];

  const validateJSON = (str) => {
    try {
      const parsed = JSON.parse(str);
      return parsed && typeof parsed === "object" && Array.isArray(parsed.data);
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateJSON(jsonInput)) {
      setError('Please enter valid JSON input with a "data" array');
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/bfhl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonInput,
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setResponse(data);
      // Set default selection after successful response
      setSelectedOptions(["numbers"]);
    } catch (err) {
      setError("Error processing request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionChange = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        return prevSelected.filter((item) => item !== option);
      } else {
        return [...prevSelected, option];
      }
    });
  };

  const getFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = [];

    if (selectedOptions.includes("numbers")) {
      filteredResponse.push(`Numbers: ${response.numbers.join(",")}`);
    }
    if (selectedOptions.includes("highest")) {
      filteredResponse.push(`Highest Alphabet: ${response.highest_alphabet}`);
    }
    if (selectedOptions.includes("alphabets")) {
      filteredResponse.push(`Alphabets: ${response.alphabets.join(",")}`);
    }

    return filteredResponse;
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Your Roll Number</title>
      </Head>

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 text-black">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Input Section */}
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Input
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                />
              </div>

              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Submit
              </button>

              {error && (
                <div className="text-red-600 text-sm mt-2">{error}</div>
              )}
            </div>
          </div>

          {/* Filter and Response Section */}
          {response && (
            <div className="bg-white shadow-sm rounded-lg p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Multi Filter
                </label>
                <div className="space-x-2">
                  {filterOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionChange(option.value)}
                      className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                        selectedOptions.includes(option.value)
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      } hover:bg-blue-50`}
                    >
                      {option.label}
                      {selectedOptions.includes(option.value) && (
                        <span className="ml-1">✕</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {selectedOptions.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Filtered Response
                  </h3>
                  <div className="space-y-1">
                    {getFilteredResponse().map((response, index) => (
                      <div key={index} className="text-gray-900">
                        {response}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
