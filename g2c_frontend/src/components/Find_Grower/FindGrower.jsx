import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FindGrowerStyle.css";
import { doFindAllGrowerData } from "@/services/consumer-controller";
function FindGrower() {
  const [growerCities, setGrowerCities] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productItem, setProductItem] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [serverResponse, setServerResponse] = useState({});

  //getting all info of the growers and updating the combo boxes
  async function findAllGrowerDetails() {
    const response = await doFindAllGrowerData();
    setServerResponse(response);
    // alert(JSON.stringify(response.data))
    let cities = response.data.map((obj) => obj.city.toLowerCase());
    // let cats = response.data.flatMap(obj=>obj.products.map(product=>product.category.toLowerCase()));
    // let prod = response.data.flatMap(obj=>obj.products.map(product=>product.product.toLowerCase()));
    // alert(cats)
    // alert(cities);
    var uCities = Array.from(new Set(cities));
    // var uCats = Array.from(new Set(cats));
    // var uProd = Array.from(new Set(prod));
    // alert(uCities);
    setGrowerCities(uCities);
    // setProductCategory(uCats);
    // setProductItem(uProd);
    // alert(JSON.stringify(response.data));
  }

  function handleChange(event) {
    let { name } = event.target;
    if (name == "city") setSelectedCity(event.target.value);
    else if (name === "category") setSelectedCategory(event.target.value);
    else if (name === "product") setSelectedProduct(event.target.value);
  }

  function handleFindGrower() {
    // alert(selectedCity + " " + selectedCategory + " " + selectedProduct);
    alert(JSON.stringify(serverResponse));
  }
  useEffect(() => {
    findAllGrowerDetails();
  }, []);

  useEffect(() => {
    if (serverResponse.data) {
      let filteredGrower = serverResponse.data.filter(
        (grower) => grower.city.toLowerCase() === selectedCity.toLowerCase()
      );

      let categories = filteredGrower.flatMap((grower) => {
        return grower.products.map((product) => product.category.toLowerCase());
      });
      let uCats = Array.from(new Set(categories));

      setProductCategory(uCats);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (serverResponse.data && selectedCity) {
      let filteredProducts = serverResponse.data
      .filter((grower)=>grower.city.toLowerCase()===selectedCity.toLowerCase())
      .flatMap((grower)=>grower.products)
      .filter((product)=>product.category.toLowerCase()===selectedCategory.toLowerCase())
      .map((product)=>product.product.toLowerCase());

      let uProducts = Array.from(new Set(filteredProducts));
      setProductItem(uProducts);
    }
  }, [selectedCategory]);

  //useeffect to change product category based on selected city

  return (
    <>
      <div className="grower_details">
        <label htmlFor="">City/Village</label>
        <select name="city" id="" onChange={handleChange}>
          <option value="">selected</option>
          {growerCities.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <label htmlFor="">Product Category</label>
        <select name="category" id="" onChange={handleChange}>
          <option value="">selected</option>
          {productCategory.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <label htmlFor="">Items</label>
        <select name="product" id="" onChange={handleChange}>
          <option value="">selected</option>
          {productItem.map((item, index) => {
            return (
              <option key={index} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <br />
        <br />
        <br />
        <input type="button" value="Find Grower" onClick={handleFindGrower} />
      </div>
    </>
  );
}

export default FindGrower;
