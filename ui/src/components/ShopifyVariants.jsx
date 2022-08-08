import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ShopifyRequest from "../api/ShopifyRequest";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"; 
import "../assets/css/Image.css"

/**
 * This page shows one product from shopify and should be able to edit at least the featured
 * image and the variants image at fisrt TODO: also i need to make a way of knowing which image is being changed with states..like make
 * a new object for them or keep the product state
 *
 */
const ShopifyVariants = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleTitleChange = (e) => setTitle(e.target.value);  
  const handlePriceChange = (e, iden) => setPrice([e.target.value, iden]);  
  const handleSkuChange = (e, iden) => setSku([e.target.value, iden]); 


  const [imageHover, setImageHover] = useState(false);
  const [setUrl] = useState("");
  const [image, setImage] = useState([]);
  const [product, setProduct] = useState({});
  const { id } = useParams(); 
  const [title, setTitle] = useState("");  
  const [price, setPrice] = useState([]); 
  const [sku, setSku] = useState([]);  

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
  // console.log(product);

  const handleOnChange = (e) => setUrl(e.target.value);
  const handleImageChange = (e) => {
    e.preventDefault(); 
    // console.log(e.target.files[0])
    setImage(e.target.files[0]);
  };

  const sendImage = async (e) => {
    try {
      e.preventDefault();
      const imageData = new FormData();
      imageData.append("image", image);
      const response = await ShopifyRequest.put(`/productVariant`, imageData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }; 

  const sendTitle = async(e) => { 
    try {
      const response = await ShopifyRequest.put( 
        '/productTitle',  
        {status: 'success', data: title} 
      )
    } catch (error) {
      console.log(error)
    }
  };  
  
  function noDolllarSign(string) { 
    let rstring = string.replace("$", ""); 
    return rstring;
  }

  const sendPrice = async(e) => { 
    try {  
      price[0] = noDolllarSign(price[0]); 
      const response = await ShopifyRequest.put( 
        '/productUpdatePrice',  
        {status: 'success', data: price} 
      )
    } catch (error) {
      console.log(error)
    }
  };    

  const sendSku = async(e) => { 
    try { 
      const response = await ShopifyRequest.put( 
        '/productUpdateSku', 
        {status: 'success', data: sku} 
      )
    } catch (error) {
      console.log(error)
    }
  };  
  
  const send = (e) => { 
    //sendTitle(e); 
   //sendImage(e); 
    sendPrice(e); 
    sendSku(e);
  };

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
        <div className="box" id="featured">
          <h3 style={{ textAlign: "center" }}>Featured Image</h3>
          <img
            className="image"
            style={{ width: "initial", height: "initial" }}
            src={product.featuredImage ? product.featuredImage.url : ""}
            alt="no work"
          />
        </div>
        <div className="box" id="media">
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
            <span>
              <button
                className="image"
                onClick={() => {
                  handleShow();
                }}
              >
                Add Image
              </button>
              <div>
                <Modal show={show} onHide={() => handleClose()}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Image</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                      >
                        <Form.Label>Enter Image URL</Form.Label>
                        <Form.Control
                          type="text"
                          onChange={() => handleOnChange()}
                          as="textarea"
                          rows={1}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                      Close
                    </Button>
                    <Button variant="primary">Add</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </span>
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
                <th scope="col">Save Edits</th>
              </tr>
            </thead>
            <tbody>
              {product.variants &&
                product.variants.nodes.map((variant, index) => (
                  // TODO: make this look nicer 
                  <tr key={index}>
                    <td>
                      <div className="container">
                        <button
                          style={{ all: "unset", cursor: "pointer" }}
                          onMouseEnter={() => setImageHover(true)}
                          onMouseLeave={() => setImageHover(false)}>
                          <div className="brightness"> 
                            <div className="image-upload">
                              <label htmlFor="file-input"> 
                                <form action="/upload" encType="multipart/form-data"> 
                                  <input id="file-input" type="file" 
                                  name="image" 
                                  style={{ all: "unset", cursor: "pointer" }}
                                  onChange={(e) => handleImageChange(e)}/>
                                </form>
                                <img 
                                  className= "thumbnail image"
                                  src={variant.image && variant.image.url}
                                  alt="Add one?" />
                              </label>
                            </div> 
                          </div>
                        </button>
                      </div>
                    </td>
                    <td>
                      <input 
                        type="text" size="14" defaultValue={variant.title} 
                        style={{ marginRight: '.1rem', }} 
                        onChange = {(e) => handleTitleChange(e)} >
                      </input> 
                    </td> 

                    <td>
                      <input 
                        type="text" size="6" defaultValue={'$' + variant.price} 
                        style={{ marginLeft: '.1rem', }} 
                        onChange = {(e) => handlePriceChange(e, variant.id)}>
                      </input>
                    </td>
                    <td> 
                      <input
                        type="text" size="1" defaultValue={variant.sku} 
                        style={{ marginLeft: '.1rem', }} 
                        onChange = {(e) => handleSkuChange(e, variant.id)}>
                      </input>
                    </td>
                    <td>
                      <Button onClick= {(e) => send(e)}>Save</Button>
                    </td>
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
