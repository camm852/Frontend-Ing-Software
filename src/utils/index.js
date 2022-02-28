import apiCall from "../api/index";

const url = "http://localhost:8080";

//TODO refactorizar peticiones

//Funcion de peticion de registro

export const signUpCall = async (user) => {
  try {
    const params = {
      ...user,
      roleCode: 1,
    };

    console.log(`${url}/api/user/save`);

    const signUpApiCall = await apiCall({
      method: "POST",
      url: `${url}/api/user/save`,
      body: JSON.stringify(params),
      headers: { "content-type": "application/json" },
    });
    return signUpApiCall;
  } catch (error) {
    console.log(error);
  }
};

//Funcion de peticion de inicio de sesion

export const signInCall = async (user) => {
  try {
    //Parametros

    const params = {
      ...user,
      grant_type: "client_credentials",
    };

    //Armar URI

    const formBody = Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");

    const sigInApiCall = await apiCall({
      method: "POST",
      url: `${url}/oauth/client_credential/accesstoken`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    });

    return await sigInApiCall;
  } catch (error) {
    console.log(error);
  }
};

//Funcion de peticion de informacion de usuario con el token

export const tokenInfoCall = async (token) => {
  const tokenInfoApiCall = await apiCall({
    method: "GET",
    url: `${url}/oauth/getPayload?token=${token.access_token}`,
    headers: { "content-type": "application/json" },
  });
  return tokenInfoApiCall;
};

//Funcion peticion al servicio usuario

export const userServiceCall = async ({ values, type, service }) => {
  const id = myLocalStorage.get("session").userId;

  switch (type.toUpperCase()) {
    case "UPDATE": {
      const userServiceApiCall = await apiCall({
        method: `PUT`,
        url: `${url}/api/${service}/update/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myLocalStorage.get("token")}`,
        },
        body: JSON.stringify(values),
      });

      return userServiceApiCall;
    }

    case "LIST": {
      const userServiceApiCall = await apiCall({
        method: `GET`,
        url: `${url}/api/${service}/list`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myLocalStorage.get("token")}`,
        },
      });
      return userServiceApiCall;
    }

    case "ADD": {
      const userServiceApiCall = await apiCall({
        method: `POST`,
        url: `${url}/api/${service}/save`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myLocalStorage.get("token")}`,
        },
      });
      return userServiceApiCall;
    }

    default:
      break;
  }
};

export const supplierServiceCall = async (values, type, service) => {
  const _Type = type.toUpperCase();

  switch (_Type) {
    case "ADD": {
      const supplierServiceApiCall = await apiCall({
        method: "POST",
        url: `${url}/api/${service}/save`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myLocalStorage.get("token")}`,
        },
      });
      break;
    }
    case "LIST": {
      const supplierServiceApiCall = await apiCall({
        method: "GET",
        url: `${url}/api/${service}/list`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myLocalStorage.get("token")}`,
        },
      });
      break;
    }

    default:
      break;
  }
};

export const findIndexElement = (array, item) => {
  let count = -1;
  array.map((element, i) => {
    if (Object.values(element).join("").includes(item)) {
      count = i;
    }
  });

  return count;

  // if (!find) return -1;
  // else return 1;
};

//Funcion local storage

export const myLocalStorage = (() => {
  return {
    set: (key, value) => {
      if (!window.localStorage.getItem(key))
        window.localStorage.setItem(key, value);
      else {
        window.localStorage.setItem(key, value);
        window.localStorage.removeItem(key);
      }
    },
    get: (key) => {
      return JSON.parse(window.localStorage.getItem(key));
    },
    remove: (key) => {
      myLocalStorage.get(key)
        ? window.localStorage.removeItem(key)
        : console.log("Key no inicializada");
    },
  };
})();
