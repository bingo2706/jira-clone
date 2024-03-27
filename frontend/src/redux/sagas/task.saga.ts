import { call, put, takeLatest } from "redux-saga/effects";

import { TaskType } from "../../types/task.type";
import { api } from "../../utils/api.util";
import { GetApiResponseType, PayloadType } from "../../types/share.type";
import { toast } from "react-toastify";
import {
    createTask,
    toggleTaskModal,
    updatePositionTask,
} from "../features/task.slice";
import { getAllStatus } from "../features/status.slice";

function* updatePositionTaskHandle(
    payload: PayloadType<{ sourceList; destinationList; isStatusChange }>
) {
    try {
        const response: GetApiResponseType<string> = yield call(api, {
            url: "/api/task/update-position",
            method: "put",
            data: payload.payload,
        });
        if (response.errCode === 0) {
            yield put(getAllStatus());
            toast.success("Cập nhật vị trí thành công");
        }
    } catch (error) {
        console.log(error);
    }
}
function* createTaskHandle(payload: PayloadType<Partial<TaskType>>) {
    try {
        const response: GetApiResponseType<TaskType> = yield call(api, {
            url: "/api/task",
            method: "post",
            data: payload.payload,
        });
        if (response.errCode === 0) {
            toast.success("Tạo công việc thành công");
            yield put(getAllStatus());
            yield put(
                toggleTaskModal({
                    key: "addTask",
                    status: false,
                })
            );
        }
    } catch (error) {
        console.log(error);
    }
}
export function* taskSaga() {
    yield takeLatest(updatePositionTask, updatePositionTaskHandle);
    yield takeLatest(createTask, createTaskHandle);
}
