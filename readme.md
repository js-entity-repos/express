# express
> A concrete implementation of js-entity-repos for express.

### Usage
1. Install it with `npm i @js-entity-repos/express`.
1. For each entity you will need to do the following.
    1. [Create an Entity interface](#entity-interface).
    1. [Construct the facade](#construct-the-facade).
    1. [Use the facade](https://github.com/js-entity-repos/core/blob/master/docs/facade.md).

Note that you'll probably want to use this with [the Axios implementation of js-entity-repos](https://github.com/js-entity-repos/axios).

### Entity Interface

```ts
import Entity from '@js-entity-repos/core/dist/types/Entity';

export interface TodoEntity extends Entity {
  readonly description: string;
  readonly completed: boolean;
}
```

### Construct the Facade

```ts
import factory from '@js-entity-repos/express/dist/factory';

const todosFacade = factory<TodoEntity>({
  // Optional property that determines the default pagination limit.
  defaultPaginationLimit: 10,
  // Optional property that catches errors from handlers.
  errorCatcher: (handler) => (req, res) => {
    handler(req, res).catch((err) => {
      res.status(500).send();
    });
  },
  service,
});
```
