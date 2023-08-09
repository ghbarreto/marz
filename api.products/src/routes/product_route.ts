import { connect } from '../api/models';

module.exports = app => {
    app.get('/api/products', async (req, res) => {
        try {
            const conn = await connect();
            const query = await conn.query('SELECT * from Product WHERE Product.ProductStatus = "Active";');

            return res.send(query);
        } catch (err) {
            return res.send(err);
        }
    });
};
