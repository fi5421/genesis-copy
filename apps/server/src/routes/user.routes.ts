import { Router } from 'express';
import {
  handleSyncUser,
  handleDeleteUser,
  handleGetUser,
  handleUpdateUser,
} from '../controllers/user/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', authenticate(), handleGetUser);
router.post('/sync', authenticate(), handleSyncUser);
router.put('/update', authenticate(), handleUpdateUser);
router.delete('/remove', authenticate(), handleDeleteUser);

export default router;
