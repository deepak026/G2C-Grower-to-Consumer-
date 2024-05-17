import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import {doFetchListedProducts} from "../../services/users-controller";
function ManageProducts() {
  const { email } = useParams(); // Access the email parameter from the URL
  const [productsData, setProductsData] = useState([]); // State to store the products data fetched from server
  const [isLoading, setIsLoading] = useState(true); // State for showing/hiding loading spinner
  const [error, setError] = useState(null); // State for storing any error from the fetch process
  const [editProduct, setEditProduct] = useState(null);

  // Function to get all products from the server
  async function getAllProducts() {
    // const url = `http://localhost:2000/grower/fetchProducts?email=${email}`;
    // const response = await axios.get(url);
    //api call with token validation
    const response = await doFetchListedProducts(email);
    if(response.data.status == false){
      alert(JSON.stringify(response.data.message));
      return;
    }
    
    // alert(JSON.stringify(response.data));
    setProductsData(response.data[0].products); // Assuming the server responds with the array of products
    setIsLoading(false); // Update loading state
  }

  // Use effect to call the getAllProducts function when this component renders
  useEffect(() => {
    getAllProducts();
  }, [email]); // Re-run the effect if email changes

  //diplay more info
  function displayInfo(desc) {
    alert("Description: " + desc);
  }

  //edit product
  function handleEdit(productId) {
    // alert(productId);
    setEditProduct(true);
  }

  //save edits
  async function handleSave(productId) {
    // alert("saved")
    //find product from all for update
    const product = productsData.find((p) => p._id === productId);

    const newData = {
      email: email,
      productId: productId,
      productData: product,
    };
    const url = `http://localhost:2000/grower/updateProduct`;
    let reslobj = await axios.post(url, newData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (reslobj) {
      alert("Product updated successfully");
      setEditProduct(false);
      getAllProducts();
    }
    // alert(JSON.stringify(reslobj))
    // alert("Product updated successfully");
    setEditProduct(false);
  }

  //cancel edit
  function handleCancel() {
    setEditProduct(false);
  }

  //delete product
  async function handleDelete(productId) {
    // alert(productId)
    const url = `http://localhost:2000/grower/deleteProduct?email=${email}&productId=${productId}`;
    const response = await axios.get(url);
    if (response.data.status) {
      alert("Product deleted successfully");
      getAllProducts(); // Refresh the list after deletion
    } else {
      alert("Error: " + response.data.msg);
    }
  }

  function handleChange(event, productId) {
    const { name, value } = event.target;

    const newData = productsData.map((product) => {
      if (product._id === productId) {
        return { ...product, [name]: value };
      }
      return product;
    });
    setProductsData(newData);
  }

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Manage Products</h2>
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger">Error: {error}</Alert>
      ) : (
        <>
          <strong>Email: {email}</strong>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Product</th>
                <th>Price</th>
                <th>Per Unit</th>
                <th>More Info</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>
                    {editProduct ? (
                      <Form.Control
                        type="text"
                        name="product"
                        value={product.product}
                        onChange={(e) => handleChange(e, product._id)}
                      />
                    ) : (
                      product.product
                    )}
                  </td>
                  <td>
                    {editProduct ? (
                      <Form.Control
                        type="text"
                        name="price"
                        value={product.price}
                        onChange={(e) => handleChange(e, product._id)}
                      />
                    ) : (
                      product.price
                    )}
                  </td>
                  <td>
                    {editProduct ? (
                      <Form.Control
                        type="text"
                        name="unit"
                        value={product.unit}
                        onChange={(e) => handleChange(e, product._id)}
                      />
                    ) : (
                      product.unit
                    )}
                  </td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => displayInfo(product.description)}
                    >
                      Details
                    </Button>
                  </td>
                  <td>
                    {editProduct ? (
                      <>
                        <Button
                          variant="success"
                          onClick={() => handleSave(product._id)}
                        >
                          Save
                        </Button>
                        <Button variant="secondary" onClick={handleCancel}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => handleEdit(product._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(product._id)}
                          className="ms-2"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
}

export default ManageProducts;
