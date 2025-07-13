
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-craftique-cream">
      <div className="text-center">
        <h1 className="text-6xl font-serif mb-4 text-craftique-brown">404</h1>
        <p className="text-xl text-craftique-taupe mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
