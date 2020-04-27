## <a name='TOC'>Summary</a>

- [Overview](#overview)
- [Credits](#credits)
- [LocalSetup](#localSetup)

## <a name='overview'>Overview</a>

Backend of Eas Eat.

## <a name='credits'>Credits</a>
 - Antoine Nivoy
 - Adrien Masson
 - Maxime Gouénard
 - Dylan De Sousa

## <a name='localSetup'>Local Setup</a>

- `yarn install`  
- Fill in the file **.env.sample** :
```conf
   JWT_SECRET=
   MJ_APIKEY_PUBLIC=
   MJ_APIKEY_PRIVATE=
   PORT=
```
- Create **.env** file in the directory prisma for :
```conf
    DATABASE_URL=
```
- `yarn db:migrate`
- `yarn db:seeds`
- `yarn generate`
- `yarn dev`
- If you want to run the tests : `yarn test`

## <a name='requests'>Requests</a>

### API Endpoints

```graphql
type Query {
  getUserById(id: String!): User!
}

type Mutation {
  login(email: String!, password: String!): String!
  register(email: String!, password: String!, name: String!): User!
  deleteUser(id: String!): User!
  updateUser(id: String!, name: String, email: String): User!
  addFood(foodId: String!, userId: String!): Boolean!
  removeFood(userId: String!, foodId: String!): Boolean!
  cleanInventory(userId: String!): Boolean!
}
```
