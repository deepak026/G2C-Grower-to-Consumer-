import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "./style/LoginModalStyle.css"
import axios from "axios";
import { Spinner } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

function LoginModal({ onClose }) {
    const navigate = useNavigate();
   const [loginData, setLoginData] = useState({
      useremail:"",
      password:"",
   })

   const [errors, setErrors] = useState({});
   const [loginStatus, setLoginStatus] = useState(-1);

   function handleChange(event){
    setLoginData({...loginData, [event.target.name]:event.target.value});
   }

   function validateForm(){
      let errs={};
      if(!loginData.useremail) errs.useremail = "email is required";
      if(!loginData.password) errs.password = "password is required";
      setErrors(errs);
      return Object.keys(errs).length===0;
   }
   async function handleLogin(){
      if(validateForm()){
        let fd  = new FormData();
        for(let prop in loginData){
            fd.append(prop, loginData[prop]);
        }

        var url = "http://localhost:2000/user/authLoginInfo";
        // var url = "https://g2c-grower-to-consumer.onrender.com/user/authLoginInfo";

        let reslObj = await axios.post(url, fd, {
            headers:{ "Content-Type": "multipart/form-data"},
        });
        

        alert(JSON.stringify(reslObj.data));
        localStorage.setItem("token", reslObj.data.jtoken);
        var stat = reslObj.data.status;
        var utype = reslObj.data.utype;
        // alert(stat);
        if(stat==true){
            setLoginStatus(1);
            setTimeout(()=>{
                setLoginData(-1);
                if(utype=="grower"){
                    navigate("/grower/" + loginData.useremail);
                }
                else{
                    navigate("/consumer/" + loginData.useremail);
                }
            }, 1000);
            // alert(loginStatus);
            
        }
        else{
            setLoginStatus(0);
            // alert(loginStatus);
        }
      }
   }
    return (
        <Modal show={true} onHide={onClose} className="modal_l">
            <Modal.Header closeButton>
                <Modal.Title >Login</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal_body_l">
                <div className="row">
                    <div className="col" >
                        <img src="images/login_img.jpg" className='login_img' alt="Some image" />
                    </div>
                    <div className="col login_form_data">
                        <div>
                        <input type="text" name="useremail" placeholder="email" id="" onChange={handleChange}/>
                        <div>{errors.useremail && <p className="err_msg">{errors.useremail}</p>}</div>
                        
                        <input type="password" name="password" placeholder="password" id="" onChange={handleChange}/>
                        <div>{errors.password && <p className="err_msg">{errors.password}</p>}</div>
                        </div>
                        <div>
                        {loginStatus==1 && <p className="succ_msg">Login Successful. Redirecting...<Spinner size='xs' /></p>}
                        {loginStatus==0 && <p className="err_msg">Incorrect email/password</p>}
                        {/* {loginStatus && <p className="err_msg">{loginStatus}</p>} */}
                        </div>
                    </div>
                </div>
               
            </Modal.Body>
            <Modal.Footer>
                {/* <Button variant="secondary" onClick={onClose}>
                    Close
                </Button> */}
                <button variant="primary" onClick={handleLogin} className='login_btn'>
                    Login
                </button>
            </Modal.Footer>
        </Modal>
    );
}

export default LoginModal;
