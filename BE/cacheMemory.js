const { MemoryCache } = require('cache-list');

const cache = new MemoryCache({
    defaultDuration: 3600, // 10 min
});

module.exports  = cache;