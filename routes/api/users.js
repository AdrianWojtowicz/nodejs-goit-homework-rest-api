const express = require("express");
const router = express.Router();
const { basedir } = global;
const ctrl = require(`${basedir}/controllers/users`);
const { auth, upload, resize } = require(`${basedir}/middlewares`);
const { ctrlWrapper } = require(`${basedir}/utils`);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", ctrlWrapper(ctrl.resendVerifyEmail));
router.patch("/", auth, ctrlWrapper(ctrl.updateSubscriptionUser))
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  resize,
  ctrlWrapper(ctrl.setAvatar)
)

module.exports = router