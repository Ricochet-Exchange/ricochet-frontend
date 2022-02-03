### Ricochet frontend

This is a ricochet app frontend, made in react, using redux and redux-saga

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

# run the latest docker image 
docker run -p 3000:3000 testricochet/ricochet-frontend:latest

```
```create a pr environment for qa

# from your fork create a branch and include your changes into it,
# if you don't use forks you can simply create a branch from main on official ricochet-frontend repo
git checkout -b your-branch-name

# create a pull request on github

# please avoid using special characters in your branch name: 
https://docs.github.com/en/get-started/using-git/dealing-with-special-characters-in-branch-and-tag-names

# once the github actions workflow will be finished your environment will be available in a few minutes on this url
a380c3be5e6284f4ca1dfc37a12b3033-851332533.eu-west-1.elb.amazonaws.com/your-branch-name


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
