const express = require("express");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  // Serve the necessary data or HTML to render the Dashboard page
  res.send("Dashboard page");
});

module.exports = router;