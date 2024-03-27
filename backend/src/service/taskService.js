import db from "../models/index";

let create = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { statusId, name } = data;
            let taskCount = await db.Task.findAll({
                where: {
                    statusId: statusId,
                },
            });

            let task = await db.Task.create({
                statusId,
                name,
                position: taskCount.length > 0 ? taskCount.length : 0,
            });
            resolve({
                errCode: 0,
                data: task,
            });
        } catch (error) {
            reject(error);
        }
    });
};

let updatePosition = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { sourceList, destinationList, isStatusChange } = data;
            let updatePromises = [];

            sourceList.forEach((item) => {
                updatePromises.push(
                    db.Task.update(
                        { ...item },
                        {
                            where: {
                                id: item.id,
                            },
                        }
                    )
                );
            });

            if (isStatusChange) {
                destinationList.forEach((item) => {
                    updatePromises.push(
                        db.Task.update(
                            { ...item },
                            {
                                where: {
                                    id: item.id,
                                },
                            }
                        )
                    );
                });
            }
            await Promise.all(updatePromises);

            resolve({
                errCode: 0,
                data: "Update successful",
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    create,

    updatePosition,
};
