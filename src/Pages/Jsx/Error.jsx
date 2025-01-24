import React from "react";
import { Link } from "react-router-dom";
function Error() {
  return (
    <>
      <div>Error :404 not found</div>
      <Link to="/">Go Back to Home</Link>
    </>
  );
}

export default Error;
