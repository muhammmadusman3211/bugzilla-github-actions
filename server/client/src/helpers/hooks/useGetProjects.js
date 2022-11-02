import { useEffect, useState } from "react"
import { GetDevelopersApi } from "../../api/api"

const useGetProjects = () => {
  const [projects, setProjects] = useState()
  console.log(process.env.REACT_APP_GET_PROJECTS)
  useEffect(() => {
    GetDevelopersApi(process.env.REACT_APP_GET_PROJECTS).then((res) =>
      setProjects(res.data.projects)
    )
  }, [])

  return projects
}

export default useGetProjects
