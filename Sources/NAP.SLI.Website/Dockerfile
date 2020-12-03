FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs
WORKDIR /src
COPY . .
WORKDIR "/src/Sources/NAP.SLI.Website"
RUN dotnet build "NAP.SLI.Website.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NAP.SLI.Website.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

EXPOSE 80
ENV ASPNETCORE_URLS http://*:80

ENTRYPOINT ["dotnet", "NAP.SLI.Website.dll"]
