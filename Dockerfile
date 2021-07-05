FROM registry.nexdev.net:5050/docker/dotnet/core/sdk:5.0.102-ca-patch-buster-slim AS builder
WORKDIR /src
ENV TZ="America/New_York"

COPY ./Sources/NAP.SimpleApi ./NAP.SimpleApi
COPY ./Sources/NAP.SLI.Account ./NAP.SLI.Account
COPY ./Sources/NAP.SLI.Common ./NAP.SLI.Common
COPY ./Sources/NAP.SLI.Customer ./NAP.SLI.Customer
COPY ./Sources/NAP.SLI.Localization ./NAP.SLI.Localization
COPY ./Sources/NAP.SLI.MatchWinLossDetail ./NAP.SLI.MatchWinLossDetail
COPY ./Sources/NAP.SLI.UserManagement ./NAP.SLI.UserManagement
COPY ./Sources/NAP.SLI.WinLossAnalysis ./NAP.SLI.WinLossAnalysis
COPY ./Sources/NAP.SLI.WinLossDetail ./NAP.SLI.WinLossDetail
COPY ./Sources/NAP.UM ./NAP.UM
COPY ./Sources/NAP.SLI.WinLossByBetType ./NAP.SLI.WinLossByBetType
COPY ./Sources/NAP.SLI.Website/NAP.SLI.Website.csproj ./NAP.SLI.Website/NAP.SLI.Website.csproj

WORKDIR /src/NAP.SLI.Website
RUN dotnet nuget add source http://nuget.nexdev.net/api/v2
RUN dotnet restore -v n
RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

COPY ./Sources/NAP.SLI.Website .

RUN dotnet publish -r linux-x64 --self-contained false -o /app 

FROM registry.nexdev.net:5050/docker/dotnet/core/aspnet:5.0-buster-slim AS base

RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /etc/ssl/openssl.cnf
RUN sed -i 's/MinProtocol = TLSv1.2/MinProtocol = TLSv1/g' /etc/ssl/openssl.cnf
RUN sed -i 's/DEFAULT@SECLEVEL=2/DEFAULT@SECLEVEL=1/g' /usr/lib/ssl/openssl.cnf
RUN sed -i 's/MinProtocol = TLSv1.2/MinProtocol = TLSv1/g' /usr/lib/ssl/openssl.cnf

WORKDIR /app
COPY --from=builder /app .

ENTRYPOINT ["dotnet", "NAP.SLI.Website.dll"]
