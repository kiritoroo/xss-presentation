const mongoose    = require('mongoose')
const Schema      = mongoose.Schema

const userSchema  = new Schema({
  fullname: {
    type: String,
    require: [true, 'Vui lòng nhập tên của bạn!']
  },
  email: {
    type: String,
    require: [true, 'Vui lòng thêm địa chỉ email!'],
    uniqure: true
  },
  password: {
    type: String,
    required: [true, 'Vui lòng nhập mật khẩu!']
  },
  city: {
    type: String,
    required: false,
    default: "Việt Nam"
  },
  aboutMe: {
    type: String,
    required: false,
    default: "Không có gì cả..."
  },
  profileImage: {
    type: String,
    required: false,
    default: ""
  },
  coverPhoto: {
    type: String,
    required: false,
    default: ""
  },
  posts: {
    type: Array,
    require: false,
    defaule: []
  }
})

module.exports = mongoose.model('User', userSchema)