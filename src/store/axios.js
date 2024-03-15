import axios from "axios";

export default axios.create({
  baseURL: "https://hueyond.run/api/",
  headers: {
    token: "22/7/13/18/57",
  },
});
