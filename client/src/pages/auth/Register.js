import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  /** State */
  const [name, setName] = useState("Ryan");
  const [email, setEmail] = useState("ryan@gmail.com");
  const [password, setPassword] = useState("123456");

  // hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    /** Utilisez la preventDefault()méthode sur
     * l'objet événement pour empêcher l'actualisation
     * de la page lors de la soumission du formulaire dans React,
     * par exemple event.preventDefault(). */
    e.preventDefault();
    try {
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        /** Local Storage */
        localStorage.setItem("auth", JSON.stringify(data));
        /** Put the context */
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Registration successful");

        /** redirect Page */
        navigate("/dashboard/user");
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <div>
      <Jumbotron title="Register" img="/images/baobab.png.jpg" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-4 p-2"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
              <input
                type="email"
                className="form-control mb-4 p-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-4 p-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
