import { useEffect, useState } from "react"
import { GetDevelopersApi } from "../../api/api"

const useGetDevelopers = () => {
  const [developers, setDevelopers] = useState()
  const [qa, setQA] = useState()
  useEffect(() => {
    GetDevelopersApi(process.env.REACT_APP_GET_DEVELOPERS).then((res) => {
      setDevelopers(res.data.data.developers)
      setQA(res.data.data.qa)
    })
  }, [])

  return [developers, qa]
}

export default useGetDevelopers
