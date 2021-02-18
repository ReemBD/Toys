import { Component } from "react"
import { toyService } from "../services/toyService"
import { Form, Formik, ErrorMessage, Field } from 'formik'
import Button from '@material-ui/core/button'
import { TextareaAutosize, TextField } from '@material-ui/core';
import { doNotification } from '../store/actions/modalActions.js'
import { Title } from '../cmps/Title.jsx'
import { connect } from 'react-redux'
import { reviewService } from '../services/reviewService.js'


class _ToyReview extends Component {
    state = {
        reviewToAdd: {
            txt: '',
            aboutToyId: '',
            byUserId: ''
        },
        toy: ''
    }
    componentDidMount = async () => {
        const { toyId } = this.props.match.params
        const toy = await toyService.getById(toyId)
        this.setState({ toy })
    }

    validate = (values) => {
        const errors = {}
        if (!values.name) {
            errors.name = 'Required'
        }
    }

    handleChange = ({ target }) => {
        const { name, value } = target
        this.setState(prevState => ({ reviewToAdd: { ...prevState.reviewToAdd, [name]: value } }))
    }

    onSaveReview = async ev => {
        ev.preventDefault()
        this.setState(prevState => ({ reviewToAdd: { ...prevState.reviewToAdd, aboutToyId: this.state.toy._id, byUserId: this.props.loggedinUser?.username } }), async ()=>{
            const { reviewToAdd } = this.state
            console.log('reviewToAdd: ', reviewToAdd);
            await reviewService.addReview(reviewToAdd)
            this.props.doNotification('Review Added Successfully')
            this.props.history.push('/')
        })
    }

    render() {
        const { reviewToAdd } = this.state
        return (
            <div className="toy-review">
                <Title classNames="title">Let us know...</Title>
                <form className="flex flex-column review-form" onSubmit={this.onSaveReview}>
                    <textarea type="text" name="txt" className="review-content" component="textarea" placeholder="What did you think about this toy? " onChange={this.handleChange} as={TextareaAutosize} />
                    <Button type="submit" color="primary" variant="contained">Add Review</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { loggedinUser } = state.user
    return {
        loggedinUser
    }
}

const mapDispatchToProps = {
    doNotification
}

export const ToyReview = connect(mapStateToProps, mapDispatchToProps)(_ToyReview)