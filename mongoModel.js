const { mongodb, url } = require('./mongodb');
const mongo = require('mongodb');

// constructor
const Customer = function (customer) {
    this.name = customer.name;
    this.email = customer.email;
};

Customer.create = (newCustomer, result) => {

    mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("local");
        dbo.collection("customers").insertOne(newCustomer, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("1 document inserted : ", { id: res.insertId, ...newCustomer });
            result(null, { id: res.insertId, ...newCustomer });
            db.close();
        });
    });
};

Customer.remove = (id, result) => {

    mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("local");

        dbo.collection("customers").deleteOne({ _id: new mongo.ObjectID(id) }, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("1 document deleted");
            result(null, res);
            db.close();
        });
    });
};

Customer.updateById = (id, customer, result) => {

    mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("local");
        var myquery = { _id: new mongo.ObjectID(id) };
        var newvalues = { $set: { name: customer.name, email: customer.email } };
        dbo.collection("customers").updateOne(myquery, newvalues, function (err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("1 document updated");
            result(null, { id: id, ...customer });
            db.close();
        });
    });
};

module.exports = Customer;
