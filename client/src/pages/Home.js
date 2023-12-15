import { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";
import { useTranslation } from "react-i18next";
import { Checkbox, Radio } from "antd";
import { toast } from "react-toastify";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]); // categories
  const [radio, setRadio] = useState([]); // radio

  useEffect(() => {
    loadCatgories();
    loadProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadCatgories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/products-count");
      setTotal(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-products/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) loadProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) loadFilteredProducts();
  }, [checked, radio]);

  const loadFilteredProducts = async () => {
    try {
      const { data } = await axios.post("/filtered-products", {
        checked,
        radio,
      });
      console.log("filtered products => ", data);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts1 = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadCatgories();
  }, []);

  const loadCatgories1 = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheck = (value, id) => {
    console.log(value, id);
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));
  const { t } = useTranslation();

  return (
    <div>
      <Jumbotron
        title="Pota Shop"
        sutTitle="Welcome to My E-commerce"
        img="/images/baobab.png.jpg"
      />
      <h1>{t("greeting")}</h1>

      <>
        <div className="container my-3 py-3">
          <div className="row">
            <div className="col-12">
              <h2 className="display-5 text-center">Latest Products</h2>
              <hr />
            </div>
          </div>

          <div className="buttons text-center py-5">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleCheck(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <div className="row justify-content-center">
            {/*loading ? <Loading /> : <ShowProducts />*/}
            <div className="row">
              {products?.map((p) => (
                <div className="col-md-3" key={p._id}>
                  <ProductCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container text-center p-5">
          {products && products.length < total && (
            <button
              className="btn btn-warning btn-lg col-md-6"
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          )}
        </div>
      </>
    </div>
  );
}
