# pickle-user

User service for the Pickle Platform

##### To start developing

`docker run --name pickle-user-postgres -p 5432:5432 -e POSTGRES_DB="pickle-user" -d postgres`
to generate a posgres container

`yarn watch` to start a development environment

##### Other commands

`yarn build && yarn start` to build and start

`docker run --name pickle-user-postgres-test -p 5433:5432 -e POSTGRES_DB="pickle-user-test" -d postgres`
to initialize test database

`yarn test` to run the tests with coverage

`yarn watch-test` to watch tests

`yarn typeorm migration:generate -n migrationNameHere` to generate migrations

`yarn typeorm migration:run` to run migrations
