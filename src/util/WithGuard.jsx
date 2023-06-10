import { useSelector } from "react-redux";

const withGuard = (Component) => {
  const Wrapper = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return isLoggedIn ? <Component /> : <div>Please Log In First !</div>;
  };
  return Wrapper;
};

export default withGuard;
