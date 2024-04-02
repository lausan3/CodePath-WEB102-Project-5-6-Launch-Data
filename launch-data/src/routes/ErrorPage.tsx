import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <h2>404 NOT FOUND</h2>
            <Link style={{ color: "white" }} to="/">
                Back to Home
            </Link>
        </div>
    );
  };
  
  export default ErrorPage;