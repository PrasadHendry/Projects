import React from "react";
import Header from "./_components/Header";

function Provider({ children }) {
  return (
    <div>
      <Header />
      <div className="mt-32">{children}</div> {/* Corrected className */}
    </div>
  );
}

export default Provider;
