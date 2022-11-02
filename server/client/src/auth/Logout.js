import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signOutUser } from "../redux/actions/userActions";
import { useSnackbar } from "react-simple-snackbar";
import { useNavigate } from "react-router-dom";

import { Spinner } from "../components";
import { options } from "../helpers/options";

const Logout = () => {
  console.count("LOGOUT");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [openSnackbar, closeSnackbar] = useSnackbar(options);

  const url = process.env.REACT_APP_LOGOUT_URL;
  useEffect(() => {
    dispatch(signOutUser(url, setLoading, openSnackbar, navigate));
    setLoading(true);
  }, [dispatch, navigate, openSnackbar, url, loading]);
  return loading && <Spinner />;
};

export default Logout;
