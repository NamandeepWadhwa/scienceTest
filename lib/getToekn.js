export function setToken(value) {
  localStorage.setItem("token", value);
}
export function getToken() {
  return localStorage.getItem("token");
}