const dbService = require('../../services/db.service')
// const reviewService = require('../review/review.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria)

        if (filterBy._sort) {
            toys = toys.sort({ [filterBy._sort]: 1 })
        }
        toys = toys.map(toy => {
            toy.createdAt = ObjectId(toy._id).getTimestamp()
            return toy
        })
        toys = (await toys.toArray()).slice(filterBy.from, filterBy.to)
        return toys
    } catch (err) {
        console.log('err', err);
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding user ${userId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        console.log('err', err);
        throw err
    }
}

async function update(toy) {
    try {
        const toyToUpdate = { ...toy, _id: ObjectId(toy._id) }
        console.log('toyToupdate: ', toyToUpdate);
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ '_id': toyToUpdate._id }, { $set: toyToUpdate })
        return toyToUpdate
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        // peek only updatable fields!
        const toyToAdd = { ...toy }
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toyToAdd)
        return toyToAdd
    } catch (err) {
        logger.error('cannot insert user', err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.name = txtCriteria
    }
    if (filterBy.inStock) {
        criteria.inStock = JSON.parse(filterBy.inStock)
    }
    if (filterBy.type) {
        criteria.type = filterBy.type
    }
    // if (filterBy._sort) {
    //     criteria._sort = filterBy._sort
    // }
    logger.info('criteria: ', criteria)
    return criteria
}
