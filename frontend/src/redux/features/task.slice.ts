import { createSlice } from "@reduxjs/toolkit";
import { TaskType } from "../../types/task.type";
import { PayloadType } from "../../types/share.type";

type StatusTaskModal = {
    addTask: boolean;
};
export type TaskState = {
    task: TaskType[];
    selectedTask?: TaskType;
    statusTaskModal: StatusTaskModal;
};
const initialState: TaskState = {
    task: [],
    statusTaskModal: {
        addTask: false,
    },
};
export const taskSlice = createSlice({
    name: "taskSlice",
    initialState: initialState,
    reducers: {
        toggleTaskModal: (
            state,
            payload: PayloadType<{
                key: keyof StatusTaskModal;
                status: boolean;
            }>
        ) => {
            const { key, status } = payload.payload;
            return {
                ...state,
                statusTaskModal: {
                    ...state.statusTaskModal,
                    [key]: status,
                },
            };
        },

        updatePositionTask: (
            state,
            payload: PayloadType<{
                sourceList;
                destinationList;
                isStatusChange;
            }>
        ) => {
            return {
                ...state,
            };
        },
        selectTask: (state, payload: PayloadType<TaskType | undefined>) => {
            return {
                ...state,
                selectedTask: payload.payload,
            };
        },
        createTask: (state, payload: PayloadType<Partial<TaskType>>) => {
            return {
                ...state,
            };
        },
    },
});
export const { updatePositionTask, selectTask, toggleTaskModal, createTask } =
    taskSlice.actions;
export default taskSlice.reducer;
