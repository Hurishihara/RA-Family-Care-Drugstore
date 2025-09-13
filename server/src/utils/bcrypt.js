import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
}

const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        console.log('Password match:', match);
        return match;
    }
    catch (err) {
        console.error('Error comparing password:', err);
        throw err;
    }
}

export { hashPassword, comparePassword };