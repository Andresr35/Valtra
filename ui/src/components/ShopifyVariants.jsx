import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ShopifyRequest from "../api/ShopifyRequest";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";

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
  console.log(product);

  //TODO:  Get a page up for the featured image and the variants image....
  // how should the fornt end look like??? Try to copy as much from shopify's setup
  return (
    <div>
      <Container fluid="md">
        <div className="title">
          <div className="box">
            <h2 style={{ textAlign: "center" }}>{product.title}</h2>
            <p style={{ textAlign: "center" }}>
              Description: {product.description}
            </p>
          </div>
        </div>
        <div className="box">
          <h3 style={{ textAlign: "center" }}>Featured Image</h3>
          <img
            className="image"
            src={product.featuredImage ? product.featuredImage.url : ""}
            alt="no work"
          />
        </div>
        <div className="box">
          <div>
            <h3 style={{ textAlign: "center" }}>Media</h3>
          </div>
          <div>
            {product.media &&
              product.media.nodes.map((media, index) => (
                <span key={index}>
                  <img
                    className="image"
                    src={media.preview.image.url}
                    alt="Not found"
                  />
                </span>
              ))}
          </div>
        </div>
        <div className="box" id="options">
          <h3 style={{ padding: "10px" }}>Options</h3>
          {product.options &&
            product.options.map((option, index) => (
              <div key={index} className="options">
                <h4>{option.name}</h4>
                {option.values &&
                  option.values.map((value, index) => (
                    <span key={index} className="option">
                      {value}
                    </span>
                  ))}
              </div>
            ))}
          {/* begin mapping variants */}
        </div>
        <div className="box" id="options">
          <h3 style={{ padding: "10px" }}>Variants</h3>
          <Table>
            <thead>
              <tr>
                <th scope="col">Featured Image</th>
                <th scope="col">Variant</th>
                <th scope="col">Price</th>
                <th scope="col">SKU</th>
              </tr>
            </thead>
            <tbody>
              {product.variants &&
                product.variants.nodes.map((variant, index) => (
                  // TODO: make this look nicer
                  <tr key={index}>
                    <td>
                      <img
                        className="thumbnail image"
                        src={variant.image && variant.image.url}
                        alt="Add one?"
                      />
                    </td>
                    <td>{variant.title}</td>
                    <td>${variant.price}</td>
                    <td>{variant.sku}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
};

export default ShopifyVariants;
