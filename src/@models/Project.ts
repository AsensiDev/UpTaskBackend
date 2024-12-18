import mongoose, { Schema, Document } from 'mongoose'

// tipado de typescript
export type ProjectType = Document & {
    projectName: string
    clientName: string
    description: string
}

//schema para la db de mongoose
const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
})

// crea modelo llamado Project utilizando el esquem aProjectSchema
const Project = mongoose.model<ProjectType>('Project', ProjectSchema)
export default Project