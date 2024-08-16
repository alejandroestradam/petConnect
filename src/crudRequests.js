import axios from "axios"

export async function loginUser({username, password}) {
  const config = {
    method: "POST",
    url: '',
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      username: username,
      password: password
    }
  }
  return axios(config)
}

export async function newUser({firstName, lastName, location, email, cellphone, password}) {
  const config = {
    method: "POST",
    url: '',
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      location: location,
      email: email,
      cellphone: cellphone,
      password: password
    }
  }
  return axios(config)
}

export async function updateUser({firstName, lastName, location, email, cellphone, password}) {
  const config = {
    method: "PUT",
    url: '',
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      firstName: firstName,
      lastName: lastName,
      location: location,
      email: email,
      cellphone: cellphone,
      password: password
    }
  }
  return axios(config)
}
