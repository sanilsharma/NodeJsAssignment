const express = require("express");
const bodyParser = require("body-parser");
const routeConstants = require("./routeConstants");
const customers = require("./controller");


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get(routeConstants.ROOT, (req, res) => {
    res.json({ message: "Welcome to Sanil's Application where you can experience different databases." });
});

app.post(routeConstants.CUSTOMERS, customers.createCustomer);

app.get(routeConstants.CUSTOMERS, customers.findAllCustomer);

app.get(routeConstants.CUSTOMER_ID, customers.findOneCustomer);

app.put(routeConstants.CUSTOMER_ID, customers.updateCustomer);

app.delete(routeConstants.CUSTOMER_ID, customers.deleteCustomer);

app.delete(routeConstants.CUSTOMERS, customers.deleteAllCustomer);

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})