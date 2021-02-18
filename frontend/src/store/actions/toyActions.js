import { toyService } from '../../services/toyService.js'

export function loadToys() {
    return (dispatch) => {
        toyService.getToysForDisplay({ from: 0, to: 5 })
            .then(toys => {
                const action = {
                    type: 'SET_TOYS',
                    toys
                }
                dispatch(action)
            })
    }
}



export function addToy(toyToAdd) {
    return dispatch => {
        const action = {
            type: 'ADD_TOY',
            toyToAdd
        }
        dispatch(action)
    }
}

export function editToy(toyToEdit) {
    return dispatch => {
        const action = {
            type: 'EDIT_TOY',
            toyToEdit
        }
        dispatch(action)
    }
}

export function removeToy(toyId) {
    return dispatch => {
        const action = {
            type: 'REMOVE_TOY',
            toyId
        }
        dispatch(action)
    }
}

export function filterToys(toys) {
    return async dispatch => {
        console.log('toys: ', toys);
        const action = {
            type: 'FILTER_TOYS',
            toys
        }
        dispatch(action)
    }
}

