import axios from 'axios';

const API = axios.create({ baseURL: 'https://mini-social-app-23.herokuapp.com' });

// adding something to our request
API.interceptors.request.use((req) => {
  // send token to our server in order to authenticate user and give it permission 
  // to recieve data from  database
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile'))?.token}`;
  }

  return req;
})

export const fetchPosts = () => API.get(`/posts`);
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost) => API.post(`/posts`, newPost);
export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
// use template string to set the route with that url, because our server will take that id
// from the url after request was send to the sever and waiting it update that entity
// when middleware process is finished that update identity will send back to the client

// khi  trạng thái của biến currentId được gán giá trị thì nó sẽ kích hoạt hành động updatePost
// được gửi từ Form thông qua lệnh dispatch
// trong file api axios sẽ thực hiện request với route là patch (vá lại dữ liệu) truyền dữ liệu
// được cập nhập tới server để thay đổi dữ liệu trong cơ sở dữ liệu và gửi lại client 
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const signup = (formData) => API.post(`/users/signup`, formData);
export const signin = (formData) => API.post(`/users/signin`, formData);