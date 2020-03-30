import React from "react";

const useLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
  return localStorage.getItem(key);
};

export default useLocalStorage;
