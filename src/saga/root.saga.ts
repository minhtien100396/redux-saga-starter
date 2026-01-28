import { all } from "redux-saga/effects";
import authSaga from "./auth.saga";
import counterSaga from "./counter.saga";
import userSaga from "./user.saga";

function* RootSaga() {
    yield all([counterSaga(), userSaga(), authSaga()]);
}

export default RootSaga;
