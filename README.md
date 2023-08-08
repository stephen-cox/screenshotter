# Screenshotter

Take screenshots of websites from a list sites.

## Installation

* Install NVM <https://github.com/nvm-sh/nvm#installing-and-updating>
* Checkout this code and change into the directory
* Install Node 18
* Install Node packages

```shell
# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
# Checkout code
git checkout git@github.com:stephen-cox/effective-octo-waddle.git
cd effective-octo-waddle
# Install node and packages
nvm install
npm install
```

## Run the script

* Ensure you're running the correct version of node
* Run the script

```shell
nvm use
node screenshotter.js
```

## Configuration

The list of sites is [sites.txt](https://github.com/stephen-cox/effective-octo-waddle/blob/main/sites.txt). There should be one site per line in the file.

Bt default, screenshots are saved in the screenshots directory.

The configuration is hardcoded into the [screenshotter.js](https://github.com/stephen-cox/effective-octo-waddle/blob/main/screenshotter.js#L9-L13) file.

You can change the width, height, screenshot directory and file with list of sites.

## Updating

* Pull changes
* Update Node
* Update Node packages

```shell
git pull
nvm install
npm install
```
