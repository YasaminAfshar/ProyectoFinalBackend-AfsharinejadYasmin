
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("chatSocket");
});

export default router;