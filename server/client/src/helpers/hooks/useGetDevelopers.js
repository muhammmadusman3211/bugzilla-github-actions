import { useEffect, useState } from "react"
import { GetDevelopersApi } from "../../api/api"

const useGetDevelopers = () => {
  const [developers, setDevelopers] = useState()
  useEffect(() => {
    GetDevelopersApi(process.env.REACT_APP_GET_DEVELOPERS).then((res) =>
      setDevelopers(res.data.developers)
    )
  }, [])

  return developers
}

export default useGetDevelopers
