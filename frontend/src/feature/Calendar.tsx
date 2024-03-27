import {
    Box,
    Button,
    IconButton,
    Stack,
    Tooltip,
    Typography,
    styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "../redux/store";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddStatusModal from "./AddStatusModal";

import {
    getAllStatus,
    toggleStatusModal,
} from "../redux/features/status.slice";
import StatusColumn from "./StatusColumn";
import TaskItem from "./TaskItem";
import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
} from "react-beautiful-dnd";
import { updatePositions } from "../utils/helper";
import { updatePositionTask } from "../redux/features/task.slice";
import AddTaskModal from "./AddTaskModal";
const CalendarContainer = styled(Box)(({ theme }) => ({
    maxWidth: "1440px",
    margin: "100px auto",
}));
const Board = styled(Box)(({ theme }) => ({
    display: "flex",
    width: "100%",
    gap: "10px",
    overflowX: "auto",
    alignItems: "flex-start",
}));
const ButtonPlus = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f6f7f9",
    padding: "4px",
    borderRadius: "4px",
    "&:hover": {
        backgroundColor: "#e9ebee",
        cursor: "pointer",
    },
}));
export default function Calendar() {
    const statusState = useAppSelector((state) => state.statusState);
    let { statuses } = statusState;
    statuses = statuses.map((item) => ({
        ...item,
        tasks: [...(item.tasks ?? [])].sort((a, b) => a.position - b.position),
    }));
    const dispatch = useDispatch();
    const handleClickCreateColumn = () => {
        dispatch(
            toggleStatusModal({
                key: "addStatus",
                status: true,
            })
        );
    };
    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const { source, destination } = result;
        let isStatusChange = false;
        let sourceList =
            statuses.find((item) => `${item.id}` === source.droppableId)
                ?.tasks ?? [];

        let destinationList =
            statuses.find((item) => `${item.id}` === destination.droppableId)
                ?.tasks ?? [];

        if (source.droppableId === destination.droppableId) {
            const [draggedItem] = sourceList.splice(source.index, 1);
            sourceList.splice(destination.index, 0, draggedItem);
            sourceList = updatePositions(sourceList);
            isStatusChange = false;
        } else {
            let [removedItem] = sourceList.splice(source.index, 1);
            removedItem = {
                ...removedItem,
                statusId: +destination.droppableId,
            };
            sourceList = updatePositions(sourceList);

            destinationList.splice(destination.index, 0, removedItem);

            destinationList = updatePositions(destinationList);
            isStatusChange = true;
        }
        dispatch(
            updatePositionTask({
                sourceList,
                destinationList,
                isStatusChange,
            })
        );
    };
    useEffect(() => {
        dispatch(getAllStatus());
    }, [dispatch]);
    return (
        <CalendarContainer>
            <Stack direction={"row"} justifyContent={"flex-end"}>
                <Button
                    startIcon={<AddCircleIcon />}
                    variant="contained"
                    sx={{ marginBottom: "20px" }}
                    onClick={() =>
                        dispatch(
                            toggleStatusModal({
                                key: "addStatus",
                                status: true,
                            })
                        )
                    }
                >
                    Add Status
                </Button>
            </Stack>
            <DragDropContext onDragEnd={onDragEnd}>
                <Board>
                    {statuses?.length > 0 &&
                        statuses.map((item, index) => {
                            const { tasks } = item;
                            return (
                                <Droppable
                                    key={item.id}
                                    droppableId={`${item.id}`}
                                >
                                    {(provided) => (
                                        <StatusColumn
                                            status={item}
                                            tasks={tasks}
                                            title={item.name}
                                            props={{
                                                ref: provided.innerRef,
                                                ...provided.droppableProps,
                                            }}
                                            key={index}
                                        >
                                            <>
                                                {tasks &&
                                                    tasks?.length > 0 &&
                                                    tasks.map((task, index) => {
                                                        return (
                                                            <Draggable
                                                                key={task.id}
                                                                draggableId={`${task.id}`}
                                                                index={index}
                                                            >
                                                                {(
                                                                    provided,
                                                                    snapshot
                                                                ) => (
                                                                    <TaskItem
                                                                        key={
                                                                            index
                                                                        }
                                                                        task={
                                                                            task
                                                                        }
                                                                        props={{
                                                                            ref: provided.innerRef,
                                                                            ...provided.draggableProps,
                                                                            ...provided.dragHandleProps,
                                                                            style: {
                                                                                ...provided
                                                                                    .draggableProps
                                                                                    .style,
                                                                                opacity:
                                                                                    snapshot.isDragging
                                                                                        ? "0.5"
                                                                                        : "1",
                                                                            },
                                                                        }}
                                                                        index={
                                                                            index
                                                                        }
                                                                    />
                                                                )}
                                                            </Draggable>
                                                        );
                                                    })}
                                            </>
                                        </StatusColumn>
                                    )}
                                </Droppable>
                            );
                        })}
                    <Tooltip title="Create column">
                        <ButtonPlus onClick={handleClickCreateColumn}>
                            <AddIcon />
                        </ButtonPlus>
                    </Tooltip>
                </Board>
            </DragDropContext>
            <AddStatusModal />
            <AddTaskModal />
        </CalendarContainer>
    );
}
