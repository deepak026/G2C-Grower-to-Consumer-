import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./style/SignupModalStyle.css";
import axios from "axios";

function SignUpModal({ onClose }) {
  const [signUpData, setSignUpData] = useState({
    // username: "",
    useremail: "",
    password: "",
    utype: "",
  });

  const [errors, setErrors] = useState({});
  function handleChange(event) {
    setSignUpData({ ...signUpData, [event.target.name]: event.target.value });
  }

  function validateForm() {
    let errs = {};
    // if (!signUpData.username) errs.username = "Username is required";
    if (!signUpData.useremail) errs.useremail = "email is required";
    if (!signUpData.password) errs.password = "password is required";
    if (!signUpData.utype) errs.utype = "UserType is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }
  async function handleSignUp() {
    if (validateForm()) {
      let fd = new FormData();
      console.log("data", signUpData);
      for (let prop in signUpData) {
        fd.append(prop, signUpData[prop]);
        console.log(prop+": " + signUpData[prop]);
      }
      // fd.forEach((value, key) => {
      //   console.log(key + ': ' + value);
      // });
      var url = `http://localhost:2000/user/saveSignUpInfo`;
      let reslObj = await axios.post(url, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(JSON.stringify(reslObj.data));
    }
  }
  return (
    <Modal show={true} onHide={onClose} className="modal_s">
      <Modal.Header closeButton>
        <Modal.Title>SignUp</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal_body_s">
        <div className="row">
          <div className="col">
            <img src="images/signup_img.jpg" className="signup_img" alt="person image" />
          </div>
          <div className="col">
          <div>
          {/* <input className="txtUsername" type="text" name="username" placeholder="username" id="" onChange={handleChange}/>
          <div>
            {errors.username && <p className="err_msg">{errors.username}</p>}
          </div> */}

          <input
            type="email"
            name="useremail"
            placeholder="email"
            id=""
            onChange={handleChange}
          />
          <div>
            {errors.useremail && <p className="err_msg">{errors.useremail}</p>}
          </div>

          <input
            className="hh"
            type="password"
            name="password"
            placeholder="password"
            id=""
            onChange={handleChange}
          />
          <div>
            {errors.password && <p className="err_msg">{errors.password}</p>}
          </div>

          <select name="utype" id="" onChange={handleChange}>
            <option value="select">Select</option>
            <option value="grower">Grower</option>
            <option value="consumer">Consumer</option>
          </select>
          <div>{errors.utype && <p className="err_msg">{errors.utype}</p>}</div>
        </div>
          </div>
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={onClose}>
                    Close
                </Button> */}
        <Button variant="primary" onClick={handleSignUp}>
          Sign-Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SignUpModal;
