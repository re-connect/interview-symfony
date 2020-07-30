import axios from 'axios'

function logout() {
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
    return axios
        .post("http://localhost:8000/authentication_token", credentials)
        .then(response => response.data.token)
        .then(token => {
            window.localStorage.setItem("authToken", token);
            axios.defaults.headers["authorization"] = "Bearer " + token;

            return true;
        })
}

function isAuthenticated() {
    const token = localStorage.getItem('authToken');
    if(token != null){
        return true;
    }
    return false;
}

export default {
    authenticate,
    logout,
    isAuthenticated
};