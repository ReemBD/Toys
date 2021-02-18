export function setUser(user) {
    return dispatch => {
        const action = {
            type: 'SET_USER',
            user
        }
        dispatch(action)
    }
}