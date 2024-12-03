import React from "react";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="flex items-center justify-center h-[50vh] bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-3xl text-red-500 mb-4">
          <span>Oops!</span> Page not found.
        </p>
        <p className="text-lg text-gray-800 mb-8">
          The page you’re looking for doesn’t exist.
          <br />
          <b>Please contact:</b>{" "}
          <span className="text-red-600">Mahesh....</span>
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default Notfound;
