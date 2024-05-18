import React, { useEffect, useState } from "react";
import "./style/ProfileGrowerStyle.css";
import axios from "axios";
import { useParams } from "react-router";

function ProfileGrower() {
  const {email} = useParams();

  async function getGrowerInfo(){
    const url = `http://localhost:2000/grower/growerInfo?email=${email}`;
    const response = await axios.get(url);
    if (response.data) {
      // alert(JSON.stringify(response.data[0]));
      setGrowerProfileObj(response.data[0]);

    } else {
      alert("Error: " + response.data.msg);
    }
  }
  useEffect(()=>{
    getGrowerInfo();
  }, [email]);
  const [growerProfileObj, setGrowerProfileObj] = useState({
    g_email: email,
    g_name: "",
    g_contact: "",
    g_address: "",
    g_city: "",
    g_state: "",
    g_aadhar: "",
    g_otherInfo: "",
    g_profile_pic: null,
    g_proof_pic: null,
  });
  const [profileImgSrc, setProfileImgSrc] = useState(
    "https://via.placeholder.com/200"
  );
  const [proofImgSrc, setProofImgSrc] = useState(
    "https://via.placeholder.com/200"
  );

  function updatePic(event) {
    const { name, files } = event.target;
    if (files && files[0]) {
      setGrowerProfileObj({ ...growerProfileObj, [name]: files[0] });
      const newImgSrc = URL.createObjectURL(files[0]);
      name === "g_profile_pic"
        ? setProfileImgSrc(newImgSrc)
        : setProofImgSrc(newImgSrc);
    }
  }

  function doUpdateVal(event) {
    const { name, value } = event.target;
    setGrowerProfileObj({ ...growerProfileObj, [name]: value });
  }

  async function handleProfileSubmit(event) {
    event.preventDefault();
    if (!growerProfileObj.g_profile_pic || !growerProfileObj.g_proof_pic) {
      alert("Please upload both profile and proof pictures.");
      return;
    }
    console.log(growerProfileObj);
    let fd = new FormData();
    for (let prop in growerProfileObj) {
      fd.append(prop, growerProfileObj[prop]);
    }
    const url = "http://localhost:2000/grower/updateGrowerProfile";

    const reslObj = await axios.post(url, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert(JSON.stringify(reslObj.data));
  }

  return (
    <div className="profile-page">
      <h1 className="profile-title">Grower Profile</h1>
      <form className="profile-form" onSubmit={handleProfileSubmit}>
        <div className="form-section">
          <div className="photo-section">
            <img src={profileImgSrc} alt="Profile" className="profile-photo" />
            <label htmlFor="profile_pic" className="file-label">
              Profile Pic
            </label>
            <input
              type="file"
              id="profile_pic"
              name="g_profile_pic"
              required
              onChange={updatePic}
              style={{ display: "none" }}
            />
            <img src={proofImgSrc} alt="Proof" className="proof-photo" />
            <label htmlFor="proof_pic" className="file-label">
              Proof Pic
            </label>
            <input
              type="file"
              id="proof_pic"
              name="g_proof_pic"
              required
              onChange={updatePic}
              style={{ display: "none" }}
            />
          </div>

          <div className="info-section">
            {/* <input
              type="text"
              name="g_email"
              placeholder="Email"
              value={growerProfileObj.g_email}
              required
              onChange={doUpdateVal}
            /> */}
            <input
              type="text"
              name="g_name"
              placeholder="Name"
              value={growerProfileObj.g_name}
              required
              onChange={doUpdateVal}
            />
            <input
              type="text"
              name="g_contact"
              placeholder="Contact No."
              value={growerProfileObj.g_contact}
              required
              onChange={doUpdateVal}
            />
            <input
              type="text"
              name="g_address"
              placeholder="Address"
              value={growerProfileObj.g_address}
              required
              onChange={doUpdateVal}
            />
            <input
              type="text"
              name="g_city"
              placeholder="City/Village"
              value={growerProfileObj.g_city}
              required
              onChange={doUpdateVal}
            />
            <input
              type="text"
              name="g_state"
              placeholder="State"
              value={growerProfileObj.g_state}
              required
              onChange={doUpdateVal}
            />
            <input
              type="text"
              name="g_aadhar"
              placeholder="Aadhar Card No."
              value={growerProfileObj.g_aadhar}
              required
              onChange={doUpdateVal}
            />
            <textarea
              name="g_otherInfo"
              placeholder="Other Information"
              value={growerProfileObj.g_otherInfo}
              required
              onChange={doUpdateVal}
              rows="3"
            ></textarea>
          </div>
        </div>
        <button type="submit" className="submit-btn">
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileGrower;
