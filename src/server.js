const app = require('./app');

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Listen on Port ${PORT}`);
});