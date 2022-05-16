const router = require("express").Router();

const Project = require('../models/Project.model');
// const Task = require('../models/Task.model');


// Create new project
router.post('/projects', (req, res, next) => {
    const { title, description } = req.body;

    const newProject = {
        title,
        description,
        tasks: []
    }

    Project.create(newProject)
        .then(response => res.status(201).json(response))
        .catch(err => {
            console.log("error creating a new project", err);
            res.status(500).json({
                message: "error creating a new project",
                error: err
            });
        })
});

router.get("/projects/:id", (req, res, next)=>{
    const { projectId } = req.params

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Project.findById(projectId)
    .populate("tasks")
    .then(response=>{res.json(response)})
    .catch(err => {
        console.log("error getting project details", err);
        res.status(500).json({
            message: "error getting project details",
            error: err
        });
        })
})

router.get("/projects", (req, res, next) => {
    Project.find()
        .populate("tasks")
        .then( response => {
            res.json(response)
        })
        .catch(err => {
            console.log("error getting list of projects", err);
            res.status(500).json({
                message: "error getting list of projects",
                error: err
            });
        })
});


router.put("/projects/:id", (req, res, next)=>{
    const { projectId } = req.params

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then(response=>{res.json(response)})
    .catch(err => {
        console.log("error getting project details", err);
        res.status(500).json({
            message: "error getting project details",
            error: err
        });
        })
    })

router.delete("/projects/:id", (req, res, next)=>{
    const { projectId } = req.params

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Project.findByIdAndDelete(projectId)
    .populate("tasks")
    .then(response=>{res.json(response)})
    .catch(err => {
        console.log("error getting project details", err);
        res.status(500).json({
            message: "error getting project details",
            error: err
        });
        })
})

module.exports = router;
