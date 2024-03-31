import { useNavigate, useRouteError } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const error = useRouteError();

  console.log("use route error: ", error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data}</p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
};

export default NotFound;
