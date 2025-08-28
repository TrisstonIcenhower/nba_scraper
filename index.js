import { scrape_teams } from './scraper.mjs';
import { JSONtoFile } from './storage.mjs';

const NBA_TEAM_JSON_FILE = "league";
const leagueData = await scrape_teams();

JSONtoFile(leagueData, NBA_TEAM_JSON_FILE);

