For configuration copy the .env.example file to .env and update the values as needed.

To run the application localy in development mode, execute the following command:

### npm

```bash
(On first run or after changes) npm install

npm run start:dev
```

### yarn

```bash
(On first run or after changes) yarn install

yarn start:dev
```

To run the application in production mode, execute the following command:

### npm

```bash
(On first run or after changes) npm install

npm run build

npm run start
```

### yarn

```bash

(On first run or after changes) yarn install
yarn build

yarn start
```

Libraries used:

- [Axios](https://axios-http.com/docs/intro)
- [moment](https://momentjs.com/)
- [NestJS](https://nestjs.com/)
- [Nestjs Chache Manager](https://docs.nestjs.com/techniques/caching)
- [Open-Meteo](https://open-meteo.com/)
- [Node.js](https://nodejs.org/)
- [winston](https://github.com/winstonjs/winston)
- [zod](https://zod.dev/)
