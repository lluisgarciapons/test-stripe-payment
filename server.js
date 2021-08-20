const express = require("express");
const app = express();
const cors = require("cors");

const stripeRouter = require("./api/stripeRouter");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/stripe", stripeRouter);


app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });