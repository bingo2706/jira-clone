import { all } from "redux-saga/effects";
import { taskSaga } from "./task.saga";
import { statusSaga } from "./status.saga";

export function* rootSaga() {
    yield all([taskSaga(), statusSaga()]);
}
