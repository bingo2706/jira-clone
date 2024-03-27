import { createSlice } from "@reduxjs/toolkit";
import { StatusType } from "../../types/status.type";
import { PayloadType } from "../../types/share.type";

type StatusModal = {
    addStatus: boolean;
};
export type StatusState = {
    statuses: StatusType[];
    selectedStatus?: StatusType;
    statusStatusModal: StatusModal;
};
const initialState: StatusState = {
    statuses: [],
    statusStatusModal: {
        addStatus: false,
    },
};
export const statusSlice = createSlice({
    name: "statusSlice",
    initialState: initialState,
    reducers: {
        createNewStatus: (state, payload: PayloadType<Partial<StatusType>>) => {
            return {
                ...state,
            };
        },
        toggleStatusModal: (
            state,
            payload: PayloadType<{
                key: keyof StatusModal;
                status: boolean;
            }>
        ) => {
            const { key, status } = payload.payload;
            return {
                ...state,
                statusStatusModal: {
                    ...state.statusStatusModal,
                    [key]: status,
                },
            };
        },
        selectStatus: (state, payload: PayloadType<StatusType | undefined>) => {
            return {
                ...state,
                selectedStatus: payload.payload,
            };
        },
        getAllStatus: (state) => {
            return {
                ...state,
            };
        },
        setStatusData: (state, payload: PayloadType<StatusType[]>) => {
            return {
                ...state,
                statuses: payload.payload,
            };
        },
    },
});
export const {
    createNewStatus,
    toggleStatusModal,
    selectStatus,
    getAllStatus,
    setStatusData,
} = statusSlice.actions;
export default statusSlice.reducer;
