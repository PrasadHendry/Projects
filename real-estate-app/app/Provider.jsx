import React from "react";

function Provider(children) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Provider;
