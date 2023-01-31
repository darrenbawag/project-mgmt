const express = require("express")
const colors = require("colors")
const cors = require("cors")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./schema/schema")
const connectDB = require("./config/db")

require("dotenv").config();

connectDB();

const PORT = process.env.PORT || 3000

const app = express()

app.use(cors())

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: process.env.NODE_ENV === "development"
}))

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(PORT, () => { console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold) })