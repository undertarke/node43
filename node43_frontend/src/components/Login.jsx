import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI";
import ReactFacebookLogin from "react-facebook-login";



const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {

  }, []);

  const navigate = useNavigate()

  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">
      <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Password</label>
          <input className="form-control" id="pass" />
        </div>
        <div className="col-12">
          <button type="button" className="btn btn-primary"

            onClick={() => {
              let email = document.querySelector("#email").value
              let pass_word = document.querySelector("#pass").value
              loginAPI({ email, pass_word })
                .then(result => {
                  alert(result.message)
                  // lưu localStorage

                  localStorage.setItem("LOGIN_USER",result.content)
                  window.location.reload()
                })
                .catch(error => {
                  // console.log(error)
                  alert(error.response.data.message)
                })

            }}
          >Login</button>
          <a href="#" className=" text-primary" onClick={()=>navigate("/forget")}>
            Forget password
          </a>

        </div>

        <ReactFacebookLogin
          appId="1000846641517293"
          fields="name,email,picture"
          callback={(response) => {
            console.log(response)
            let { id, name, email } = response

            let newData = { face_app_id: id, full_name: name, email }
            loginFacebookAPI(newData).then(result => {

              alert(result.message)
              // lưu localStorage
              localStorage.setItem("LOGIN_USER",result.content)
              window.location.reload()
            })
              .catch(error => {
                // console.log(error)
                alert(error.response.data.message)
              })

          }}
        />

      </form>

    </div>
  </div>
};

export default Login;
