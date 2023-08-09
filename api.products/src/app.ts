const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

require('./routes/product_route')(app);

app.listen(5002, () => {
    return console.log(`Express is listening at http://localhost:5002`);
});
