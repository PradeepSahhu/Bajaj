"use client";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Your Roll Number</title>
        <meta
          name="description"
          content="Frontend Application for Data Processing"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to Data Processing Application
            </h1>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="mt-2 max-w-xl text-gray-500">
                <p className="text-lg">
                  This application processes input data and provides filtered
                  responses based on your selection.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-blue-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        Features
                      </h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Process JSON input data</li>
                          <li>Filter responses with multi-select options</li>
                          <li>View numbers and alphabets separately</li>
                          <li>Find highest alphabet in the input</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="text-lg font-medium text-gray-900">
                    Example Input:
                  </h3>
                  <div className="mt-2">
                    <pre className="bg-gray-100 rounded p-4 text-sm overflow-x-auto">
                      {JSON.stringify(
                        { data: ["M", "1", "334", "4", "B"] },
                        null,
                        2
                      )}
                    </pre>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Link
                    href="/bfhl"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Go to Application
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  API Endpoints
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Backend API endpoint (POST & GET):</p>
                  <code className="mt-2 block bg-gray-100 p-2 rounded">
                    /api/bfhl
                  </code>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Response Format
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p>The API returns filtered data based on your selection:</p>
                  <ul className="list-disc pl-5 mt-2">
                    <li>Numbers</li>
                    <li>Alphabets</li>
                    <li>Highest alphabet</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Data Processing Application - {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}
