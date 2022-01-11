### Ricochet frontend

This is a ricochet app frontend, made in react, using redux and redux-saga.

#### How to start

```bash
# creates a local development making sure that you are using the correct node version
./make.sh dev

# run tests (by calling yarn script directly)
./make.sh test

```

```docker

# build a dev docker image locally
./make.sh build

# run the docker image on localhost
./make.sh run

# remove the running container
./make.sh rm 

# run a specific image using code in PR

docker run -p 3000:3000 testricochet/ricochet-frontend:branch-name

```
#### Project structure

- `components` - contains react components. They can't have own state and business logic. Should be developed in storybook.
- `containers` - containers use components, adding business logic for them
- `store` - all data and global business logic placed here. Separate folder for each reducer
- `utils` - common functions for project
- `hooks` - common business logic, that can be reused between containers.

#### Configuring project

See `.env` file for configuration:

```dotenv
REACT_APP_API_GRATH=https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-matic
REACT_APP_CHAIN_ID=137
```
