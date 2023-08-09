from marshmallow import Schema, fields, pre_load

class OrderSchema(Schema):
    OrderID = fields.Int()
    OrderStatus = fields.Str()
    CustomerID = fields.Int()
    ProductID = fields.Int()
    ProductName = fields.Str()
    CustomerFirstName = fields.Str()
    ProductPhotoURL = fields.Str()
    CustomerLastName = fields.Str()

    @pre_load
    def make_object(self, data, **kwargs):
        return data