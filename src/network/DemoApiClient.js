import axios from "axios";

const demoApiClient = axios.create({
    baseURL: process.env.API_URL
});

export default demoApiClient;