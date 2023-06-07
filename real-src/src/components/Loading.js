import React from "react";
function Loading({ children, loading, error }) {
  const typeElement = children?.type?.render?.displayName;
  function renderHundler() {
    if (typeElement === "Button") {
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
              <p> Error " {error} "</p>
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
          <tr>
            <td colSpan={5}>Loading PLaese Wait...</td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan={5}>{error}</td>
          </tr>
        ) : (
          children
        )}
      </>
    );
  }
  return renderHundler();
}

export default Loading;
