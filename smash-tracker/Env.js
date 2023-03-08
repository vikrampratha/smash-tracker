// to use this
// import {apiEndpoint} from "./Env";
module.exports.apiEndpoint = () => {
    const DEV_API_ENDPOINT = "http://localhost:8080";
    const PROD_API_ENDPOINT = "http://35.169.71.192:8080";
    return (process.env.NODE_ENV == "development") ? DEV_API_ENDPOINT : PROD_API_ENDPOINT;
}

// add more env-specific functions
/* module.exports.myEnv = () => {
    return process.env.NODE_ENV;
} */
