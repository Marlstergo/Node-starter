const { createCustomError } = require("../errors/customError")
const asyncWrapper = require("../middleware/async")
const taskModel = require("../models/taskModel")

const getAllTasks = asyncWrapper(async (req, res) => {
    const allTasks = await taskModel.find({})
    res.status(200).json({ tasks: allTasks })
})

createTask = asyncWrapper(async (req, res) => {
    const newTask = await taskModel.create(req.body)
    res.status(201).json(newTask)
})

editTask = asyncWrapper(async (req, res) => {
    const task = await taskModel.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )
    if (!task) {
        return res
            .status(404)
            .json({ msg: `No task with id : ${req.params.id}` })
    } else {
        res.json({
            status: "success",
            task,
        })
    }
})

deleteTask = asyncWrapper(async (req, res, next) => {
    const task = await taskModel.findByIdAndDelete(req.params.id)
    if (!task) {
        next(createCustomError(`No task with id: ${req.params.id}`, 400))
    } else {
        res.status(200).json({
            message: `${task.name} successfully removed`,
        })
    }
})

const getTask = asyncWrapper(async (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({ msg: "Please provide id" })
    }

    const task = await taskModel.findOne({ _id: req.params.id })
    if (!task) {
        return res
            .status(404)
            .json({ msg: `No task with id : ${req.params.id}` })
    } else {
        res.status(200).json({ task })
    }
})

module.exports = {
    getAllTasks,
    createTask,
    editTask,
    deleteTask,
    getTask,
}
