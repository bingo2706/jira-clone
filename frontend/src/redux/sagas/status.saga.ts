import { call, put, takeLatest } from "redux-saga/effects";

import { GetApiResponseType, PayloadType } from "../../types/share.type";
import { StatusType } from "../../types/status.type";
import { api } from "../../utils/api.util";
import { toast } from "react-toastify";
import {
    createNewStatus,
    getAllStatus,
    setStatusData,
    toggleStatusModal,
} from "../features/status.slice";

function* createNewStatusHandle(payload: PayloadType<Partial<StatusType>>) {
    try {
        const response: GetApiResponseType<StatusType> = yield call(api, {
            url: "/api/status",
            method: "post",
            data: payload.payload,
        });
        if (response.errCode === 0) {
            toast.success("Tạo mới Status thành công");
            yield put(getAllStatus());
            yield put(toggleStatusModal({ key: "addStatus", status: false }));
        }
    } catch (error) {
        console.log(error);
    }
}
function* getAllStatusHandle() {
    try {
        const response: GetApiResponseType<StatusType[]> = yield call(api, {
            url: "/api/status",
            method: "get",
        });
        if (response.errCode === 0) {
            yield put(setStatusData(response.data));
        }
    } catch (error) {
        console.log(error);
    }
}
export function* statusSaga() {
    yield takeLatest(createNewStatus, createNewStatusHandle);
    yield takeLatest(getAllStatus, getAllStatusHandle);
}
