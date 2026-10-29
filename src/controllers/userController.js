const userService = require('../services/userService');

const register = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;

        if (!fullname || !username || !email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Semua kolom (fullname, username, email, password) wajib diisi!'
            });
        }

        const newUser = await userService.registerUser({ fullname, username, email, password });
        
        return res.status(201).json({
            status: 'success',
            message: 'Registrasi pengguna berhasil dilakukan',
            data: {
                userId: newUser.id,
                fullname: newUser.fullname,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                status: 'fail',
                message: 'Email atau username sudah terdaftar, silakan gunakan yang lain.'
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan pada server: ' + err.message
        });
    }
};

// Tambahkan fungsi login ini
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Email dan password wajib diisi!'
            });
        }

        const result = await userService.loginUser(email, password);

        return res.status(200).json({
            status: 'success',
            message: 'Login berhasil dilakukan',
            data: {
                token: result.token,
                user: result.user
            }
        });
    } catch (err) {
        return res.status(401).json({
            status: 'fail',
            message: err.message || 'Email atau password salah'
        });
    }
};

module.exports = {
    register,
    login,
};