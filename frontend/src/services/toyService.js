import { utilService } from './utilService.js'
import { storageService } from './storageService.js'
import Axios from 'axios';
const axios = Axios.create({
    withCredentials: true
})
// const baseUrl = `http://localhost:3030/api/toy`
const baseUrl = (process.env.NODE_ENV === 'production')
 ? '/api/toy'
 : 'http://localhost:3030/api/toy';
export const toyService = {
    query,
    save,
    remove,
    getToysForDisplay,
    getTypes,
    getById,
    getIdxById,
    getChartData,
}
var gToys = []
const PHOTOS_STORAGE_KEY = 'photosDB';

async function query() {
    const res = await axios.get(baseUrl)
    return res.data
}

async function save(toy) {
    var res;
    if (toy._id) {
        console.log('toy: ', toy);
        res = await axios.put(`${baseUrl}/${toy._id}`, toy)
    }
    else {
        console.log('toy: ', toy);
        res = await axios.post(baseUrl, toy)
    }
    if (!res?.data) return Promise.reject('Unauthorized activity')
    return res.data
}

async function getToysForDisplay(filterBy = {}, sortBy = 'name') {
    const keys = Object.keys(filterBy),
        possibleTxtFilterKeys = ['txt', 'name', 'description', 'title']

    let url = baseUrl + '?',
        params = new URLSearchParams(url.search)

    keys.forEach(key => {
        if (key === 'currPage') {
            const from = filterBy.currPage.idx * filterBy.currPage.length
            const to = from + filterBy.currPage.length
            params.set('from', from)
            params.set('to', to)
        }
        else if (filterBy[key] !== 'all' || possibleTxtFilterKeys.some(txtKey => key === txtKey)) params.set(key, filterBy[key])
        if (!filterBy[key]) return
    })
    console.log('params:', params.toString());
    sortBy && params.set('_sort', sortBy)
    url += params.toString()

    const res = await axios.get(url),
        { data } = res
    return data
}

function _savePhotoUrlsToStorage(urls) {
    storageService.saveToLocalStorage(PHOTOS_STORAGE_KEY, urls)
}

function _loadPhotoUrlsFromStorage() {
    return storageService.loadFromLocalStorage(PHOTOS_STORAGE_KEY)
}

async function remove(toyId) {
    const res = await axios.delete(`${baseUrl}/${toyId}`),
        { data } = res
    return data
}

async function getTypes() {
    const res = await axios.get(`${baseUrl}`),
        { data } = res
    const types = Array.from(new Set(data.map(toy => toy.type)))
    return types
}

async function getById(toyId) {
    const res = await axios.get(`${baseUrl}/${toyId}`)
    const toy = res.data
    return toy
}

async function getIdxById(toyId) {
    const toys = await query(),
        toyIdx = toys.findIndex(toy => toy._id === toyId)
    return toyIdx
}

async function getChartData() {
    const types = await getTypes()
    const toys = await query()

    const labels = types.map(type => `${type} Toys`)
    const datasets = [{
        data: toys.reduce((acc, toy) => {
            const currIdx = types.indexOf(toy.type)
            const currAccCell = acc[currIdx]
            acc[currIdx] = currAccCell ? acc[currIdx] + 1 : 1
            return acc
        }, []),
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]

    const data = {
        labels,
        datasets
    }
    return data
}