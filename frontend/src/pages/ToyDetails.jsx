import { loadToys } from '../store/actions/toyActions.js'
import { Component } from 'react'
import { toyService } from '../services/toyService'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Chat } from '../pages/Chat.jsx'
import Button from '@material-ui/core/button'
class _ToyDetails extends Component {
    state = {
        toy: null,
        isChatOpen: false,
    }

    componentDidMount() {
        this.getToy()
    }

    componentDidUpdate(prevProps) {
    (prevProps.match.params.toyId !== this.props.match.params.toyId) && this.getToy()
    }

    getToy = async (toyId = this.props.match.params.toyId) => {
        const toy = await toyService.getById(toyId)
        this.props.history.push(`/toy/${toyId}`)
        this.setState({ toy }, () => {
            console.log('toy: ', toy);
        })
    }

    onChangePage = (diff) => {
        const { toy } = this.state
        toyService.getIdxById(toy._id)
            .then(async (idx) => {
                console.log('idx: ', idx);
                const toys = await toyService.query()
                const { loadToys } = this.props
                if (!toys.length) {
                    loadToys()
                }
                else {
                    let requestedToyId = toys[idx + diff]?._id
                    if (idx + diff === toys.length) requestedToyId = toys[0]._id
                    else if (idx + diff < 0) {
                        console.log('toys:  asdfasdfsadfsdf');
                        requestedToyId = toys[toys.length - 1]._id
                    }
                    // this.props.history.push(`/toy/${requestedToyId}`)
                }
            })
    }

    onToggleChat = () => {
        this.setState({ isChatOpen: !this.state.isChatOpen })
    }

    render() {
        const { toy } = this.state
        if (!toy) return <h1>Loading...</h1>
        return (
            <div className="toy-details-page">
                <h1 className="title">About this toy...</h1>
                <div className="toy-details flex">

                    <div className="wrapper flex flex-column">
                        <h1 className="name">{toy.name}</h1>
                        <h3 className="price">Price: {toy.price}$</h3>
                        <h2 className="type">Type: {toy.type}</h2>
                        <Button color="primary" variant="contained" className="add-review-btn"><Link to={`/review/${toy._id}`}>Add Review</Link></Button>
                        <div className="paginate-btns flex space-between">
                            <Button className="prev-btn" onClick={() => { this.onChangePage(-1) }}>Prev</Button>
                            <Button className="next-btn" onClick={() => { this.onChangePage(1) }}>Next</Button>
                        </div>
                    </div>
                    <div className="img-container">
                        <img src={toy.imgUrl} alt="" />
                    </div>
                    <div className="chat-icon" onClick={this.onToggleChat}><i class="fas fa-comment-dots"></i></div>
                </div>
                <Chat toy={toy} isOpen={this.state.isChatOpen} onClose={this.onToggleChat} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { toys } = state.toy
    return {
        toys
    }
}

const mapDispatchToProps = {
    loadToys
}

export const ToyDetails = connect(mapStateToProps, mapDispatchToProps)(_ToyDetails)