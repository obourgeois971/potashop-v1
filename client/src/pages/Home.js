import { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

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

  const arr = [...products];
  const sortedBySold = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));
  const { t } = useTranslation();

  return (
    <div>
      <Jumbotron title="Pota Shop" sutTitle="Welcome to My E-commerce" />
      <h1>{t("greeting")}</h1>

      <>
        <div className="container my-3 py-3">
          <div className="row">
            <div className="col-12">
              <h2 className="display-5 text-center">Latest Products</h2>
              <hr />
            </div>
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
