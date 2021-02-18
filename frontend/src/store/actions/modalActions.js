export function doNotification(txt) {
    return dispatch => {
        let action = {
            type: 'SHOW_MODAL',
            txt
        }
        dispatch(action)
        setTimeout(() => {
            action = {
                type: 'CLOSE_MODAL'

            }
            dispatch(action)
        }, 2000)
    }
}