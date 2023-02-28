# Shadow Build Example

An example repository showcasing the concept of shadow builds.

This app is a simple HTTP server with two endpoints:

- `GET /` - Say hello world!
- `GET /luke` - Returns information about Luke Skywalker from the [Star Wars API](https://swapi.dev)

## Regular Build

The main `ci.yml` file is fairly typical.
It installs dependencies, runs tests, and builds a production bundle if such a thing exists.

## Shadow Build

The shadow build is an additional workflow, or an additional job in an existing workflow, that isn't a part of the critical path to deployment.
When this build fails, it doesn't block merges or deployments.
Rather, it serves as a leading indicator of stability, and hopefully makes incompatibilities known via automated tests before there's a problem.   

It can verify compatibility with a new version of an existing dependency, or serve as the test bed for an upgraded build or runtime environment. 

### Example

There are two examples of this in this project

#### Node 18 support

This project is a webserver, so only one version of node is ever relevant at any given time.
The idea of supporting multiple historical node versions in a `matrix`-style build is a concept often reserved for importable libraries, but the methods to test compatibility with different node versions are the same.

Constantly verifying the `latest` available build/runtime is advantageous, because it surfaces incompatibilities with newly deprecated methods. 

#### Dependency Upgrades

This pattern helps answer the question "is it safe to upgrade?"

This shadow build runs alongside other PR checks.
It installs the latest versions of project dependencies, then runs the tests.
If the tests are sufficiently thorough, they should catch problems with upgrading.
This makes regular dependency upgrades less painful, and increases the likelihood of inheriting security fixes quicker. 

In this example, a library [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) is used to upgrade them all at once, but for a larger project, a major dependency like `react` might warrant its own shadow build. 

## Development Server

```shell
npm run dev
```

## Testing

Run tests with 

```shell
npm test
```
