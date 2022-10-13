FROM node:16
WORKDIR /app
COPY package.json .
RUN <%if(isNPM){%>npm<%}else{%>yarn<%}%> install --legacy-peer-deps
COPY . .
EXPOSE 3000
CMD [<%if(isNPM){%>"npm"<%}else{%>"yarn"<%}%>,"start"]
