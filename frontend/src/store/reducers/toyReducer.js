
const initialState = {
    toys: [],
}

export function toyReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOYS':
        case 'FILTER_TOYS':
            return { ...state, toys: action.toys }
        case 'ADD_TOY':
            return { ...state, toys: [...state.toys, action.toyToAdd] }
        case 'EDIT_TOY':
            var toy = state.toys.find(toy => toy._id === action.toyToEdit._id)
            toy = action.toyToEdit
            return { ...state, toys: [...state.toys] }
        case 'REMOVE_TOY':
            return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
        default:
            return state
    }
}