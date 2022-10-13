FROM node:16
WORKDIR /app
COPY package.json .
RUN <%if(isNPM){%>npm<%}else{%>yarn<%}%> install --legacy-peer-deps
COPY . .
EXPOSE 8080
CMD [<%if(isNPM){%>"npm"<%}else{%>"yarn"<%}%>,"run","serve"]
