import React, { useRef, useState } from "react";
import {
    Box,
    BoxProps,
    IconButton,
    Stack,
    Typography,
    styled,
} from "@mui/material";
import { useDispatch } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { TaskType } from "../types/task.type";
const Container = styled(Box)(({ theme }) => ({
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "12px",
    cursor: "pointer",
    boxShadow:
        "var(--ds-shadow-raised,0 1px 1px rgba(23,43,77,0.2),0 0 1px rgba(23,43,77,0.2))",
}));
export default function TaskItem({
    task,
    index,

    props,
}: {
    task: TaskType;
    index: number;
    props: BoxProps;
}) {
    const dispatch = useDispatch();
    const textEllipsis = {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    };
    return (
        <Container {...props}>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                gap={"4px"}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        ...textEllipsis,
                    }}
                    fontSize={"14px"}
                >
                    {task.name}
                </Typography>
                <MoreHorizIcon sx={{ color: "#747f88" }} />
            </Stack>
        </Container>
    );
}
