function Loading({ children, loading, error }) {
  return (
    <>
      {loading ? (
        <p>"Loading please wait..."</p>
      ) : error ? (
        <p>Faild To Fetch</p>
      ) : (
        children
      )}
    </>
  );
}

export default Loading;
