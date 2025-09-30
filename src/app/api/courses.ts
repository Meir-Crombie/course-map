import type { NextApiRequest, NextApiResponse } from 'next'
import courses from '../../data/courses.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(courses)
}

