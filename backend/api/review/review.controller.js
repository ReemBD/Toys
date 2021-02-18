const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const reviewService = require('./review.service')


async function addReview(req, res) {
    try {
        var review = req.body
        console.log('review: ', review);
        review = await reviewService.add(review)
        // review.byUser = req.session.user
        // review.aboutToy = await toyService.getById(review.aboutToyId)
        res.send(review)
    } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

async function getReviews(req, res) {
    try {
        const filterBy = req.query
        console.log('filterBy: ', filterBy);
        const reviews = await reviewService.query(filterBy)
        console.log('reviews from controller: ', reviews);
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err)
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}


module.exports = {
    addReview,
    getReviews
}