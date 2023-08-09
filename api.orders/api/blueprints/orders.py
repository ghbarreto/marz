from flask import Blueprint, request
from marshmallow import ValidationError
from api.models import Orders, Customer, Product
from api.schemas import OrderSchema

orders_blueprint = Blueprint('orders_blueprint', __name__)

@orders_blueprint.route('/all', methods=['GET'])
def get_all_orders():
	order_schema = OrderSchema(many=True)
	try:
		orders = Orders.select().dicts()
		orders_serialized = order_schema.dump(orders)
	except Exception as err:
		return { 'data': [], 'message': str(err) }, 500
	return { 'data': orders_serialized, 'message': '' }, 200

@orders_blueprint.route('/inpipeline', methods=['GET'])
def get_inprogress_orders():
	order_schema = OrderSchema(many=True)
	try:
		orders = Orders.select(
			Product.ProductName,
			Product.ProductPhotoURL,
			Orders.OrderID,
			Customer.CustomerID,
			Customer.CustomerFirstName,
			Customer.CustomerLastName,
			Orders.OrderStatus,
			Product.ProductID
			).join(
				Customer, on=(Orders.CustomerID == Customer.CustomerID)
			).join(Product, on=(Orders.ProductID == Product.ProductID)).where(
				(Orders.OrderStatus == 'Queued') |
				(Orders.OrderStatus == 'InProgress') |
				(Orders.OrderStatus == 'QA')
			).dicts()
		
		orders_serialized = order_schema.dump(orders)
	except Exception as err:
		return { 'data': [], 'message': str(err) }, 500
	return { 'data': orders_serialized, 'message': '' }, 200

@orders_blueprint.route('/update_status', methods=['POST'])
def post_update_order_status():
	order_schema = OrderSchema()
	json_data = request.get_json()
	if not json_data:
		return { 'message': 'No order data provided!' }, 400
	try:
		order = order_schema.load(json_data)
		Orders.update(**order).where(
			Orders.OrderID == order['OrderID']
		).execute()
	except ValidationError as err:
		return { 'message': err.messages }, 422
	except Exception as err:
		return { 'message': str(err) }, 500
	return { 'message': f'{order["OrderID"]} updated successfully!' }, 200
