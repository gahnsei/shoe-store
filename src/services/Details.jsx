import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import PageNotFound from "../PageNotFound";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

const Details = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = useState(``);

  const { data: product, loading, error } = useFetch(`products/${id}`);
  console.log(product);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select
        id="size"
        value={sku}
        onChange={(event) => setSku(event.target.value)}
      >
        <option value="">What size?</option>
        {product.skus.map((ele) => (
          <option key={ele.sku} value={ele.sku}>
            {ele.size}
          </option>
        ))}
      </select>
      <p>
        <button
          disabled={!sku}
          className="btn btn-primary"
          onClick={() => {
            props.addToCart(id, sku);
            navigate("/cart");
          }}
        >
          Add To Cart
        </button>
      </p>

      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
};

export default Details;
