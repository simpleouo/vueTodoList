// 建立 .env 檔案
// VITE_API_BASE_URL=https://todolist-api.hexschool.io

import axios from "axios";

//api.js 設定 baseURL 
const apiUrl = axios.create({
    // baseURL: 'https://todolist-api.hexschool.io',
    baseURL: import.meta.env.VITE_API_BASE_URL,
});
//- Vite 專案中環境變數要以 `VITE_` 開頭，才能在程式碼中透過 `import.meta.env` 存取
//- 可以在不同環境用不同的 API URL，更實務也更安全

export const apiSignUp = (data) => apiUrl.post('/users/sign_up', data);
export const apiSignIn = (data) => apiUrl.post('/users/sign_in', data);

//需 token 驗證 url
const apiTokenUrl = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});
//發送攔截器
apiTokenUrl.interceptors.request.use((config) => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)vue3-todolist-token\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  )
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export const apiSignCheck = (data) => apiTokenUrl.get('/users/checkout', data);
export const apiSignOut = (data) => apiTokenUrl.post('/users/sign_out', data);
export const apiGetTodoList = (data) => apiTokenUrl.get('/todos', data);
export const apiAddTodo = (data) => apiTokenUrl.post('/todos', data);
export const apiEditTodo = (id,data) => apiTokenUrl.put(`/todos/${id}`, data);
export const apiDelTodo = (id) => apiTokenUrl.delete(`/todos/${id}`);
export const apiTodoStatus = (id) => apiTokenUrl.patch(`/todos/${id}/toggle`);