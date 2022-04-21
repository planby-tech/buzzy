export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    };
  } else {
    return {};
  }
}
