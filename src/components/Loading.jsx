import React from "react";

function Loading({ children, loading, error }) {
  const elementType = children?.type?.render?.displayName;
  console.log(elementType);
  if (elementType === "Button") {
    const cloneButton = React.cloneElement(
      children,
      { disabled: true },
      "Loading..."
    );
    return (
      <>
        {loading ? (
          cloneButton
        ) : error ? (
          <>
            {children}
            <p> " {error} "</p>
          </>
        ) : (
          children
        )}
      </>
    );
  }

  return (
    <>
      {loading ? (
        <p>Loading Please Wait...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        children
      )}
    </>
  );
}

export default Loading;
