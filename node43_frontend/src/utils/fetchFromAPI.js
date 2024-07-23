import axios from 'axios';

export const BASE_URL = 'http://localhost:8080';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
    // 'token': localStorage.getItem("LOGIN_USER")
  },
};



// export const fetchFromAPI = async (url) => {

//   const { data } = await axios.get(`${BASE_URL}/${url}`, options);

//   return data;
// };



export const getVideoAPI = async () => {

  const { data } = await axios.get(`${BASE_URL}/video/get-video`);

  return data.content;
};

export const getTypeAPI = async () => {

  const { data } = await axios.get(`${BASE_URL}/video/get-type`);

  return data.content;
};


export const getVideoTypeAPI = async (typeId) => {

  const { data } = await axios.get(`${BASE_URL}/video/get-video-type/${typeId}`);

  return data.content;
};



export const getVideoPageAPI = async (page) => {

  const { data } = await axios.get(`${BASE_URL}/video/get-video-page/${page}`);

  return data.content;
};



export const getVideoDetailAPI = async (videoId) => {

  const { data } = await axios.get(`${BASE_URL}/video/get-video-detail/${videoId}`);

  return data.content;
};


export const loginAPI = async (newData) => {

  const { data } = await axios.post(`${BASE_URL}/auth/login`, newData);

  return data;
};


export const signUpAPI = async (newData) => {

  const { data } = await axios.post(`${BASE_URL}/auth/sign-up`, newData);

  return data;
};


export const loginFacebookAPI = async (newData) => {

  const { data } = await axios.post(`${BASE_URL}/auth/login-face`, newData);

  return data;
};


export const forgetCheckMailAPI = async (newData) => {

  const { data } = await axios.post(`${BASE_URL}/auth/forget-check-email`, newData);

  return data;
};


export const forgetCheckCodeAPI = async (newData) => {

  const { data } = await axios.post(`${BASE_URL}/auth/forget-check-code`, newData);

  return data;
};