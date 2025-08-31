# NBA Scraper

![License](https://img.shields.io/badge/license-MIT-blue)

## Description

A hobby webscraper for the NBA website. Grabs team data including the players on each team.

Created to import league data into a JSON file to be used in later projects.

Includes team page links, team profiles, team image links, player profiles, and player image links.

## Table of Contents

- [Installiation](#installation)
- [Usage](#usage)
- [License](#license)
- [Change Log](#changes)

## Installation

1. Clone the repo


```
git clone git@github.com:TrisstonIcenhower/nba_scraper.git
```

2. Install dependencies

```
npm install
```

3. Change to project directory

```
cd [link-to-directory]
```

## Usage

1. Run the program

```
node index.js
```

## License

Distributed under the MIT License.

## Changes

### 1.1.0
The issue with the slow processing came down to a few things. One thing was that the JSONtoFile function was being called for each team, so it would write and overwrite 30 times. Then, the async calls in scrape_players was executed one by one. Now it maps the call onto each row. This sped up the overall execution.

#### Note
The call is intentionally throttled as to avoid being blocked. I had issues with 403 errors from running without any timeouts.

I just tested it fine twice in a row, and I was blocked on a third attempt. I would suggest not running this more than one or two times a day and spread it out a bit.

### 1.0.0
The project should work out of the box with no issues. It is quite slow at the moment, so if it hangs for several seconds do not worry. If for some reason it doesn't work for you, please raise an issue.