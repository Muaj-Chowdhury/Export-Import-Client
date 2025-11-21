import React from "react";
import { Link, useRouteError } from "react-router";

const ErrorLayout = () => {
  const error = useRouteError();

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-5xl font-bold mb-4 text-red-500">Oops!</h1>
      <p className="text-xl mb-2">Something went wrong.</p>
      <p className="mb-6 text-gray-500">
        {error?.statusText || error?.message || "Page not found."}
      </p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorLayout;