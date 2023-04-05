const asyncHandler = require("express-async-handler");
const Task = require("../model/TaskModel");

// Create Task
exports.createTask = asyncHandler(async (req, res) => {
    const reqBody = req.body;
    reqBody.email = await res.locals.user.email;
    const task = await Task.create(reqBody);
    if (task) {
        res.status(200).json({ status: "success", data: task });
    } else {
        res.status(400).json("Failed")
        throw new Error("Task creation failed")
        // Noth
    }
})

// Delete Task
exports.deleteTask = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const query={_id:id}
    const result =await Task.remove(query);
    if (result) {
        res.status(200).json({ status: "success", data: result });
    } else {
        throw new Error('Remove failed')
    }
})

// Update Task
exports.updateTask = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    const query = { _id: id };
    const reqBody = { status: status };
    const result = await Task.updateOne(query, reqBody);
    if (result) {
        res.status(200).json({ status: "success", data: result });
    } else {
        throw new Error("Update Task Failed")
    }
})

exports.listTaskByStatus = asyncHandler(async (req, res) => {
    const status = req.params.status;
    const email = res.locals.user.email;
    const result = await Task.aggregate([
        { $match: { status: status, email: email } },
        {
            $project: {
                _id: 1, title: 1, description: 1, status: 1,
                createDate: {
                    $dateToString: {
                        date: "$createdDate",
                        format: "%d-%m-%Y"
                    }
                }
            }
        }
    ])
    if (result) {
        res.status(200).json({ status: "success", data: result });
    } else {
        throw new Error("List Task Failed");
    }
});


// Task status count
exports.taskStatusCount = asyncHandler(async (req, res) => {
    const email = res.locals.user.email;
    const result = await Task.aggregate([
        { $match: { email: email } },
        {$group:{_id:"$status", sum:{$count:{}}}}
    ])
    if (result) {
      res.status(200).json({ status: "success", data: result });
    } else {
      throw new Error("Task status count failed");
    }
})