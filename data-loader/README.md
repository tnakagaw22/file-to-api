
## Docker

###Build image
`docker build -t file-to-api/data-loader .`

### Run  
`docker run --name data-loader file-to-api/data-loader`

### Connection error
If you see the following error, check IP address by `docker inspect <dockerContainerId> | grep IPAddress`
> Unable to connect to server:<br>
Connection refused
Is the server running on host "localhost" (127.0.0.1) and accepting
TCP/IP connections on port 5432?
