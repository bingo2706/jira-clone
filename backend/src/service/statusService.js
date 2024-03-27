import db from "../models/index";

let create = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let query = `SELECT COUNT(*) FROM "Statuses" `;

            let statusCount = await db.sequelize.query(query, {
                type: db.sequelize.QueryTypes.SELECT,
            });
            statusCount = parseInt(statusCount[0].count);

            let status = await db.Status.create({
                ...data,
                position: statusCount > 0 ? statusCount : 0,
            });
            resolve({
                errCode: 0,
                data: status,
            });
        } catch (error) {
            reject(error);
        }
    });
};
let getAll = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let statuses = await db.Status.findAll();
            statuses = await Promise.all(
                statuses.map(async (item) => ({
                    ...item,
                    tasks: await db.Task.findAll({
                        where: { statusId: item.id },
                    }),
                }))
            );

            resolve({
                errCode: 0,
                data: statuses,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    create,
    getAll,
};
