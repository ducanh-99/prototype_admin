import axios from "axios";

export function onChangeFormLogin(event) {
  var body = { email: "", password: "" };
  body[event.target.id] = event.target.value;
  console.log(body);
}

export async function submitFormLoginApi(body) {
  console.log(body);
  let check_errors = false;
  await axios
    .post("/api/admin/login", body)
    .then((res) => {
      console.log(res);
      saveTokenLocalStorage(res.data.token);
      return { code: 200 };
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      check_errors = true;
    });
  return check_errors ? { code: 500 } : { code: 200 };
}

function saveTokenLocalStorage(token) {
  localStorage.setItem("token", token);
}
