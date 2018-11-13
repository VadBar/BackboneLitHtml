const app = require('./app.js');
const port = process.env.PORT || 5000;

app.listen(port, (req, res) => console.log(`Server loaded on ${port}`));
