import { PayloadAction } from "@reduxjs/toolkit";
import { call, fork, take } from "redux-saga/effects";
import { logingInPending, logout } from "../redux/user/user.slide";
import { ILogin } from "../type/backend";

const authorize = async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        if (email === "hoidanit@gmail.com" && password === "123456") {
            localStorage.setItem("access_token", "hoidanit");
            resolve("oke");
        }
        resolve("no thing");
    });
};

function* authSaga() {
    while (true) {
        const action: PayloadAction<ILogin> = yield take(logingInPending);
        // yield call(authorize, action.payload.email, action.payload.password);
        // yield take(logout);
        yield fork(authorize, action.payload.email, action.payload.password);
        yield take([logout, "LOGIN_ERROR"]);
        yield call(Api.clearItem, "token");
    }
}
export default authSaga;
