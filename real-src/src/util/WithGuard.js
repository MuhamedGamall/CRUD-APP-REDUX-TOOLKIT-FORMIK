import { useSelector } from "react-redux";

const WithGuard = (Component) => {
  const Wrapper = (props) => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return isLoggedIn ? (
      <Component {...props} />
    ) : (
      <center>Please Log In First!</center>
    );
  };
  return Wrapper;
};

export default WithGuard;
