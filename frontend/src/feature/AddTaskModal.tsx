import { Button, Grid, TextField } from "@mui/material";
import CustomModal from "../components/Modal";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";

import { joiResolver } from "@hookform/resolvers/joi";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { StatusType } from "../types/status.type";
import { TaskType } from "../types/task.type";
import { taskValidationSchema } from "../schema/taskSchema";
import { createTask, toggleTaskModal } from "../redux/features/task.slice";
import { selectStatus } from "../redux/features/status.slice";
const defaultParamStatus: Partial<TaskType> = {
    name: "",
};
export default function AddTaskModal() {
    const {
        control,
        reset,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm<Partial<TaskType>>({
        defaultValues: defaultParamStatus,
        resolver: joiResolver(taskValidationSchema),
    });

    const taskState = useAppSelector((state) => state.taskState);
    const { statusTaskModal } = taskState;

    const statusState = useAppSelector((state) => state.statusState);
    const { selectedStatus } = statusState;

    const dispatch = useDispatch();
    const handleSave = (data: Partial<StatusType>) => {
        dispatch(
            createTask({
                ...data,
            })
        );
    };
    useEffect(() => {
        if (!statusTaskModal.addTask) {
            reset(defaultParamStatus);
            dispatch(selectStatus(undefined));
        }
    }, [dispatch, reset, statusTaskModal.addTask]);
    useEffect(() => {
        if (selectedStatus) {
            setValue("statusId", selectedStatus.id);
        }
    }, [selectedStatus, setValue]);
    return (
        <CustomModal
            title="Thêm mới công việc"
            open={statusTaskModal.addTask}
            handleClose={() => {
                dispatch(
                    toggleTaskModal({
                        key: "addTask",
                        status: false,
                    })
                );
            }}
            action={
                <>
                    <Button
                        variant="contained"
                        onClick={handleSubmit(handleSave)}
                    >
                        Lưu
                    </Button>
                </>
            }
            content={
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name={"name"}
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={"Tên công việc"}
                                        helperText={errors["name"]?.message}
                                        error={!isEmpty(errors["name"])}
                                        autoComplete="new-password"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                </>
            }
        />
    );
}
