//1 Return top 5 orders

db.cart.find().sort({"amount":-1}).limit(2);

//2 Find total order amount per user
db.cart.aggregate([{$group:{_id:"$userId",total:{$sum:"$amount"}}}]);

//3 Find how many times each product has been ordered
db.cart.aggregate([{$unwind:"$cartItems"},{$group:{_id:"$cartItems.productId",count:{$sum:"$cartItems.quantity"}}}]).pretty();

//4 Find city with most orders
db.cart.aggregate([{$group:{_id:"$shippingAddress.city",count:{$sum:1}}},{$sort:{count:-1}},{$limit:1}]).pretty();