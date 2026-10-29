const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); 
const { sendEmail } = require('./emailService'); 

const registerUser = async (userData) => {
    const { fullname, username, email, password } = userData;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const verificationToken = uuidv4();

    const query = 'INSERT INTO users (fullname, username, email, password) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [fullname, username, email, hashedPassword]);

    const subject = 'Selamat Datang di EduCourse App!';
    const htmlContent = `
        <h2>Halo ${fullname},</h2>
        <p>Terima kasih telah mendaftar di EduCourse App.</p>
        <p>Token verifikasi akun kamu adalah: <b>${verificationToken}</b></p>
        <p>Silakan nikmati berbagai kursus menarik yang tersedia!</p>
    `;

    await sendEmail(email, subject, htmlContent);

    return {
        id: result.insertId,
        fullname,
        username,
        email
    };
};

const loginUser = async (email, password) => {
   
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows] = await db.query(query, [email]);

    if (rows.length === 0) {
        throw new Error('Email atau password salah');
    }

    const user = rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Email atau password salah');
    }

    const secretKey = process.env.JWT_SECRET || 'super_secret_key_educourse';
    const token = jwt.sign(
        { userId: user.id, email: user.email, username: user.username },
        secretKey,
        { expiresIn: '1d' }
    );

    return {
        token,
        user: {
            id: user.id,
            fullname: user.fullname,
            username: user.username,
            email: user.email
        }
    };
};

module.exports = {
    registerUser,
    loginUser,
};