# volto-eea-slate-glossary

[![Releases](https://img.shields.io/github/v/release/eea/volto-eea-slate-glossary)](https://github.com/eea/volto-eea-slate-glossary/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-eea-slate-glossary%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-eea-slate-glossary/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-slate-glossary-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-slate-glossary-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-slate-glossary-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-slate-glossary-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-slate-glossary-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-slate-glossary-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-slate-glossary-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-slate-glossary-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-eea-slate-glossary%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-eea-slate-glossary/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-slate-glossary-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-slate-glossary-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-slate-glossary-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-slate-glossary-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-slate-glossary-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-slate-glossary-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-slate-glossary-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-slate-glossary-develop)


[Volto](https://github.com/plone/volto) add-on

## Features

![](https://github.com/eea/volto-eea-slate-glossary/blob/develop/demo/Demo.gif)

## Getting started

### Try volto-eea-slate-glossary with Docker

      git clone https://github.com/eea/volto-eea-slate-glossary.git
      cd volto-eea-slate-glossary
      make
      make start

Go to http://localhost:3000

### Add volto-eea-slate-glossary to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-eea-slate-glossary"
   ],

   "dependencies": {
       "@eeacms/volto-eea-slate-glossary": "*"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --canary --addon @eeacms/volto-eea-slate-glossary
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-eea-slate-glossary/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-eea-slate-glossary/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-eea-slate-glossary/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)


## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
