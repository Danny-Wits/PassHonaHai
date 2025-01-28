import {del, get, post, put} from "superagent";

const $API_URL = import.meta.env.VITE_API_URL;
const $API_TOKEN = "123456";


const API = {
    getAllUsers: async (page_no = 1) => getter("/users/?page_no=" + page_no),
    searchUsers: async (search) => getter("/users-search/?search=" + search),
    getUserInfo: async (user_id) => getter("/user/" + user_id),
    getProfilePic: async (user_id) => getter("/pic/" + user_id),
    getStudyMaterials: async (page_no = 1) =>
        getter("/study-materials/?page_no=" + page_no),
    getStudyMaterialByID: async (id) => getter("/study-material/" + id),
    getStudyMaterialsOfUser: async (user_id, page_no = 1) =>
        getter("/study-materials-user/" + user_id + "?page_no=" + page_no),
    getStudyMaterialByCategory: async (category, page_no = 1) =>
        getter("/study-materials-category/" + category + "?page_no=" + page_no),
    authenticateUser: async (email, password) =>
        poster("/login", {email: email, password: password}),
    registerUser: async (name, email, password) =>
        poster("/register", {name: name, email: email, password: password}),
    uploadProfilePic: async (user_id, data) =>
        posterMultipartFile("/pic/" + user_id, data),
    makeSenior: async (user_id, data) => poster("/senior/" + user_id, data),
    getSeniors: async (user_id) => getter("/seniors/" + user_id),
    getJuniors: async (user_id) => getter("/juniors/" + user_id),
    uploadStudyMaterial: async (user_id, data) =>
        posterMultipart("/study-material/" + user_id, data),
};
export default API;
// Reusable functions for GET and POST requests
export const getter = async (request) => {
    const response = await get($API_URL + request);
    return response.body; // Superagent response body is accessible via `.body`
};

// Send a POST request with payload using Superagent
export const poster = async (request, payload = {}) => {

    const response = await post($API_URL + request)
        .send(payload) // Send the payload data
        .set("Content-Type", "application/json") // Ensure this matches your server's expectation
        .set("Authorization", $API_TOKEN); // Add the Authorization header

    return response.body; // Superagent response body is accessible via `.body`
};
export const posterMultipart = async (request, formData) => {
    const response = await post($API_URL + request)
        .send(formData)// Send the payload data
        .set("Authorization", $API_TOKEN); // Add the Authorization header
    return response.body;
}
//Send multipart file data
export const posterMultipartFile = async (request, file) => {
    const response = await post($API_URL + request)
        .attach('file', file, file.name)// Send the payload data
        .set("Authorization", $API_TOKEN); // Add the Authorization header
    return response.body; // Superagent response body is accessible via `.body`
}
export const putter = async (url, payload = {}) => {
    const response = await put($API_URL + url)
        .send(payload) // Send the payload data
        .set("Content-Type", "application/json") // Ensure this matches your server's expectation
        .set("Authorization", $API_TOKEN); // Add the Authorization header

    return response.body; // Superagent response body is accessible via `.body`
};
export const deleter = async (url, payload = {}) => {
    const response = await del($API_URL + url)
        .send(payload) // Send the payload data
        .set("Content-Type", "application/json") // Ensure this matches your server's expectation
        .set("Authorization", $API_TOKEN); // Add the Authorization header
    return response.body; // Superagent response body is accessible via `.body`
};

export const registerDemoUser = async (name, email, password) =>
    poster("/register", {name: name, email: email, password: password});