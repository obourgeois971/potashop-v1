import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingGIF from "../../images/loading.gif";

export default function Loading() {
  // state
  const [count, setCount] = useState(300);
  // hooks
  const navigate = useNavigate();

  useEffect(() => {
    // Est executé toute les 1000 secondes
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    // redirect once count is equal to 0
    count === 0 && navigate("/login");
    // cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <img src={LoadingGIF} alt="Loading" style={{ width: "400px" }} />
      Redirecting you in {count} seconds
    </div>
  );
}
