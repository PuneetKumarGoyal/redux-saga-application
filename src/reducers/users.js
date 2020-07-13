import { Types } from '../actions/users'

const INITIAL_STATE = {
    items: [],
    error: ''
}

export default function users(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.GET_USERS_SUCCESS:
            return {
                items: action.payload.items
            }
        case Types.USERS_ERROR:
            console.log('action.payload.error>' + action)
            return {
                ...state,
                error: action.payload.error
            }
        default:
            return state
    }
}