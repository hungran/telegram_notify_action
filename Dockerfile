FROM cgr.dev/chainguard/node:19 as appbuild

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node:node package*.json ./
COPY --chown=node:node src .
RUN npm install
RUN npm run pack

#Final
FROM cgr.dev/chainguard/node:19 as final
WORKDIR /usr/src/app
COPY --from=appbuild /usr/src/app/dist ./dist
COPY --chown=node:node package*.json ./
CMD ["./dist/index"]