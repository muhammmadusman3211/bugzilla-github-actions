import loader from "../../assets/gif/loader.gif"
import { SpinnerStyles } from "../../assets/index"

function Spinner() {
  return (
    <div className={SpinnerStyles.spinner}>
      <img src={loader} alt="Loading..." />
    </div>
  )
}

export default Spinner
