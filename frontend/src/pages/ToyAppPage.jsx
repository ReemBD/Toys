import { loadToys, removeToy, filterToys } from '../store/actions/toyActions.js'
import { setUser } from '../store/actions/userActions.js'
import { doNotification } from '../store/actions/modalActions'
import { Component } from 'react'
import { connect } from 'react-redux'
import { ToyList } from '../cmps/ToyList.jsx'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import ToyCard from '../cmps/ToyCard.jsx'
import moment from 'moment'
import Button from '@material-ui/core/Button';
import { toyService } from '../services/toyService.js'
import { Pagination } from '../cmps/Pagination.jsx'

moment().format()


class _ToyAppPage extends Component {
    state = {
        toys: [],

        filterBy: {
            txt: '',
            inStock: 'all',
            type: 'all',
            currPage: {
                idx: 0,
                length: 5
            },
        },
        sortBy: 'name',
        toyTypes: null
    }

    componentDidMount() {
        const { loadToys } = this.props
        console.log('mounted successfully');
        loadToys()
        toyService.getTypes()
            .then(toyTypes => {
                this.setState({ toyTypes })
            })
    }


    removeToy = (toy) => {
        toyService.remove(toy._id)
            .then(() => {
                this.props.removeToy(toy._id)
                this.props.doNotification(`deleted Toy`)
            })
    }

    movePage = async (toPageIdx) => {
        const toys = await toyService.query()
        const { currPage } = this.state.filterBy
        console.log('toys.length: ', toys.length);
        if (toPageIdx < 0) {
            console.log('toPageIdx: ', toPageIdx);
            return
        }
        else if (toPageIdx > Math.floor(toys.length / currPage.length) || toPageIdx + 1 === (toys.length / currPage.length) && toPageIdx < (toys.length / currPage.length)) {
            console.log('max page: ', Math.floor(toys.length / currPage.length));
            console.log('toPageIdx: ', toPageIdx);
            
        }
        else if (toPageIdx + 1 > (toys.length / currPage.length)) {
            console.log('not a full page');
            return
        }
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, currPage: { ...prevState.filterBy.currPage, idx: toPageIdx } } }), async () => {
            console.log('currPageIDX: ', this.state.filterBy.currPage.idx);
            const { filterBy, sortBy } = this.state
            const toysForDisplay = await toyService.getToysForDisplay(filterBy, sortBy)
            this.props.filterToys(toysForDisplay)
        })
    }

    onSetFilter = ({ target }) => {
        const { value, name } = target
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [name]: value } }), () => {
            const { filterBy, sortBy } = this.state
            toyService.getToysForDisplay(filterBy, sortBy)
                .then(toys => {
                    this.props.filterToys(toys)
                    console.log('this.state.filterBy', filterBy);
                })
        })
    }

    onSetSort = ({ target }) => {
        const { value } = target
        this.setState({ sortBy: value }, () => {
            const { sortBy, filterBy } = this.state
            console.log('sortBy: ', sortBy);
            toyService.getToysForDisplay(filterBy, sortBy)
                .then(toys => {
                    this.props.filterToys(toys)
                })
        })
    }

    render() {
        const { toys } = this.props
        const { toyTypes, filterBy, sortBy } = this.state
        const { currPage } = this.state.filterBy
        if (!toys || !toyTypes) return <h1>Loading...</h1>
        return <div className="toy-app-page">
            <h1 className="greeting"><span >Reusable, </span><span>functional, </span><span>amazing. </span></h1>
            <ToyFilter onSetFilter={this.onSetFilter} filterBy={filterBy} sortBy={sortBy} onSetSort={this.onSetSort} toyTypes={toyTypes} />
            <ToyList toys={toys}>
                {toys.map(toy => <ToyCard key={toy._id} toy={toy} onRemoveToy={this.removeToy} />)}
            </ToyList>
            {<Button variant="contained" color="primary" href="/edit" className="add-btn">
                Add New 
            </Button>}
            <Pagination currPageIdx={currPage['idx']} onMovePage={this.movePage} toys={toys} />
        </div>
    }
}

const mapStateToProps = (state) => {
    const { toys } = state.toy
    const { loggedinUser } = state.user
    return {
        toys,
        loggedinUser
    }
}

const mapDispatchToProps = {
    loadToys,
    removeToy,
    setUser,
    doNotification,
    filterToys
}

export const ToyAppPage = connect(mapStateToProps, mapDispatchToProps)(_ToyAppPage)