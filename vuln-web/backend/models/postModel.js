const mongoose    = require('mongoose')
const Schema      = mongoose.Schema

const postSchema = new Schema({
  caption: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: false,
    default: ""
  },
  type: {
    type: String,
    require: true,
    default: "post"
  },
  createDAt: {
    type: Date,
    defalt: Date.now
  },
  likers: {
    type: Array,
    require: false,
    default: []
  },
  comments: {
    type: Array,
    require: false,
    default: []
  },
  user: {
    _id: {
      type: String,
      require: true,
      default: ""
    },
    fullname: {
      type: String,
      require: true,
      default: ""
    },
    email: {
      type: String,
      require: true,
      default: ""
    },
    profileImage: {
      type: String,
      require: true,
      default: ""
    }
  }
})

module.exports = mongoose.model('Post', postSchema)