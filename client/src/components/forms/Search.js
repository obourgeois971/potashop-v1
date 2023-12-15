import { useState, useEffect } from "react";
import axios from "axios";
import { useSearch } from "../../context/search";
import { useNavigate } from "react-router-dom";

export default function Search() {
  // hooks
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${values?.keyword}`);
      // console.log(data);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <div className="container text-center p-5">
        <input
          type="search"
          style={{ borderRadius: "1px", width: "90%", height: "100%" }}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          value={values.keyword}
        />

        <button
          className="btn btn-outline-primary"
          type="submit"
          style={{ borderRadius: "0px", marginLeft: "10px" }}
        >
          <i class="fa-solid fa-magnifying-glass"></i>
          Search {values.results.length}
        </button>
      </div>
    </form>
  );
}
