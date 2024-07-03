import axios from "axios";
import TokenManager from "./TokenManager";

const link = "http://localhost:8080/tokens"
const Authentication = {
    login: (email, password) => axios.post(link, { email, password })
        .then(response => response.data.accessToken)
        .then(accessToken => TokenManager.setAccessToken(accessToken))
}

export default Authentication;