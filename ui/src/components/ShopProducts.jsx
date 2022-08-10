import React from "react";
import { useEffect } from "react";
import ShopifyRequest from "../api/ShopifyRequest";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { VariantsContext } from "../context/VariantsContext"; 
import { SignOutButton } from "./SignOutButton";

const ShopProducts = (props) => {

  let navigate = useNavigate();
  const {variants, setVariants} = useContext(VariantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ShopifyRequest.get("/products");
        console.log({ first: response.data.body });
        console.log({ products: response.data.body.data.products.nodes });
        setVariants(response.data.body.data.products.nodes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [setVariants]);
  const handleVariants = (id) => {
    navigate(`/product/${id}`);
  };
  return (
    <div>
      <Container>
        <Table hover bordered>
          <thead>
            <tr>
              <th>Featured Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Variants</th> 
            </tr>
          </thead>
          <tbody>
            {variants.map((product, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={product.featuredImage ? product.featuredImage.url : ""}
                    alt="NA"
                  />
                </td>
                <td>{product.handle}</td>
                <td>{product.description}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleVariants(product.id)}
                  >
                    More info
                  </Button>
                </td> 
              </tr> 
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ShopProducts;
