const toyService = require('./toy.service')
const logger = require('../../services/logger.service')

async function getToy(req, res) {
    try {
        logger.info('from controller req.params.id: ', req.params.id)
        const toy = await toyService.getById(req.params.id)
        logger.info('from controller toy: ', toy)
        res.send(toy)
    }
    catch (err) {
        res.status(500).send('error: ', error)
    }
}

async function getToys(req, res) {
    try {
        const filterBy = {
            txt: req.query?.txt || '',
            inStock: req.query?.inStock || '',
            type: req.query?.type || '',
            _sort: req.query?._sort || '',
            from: req.query.from,
            to: req.query.to
        }
        const toys = await toyService.query(filterBy)
        res.send(toys)
    } catch {
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}

async function updateToy(req, res) {

    try {
        const toy = req.body
        logger.info('toy: ', toy)
        const savedToy = await toyService.update(toy)
        res.send(savedToy)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

async function addToy(req, res) {
    try {
        const toy = req.body
        const addedToy = await toyService.add(toy)
        res.send(addedToy)
    } catch {
        res.status(500).send({ err: 'Failed to update toy' })
    }
}

module.exports = {
    getToy,
    getToys,
    deleteToy,
    updateToy,
    addToy
}