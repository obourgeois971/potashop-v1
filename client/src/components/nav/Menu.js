import { NavLink, Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import i18n from "../../i18n";
// import { useSelector } from "react-redux";

export default function Menu() {
  /** Context */
  const [auth, setAuth] = useAuth("");
  const [cart, setCart] = useCart();

  // hook
  const categories = useCategory();
  const navigate = useNavigate();
  // console.log("categories in menu => ", categories);

  // const state = useSelector((state) => state.handleCart);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  // let { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
            Pota Shop
          </NavLink>
          <button
            className="navbar-toggler mx-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto my-2 text-center">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              <div className="dropdown">
                <li>
                  <a
                    className="nav-link pointer dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    CATEGORIES
                  </a>

                  <ul
                    className="dropdown-menu"
                    // style={{ height: "300px", overflow: "scroll" }}
                    style={{ height: "300px" }}
                  >
                    <li>
                      <NavLink className="nav-link" to="/categories">
                        All Categories
                      </NavLink>
                    </li>

                    {categories?.map((c) => (
                      <li key={c._id}>
                        <NavLink
                          className="nav-link"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              </div>

              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
            <div className="nav-item pointer">
              <div>
                <i class="fa fa-language" aria-hidden="true"></i>
                <button onClick={() => changeLanguage("en")}>EN</button>
                <button onClick={() => changeLanguage("fr")}>FR</button>
                {/* Ajoutez d'autres boutons pour d'autres langues si nécessaire */}
              </div>
            </div>

            <NavLink to="/cart" className="btn btn-outline-dark m-2">
              <Badge
                count={cart?.length >= 1 ? cart.length : 0}
                offset={[-1, 11]}
                showZero={true}
              >
                <i className="fa fa-cart-shopping mr-1"></i> Cart (
                {/*state?.length*/}){" "}
              </Badge>
            </NavLink>
            <div className="buttons text-center">
              {!auth?.user ? (
                <>
                  <NavLink to="/login" className="btn btn-outline-dark m-2">
                    <i className="fa fa-sign-in-alt mr-1"></i> Login
                  </NavLink>

                  <NavLink to="/signup" className="btn btn-outline-dark m-2">
                    <i className="fa fa-user-plus mr-1"></i> SIGNUP
                  </NavLink>
                </>
              ) : (
                <>
                  <div class="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name?.toUpperCase()}
                    </button>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <NavLink
                          className="nav-link"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item pointer">
                        <a onClick={logout} className="nav-link">
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Search />
    </>
  );
}
