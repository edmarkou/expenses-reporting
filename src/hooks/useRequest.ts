import axios from "axios";
const API_URL = "http://localhost:3001";

const useRequest = () => {
  const getRequest = (url: string, options = {}) => axios.get(`${API_URL}/${url}`, options);
  const postRequest = (url: string, input = {}, options = {}) => axios.post(`${API_URL}/${url}`, input, options);
  const deleteRequest = (url: string, options = {}) => axios.delete(`${API_URL}/${url}`, options);

  return { getRequest, postRequest, deleteRequest };
}

export default useRequest;
