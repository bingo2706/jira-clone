import statusService from "../service/statusService";

let create = async (req, res) => {
    try {
        let data = await statusService.create(req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
let getAll = async (req, res) => {
    try {
        let data = await statusService.getAll(req.query);
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server",
        });
    }
};
module.exports = { create, getAll };
