"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Select from "react-select";

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
      const response = await fetch("https://bajaj-9plf.vercel.app/bfhl", {
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
      setSelectedOptions([]);
    } catch (err) {
      setError("Error processing request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionChange = (selected) => {
    setSelectedOptions(selected);
  };

  const getFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = [];
    const selectedValues = selectedOptions.map((option) => option.value);

    if (selectedValues.length === 0) {
      return [
        `Numbers: ${response.numbers.join(", ")}`,
        `Highest Alphabet: ${response.highest_alphabet.join(", ")}`,
        `Alphabets: ${response.alphabets.join(", ")}`,
      ];
    }

    if (selectedValues.includes("numbers")) {
      filteredResponse.push(`Numbers: ${response.numbers.join(", ")}`);
    }
    if (selectedValues.includes("highest")) {
      filteredResponse.push(
        `Highest Alphabet: ${response.highest_alphabet.join(", ")}`
      );
    }
    if (selectedValues.includes("alphabets")) {
      filteredResponse.push(`Alphabets: ${response.alphabets.join(", ")}`);
    }

    return filteredResponse;
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{response?.roll_number || "Your Roll Number"}</title>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Multi Filter
                </label>
                <Select
                  isMulti
                  options={filterOptions}
                  value={selectedOptions}
                  onChange={handleOptionChange}
                  className="w-full"
                />
              </div>
              {selectedOptions.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Filtered Response
                  </h3>
                  <div className="space-y-1">
                    {getFilteredResponse().map((res, index) => (
                      <div key={index} className="text-gray-900">
                        {res}
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
