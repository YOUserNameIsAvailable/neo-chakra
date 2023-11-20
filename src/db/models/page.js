import mongoose from 'mongoose'
const pageSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    pageHtml: { type: String, required: true },
    component: { type: String, required: true },
  },
  { timestamps: true },
)
export default mongoose.model('Page', pageSchema)
