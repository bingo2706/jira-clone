import taskService from "../service/taskService";

let create = async (req, res) => {
    try {
        let data = await taskService.create(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
let updatePosition = async (req, res) => {
    try {
        let data = await taskService.updatePosition(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
module.exports = {
    create,
    updatePosition,
};
