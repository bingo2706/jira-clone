import { Reducer, combineReducers } from "@reduxjs/toolkit";
import taskSlice, { TaskState } from "./task.slice";
import statusSlice, { StatusState } from "./status.slice";

export interface RootState {
    taskState: TaskState;
    statusState: StatusState;
}
const rootReducer: Reducer<RootState> = combineReducers({
    taskState: taskSlice,
    statusState: statusSlice,
});
export default rootReducer;
