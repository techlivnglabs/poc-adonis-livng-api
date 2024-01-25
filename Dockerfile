
# Created a variable to hold our node base image
ARG NODE_IMAGE=node:16.13.1-alpine

# Using the variable to create our base image
FROM $NODE_IMAGE AS base

# Running a command to install dumb-init to handle processes
RUN apk --no-cache add dumb-init

# Creating folders and changing ownerships
RUN mkdir -p /home/node/app && chown node:node /home/node/app

# Setting the working directory
WORKDIR /home/node/app

# Changing the current active user to "node"
USER node

# Creating a new folder "tmp"
RUN mkdir tmp

################## Second Stage - Installing dependencies ##########

# In this stage, we will start installing dependencies
FROM base AS dependencies

# We copy all package.* files to the working directory
COPY --chown=node:node ./package*.json ./

# We run NPM CI to install the exact versions of dependencies
RUN npm i

# Lastly, we copy all the files with active user
COPY --chown=node:node . .

################## Third Stage - Building Stage #####################

# In this stage, we will start building dependencies
FROM dependencies AS build

# We run "node ace build" to build the app for production
RUN node ace build --production

COPY ./.env ./build

################## Final Stage - Production #########################

# In this final stage, we will start running the application
FROM base AS production

# Copy package.* to the working directory with active user
COPY --chown=node:node ./package*.json ./

# We run NPM CI to install the exact versions of dependencies
RUN npm i --production

# Copy files to the working directory from the build folder the user
COPY --chown=node:node --from=build /home/node/app/build .

# Expose port
EXPOSE 3333

# Run the command to start the server using "dumb-init"
CMD [ "dumb-init", "node", "server.js" ]
