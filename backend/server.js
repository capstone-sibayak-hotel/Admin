require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt")
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

  await server.register(Jwt)

   server.auth.strategy("jwt", "jwt", {
    keys: process.env.JWT_SECRET_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: true,
      exp: true,
      maxAgeSec: 14400, // 4 hours, adjust as needed
      timeSkewSec: 15,
    },
    validate: (artifacts, request, h) => {
      return {
        isValid: true,
        credentials: artifacts.decoded.payload,
      };
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Sever runs at ${server.info.uri}`);
})();
