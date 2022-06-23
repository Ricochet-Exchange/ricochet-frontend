<div align="center">
    <img src="public/icons/icon.svg" height="70" alt="Ricochet Logo">
    <h1>Ricochet frontend</h1>
    <strong>This is a ricochet app frontend, made in react, using redux and redux-saga</strong>
</div>
<br>
<div align="center">
    <img src="https://img.shields.io/github/commit-activity/w/Ricochet-Exchange/ricochet-frontend" alt="GitHub commit activity">
    <a href="https://github.com/Ricochet-Exchange/ricochet-frontend/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22">
        <img src="https://img.shields.io/github/issues/Ricochet-Exchange/ricochet-frontend/help wanted" alt="GitHub issues help wanted">
    </a>
    <a href="https://discord.gg/egu4FZbPBM">
        <img src="https://img.shields.io/discord/862796510604296263.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2" alt="Discord">
    </a>
    <a href="https://twitter.com/ricochetxchange">
        <img src="https://img.shields.io/twitter/follow/ricochetxchange?label=ricochetxchange&style=flat&logo=twitter&color=1DA1F2" alt="Twitter">
    </a>
</div>
<div align="center">
    <br>
    <a href="https://ricochet.exchange"><b>ricochet.exchange » </b></a>
    <br><br>
    <a href="https://docs.ricochet.exchange/"><b>Documentation</b></a>
    •
    <a href="https://github.com/Ricochet-Exchange/ricochet-frontend/issues/new"><b>Feature request</b></a>
</div>

### How to start

bash:

```bash
# creates a local development making sure that you are using the correct node version
./make.sh dev

# run tests (by calling yarn script directly)
./make.sh test
```

docker:

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

### Project structure

- `components` - contains react components. They can't have own state and business logic. Should be developed in storybook.
- `containers` - containers use components, adding business logic for them.
- `store` - all data and global business logic placed here. Separate folder for each reducer.
- `utils` - common functions for project.
- `hooks` - common business logic, that can be reused between containers.

### Configuring project

See `.env` file for configuration:

```dotenv
REACT_APP_API_GRATH=https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-matic
REACT_APP_CHAIN_ID=137
```
### Test before merge to main

- `fork the project` - fork the ricochet-frontend repo.

- `create a branch` - please avoid using special characters in your branch name:
  https://docs.github.com/en/get-started/using-git/dealing-with-special-characters-in-branch-and-tag-names

- `create a PR` - create a pull request on GitHub.

- `test your changes` - Check github actions, once all checks are successful, a new environment will be created in a few minutes, please check comments to get the complete url. It will look something like this:
  `a380c3be5e6284f4ca1dfc37a12b3033-851332533.eu-west-1.elb.amazonaws.com/your-branch-name`
  the environment will be destroyed once the PR is merged or 
  
