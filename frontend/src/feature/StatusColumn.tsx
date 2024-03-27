import { Box, Menu, MenuItem, Stack, Typography, styled } from "@mui/material";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import { TaskType } from "../types/task.type";
import { useDispatch } from "react-redux";
import { toggleTaskModal } from "../redux/features/task.slice";
import { selectStatus } from "../redux/features/status.slice";
import { StatusType } from "../types/status.type";

const ContentWrapper = styled(Box)(({ theme }) => ({
    backgroundColor: "#f6f7f9",
    borderRadius: "8px",
    padding: "10px",
    minHeight: "272px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
}));
const StatusList = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    height: "100%",
    flex: 1,
}));
const ButtonMore = styled(Box)(({ theme }) => ({
    padding: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    "&:hover": {
        backgroundColor: "#e9ebee",
        cursor: "pointer",
    },
}));
export default function StatusColumn({
    children,
    title,
    props,
    tasks,
    status,
}: {
    children: JSX.Element;
    title: string;
    tasks?: TaskType[];
    status: StatusType;
    props: any;
}) {
    const [showCreateIssue, setShowCreateIssue] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();
    const handleClickMore = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickCreateIssue = () => {
        dispatch(toggleTaskModal({ key: "addTask", status: true }));
        dispatch(selectStatus(status));
    };
    return (
        <Box
            {...props}
            sx={{
                overflow: "hidden",
                height: "100%",
                minWidth: "270px",
                maxWidth: "270px",
            }}
        >
            <ContentWrapper>
                <Stack direction={"row"} justifyContent={"space-between"}>
                    <Typography
                        color={"#5E6C84"}
                        variant="subtitle1"
                        marginBottom={"4px"}
                        fontWeight={500}
                        textTransform={"capitalize"}
                        flex={1}
                        sx={{
                            "&:hover": {
                                backgroundColor: "#e9ebee",
                                cursor: "pointer",
                            },
                        }}
                    >
                        {title}
                    </Typography>
                    <ButtonMore onClick={handleClickMore}>
                        <MoreHorizIcon />
                    </ButtonMore>
                </Stack>

                <StatusList
                    sx={{ cursor: "pointer" }}
                    onMouseEnter={() => setShowCreateIssue(true)}
                    onMouseLeave={() => setShowCreateIssue(false)}
                >
                    {children}
                    {((tasks && tasks?.length > 0) || showCreateIssue) && (
                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            gap="4px"
                            width={"100%"}
                            padding={"8px 4px"}
                            sx={{
                                "&:hover": {
                                    backgroundColor: "#e9ebee",
                                    cursor: "pointer",
                                },
                            }}
                        >
                            <AddIcon
                                sx={{
                                    color: "#42526E",
                                    fontSize: "18px",
                                    marginBottom: "2px",
                                }}
                            />

                            <Typography
                                variant="subtitle1"
                                fontWeight={500}
                                fontSize={"14px"}
                                onClick={handleClickCreateIssue}
                            >
                                Create issue
                            </Typography>
                        </Stack>
                    )}
                </StatusList>
            </ContentWrapper>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem>Delete</MenuItem>
            </Menu>
        </Box>
    );
}
