import { scrape_teams } from './scraper.mjs';
import { JSONtoFile } from './storage.mjs';

const JSON_FILE_NAME = "league";
const leagueData = await scrape_teams();

JSONtoFile(leagueData, JSON_FILE_NAME);

