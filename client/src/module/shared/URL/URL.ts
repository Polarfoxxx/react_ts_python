const API_URL = process.env.REACT_APP_USE_LOCAL === "true" 
  ? process.env.REACT_APP_API_URL_LOCAL 
  : process.env.REACT_APP_API_URL_PUBLIC;

export default API_URL;
