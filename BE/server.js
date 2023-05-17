const photosRoute = require('./routes/photosRoute');
require("dotenv").config({ path: "./.env" });
const express = require('express');
const port = process.env.PORT || 8080;
const cors = require('cors');
const app = express();

app.use(express.json());

const getServerUrl = () => {
    if (process.env.NODE_ENV === 'production') return 'https://galleryapp-67bo.onrender.com'
    return "http://localhost:3000";
}
  
app.use(cors({ origin: getServerUrl() }));
app.use('/photos', photosRoute);



app.use((req, res) => {
    res.status(404).send("404: Not Found");
});

app.listen(port, () => {
    console.log("Listening on port ", port);
})
