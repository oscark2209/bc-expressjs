import { Router } from 'express';
import { instrumentController as ctrl } from '../controllers/instrument.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { createInstrumentSchema, updateInstrumentSchema } from '../schemas/instrument.schema';

const router = Router();
router.use(authMiddleware);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', validate(createInstrumentSchema), ctrl.create);
router.patch('/:id', validate(updateInstrumentSchema), ctrl.update);
router.delete('/:id', ctrl.delete);

export default router;