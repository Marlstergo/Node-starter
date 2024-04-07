const express = require("express")
const {
    getAllTasks,
    editTask,
    deleteTask,
    createTask,
    getTask,
} = require("../controllers/tasks")

const router = express.Router()

router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getTask).patch(editTask).delete(deleteTask)

module.exports = router
