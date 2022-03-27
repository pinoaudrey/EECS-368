// CREATE SERVER
const {createServer} = require("http");
const methods = Object.create(null); // object methods stores the functions that handle the various HTTP methods
createServer((request, response) => {
    // the methods[request.method] array will invoke the asynchronous method to handle the request
    let handler = methods[request.method] || invalidRequest;
    handler(request)
        .catch(error => { // translates the error into a response object
            if (error.status != null) return error;
            return {body: String(error), status: 500}; // adds status code if the thrown error doesn't have one
        })
        .then(({body, status = 200, type = "text/plain"}) => {
            response.writeHead(status, {"Content-Type": type});
            if (body && body.pipe) body.pipe(response);
            else response.end(body);
        });
}).listen(8000);

async function invalidRequest(request) { // returns error response that request was unable to be handled
    return {
        status: 405, // status code for invalid request
        body: `The Method ${request.method} is not supported.` // returns the invalid method requested
    };
}

// PARSE URL
var {parse} = require("url");
var {resolve, sep} = require("path"); // sep - system’s path separator
var baseDirectory = process.cwd(); // finds current working directory

function urlPath(url) {
    let {pathname} = parse(url); // parse url withing Node’s  url module
    let path = resolve(decodeURIComponent(pathname).slice(1));
    // The below conditional checks if someone has tried to traverse upwards in the file tree
    if (path != baseDirectory &&
        !path.startsWith(baseDirectory + sep)) {
        throw {status: 403, body: "Forbidden"};
    }
    return path;
}

// Read files using the HTTP GET method.
const {createReadStream} = require("fs");
// Loaded from fs-promises because we're writing an async function
const {stat, readdir} = require("fs").promises;
const mime = require("mime");

methods.GET = async function(request) {
    let path = urlPath(request.url); // translate the url into a file name
    let stats; // invoke stat object called stats
    try { // wait for stat to find the file
        stats = await stat(path);
    } catch (error) { // handle a non-existent file name
        if (error.code != "ENOENT") throw error;
        else return {status: 404, body: "File not found"};
    }
    if (stats.isDirectory()) {
        // if it is a directory
        // read the array of files in a directory
        return {body: (await readdir(path,{withFileTypes:true})).map(entry => {
                if (entry.isFile()){
                    return entry.name
                }else{
                    return entry.name + '/'
                }
            }).join("\n")};
    } else {
        // if not a directory & is a normal files
        // create readable stream with createReadStream and
        // return that as the body
        return {body: createReadStream(path),
            type: mime.getType(path)};
    }
};
// Delete files using the HTTP DELETE method
const {rmdir, unlink} = require("fs").promises;

methods.DELETE = async function(request) {
    let path = urlPath(request.url); // translate the url into a file name
    let stats; // invoke stat object called stats
    try { // wait for stat to find the file
        stats = await stat(path);
    } catch (error) { // handle a non-existent file name
        if (error.code != "ENOENT") throw error;
        else return {status: 204};
    }
    if (stats.isDirectory()) await rmdir(path); // if the file name is a directory, remove it
    else await unlink(path); // if the file name is not a directory, remove it
    return {status: 204}; // report that the file deletion was successful
};

// Write files using the HTTP PUT method.
const {createWriteStream} = require("fs");

function pipeStream(from, to) {
    return new Promise((resolve, reject) => {
        from.on("error", reject); // returns stream but fires error event
        to.on("error", reject); // both streams fire error events & reject promise
        to.on("finish", resolve); // close output stream & fire finish event
        from.pipe(to);
    });
}

methods.PUT = async function(request) {
    let path = urlPath(request.url); // translate the url into a file name
    await pipeStream(request, createWriteStream(path));
    return {status: 204};
};

// Create directory using the HTTP MKCOL method
const {mkdir} = require("fs").promises;

methods.MKCOL = async function(request) {
    let path = urlPath(request.url); // translate the url into a file name
    let stats; // invoke stat object called stats
    try { // wait for stat to find the file
        stats = await stat(path);
    } catch (error) { // handle a non-existent file name
        if (error.code != "ENOENT") throw error;
        await mkdir(path); // if the file name is a directory, add it
        return {status: 204}; //
    }
    if (stats.isDirectory()) return {status: 204}; // report that the file insertion was successful
    else return {status: 400, body: "Not a directory"};
};