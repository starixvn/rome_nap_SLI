## References:
Nuget package location: %userprofile%\.nuget\packages

## Docker:

### Build docker image:
```
Select Terminal -> Run Task ->
Choose docker-build: release => create release image: sli:latest
Choose docker-build: debug => create debug image: sli:dev
```

### Run image:
```console
docker run --rm -it -p 8000:80 -e ASPNETCORE_URLS=http://*:80 sli:latest
```
-> browse URL: http://localhost:8000/

### How to use HTTPS: https://github.com/dotnet/dotnet-docker/blob/master/samples/host-aspnetcore-https.md
Generate certificate:
```console
dotnet dev-certs https -ep %USERPROFILE%\.aspnet\https\aspnetapp.pfx -p crypticpassword
dotnet dev-certs https --trust
```
Run the container image with ASP.NET Core configured for HTTPS:
```console
docker run --rm -it -p 8000:80 -p 8001:443 -e ASPNETCORE_URLS="https://+;http://+" -e ASPNETCORE_HTTPS_PORT=8001 -e ASPNETCORE_Kestrel__Certificates__Default__Password="crypticpassword" -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx -v %USERPROFILE%\.aspnet\https:/https/ sli:latest
```

### Debug image:
```console
dotnet NAP.SLI.Website.dll
```

### Coverage:
dotnet test --collect:"XPlat Code Coverage"
reportgenerator -reports:"**\coverage.cobertura.xml" -targetdir:"coveragereport" -reporttypes:Html