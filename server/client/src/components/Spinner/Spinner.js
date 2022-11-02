import loader from "../../assets/gif/loader.gif";
import { SpinnerStyles } from "../../assets/index";

const Spinner = () => {
  return (
    <div className={SpinnerStyles.spinner}>
      <img src={loader} alt="Loading..."></img>
    </div>
  );
};

export default Spinner;
