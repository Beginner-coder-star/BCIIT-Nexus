import jwt from 'jsonwebtoken';

// user authentication middleware
const authUser = async (req, res, next) => {
  try {
    let token = req.headers.token;
    const auth = req.headers.authorization;
    if (!token && typeof auth === 'string' && auth.startsWith('Bearer ')) {
      token = auth.slice(7).trim();
    }

    if (!token) {
      return res.json({ success: false, message: 'Not authorized. Login Again' });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!req.body || typeof req.body !== 'object') {
      req.body = {};
    }
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
