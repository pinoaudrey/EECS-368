// CREATE SERVER
const {createServer} = require("http");
const methods = Object.create(null);
createServer((request, response) => {
    let handler = methods[request.method] || notAllowed;
    handler(request)
        .catch(error => {
            if (error.status != null) return error;
            return {body: String(error), status: 500};
        })
        .then(({body, status = 200, type = "text/plain"}) => {
            response.writeHead(status, {"Content-Type": type});
            if (body && body.pipe) body.pipe(response);
            else response.end(body);
        });
}).listen(8000);
async function notAllowed(request) {
    return {
        status: 405,
        body: `Method ${request.method} not allowed.`
    };
}

// PARSE URL
var {parse} = require("url");
var {resolve, sep} = require("path");

var baseDirectory = process.cwd();

function urlPath(url) {
    let {pathname} = parse(url);
    let path = resolve(decodeURIComponent(pathname).slice(1));
    if (path != baseDirectory &&
        !path.startsWith(baseDirectory + sep)) {
        throw {status: 403, body: "Forbidden"};
    }
    return path;
}

// Read files using the HTTP GET method.
const {createReadStream} = require("fs");
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
        return {body: (await readdir(path,{withFileTypes:true})).map(entry => {
                if (entry.isFile()){
                    return entry.name
                }else{
                    return entry.name + '/'
                }
            }).join("\n")};
    } else {
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
        from.on("error", reject);
        to.on("error", reject);
        to.on("finish", resolve);
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

