import { useEffect, useState } from "react"
import { GetBugsApi } from "../../api/api"

const useGetBugs = () => {
  const [bugs, setBugs] = useState()
  useEffect(() => {
    GetBugsApi(process.env.REACT_APP_GET_BUGS).then((res) =>
      setBugs(res.data.bug)
    )
  }, [])

  return bugs
}

export default useGetBugs
