import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <>
      <center>
        <br />
        <br />
        <br />

        <h1 style={{ fontSize: "30px" }}>Oops !!</h1>
        <h3>Error Page</h3>
        <i>{error.statusText || error.message}</i>
        <p>
          Back to
          <Button
            variant="link"
            onClick={() => navigate("/", { replace: true })}
          >
            Home
          </Button>
        </p>
      </center>
    </>
  );
}

export default ErrorPage;
