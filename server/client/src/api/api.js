import axios from "axios"

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`
  }

  if (req.url === process.env.REACT_APP_CREATE_BUG)
    req.headers["Content-Type"] = "multipart/form-data"

  return req
})

export const AuthApi = (url, data) => {
  return API.post(url, {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role,
  }).then((response) => response.data)
}

export const AuthLoginApi = (url, data) => {
  return API.post(url, {
    email: data.email,
    role: data.role,
  }).then((response) => response)
}

export const LogoutApi = (url) => {
  return API.post(url).then((response) => response)
}

export const CreateBugApi = (url, data) => {
  return API.post(url, data).then((response) => response.data)
}

export const GetBugsApi = (url, data) => {
  return API.get(url, data).then((response) => response)
}

export const GetDevelopersApi = (url) => {
  return API.get(url).then((response) => response)
}

export const CreateProjectApi = (url, data) => {
  return API.post(url, data).then((response) => response)
}

export const GetProjectApi = (url) => {
  return API.get(url).then((response) => response)
}

export const UpdateBugStatusApi = (url, data) => {
  return API.put(url, { id: data.id, status: data.status })
}

export const DeleteProjectApi = (url, data) => {
  return API.delete(url + "/" + data.id)
}

export const EditProjectApi = (url, data) => {
  return API.patch(url, data).then((res) => res.data)
}

export const AssignBugApi = (url, data) => {
  return API.put(url, data)
}

export const SendEmailApi = (url, data) => {
  return API.post(url, data)
}

export const ChangePasswordApi = (url, data) => {
  return API.post(url, data)
}
