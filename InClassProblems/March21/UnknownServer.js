methods.UNKNOWN = async function(request) {
    // the urlPath function uses Node’s built-in url module to parse the URL.
    // Taking in the path-name, decoding it to remove %20-style escape codes,
    // and resolving it relative to the program’s working directory.
    let path = urlPath(request.url);
    // creates stat object named stat that will return the files size (size property) and modification date (mtime property)
    let stats;
    try {
        // wait for the stats object to find the file
        stats = await stat(path);
    }
    catch (error) {
        // if the file does not exist, stat will throw an error object with a code property of "ENOENT".
        if (error.code != "ENOENT") throw error;
        // If the file does exist, the status code 204 is returned signaling the try/catch block has succeeded
        else return {status: 204};
    }
    // if the returned stats object is a directory, await signals the function
    // must wait until a promise is resolved to continue to execute the function
    // then the directory is removed
    if (stats.isDirectory()) await rmdir(path);
    // if the returned stats object is not a directory, await signals the function
    // must wait until a promise is resolved to continue to execute the function
    // then the remove it
    else await unlink(path);
    // the status code 204 is returned signaling the request has succeeded - deleted
    return {status: 204};
};



