import { CoreType } from "./core.type";

export interface TaskType extends CoreType {
    name: string;
    position: number;
    statusId: number;
}
