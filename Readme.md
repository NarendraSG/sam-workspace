# AWS SAM Application Model

Project structure

```markdown
├── .git
├── .github
├── .gitignore
├── .prettierrc.json
├── .docker-compose.yml
├── package.json
├── Readme.md
├── template.yaml
├── tsconfig.json
├── packages
│ ├── AuthService
│ ├── UserService
```

## Run Locally

Goto Project root directory and install the dependencies: `npm i`

- `npm run container:init`
- `npm run build`
- `npm run start:local`

Base URL: `http://localhost:3000/`

APIs already created:

1. **GET** `/users`

2. **POST** `/users`
   Request Body

```
{
    "id": Number,
    "name": String
}
```

3. **GET** `/users/{id}`

4. **DELETE** `/users/{id}`

## Accelerated Development

Accelerated development is to build, package, and deploy changes to development environment as you iterate on your application.

Make sure the dependencies are installed using `npm i` and after that run

```
npm run start:cloud <Stack Name>
```

**Stack Name**: The name by which the apllication can be identified. For example:

`npm run start:cloud sam-app-test`

After the successful setup on AWS, the base url is logged on the terminal. Now we can make changes to lambda functions test the url.

The lambda functions are inside packages folder. Lambda functions working on sam dynamodb table are kept in one project - _UserService_. We can make changes to the lambda functions inside `handlers` folder and hit the corresponding API to see the change.

## Setting CI/CD

Run the command
`sam pipeline init --bootstrap`

Setting Github Actions on SAM Application can be found [here](https://www.youtube.com/watch?v=sQrdfhGsW6w)
