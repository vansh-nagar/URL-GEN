import { Router } from "express";
import { registerUser, loginUser } from "../controller/register.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../utils/jwt.vertify.js";
import { uploadFile } from "../controller/upload.controller.js";
import { getLinks, deleteLinks } from "../controller/getLinks.controller.js";

const router = Router();

router.route("/register").post(upload.single("image"), registerUser);
router.route("/login").post(loginUser);

//secured router
router.route("/uploadFile").post(verifyJwt, upload.single("image"), uploadFile); //make it for multiple images
router.route("/getLinks").get(verifyJwt, getLinks);
router.route("/deleteLinks").post(verifyJwt, deleteLinks);

export default router;
