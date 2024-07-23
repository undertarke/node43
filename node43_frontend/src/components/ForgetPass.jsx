import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { forgetCheckCodeAPI, forgetCheckMailAPI, loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI";
import ReactFacebookLogin from "react-facebook-login";



const ForgetPass = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {

  }, []);

  const [step, setStep] = useState(0)

  return <div className="p-5 " style={{ minHeight: "100vh" }}>
    <div className=" d-flex justify-content-center">

      {step == 0 && <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" />
        </div>

        <div className="col-12">
          <button type="button" className="btn btn-primary"

            onClick={() => {
              let email = document.querySelector("#email").value

              forgetCheckMailAPI({ email }).then(result => {

                setStep(1)

              }).catch(error => {
                alert(error.response.data.message)
              })

            }}
          >Next</button>

        </div>

      </form>}

      {step == 1 && <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Nhập CODE</label>
          <input className="form-control" id="code" />
        </div>

        <div className="col-12">
          <button type="button" className="btn btn-primary"

            onClick={() => {
              let code = document.querySelector("#code").value
              forgetCheckCodeAPI({ code }).then(result => {

                setStep(2)

              }).catch(error => {
                alert(error.response.data.message)
              })

            }}
          >Next</button>

        </div>

      </form>}

      {step == 2 && <form className="row g-3 text-white">
        <div className="col-md-12">
          <label htmlFor="inputEmail4" className="form-label">Đổi mật khẩu</label>
          <input className="form-control" id="pass" />
        </div>

        <div className="col-12">
          <button type="button" className="btn btn-primary"

            onClick={() => {

              // call API đổi mật khẩu
              // lưu ý: truyền email và pass mới kèm theo CODE để tăng cường bảo mật

            }}
          >Next</button>

        </div>

      </form>}


    </div>
  </div>
};

export default ForgetPass;
