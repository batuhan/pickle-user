import { ServerInfo } from "apollo-server";
import server from "./app";

server.listen().then(
  (serverInfo: ServerInfo): void => {
    // eslint-disable-next-line no-console
    console.log(`Server ready at ${serverInfo.url}`);
  },
);
