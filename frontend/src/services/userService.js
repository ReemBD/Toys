// import axios from "axios";
import { storageService } from './storageService.js'
import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})

// const baseUrl = `http://localhost:3030/api`
const baseUrl = (process.env.NODE_ENV === 'production')
 ? '/api'
 : 'http://localhost:3030/api';
const STORAGE_KEY = 'loggedinUser'

async function query(filterBy = {}) {
    const res = await axios.get(`${baseUrl}/user`)
    return res.data
}

async function login(userCreds) {
    const res = await axios.post(`${baseUrl}/auth/login`, userCreds)
    const user = res.data
    return _handleLogin(user)
}
async function update(user) {
    const res = await axios.put(`${baseUrl}/user`, user)
    return res.data
}

async function remove(userId) {
    const res = axios.delete(`${baseUrl}/user/${userId}`)
    return res.data
}

async function logout() {
    const res = await axios.post(`${baseUrl}/auth/logout`)

    storageService.clear()
    return res.data
}

async function signup(credentials) {
    const res = await axios.post(`${baseUrl}/auth/signup`, credentials)
    const user = res.data
    console.log('Signup success');
    return _handleLogin(user);
}

function getLoggedinUser() {
    return storageService.load(STORAGE_KEY)
}



async function getUser(userId) {
    const res = await axios.get(`${baseUrl}/user/${userId}`)
    return res.data
}

function _handleLogin(user) {
    storageService.store(STORAGE_KEY, user)
    return user
}
export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUser,
    update,
    remove,
    query
}