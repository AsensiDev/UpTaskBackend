import { Router }  from 'express'
import { body, param } from 'express-validator' // body nos permite acceder al cuerpo de la solicitud
import { ProjectController } from '../@controllers/ProjectController'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../@controllers/TaskController'
import { projectExists } from '../middleware/project'
import { taskBelongsToProject, taskExists } from '../middleware/task'

const router = Router()

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    handleInputErrors,
    ProjectController.createProject
)
router.get('/', ProjectController.getAllProjects)
router.get('/:id',
    param('id')
        .isMongoId().withMessage('ID no Válido'),
    handleInputErrors,
    ProjectController.getProjectById
)
router.put('/:id',
    param('id')
        .isMongoId().withMessage('ID no Válido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion es obligatoria'),
    handleInputErrors,
    ProjectController.updateProject
)
router.delete('/:id',
    param('id')
        .isMongoId().withMessage('ID no Válido'),
    handleInputErrors,
    ProjectController.deleteProjectById
)

/** Routes for Tasks */
// ejecuta el middleware projectExists siempre que la ruta contenga projectId
router.param('projectId', projectExists)

router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('El nombre de la Tarea es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripcion de la Tarea es Obligatoria'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.get('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Id no Válido'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Id no Válido'),
    body('name')
        .notEmpty().withMessage('El nombre de la Tarea es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La Descripcion de la Tarea es Obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    param('taskId').isMongoId().withMessage('Id no Válido'),
    handleInputErrors,
    TaskController.deleteTask
)

router.post('/:projectId/tasks/:taskId/status',
    param('taskId').isMongoId().withMessage('Id no Válido'),
    body('status')
        .notEmpty().withMessage('El Estado es Obligatorio'),

    handleInputErrors,
    TaskController.updateTaskStatus
)

export default router

