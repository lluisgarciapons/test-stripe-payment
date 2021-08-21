const express = require("express");
const app = express();
const cors = require("cors");

const { errorHandler } = require("./middleware");
const stripeRouter = require("./api/stripeRouter");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/stripe", stripeRouter);

app.use('*', (req, res) => {
    res.sendStatus(404);
});
app.use(errorHandler);


app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); });