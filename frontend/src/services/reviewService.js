import axios from 'axios'
// const baseUrl = `http://localhost:3030/api/review`
const baseUrl = (process.env.NODE_ENV === 'production')
 ? '/api/review'
 : 'http://localhost:3030/api/review';
export const reviewService = {
    addReview,
    query
}

async function query(filterBy = {}) {
    const res = await axios.get(baseUrl, { params: filterBy })
    return res.data
}
async function addReview(review) {
    await axios.post(baseUrl, review)
    return Promise.resolve()
}