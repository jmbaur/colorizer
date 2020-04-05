import React from "react";

const useMountEffect = fn => {
  React.useEffect(fn, []);
};

export default useMountEffect;
