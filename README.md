# Shadow Build Example

An example repository showcasing the concept of shadow builds.

This app is a simple HTTP server with two endpoints:

- `GET /` - Say hello world!
- `GET /luke` - Returns information about Luke Skywalker from the [Star Wars API](https://swapi.dev)

## Regular Build

The main `ci.yml` file is fairly typical.
It installs dependencies, runs tests, and builds a production bundle if such a thing exists.

## Shadow Jobs

A [shadow job](https://slack.engineering/shadow-jobs/) is an additional workflow, or an additional job in an existing workflow, that isn't a part of the critical path to deployment.
When this build fails, it doesn't block merges or deployments.
Rather, it serves as a leading indicator of stability, and hopefully makes incompatibilities known via automated tests before there's a problem.   

It can verify compatibility with a new version of an existing dependency, or serve as the test bed for an upgraded build or runtime environment. 

The intention is exactly the opposite of a "reproducible build".
Rather than peg the build/test environment to known stable versions, we purposefully inherit new and unstable things.
Much like canary deployments, these builds shift the risk and uncertainty of upgrades left, letting projects upgrade more often, and with less risk.  

Scheduling depends on what's being tested.
Maybe once a week is enough, maybe every time `main` is built.

Run once a day at 8AM:
```yaml
on:
  schedule:
    - cron: '0 8 * * *'
```

### Node@latest

This project is a webserver, so only one version of node is ever relevant at any given time.
The idea of supporting multiple historical node versions in a `matrix`-style build is a concept often reserved for importable libraries, but the methods to test compatibility with different node versions are the same.

Constantly verifying the `latest` available build/runtime is advantageous, because it surfaces incompatibilities with newly deprecated methods. 

Use the `latest` keyword in `setup-node` to always install the newest version.
Beta or nightly builds can be called upon as well.

```yaml
with:
  node-version: latest
```

### Dependency Upgrades

This pattern helps answer the question "is it safe to upgrade?"

This shadow build runs alongside other PR checks.
It installs the latest versions of project dependencies, then runs the tests.
If the tests are sufficiently thorough, they should catch problems with upgrading.
This makes regular dependency upgrades less painful, and increases the likelihood of inheriting security fixes quicker. 

In this example, a library [npm-check-updates](https://www.npmjs.com/package/npm-check-updates) is used to upgrade them all at once, but for a larger project, a major dependency like `react` might warrant its own shadow build. 

```yaml
# Modify package.json with the latest dependencies
- run: npx npm-check-updates -u
# Install the newly upgraded dependencies
- run: npm install
```

## Development Server

```shell
npm run dev
```

## Testing

Run tests with 

```shell
npm test
```
