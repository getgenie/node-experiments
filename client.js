import grpc from "@grpc/grpc-js"
// const NEWS_PROTO_PATH = "./news.proto"; 
const PROTO_PATH = "./customer.proto"; 
import protoLoader from "@grpc/proto-loader"

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});
// var newsPackageDefinition = protoLoader.loadSync(NEWS_PROTO_PATH, {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     arrays: true
// });
const CustomerService = grpc.loadPackageDefinition(packageDefinition).CustomerService;
const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;
const client =  new CustomerService(
    "localhost:30043",
    grpc.credentials.createInsecure()
);
const newClient =  new NewsService(
    "localhost:30043",
    grpc.credentials.createInsecure()
);
client.getAll(null, (err, data) => {
    console.log("customers",data)
    // if (!err) {
    //     res.send({
    //         results: data.customers
    //     });
    // }
});
newClient.getAll(null, (err, data) => {
    console.log("news",data)
    // if (!err) {
    //     res.send({
    //         results: data.customers
    //     });
    // }
});