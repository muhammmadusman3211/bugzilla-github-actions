import axios from "axios"

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`
  }

  if (req.url === "manager/create-bug")
    req.headers["Content-Type"] = "multipart/form-data"

  return req
})
export const AuthApi = (url, data) => {
  return API.post(url, {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
  })
    .then((response) => response)
    .catch((err) => err)
}

export const AuthLoginApi = (url, data) => {
  return API.post(url, {
    email: data.email,
    role: data.role,
  })
    .then((response) => response)
    .catch((err) => console.log("err", err))
}

export const LogoutApi = (url) => {
  return API.post(url)
    .then((response) => response)
    .catch((err) => console.log("err", err))
}

export const CreateBugApi = (url, data) => {
  return API.post(url, data)
    .then((response) => response)
    .catch((err) => console.log("err", err))
}

export const GetBugsApi = (url, data) => {
  return API.get(url, data)
    .then((response) => response)
    .catch((error) => error)
}

export const GetDevelopersApi = (url) => {
  return API.get(url)
    .then((response) => response)
    .catch((error) => error)
}

export const CreateProjectApi = (url, data) => {
  return API.post(url, data)
    .then((response) => response)
    .catch((error) => error)
}

export const GetProjectApi = (url) => {
  console.log(url)
  return API.get(url)
    .then((response) => console.log(response))
    .catch((error) => error)
}

export const UpdateBugStatusApi = (url, data) => {
  console.log(data)
  return API.put(url, { id: data.id, status: data.status })
}

export const DeleteProjectApi = (url, data) => {
  console.log(data)
  return API.delete(url + "/" + data.id)
}

export const EditProjectApi = (url, data) => {
  return API.put(url, data)
}

export const AssignBugApi = (url, data) => {
  return API.put(url, data)
}
