const express = require("express");
const router = express.Router();
const {handleGetAllUsers , handleGetAllUsersById , postUsers , patchUserById,deleteUserById} = require("../controllers/user");

//RestAPI
router.get("/",handleGetAllUsers);
router.get("/:id",handleGetAllUsersById);
router.post("/",postUsers);
router.patch("/:id", patchUserById);
router.delete("/:id",deleteUserById);

// router.get("/users", async (req, res) => {
//     const allUsers = await User.find({});
//     const html = `
//     <ul>
//         ${allUsers.map((user) => `<li>${user.firstName}</li>`).join("")}
//     </ul>
//     `;
//     res.send(html);
// });
module.exports = router;