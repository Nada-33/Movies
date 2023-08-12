//authencation (verfiy the authencation of user autherized to access )
import jwt from "jsonwebtoken";
export const verfiyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Acess Denied");
        }
        if (token.startWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next();
    }
    catch (err) {
        res.send(500).json({ error: err.message })
    }
};