# API Adapter

## required Env variables
```
* EMAIL_SMTP - your smtp server
* EMAIL_PORT - your smtp port
* EMAIL_USERNAME - your smtp username
* EMAIL_PASSWORD - your smtp password
```

## commands
```
// To start api adapter core, run: 
npm run start
// To test api adapter core, run:
npm run test
// To run integration tests, run:
npm run integration-test (this is automatically run in Travis CI)
```

## Requirements for integration testing (at the moment)
* RabbitMQ up and running, with guest/guest. (at port 5672)
* MongoDb up and running, see configs to assign your connection string (at /config/development.json)

## DB migrations
* To create a new migration, run: npm run migrate create [name]
* To run migrations up, run: npm run migrate up
* To run migrations down, run: npm run migrate down
