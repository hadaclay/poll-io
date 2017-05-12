import { Router } from 'express'
import multer from 'multer'

import GetRecentPolls from './GetRecentPolls'
import GetPoll from './GetPoll'
import GetUserPolls from './GetUserPolls'
import Vote from './Vote'
import Login from './Login'
import NewPoll from './NewPoll'
import DeletePoll from './DeletePoll'

const router = Router()

router.get('/api/polls', GetRecentPolls)
router.get('/api/polls/:pollID', GetPoll)
router.get('/api/mypolls', GetUserPolls)
router.get('/api/vote/:pollID', Vote)
router.post('/api/user', Login)
router.post('/api/newpoll', multer().array(), NewPoll)
router.delete('/api/polls/:pollID', DeletePoll)

export default router
