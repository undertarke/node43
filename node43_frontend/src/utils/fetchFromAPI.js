import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';
export const BASE_URL_IMG = 'http://localhost:8080/public/imgs/';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    'token': localStorage.getItem("LOGIN_USER"),
    // 'Content-Type': 'multipart/form-data'
  },
};



// export const fetchFromAPI = async (url) => {

//   const { data } = await axios.get(`${BASE_URL}/${url}`, options);

//   return data;
// };


export const getUserAPI = async () => {

  const { data } = await axios.get(`${BASE_URL}/get-user`, options);

  return data;
};



export const getTypeAPI = async () => {

  const { data } = await axios.get(`${BASE_URL}/video/get-type`, options);

  return data.content;
};


export const getVideoTypeAPI = async (typeId) => {

  const { data } = await axios.get(`${BASE_URL}/video/get-video-type/${typeId}`, options);

  return data.content;
};



export const getVideoAPI = async () => {

  const { data } = await axios.get(`${BASE_URL}/video/get-video`, options);

  return data.content;
};

export const getVideoPageAPI = async (page) => {

  const { data } = await axios.get(`${BASE_URL}/video/get-video-page/${page}`, options);

  return data.content;
};



export const getVideoDetailAPI = async (videoId) => {

  const { data } = await axios.get(`${BASE_URL}/video/get-video-detail/${videoId}`, options);

  return data.content;
};


export const loginAPI = async (newData) => {

  const { data } = await axios.post(`${BASE_URL}/auth/login`, newData, options);

  return data;
};


export const signUpAPI = async (newData) => {

  const { data } = await axios.post(`${BASE_URL}/auth/sign-up`, newData, options);

  return data;
};


export const loginFacebookAPI = async (newData) => {

  const { data } = await axios.post(`${BASE_URL}/auth/login-face`, newData, options);

  return data;
};


export const forgetCheckMailAPI = async (newData) => {

  const { data } = await axios.post(`${BASE_URL}/auth/forget-check-email`, newData, options);

  return data;
};


export const forgetCheckCodeAPI = async (newData) => {

  const { data } = await axios.post(`${BASE_URL}/auth/forget-check-code`, newData, options);

  return data;
};


export const uploadCloudAPI = async (formData) => {
  const { data } = await axios.post("https://api.cloudinary.com/v1_1/dghvdbogx/auto/upload", formData)

  return data
}


export const uploadVideoAPI = async (formData) => {
  const { data } = await axios.post(`${BASE_URL}/video/upload-video`, formData, options)

  return data
}





axios.interceptors.request.use(function (config) {

  return config;
}, function (error) {

  return Promise.reject(error);
});




axios.interceptors.response.use(function (response) {

  return response;
}, function (error) {

  if (error.response.data == "TokenExpiredError") {
    axios.post(`${BASE_URL}/auth/reset-token`, "", options).then(result => {

      localStorage.setItem("LOGIN_USER", result.data.content)
      window.location.reload()

    }).catch(error => {
      // alert("Token và refresh token hết hạn")
    })
  }

  return Promise.reject(error);
});