import React, { useEffect, useState } from "react";
import "./style/ProfileGrowerStyle.css";
import axios from "axios";
import { useParams } from "react-router";
import { doGetGrowerInfo, doUpdateGrowerProfile } from "@/services/grower-controller";
function ProfileGrower() {
  const { email } = useParams();

  const [growerProfileObj, setGrowerProfileObj] = useState({
    g_email: email || "",
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

  useEffect(() => {
    const getGrowerInfo = async () => {
      const response = await doGetGrowerInfo(email);
      // alert(JSON.stringify(response));

      if (response.data.status == true) {
        const growerData = response.data.doc;
        setGrowerProfileObj(growerData);
        if (growerData.g_profile_pic) {
          setProfileImgSrc(growerData.g_profile);
        }
        if (growerData.g_proof_pic) {
          setProofImgSrc(growerData.g_proof);
        }
      } else {
        alert("Error: " + (response.data?.msg || "No data received"));
      }
    };

    if (email) {
      getGrowerInfo();
    }
  }, [email]);

  const updatePic = (event) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      const newImgSrc = URL.createObjectURL(files[0]);
      setGrowerProfileObj({ ...growerProfileObj, [name]: files[0] });
      name === "g_profile_pic"
        ? setProfileImgSrc(newImgSrc)
        : setProofImgSrc(newImgSrc);
    }
    console.log(growerProfileObj);
  };

  const doUpdateVal = (event) => {
    const { name, value } = event.target;
    setGrowerProfileObj({ ...growerProfileObj, [name]: value });
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    if (!growerProfileObj.g_profile_pic || !growerProfileObj.g_proof_pic) {
      alert("Please upload both profile and proof pictures.");
      return;
    }

    try {
      // alert(JSON.stringify(growerProfileObj));
      let fd = new FormData();
      for (let prop in growerProfileObj) {
        if (prop !== "g_profile" && prop !== "g_proof") {
          fd.append(prop, growerProfileObj[prop]);
        }
      }
      // for (let [key, value] of fd.entries()) {
      //   console.log(key, value);
      // }

      
      const reslObj = await doUpdateGrowerProfile(fd);
      // alert(JSON.stringify(reslObj.data));
      if (reslObj.data.status) {
        alert(reslObj.data.msg);
      } else {
        alert("Some error occured");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

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
              onChange={updatePic}
              style={{ display: "none" }}
            />
          </div>

          <div className="info-section">
            <input
              type="text"
              name="g_name"
              placeholder="Name"
              value={growerProfileObj.g_name || ""}
              required
              onChange={doUpdateVal}
            />
            <input
              type="text"
              name="g_contact"
              placeholder="Contact No."
              value={growerProfileObj.g_contact || ""}
              required
              onChange={doUpdateVal}
            />
            <input
              type="text"
              name="g_address"
              placeholder="Address"
              value={growerProfileObj.g_address || ""}
              required
              onChange={doUpdateVal}
            />
            <input
              type="text"
              name="g_city"
              placeholder="City/Village"
              value={growerProfileObj.g_city || ""}
              required
              onChange={doUpdateVal}
            />
            <input
              type="text"
              name="g_state"
              placeholder="State"
              value={growerProfileObj.g_state || ""}
              required
              onChange={doUpdateVal}
            />
            <input
              type="text"
              name="g_aadhar"
              placeholder="Aadhar Card No."
              value={growerProfileObj.g_aadhar || ""}
              required
              onChange={doUpdateVal}
            />
            <textarea
              name="g_otherInfo"
              placeholder="Other Information"
              value={growerProfileObj.g_otherInfo || ""}
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
