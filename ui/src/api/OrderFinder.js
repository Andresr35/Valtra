import axios from "axios";

export default axios.create({
    baseURL:"http://192.168.0.33:3001/api/shopify"
});