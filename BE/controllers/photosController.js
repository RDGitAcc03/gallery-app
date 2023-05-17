require("dotenv").config();
const axios = require('axios');
const cache = require("../cacheMemory");

let retryAfter;

// Fetches photos from the Pixabay API based on the category
async function getPhotosFromPixabay(req, res) {
    try {
        const { category } = req.query;
        const api = `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&per_page=50`
        const response = await axios.get(api);
        const photosResponse = response.data.hits;
        let totalNumOfPhotos = response.data.totalHits;
        let allPages = [];

        if (totalNumOfPhotos === 0) {
            res.status(404).send("not photos for category " + category);
        }
        allPages.push(photosResponse);
        const totalReadPages = Math.ceil(totalNumOfPhotos / 50);
        for (let pageNumber = 2; pageNumber <= totalReadPages; pageNumber++) {
            const serverCall = await axios.get(api + `&page=${pageNumber}`);
            allPages.push(serverCall.data.hits);
        }
        allPages = await Promise.all(allPages);
        let allPhotos = allPages.flat().map(p => p);
        totalNumOfPhotos = allPhotos.length;
        cache.set('myPhotos', allPhotos, 3600);
        res.send({ totalNumOfPhotos });
    }
    catch (err) {
        console.log(err);
        if (err.response?.status === 429) { // Too many requests
            retryAfter = parseInt(err.response.headers['retry-after']) || 5; // Default delay of 5 seconds
            console.log(`Too Many Requests. Retrying after ${retryAfter} seconds...`);
            setTimeout(() => getPhotosFromPixabay(req, res), retryAfter * 1000);
        } else {
            console.log(err.message);
            res.status(500).send(err.response?.data);
        }

    }
};

// Retrieves a specific page of photos from the cache
async function getPageFromMemory(req, res) {
    try {
        console.log('req.url: ', req.url);
        const { pageNumber, pageSize } = req.query;
        if (!pageNumber) {
            res.status(404).send("pageNumber is not found...")
        }
        if (!pageSize) {
            res.status(404).send("pageSize is not found...")
        }
        if (!cache.exists('myPhotos')) {
            res.status(404).send("cache is not found...")
        }
        const allPhotos = cache.get("myPhotos");

        if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber < 1 || pageSize < 1) {
            console.log("Invalid pageNumber or pageSize");
            res.status(400).send("Invalid pageNumber or pageSize");
        }
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = Math.min((pageNumber * pageSize), allPhotos.length);
        const paginatedPhotos = allPhotos.slice(startIndex, endIndex);
        res.send({ paginated: paginatedPhotos });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }

}

// Sorts the list of photos in the cache based on the specified sort type
async function sortList(req, res) {
    try {
        if (!cache.exists('myPhotos')) {
            res.status(404).send("no photos in cache..");
        }
        const { sortBy } = req.query;
        if (!sortBy) {
            res.status(404).send("no sortBy parameter..");
        }
        const thePhotos = cache.get("myPhotos");
        
        if (!Array.isArray(thePhotos)) {
            console.log("allPhotos is not found in the cache or is not an array");
            res.status(404).send("allPhotos is not found in the cache or is not an array");
            return;       
        }

        if (typeof thePhotos === "undefined") {
            console.log("thePhotos is not defined");
            res.status(404).send("thePhotos is not defined");
            return;
        }
        
        
        let updatedList = [];
        if (sortBy === 'id') {
            updatedList = thePhotos.sort((a, b) => a.id - b.id);
        } else if (sortBy === 'date') {
            const sortByDate = (a, b) => {
                a = a.previewURL.replace('https://cdn.pixabay.com/photo/', '');
                a = a.slice(0, 16); // Timestamp
                a = a.split("/").join("");
                b = b.previewURL.replace('https://cdn.pixabay.com/photo/', '');
                b = b.slice(0, 16); // Timestamp
                b = b.split("/").join("");
                return a - b;
            }
            updatedList = thePhotos.sort(sortByDate);
        } else {
            res.status(405).send("invalid type of sortBy...");
        }
        cache.set('myPhotos', updatedList, 3600);
        res.send();
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send(err.message); 
    }
}

module.exports = {
    getPhotosFromPixabay,
    getPageFromMemory,
    sortList
};