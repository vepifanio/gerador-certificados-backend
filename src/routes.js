const express = require('express');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const studentRouter = require('./routes/student');

const router = express.Router();

router.use('/auth', authRouter);

router.use('/admin', adminRouter);

router.use('/student', studentRouter);

module.exports = router;