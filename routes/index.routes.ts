import { Router } from "https://deno.land/x/oak/mod.ts";
import * as indexCtrl from "./../controllers/index.controllers.ts";

const router = new Router();

router.get("/", ({ response }) => {
  response.body = "Welcome to my API";
});

router.get("/users", indexCtrl.getUsers);
router.get("/users/:id", indexCtrl.getUser);
router.delete("/users/:id", indexCtrl.deleteUser);
router.patch("/users/:id", indexCtrl.updateUser);
router.post("/users", indexCtrl.createUser);
export default router;
