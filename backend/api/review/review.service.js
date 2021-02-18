const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    try {
        const id = filterBy.byUserId || filterBy.aboutToyId
        const key = filterBy.byUserId ? 'byUserId' : 'aboutToyId'
        console.log('key, id', key, id);
        const collection = await dbService.getCollection('review')
        var reviews = await collection.find({ [key]: id })
        reviews = reviews.map(review => {
            review.createdAt = ObjectId(review._id).getTimestamp()
            return review
        })
        reviews = await reviews.toArray()
        console.log('reviews: ', reviews);
        return reviews
    } catch (err) {
        console.log('error: could not find review collection ', err);
    }
}


async function add(review) {
    try {
        // peek only updatable fields!

        const reviewToAdd = {
            byUserId: review.byUserId,
            aboutToyId: review.aboutToyId,
            txt: review.txt
        }
        console.log('reviewToAdd: ', reviewToAdd);
        const collection = await dbService.getCollection('review')

        const res = await collection.insertOne(reviewToAdd)
        return res.ops[0];
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy = {}) {
    var criteria = {}
    if (filterBy.byUserId) {
        criteria.byUserId = filterBy.byUserId
    }
    if (filterBy.aboutToyId) {
        criteria.aboutToyId = filterBy.aboutToyId
    }

    return criteria
}


module.exports = {
    add,
    query
}