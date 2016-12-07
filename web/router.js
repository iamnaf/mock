function route(pathname,query,method,response,handle){
    if(typeof(handle[pathname])==="function"){
        handle[pathname](query,method,response);
    }
    else{
        response.writeHead(404,{"Content-Type":"text/plain"});
        response.write("404 Not found");
        response.end();
    }

}

module.exports = route;

