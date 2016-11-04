import mongoose, { Schema } from 'mongoose'

const groupSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  leader: {
    type: String
  },
  assignments: {
    type: Mixed
  }
}, {
  timestamps: true
})

groupSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      image: this.image,
      leader: this.leader,
      assignments: this.assignments,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

module.exports = mongoose.model('Group', groupSchema)
export default module.exports
