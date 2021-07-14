# Socket.io chat service (chat-service)

sample chat service

### Install the dependencies
```bash
npm install
```

### Configure database
look for the file in src/infrastructure/app.ts.
Change db settings in database.development object

### Start the app in development mode
```bash
npm run dev
```

### how to run redis in docker
If you want, you can use the provided runredis.bat file to easily spin up a redis db.

### project structure

- ***[core]*** In the case ***If*** we would have a complex business logic, we could separate it to it's own layer. It's kinda useless for this simple use-case 
- ***[infrastructure]*** Database related suff, implements repository interfaces.
- ***[application]*** Contains application services which implement the logic, and aggregates different kinds of modules together.
- ***[transport]*** The transport layer. Responsible for dealing with real time socket.io events.
