import { Router } from "express";

import user from "../controllers/Usuario";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.get('/', loginRequired, user.index);
router.get('/:id', user.show);
router.post('/', user.store);
router.put('/', loginRequired, user.update);
router.put('/', user.patch);
router.delete('/', loginRequired, user.delete);

export default router;
