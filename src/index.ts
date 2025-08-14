import { ApolloServer } from "apollo-server";
import { typeDefs } from "./routes/post.route";
import { postResolvers } from "./controllers/post.controller";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import { userTypeDefs, userResolversExport } from './routes/user.route';
dotenv.config();


const startServer = async () => {
  await connectDB();


  const server = new ApolloServer({
    // typeDefs,
    // resolvers: postResolvers

     typeDefs: userTypeDefs,
    resolvers: userResolversExport,
  });

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};



startServer();








// # MONGODB_URI=mongodb+srv://mututadaniel54:xVpNPQtjTBr7D96S@cluster0.dhacsjr.mongodb.net/myDatabaseName?retryWrites=true&w=majority
// MONGODB_URI=mongodb+srv://mututadaniel54:xVpNPQtjTBr7D96S@cluster0.dhacsjr.mongodb.net/cliquee?retryWrites=true&w=majority //////////////////////

// # MONGO_URI=mongodb+srv://mututadaniel54:FzaYveYQlxmiCEtU@cluster0.j1hrmmg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// PORT=4000  ///////////////////////////
// # xVpNPQtjTBr7D96S
// # mututadaniel54
// # xVpNPQtjTBr7D96S
// # mongodb+srv://mututadaniel54:xVpNPQtjTBr7D96S@cluster0.dhacsjr.mongodb.net/
// # mongodb+srv://mututadaniel54:<db_password>@cluster0.dhacsjr.mongodb.net/

