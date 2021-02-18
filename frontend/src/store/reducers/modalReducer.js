const initialState = {
    isShowModal: false,
    modalTxt: 'Did Something'
}

export function modalReducer(state = initialState, action) {
    switch (action.type) {
        case 'SHOW_MODAL':
            console.log('showing modal');
            return { ...state, isShowModal: true, modalTxt: action.txt }
        case 'CLOSE_MODAL':
            console.log('closing modal');
            return { ...state, isShowModal: false }
        default:
            return state
    }
}
