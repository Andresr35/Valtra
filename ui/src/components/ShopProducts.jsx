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
              <th>Update Images</th>
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
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Add Image</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="uploadImageId"/>
                <input type="file" id="productImage"/>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick="uploadImage()">Upload</button>
            </div>
        </div>
    </div>
</div>

              </tr> 
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default ShopProducts;
