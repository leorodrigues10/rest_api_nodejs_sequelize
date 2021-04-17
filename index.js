const app = require('./config/server');

app.get('/', (req, res) => {
    console.log('teste')
    return res.status(200).json({data: {name: "leo"}})
});

app.listen(8080, () => {
    console.log('Server running...');
});