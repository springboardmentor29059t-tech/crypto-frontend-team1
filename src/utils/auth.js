export const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

export const loginUser = (email, password) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return false;

  return user.email === email && user.password === password;
};

export const logoutUser = () => {
  localStorage.removeItem("isLoggedIn");
};

export const setLoggedIn = () => {
  localStorage.setItem("isLoggedIn", "true");
};

export const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};
