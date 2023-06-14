import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const create = async (postData) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl, postData, config);
  return request.then((response) => response.data);
};

const update = async ({ id, postData }) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(postData);
  const request = axios.put(`${baseUrl}/${id}`, postData, config);
  return request.then((response) => response.data);
};

const comment = async ({ id, comment }) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(`${baseUrl}/comments/${id}`, { comment }, config);
  return request.then((response) => response.data);
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then((response) => response.data);
};

export default { getAll, setToken, create, update, remove, comment };
