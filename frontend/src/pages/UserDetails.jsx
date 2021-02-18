import { Title } from "../cmps/Title";
import { connect } from 'react-redux'
import { userService } from "../services/userService.js";
import {utilService} from "../services/utilService.js";
import { Component, Fragment } from 'react'
import { reviewService } from "../services/reviewService.js"
import { toyService } from "../services/toyService";
class _UserDetails extends Component {
    state = {
        reviews: null
    }

    componentDidMount = async () => {
        const { loggedinUser } = this.props
        const reviews = await reviewService.query({ byUserId: loggedinUser._id })
        console.log('reviews: ', reviews);
        this.setState({ reviews })
    }
    render() {
        const { reviews } = this.state
        const { loggedinUser } = this.props
        const { username } = loggedinUser

        if (!reviews) return <h1>Loading...</h1>
        return (
            <Fragment>
                <Title classNames="title">Hello, {username}</Title>
                    <h1 className="rev-list-title ">Your Reviews So far...</h1>
                <ul className="rev-list flex flex-column">
                    {
                        reviews.map(review => {
                            return (
                                <li className="review-item" key={review.txt}>
                                    <h3>Created At: {utilService.formatTime(review.createdAt)}</h3>
                                    <h2>Review Content: </h2>
                                    <p>{review.txt}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { loggedinUser } = state.user
    return {
        loggedinUser
    }
}

export const UserDetails = connect(mapStateToProps)(_UserDetails)



