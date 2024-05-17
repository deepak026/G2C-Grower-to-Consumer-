import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router";

function List_products() {
  const [productImgSrc, setProductImgSrc] = useState(
    "https://via.placeholder.com/200"
  );
  const {email:g_email} = useParams();
  let [g_name, setg_name] = useState("");
  let [g_city, setg_city] = useState("");
  
  async function getGrowerInfo(){
    const url = `http://localhost:2000/grower/growerInfo?email=${g_email}`;
    const response = await axios.get(url);
    if (response.data) {
      // alert(JSON.stringify(response.data[0].g_city));
      setg_name(response.data[0].g_name);
      setg_city(response.data[0].g_city);

    } else {
      alert("Error: " + response.data.msg);
    }
  }
  useEffect(()=>{
    getGrowerInfo();
  }, [g_email]);
  useEffect(() => {
    // Update productDetails whenever g_city changes
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      city: g_city,
    }));
  }, [g_city]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  const [productDetails, setProductDetails] = useState({
    email: g_email,
    city: "",
    category: "",
    product: "",
    price: "",
    unit: "",
    description: "",
    product_pic: null,
  });

  // const categories = {
  //   Select: [],
  //   Electronics: ["Laptop", "Smartphone", "Headphones", "Camera"],
  //   Fashion: ["Dresses", "Shoes", "Watches", "Jewelry"],
  //   "Home & Kitchen": ["Cookware Set", "Blender", "Dining Table", "Bed Sheets"],
  // };
  const categories = {
    Select: [],
    Fruits: ["Apples", "Oranges", "Bananas", "Grapes"],
    Vegetables: ["Carrots", "Broccoli", "Lettuce", "Spinach"],
    Grains: ["Rice", "Wheat", "Oats", "Barley"],
    Drinks: ["Water", "Juice", "Soda", "Milk"]
};

  const units = ["kg", "piece", "gm", "ltr"];

  useEffect(() => {
    setProducts(selectedCategory ? categories[selectedCategory] : []);
  }, [selectedCategory]);

  function updatePic(event) {
    const { name, files } = event.target;
    if (files && files[0]) {
      setProductDetails({ ...productDetails, [name]: files[0] });
      const newImgSrc = URL.createObjectURL(files[0]);
      setProductImgSrc(newImgSrc);
    }
  }

  function doUpdateVal(event) {
    const { name, value } = event.target;
    setProductDetails({ ...productDetails, [name]: value });
  }

  function validateProductDetails(details) {
    const requiredFields = [
      "category",
      "product",
      "price",
      "unit",
      "description",
      "product_pic",
    ];
    return requiredFields.every(
      (field) => details[field] && details[field] !== "Select"
    );
  }

  async function handleProfileSubmit(event) {
    if (!validateProductDetails(productDetails)) {
      alert("Please complete all required fields.");
      return;
    }

    let fd = new FormData();
    for (let prop in productDetails) {
      fd.append(prop, productDetails[prop]);
    }
    console.log(productDetails);
    const url = "http://localhost:2000/grower/listNewProducts";
    const response = await axios.post(url, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert(JSON.stringify(response.data.msg));
  }

  function handleTemp(){
    alert(g_city);
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="border p-4">
        <h2>List Product</h2>
        <p>Welcome {g_name}</p>
        <Form>
          <Row className="mb-3">
            {/* <Form.Group as={Col} controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={doUpdateVal}
              />
            </Form.Group> */}
            <Form.Group as={Col} controlId="formBasicEmail">
              <Form.Label><h2>Enter Product Info</h2></Form.Label>
              
            </Form.Group>
            <Form.Group as={Col} md="5" controlId="formFileSm" className="mb-3">
              <Image
                src={productImgSrc}
                alt="Product"
                thumbnail
                className="product_img custom_size"
                style={{ width: '200px', height: '200px', borderRadius:"50%" }}
              />
              <Form.Control
                type="file"
                size="sm"
                required
                name="product_pic"
                onChange={updatePic}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Product Category</Form.Label>
              <Form.Control
                as="select"
                name="category"
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  doUpdateVal(e);
                }}
              >
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Product</Form.Label>
              <Form.Control as="select" name="product" onChange={doUpdateVal}>
                <option value="">Select</option>
                {products.map((product, index) => (
                  <option key={index} value={product}>
                    {product}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" name="price" onChange={doUpdateVal} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Per</Form.Label>
              <Form.Control as="select" name="unit" onChange={doUpdateVal}>
                <option value="select">Select</option>
                {units.map((unit, index) => (
                  <option key={index} value={unit}>
                    {unit}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formBasicDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={productDetails.description}
                onChange={doUpdateVal}
              />
            </Form.Group>
          </Row>
          <Button variant="primary" onClick={handleProfileSubmit}>
            List Now
          </Button>
          <Button variant="primary" onClick={handleTemp}>
            check
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default List_products;
