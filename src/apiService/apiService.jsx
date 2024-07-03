import axios from "axios";
import TokenManager from "./TokenManager";

const link = "http://localhost:8080";
export async function retrieveProductsFromServer() {
  try {
    let response = await axios.get(`${link}/products`, {
      headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
    });
    if (response.status !== 200) {
      throw new Error(
        `Error trying to fetch data. Error status: ${response.status}`
      );
    }
    const productData = response.data;

    return productData.products;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProductById(id) {
  let response = await axios.get(`${link}/products/${id}`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  return response.data;
}

export async function deleteProduct(productId) {
  axios.delete(`${link}/products/${productId}`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
}

export async function getUserDetails(userId) {
  axios.get(`${link}/user/${userId}`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  if (response.status !== 200) {
    throw new Error(
      `Error trying to fetch data. Error status: ${response.status}`
    );
  }
  const productData = response.data;

  return productData.products;
}

export async function createUser(data) {
  let response = await axios.post(`${link}/user`, data);
  if (response.status !== 201) {
    throw new Error(
      `Error trying to post data. Error status: ${response.status}`
    );
  }
}

export async function postProductToServer(data) {
  let response = await axios.post(`${link}/products`, data, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  if (response.status !== 201) {
    throw new Error(
      `Error trying to post data. Error status: ${response.status}`
    );
  }
}

export async function getProductByFilter(data) {
  const { size, category, productCondition } = data;
  const params = new URLSearchParams({});

  if (size) {
    params.append("size", size);
  }

  if (category) {
    params.append("category", category);
  }

  if (productCondition) {
    params.append("productCondition", productCondition);
  }

  try {
    const response = await axios.get(`${link}/products/filter`, {
      headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
      params,
    });
    const productData = response.data;


    return productData.products;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  if(response.status === 404){
    return [];
  }
}

export async function getUserById(id) {
  let response = await axios.get(`${link}/user/${id}`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  return response.data;
}

export async function getProductsByUserId(id) {
  let response = await axios.get(`${link}/products/user/${id}`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  const productData = response.data;

  return productData.products;
}

export async function getCartContent(userId) {
  let response = await axios.get(`${link}/cart/${userId}`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  const cartData = response.data;

  return cartData;
}

export async function addToCart(productId) {
  let response = await axios.post(`${link}/cart/${productId}`, productId, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });

  if (response.status !== 200) {
    throw new Error(
      `Error trying to post data. Error status: ${response.status}`
    );
  }
}

export async function deleteFromCart(productId) {
  axios.delete(`${link}/cart/delete/${productId}`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
}

export async function clearCart(userId) {
  axios.delete(`${link}/cart/clear/${userId}`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
}

export async function getTotalPrice(userId) {
  let response = await axios.get(`${link}/cart/totalPrice/${userId}`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  const cartData = response.data;
  return cartData;
}


export async function updateProduct(product){
  let response = await axios.put(`${link}/products/${product.id}`, product, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  if (response.status !== 204) {
    throw new Error(
      `Error trying to post data. Error status: ${response.status}`
    );
  }
}

export async function updateUser(user){
  let response = await axios.put(`${link}/user/${user.id}`, user, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  if (response.status !== 204) {
    throw new Error(
      `Error trying to post data. Error status: ${response.status}`
    );
  }
}

export async function createOrder(userid){
  let response = await axios.post(`${link}/order/create`, userid, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  if (response.status !== 201) {
    throw new Error(
      `Error trying to post data. Error status: ${response.status}`
    );
  }
}

export async function getOrdersByUserId(){
  let response = await axios.get(`${link}/order/get`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  if (response.status !== 200) {
    throw new Error(
      `Error trying to post data. Error status: ${response.status}`
    );
  }
  const orderData = response.data;
  return orderData;
}
export async function getProductsByOrderId(orderId){
  let response = await axios.get(`${link}/products/order/${orderId}`,  {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },
  });
  if (response.status !== 200) {
    throw new Error(
      `Error trying to post data. Error status: ${response.status}`
    );
  }
  const orderData = response.data;
  return orderData;
}

export async function getProductsBySearching(search){
  let response = await axios.get(`${link}/products/search/${search}`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },

  });
  if (response.status !== 200) {
    throw new Error(
      `Error trying to post data. Error status: ${response.status}`
    );
  }
  const productData = response.data;
  return productData;
}

export async function clearCartContent(userId){
  let response = await axios.delete(`${link}/cart/clear/${userId}`, {
    headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` },

  });
  if (response.status !== 200) {
    throw new Error(
      `Error trying to post data. Error status: ${response.status}`
    );
  }
}