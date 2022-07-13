import express from "express";
import { getAllUser , signup , login} from "../controllers/user-controller";

const router = express.Router();

// http://localhost:5000/api/user

router.get("/" , getAllUser);
router.post("/signup" , signup );
router.post("/login" , login );


export default router;