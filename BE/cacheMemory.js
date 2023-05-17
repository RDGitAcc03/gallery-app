const { MemoryCache } = require('cache-list');

const cache = new MemoryCache({
    defaultDuration: 600, // 10 min
});

module.exports  = cache;