module.exports = {
    extends: ['react-app', 'react-app/jest'],
    rules: {
        'no-restricted-globals': 'warn', // Muda de erro para warning
        'no-unused-vars': 'warn',        // Muda de erro para warning
        'import/no-anonymous-default-export': 'warn' // Muda de erro para warning
    }
};
