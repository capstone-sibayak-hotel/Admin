require("dotenv").config();
const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const connectToDB = require("./db_connection");


(async function () {
  await connectToDB();
  const server = Hapi.server({
    port: Number(process.env.PORT),
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  server.route(routes);
  await server.start();
  console.log(`Sever runs at ${server.info.uri}`);
})();
