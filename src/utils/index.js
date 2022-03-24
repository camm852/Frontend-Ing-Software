import apiCall from "../api/index";

// url = "http://localhost:8080";

const url = "http://34.125.175.40:8080";

//Funcion de peticion de registro

export const signUpCall = async (user) => {
  try {
    const params = {
      ...user,
      roleCode: 1,
    };

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

export const supplierServiceCall = async (values, type) => {
  const _Type = type.toUpperCase();

  switch (_Type) {
    case "LIST": {
      const supplierServiceApiCall = await apiCall({
        method: "GET",
        url: `${url}/api/supplier/list`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myLocalStorage.get("token")}`,
        },
      });
      return supplierServiceApiCall;
    }
    case "ADD": {
      const supplierServiceApiCall = await apiCall({
        method: "POST",
        url: `${url}/api/supplier/save`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${myLocalStorage.get("token")}`,
        },
        body: JSON.stringify(values),
      });
      return supplierServiceApiCall;
    }

    default:
      break;
  }
};

export const cityServiceCall = async () => {
  const cityServiceApiCall = await apiCall({
    method: "GET",
    url: `${url}/api/city/list`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myLocalStorage.get("token")}`,
    },
  });
  return cityServiceApiCall;
};

export const questionServiceCall = async () => {
  const questionServiceApiCall = await apiCall({
    method: "GET",
    url: `${url}/api/question/list`,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return questionServiceApiCall;
};

export const forgotPasswordServiceCall = async (
  { emailState, answerState, password },
  service
) => {
  const encodeForm = (object) => {
    let formBody = Object.keys(object)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(object[key])
      )
      .join("&");
    return formBody;
  };
  switch (service) {
    case "email": {
      const form = {
        email: emailState,
      };
      let formBody = encodeForm(form);
      const checkEmailApiCall = await apiCall({
        url: `${url}/api/user/check/email`,
        method: "post",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      return checkEmailApiCall;
    }

    case "answer": {
      const form = {
        email: emailState,
        secureAnswer: answerState,
      };
      let formBody = encodeForm(form);
      const checkAnswerApiCall = await apiCall({
        url: `${url}/api/user/check/answer`,
        method: "post",
        body: formBody,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      return checkAnswerApiCall;
    }
    case "password": {
      const form = {
        email: emailState,
        secureAnswer: answerState,
        newPassword: password,
      };
      const formBody = { ...form };
      const restorePasswordApiCall = await apiCall({
        url: `${url}/api/user/restore`,
        method: "put",
        body: JSON.stringify(formBody),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return restorePasswordApiCall;
    }
    default:
      break;
  }
};

//Funcion realizar compra

export const buyServiceApiCall = async ({ total, userId, shoesList }) => {
  let formBody = {
    total: Number(total),
    userId: userId,
    shoesList: shoesList,
  };

  const buyShoes = await apiCall({
    url: `${url}/api/buy/save`,
    method: "post",
    body: JSON.stringify(formBody),
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${myLocalStorage.get("token")}`,
    },
  });
  return buyShoes;
};

//funcion shoes service

export const shoesServiceApiCall = async ({ form, service }) => {
  switch (service) {
    case "post": {
      const shoesApicCall = await apiCall({
        url: `${url}/api/shoe/save`,
        body: form,
        header: {
          "Content-type": "application/json",
          Authorization: `Bearer ${myLocalStorage.get("token")}`,
        },
      });
      return shoesApicCall;
    }
    case "get": {
      const shoesApicCall = await apiCall({
        url: `${url}/api/shoes/list`,
        header: {
          Authorization: `Bearer ${myLocalStorage.get("token")}`,
        },
      });
      return shoesApicCall;
    }
    default:
      break;
  }
};

//funcion para traer todos los pedidos

export const orderServiceApiCall = async ({ service }) => {
  const auth = myLocalStorage.get("session");
  switch (service) {
    case "get": {
      if (auth.roleCode === 2) {
        const orderApiCall = await apiCall({
          url: `${url}/api/order/list`,
          method: "get",
          headers: {
            Authorization: `Bearer ${myLocalStorage.get("token")}`,
          },
        });
        return orderApiCall;
      } else {
        const orderApiCall = await apiCall({
          url: `${url}/api/order/list/${auth.userId}`,
          method: "get",
          headers: {
            Authorization: `Bearer ${myLocalStorage.get("token")}`,
          },
        });
        return orderApiCall;
      }
    }

    default:
      break;
  }
};

export const categoryServiceApiCall = async () => {
  const categoryApi = await apiCall({
    url: `${url}/api/category/list`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myLocalStorage.get("token")}`,
    },
  });
  return categoryApi;
};

//funcion para encontrar elementos en el array de zapatos

export const findIndexElement = (array, item) => {
  let count = -1;
  array.map((element, i) => {
    if (Object.values(element).join("").includes(item)) {
      count = i;
    }
  });
  return count;
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
