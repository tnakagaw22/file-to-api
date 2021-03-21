import dev from "./dev";

let config = dev;

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./prod');
} else if (process.env.NODE_ENV === "test") {
    module.exports = require('./dev');
}

export default config;
