const prod = {
  url: process.env.REACT_APP_PROD_URL
};

const dev = {
  url: process.env.REACT_APP_DEV_URL
};

const config = process.env.NODE_ENV === "development" ? dev : prod;
export default config;
