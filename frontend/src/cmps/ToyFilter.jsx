import { filterToys, loadToys } from '../store/actions/toyActions.js'
import { Component } from 'react'
import { connect } from 'react-redux'
import { toyService } from '../services/toyService.js'
import TextField from '@material-ui/core/TextField';
import DefaultSelect from '../cmps/MaterialSelect.jsx'
function _ToyFilter({ filterBy, toyTypes, sortBy, onSetFilter, onSetSort }) {

    return (<div className="toy-filter">
        <div className="flex">
            <TextField id="outlined-basic" label="Name" variant="outlined" className="name" name="txt" value={filterBy.txt} onChange={onSetFilter} />
            <DefaultSelect handleChange={onSetFilter} name={'inStock'} value={filterBy.inStock} title={'In Stock'} optionValues={['all', 'true']} optionTitles={['All', 'In stock']} />
            <DefaultSelect handleChange={onSetFilter} name={'type'} value={filterBy.type} title={'Type'} optionValues={[...toyTypes, 'all']} optionTitles={[...toyTypes, 'All']} />
            <DefaultSelect handleChange={onSetSort} value={sortBy} title={'Sort By:'} optionValues={['price', 'name']} optionTitles={['Price', 'Name']} />
        </div>

    </div>)

}

const mapStateToProps = state => {
    const { toys } = state.toy
    return {
        toys
    }
}

const mapDispatchToProps = {
    filterToys,
    loadToys
}

export const ToyFilter = connect(mapStateToProps, mapDispatchToProps)(_ToyFilter)

