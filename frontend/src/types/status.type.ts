import { CoreType } from "./core.type";
import { TaskType } from "./task.type";

export interface StatusType extends CoreType {
    name: string;
    position: number;
    tasks?: TaskType[];
}
