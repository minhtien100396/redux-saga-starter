import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
    createUserFailed,
    createUserSuccess,
    deleteUserFailed,
    deleteUserSuccess,
    editUserFailed,
    editUserSuccess,
    fetchUserFailed,
    fetchUserPending,
    fetchUserSuccess,
} from "../redux/user/user.slide";
import { IUser } from "../type/backend";

const fetchUser = async () => {
    const res = await fetch("http://localhost:8000/users");
    return res.json();
};

const createUser = async (email: string, name: string) => {
    const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            name: name,
        }),
        headers: {
            "Content-Type": " application/json",
        },
    });
    return res.json();
};

const editUser = async (
    id: number | undefined,
    email: string,
    name: string,
) => {
    const res = await fetch(`http://localhost:8000/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            email: email,
            name: name,
        }),
        headers: {
            "Content-Type": " application/json",
        },
    });
    return res.json();
};

const deleteUser = async (id: number) => {
    const res = await fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": " application/json",
        },
    });
    return res.json();
};

function* handleFetchUser() {
    try {
        const users: IUser[] = yield call(fetchUser);
        yield put(fetchUserSuccess(users));
    } catch (error) {
        yield put(fetchUserFailed());
    }
}

function* handleCreateUser(
    action: PayloadAction<{ email: string; name: string }>,
) {
    try {
        const user: IUser = yield call(
            createUser,
            action.payload.name,
            action.payload.email,
        );
        yield put(createUserSuccess());
        yield put(fetchUserPending());
    } catch (error) {
        yield put(createUserFailed());
    }
}

function* handleEditUser(
    action: PayloadAction<{
        id: number | undefined;
        email: string;
        name: string;
    }>,
) {
    try {
        const user: IUser = yield call(
            editUser,
            action.payload.id,
            action.payload.name,
            action.payload.email,
        );
        yield put(editUserSuccess());
        yield put(fetchUserPending());
    } catch (error) {
        yield put(editUserFailed());
    }
}

function* handleDeleteUser(
    action: PayloadAction<{
        id: number;
    }>,
) {
    try {
        const user: IUser = yield call(deleteUser, action.payload.id);
        yield put(deleteUserSuccess());
        yield put(fetchUserPending());
    } catch (error) {
        yield put(deleteUserFailed());
    }
}

function* userSaga() {
    yield takeEvery(fetchUserPending, handleFetchUser);
    yield takeEvery("createUserPending", handleCreateUser);
    yield takeEvery("editUserPending", handleEditUser);
    yield takeEvery("deleteUserPending", handleDeleteUser);
}

export default userSaga;
