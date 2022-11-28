const express = require("express");
const router = express.Router();

const database = require("./config");

router.get("/save", function (req, res) {
  database.ref("userList").set({ name: "Eric" }, function (error) {
    if (error) console.error(error);
    else console.log("success save !!");
  });
  return res.json({ firebase: true });
});

module.exports = router;
