.SILENT:

help:
	{ grep --extended-regexp '^[a-zA-Z_-]+:.*#[[:space:]].*$$' $(MAKEFILE_LIST) || true; } \
	| awk 'BEGIN { FS = ":.*#[[:space:]]*" } { printf "\033[1;32m%-22s\033[0m%s\n", $$1, $$2 }'

setup: # install eksctl + kubectl + yq, create aws user + ecr repository
	./make.sh setup

dev: # creates a local development making sure that you are using the correct node version using nvm (by calling yarn script directly)
	./make.sh dev

test: # run tests (by calling yarn script directly)
	./make.sh test
	
build: # build the production image
	./make.sh build

run: # run the built production image on localhost
	./make.sh run

rm: # remove the running container
	./make.sh rm
