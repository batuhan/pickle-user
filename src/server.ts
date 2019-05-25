import { ServerInfo } from "apollo-server";
import server from "./app";

server.listen().then((serverInfo: ServerInfo) => {
  console.log(`Server ready at ${serverInfo.url}`);
});
