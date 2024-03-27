import { Button, Grid, TextField } from "@mui/material";
import CustomModal from "../components/Modal";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";

import { joiResolver } from "@hookform/resolvers/joi";
import { statusValidationSchema } from "../schema/statusSchema";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { StatusType } from "../types/status.type";
import {
    createNewStatus,
    toggleStatusModal,
} from "../redux/features/status.slice";
const defaultParamStatus: Partial<StatusType> = {
    name: "",
};
export default function AddStatusModal() {
    const {
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<Partial<StatusType>>({
        defaultValues: defaultParamStatus,
        resolver: joiResolver(statusValidationSchema),
    });

    const statusState = useAppSelector((state) => state.statusState);
    const { statusStatusModal } = statusState;
    const dispatch = useDispatch();
    const handleSave = (data: Partial<StatusType>) => {
        dispatch(
            createNewStatus({
                ...data,
            })
        );
    };
    useEffect(() => {
        if (!statusStatusModal.addStatus) {
            reset(defaultParamStatus);
        }
    }, [reset, statusStatusModal.addStatus]);
    return (
        <CustomModal
            title="Thêm mới Statsus"
            open={statusStatusModal.addStatus}
            handleClose={() => {
                dispatch(
                    toggleStatusModal({
                        key: "addStatus",
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
                                        label={"Tên trạng thái"}
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
