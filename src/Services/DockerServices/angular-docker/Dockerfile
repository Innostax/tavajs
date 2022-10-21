# syntax=docker/dockerfile:1.4

FROM --platform=$BUILDPLATFORM node:17.0.1-bullseye-slim as builder

RUN mkdir /project
WORKDIR /project

RUN <%if(isNPM){%>npm install -g<%}else{%>yarn global add<%}%> @angular/cli@13

COPY package.json<%if(isNPM){%> package-lock.json <%}else{%> yarn.lock<%}%> ./
RUN <%if(isNPM){%>npm ci<%}else{%>yarn run ci<%}%>

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0"]

FROM builder as dev-envs

RUN <<EOF
apt-get update
apt-get install -y --no-install-recommends git
EOF

RUN <<EOF
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD ["ng", "serve", "--host", "0.0.0.0"]
