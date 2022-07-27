import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import ShopifyRequest from "../api/ShopifyRequest";
import { VariantsContext } from "../context/VariantsContext";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/**
 * This page shows one product from shopify and should be able to edit at least the featured
 * image and the variants image at fisrt TODO:
 *
 */
const ShopifyVariants = () => {
  // const{variants,setVariants} = useContext(VariantsContext);
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    try {
      const fetchData = async (id) => {
        var response = await ShopifyRequest.get(`/products/${id}`);
        setProduct(response.data.body.data.product);
      };
      fetchData(id);
    } catch (err) {
      console.log(err);
    }
  }, [setProduct, id]);

  //TODO:  Get a page up for the featured image and the variants image....
  // how should the fornt end look like??? Try to copy as much from shopify's setup
  return (
    <div >
      <Container fluid="md" >
        <Row className="box">
            <h2 style={{ textAlign: "center" }}>{product.title}</h2>
            <p style={{ textAlign: "center" }}>
              Description: {product.description}
            </p>

        </Row>
        <Container>
        <h3>Featured Image</h3>
        <img
          src={product.featuredImage ? product.featuredImage.url : ""}
          alt="no work"
        />
        </Container>
      </Container>
    </div>
  );
};

export default ShopifyVariants;
