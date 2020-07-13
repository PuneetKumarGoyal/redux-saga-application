import { takeEvery, takeLatest, call, fork, put, take } from 'redux-saga/effects'
import * as actions from '../actions/users'
import * as api from '../api/users'

function* getUsers() {
    try {
        const result = yield call(api.getUsers)
        yield put(actions.getUsersSuccess({ items: result.data.data }))
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to get the users'
        }));
    }
}

function* createUser(action) {
    try {
        yield call(api.createUser, { firstName: action.payload.firstName, lastName: action.payload.lastName })
        yield call(getUsers)
    } catch (e) {
        yield put(actions.usersError({
            error: 'An error occurred when trying to create the user'
        }));
    }
}

function* deleteUser({ id }) {
    try {
        yield call(api.deleteUser, id)
        yield call(getUsers)
    } catch (e) {
        console.log('afasd')
        yield put(actions.usersError({
            error: 'An error occurred when trying to delete the user'
        }));
    }
}

function* watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers)
}

function* watchCreateUserRequest() {
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}

function* watchDeleteUserRequest() {
    while (true) {
        const action = yield take(actions.Types.DELETE_USER_REQUEST)
        console.log(action)
        yield call(deleteUser, {
            id: action.payload.id
        })
    }
}

const usersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest)

]

export default usersSagas