import Page from '../../db/models/page'
import { connectToDatabase } from '../../db/db'
export default async (req, res) => {
  await connectToDatabase()

  if (req.method === 'GET') {
    const { pageId } = req.query

    if (pageId) {
      try {
        const page = await Page.findOne({ _id: pageId })
        if (!page) {
          return res.status(404).json({ error: 'Page not found' })
        }
        return res.status(200).json(page)
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    } else {
      try {
        const users = await Page.find()
          .select('title component')
          .sort({ createdAt: -1 })
        return res.status(200).json(users)
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }
  if (req.method === 'POST') {
    const { title, pageHtml, component } = req.body
    try {
      const titleRegex = new RegExp(`^${title}$`, 'i')
      const existingPage = await Page.findOne({ title: titleRegex })

      if (existingPage) {
        return res.status(400).json({ error: 'Title already exists' })
      }
      const newPage = new Page({ title, pageHtml, component })
      await newPage.save()
      return res.status(200).json({ message: 'Created successfully' })
    } catch (error) {
      return res.status(400).json({ error: 'Bad Request' })
    }
  }
  if (req.method === 'PATCH') {
    const { title, pageHtml, component } = req.body
    const { pageId } = req.query
    const titleRegex = new RegExp(`^${title}$`, 'i')

    try {
      const existingPage = await Page.findOne({
        title: titleRegex,
        _id: { $ne: pageId },
      })
      if (existingPage) {
        return res.status(400).json({ error: 'Title already exists' })
      }
      const updatedPage = await Page.findByIdAndUpdate(pageId, {
        title,
        pageHtml,
        component,
      })
      if (!updatedPage) {
        return res.status(404).json({ error: 'Page not found' })
      }
      return res.status(200).json({ message: 'Updated successfully' })
    } catch (error) {
      return res.status(400).json({ error: 'Bad Request' })
    }
  } else {
    return res.status(404).json({ error: 'Request not found' })
  }
}
