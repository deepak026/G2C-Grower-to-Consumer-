import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { doFindAllGrowerData } from "@/services/consumer-controller";
import "./FindGrowerStyle.css";

function FindGrower() {
  const [growerCities, setGrowerCities] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productItem, setProductItem] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [serverResponse, setServerResponse] = useState({});
  const [filteredGrowers, setFilteredGrowers] = useState([]);

  // Getting all info of the growers and updating the combo boxes
  async function findAllGrowerDetails() {
    const response = await doFindAllGrowerData();
    setServerResponse(response);
    let cities = response.data.map((obj) => obj.city.toLowerCase());
    var uCities = Array.from(new Set(cities));
    setGrowerCities(uCities);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "city") {
      setSelectedCity(value);
      setSelectedCategory("");
      setSelectedProduct("");
    } else if (name === "category") {
      setSelectedCategory(value);
      setSelectedProduct("");
    } else if (name === "product") {
      setSelectedProduct(value);
    }
  }

  function handleFindGrower() {
    // First, filter growers by the selected city
    let filteredGrowers = serverResponse.data.filter(
      (grower) => grower.city.toLowerCase() === selectedCity.toLowerCase()
    );

    // Then, filter growers who have the selected category of products listed
    filteredGrowers = filteredGrowers.filter((grower) =>
      grower.products.some(
        (product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    );

    // Further filter growers who have the selected product
    filteredGrowers = filteredGrowers.filter((grower) =>
      grower.products.some(
        (product) =>
          product.product.toLowerCase() === selectedProduct.toLowerCase()
      )
    );

    setFilteredGrowers(filteredGrowers);
  }

  useEffect(() => {
    findAllGrowerDetails();
  }, []);

  useEffect(() => {
    if (serverResponse.data && selectedCity) {
      const filteredGrowers = serverResponse.data.filter(
        (grower) => grower.city.toLowerCase() === selectedCity.toLowerCase()
      );

      const categories = filteredGrowers.flatMap((grower) =>
        grower.products.map((product) => product.category.toLowerCase())
      );
      const uniqueCategories = Array.from(new Set(categories));
      setProductCategory(uniqueCategories);
      setProductItem([]); // Reset product items when city changes
    } else {
      setProductCategory([]);
    }
  }, [selectedCity, serverResponse]);

  useEffect(() => {
    if (serverResponse.data && selectedCity && selectedCategory) {
      const filteredProducts = serverResponse.data
        .filter(
          (grower) => grower.city.toLowerCase() === selectedCity.toLowerCase()
        )
        .flatMap((grower) => grower.products)
        .filter(
          (product) =>
            product.category.toLowerCase() === selectedCategory.toLowerCase()
        )
        .map((product) => product.product.toLowerCase());

      const uniqueProducts = Array.from(new Set(filteredProducts));
      setProductItem(uniqueProducts);
    } else {
      setProductItem([]);
    }
  }, [selectedCategory, selectedCity, serverResponse]);

  return (
    <Container>
      <div className="grower_details">
        <label htmlFor="city">City/Village</label>
        <select name="city" id="city" onChange={handleChange}>
          <option value="">selected</option>
          {growerCities.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label htmlFor="category">Product Category</label>
        <select name="category" id="category" value={selectedCategory} onChange={handleChange}>
          <option value="">selected</option>
          {productCategory.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label htmlFor="product">Items</label>
        <select name="product" id="product" value={selectedProduct} onChange={handleChange}>
          <option value="">selected</option>
          {productItem.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <br />
        <br />
        <br />
        <Button onClick={handleFindGrower}>Find Grower</Button>
      </div>
      <br />
      <br />
      <Row>
        {filteredGrowers.map((grower, index) => {
          const product = grower.products.find(
            (product) =>
              product.product.toLowerCase() === selectedProduct.toLowerCase()
          );
          return (
            <Col key={index} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{grower.g_name}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {grower.email}
                    <br />
                    <strong>City:</strong> {grower.city}
                    <br />
                    <strong>Category:</strong> {product?.category}
                    <br />
                    <strong>Product:</strong> {product?.product}
                    <br />
                    <strong>Price:</strong> {product?.price}
                    <br />
                    <strong>Description:</strong> {product?.description}
                  </Card.Text>
                  <Button>Contact Grower</Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default FindGrower;
