import axios from "axios";
import * as cheerio from "cheerio";

const NBA_BASE_URL = "https://nba.com";

async function scrape_teams() {
  let teamsObj = {};

  let response = await axios.get("https://nba.com/teams");

  try {
    const $ = cheerio.load(response.data);
    const teams = $("div.TeamFigure_tf__jA5HW");

    for (let i = 0; i < teams.length; i++) {
      let teamDivision =
        teams[`${i}`].parent.parent.firstChild.children[0].data;
      let teamSubdirectory = teams.find("div.TeamFigure_tfContent__Vxiyh")[
        `${i}`
      ].children[0].attributes[0].value;
      let teamPageUrl = NBA_BASE_URL + teamSubdirectory;
      let teamImage = teams.find("div.TeamLogo_block__rSWmO")[`${i}`]
        .children[0].attributes[0].value;
      let teamName = teams.find("div.TeamFigure_tfContent__Vxiyh")[`${i}`]
        .firstChild.children[0].data;
      let teamProfileUrl =
        NBA_BASE_URL +
        teams.find("div.TeamFigure_tfContent__Vxiyh")[`${i}`].children[1]
          .children[0].attributes[0].value;

      let players = await scrape_players(teamProfileUrl);

      const teamObj = {
        "team-page-url": teamPageUrl,
        "team-profile-url": teamProfileUrl,
        img: teamImage,
        division: teamDivision,
        players: players,
      };
      teamsObj[teamName] = teamObj;
      return teamsObj;
    }
  } catch (error) {
    console.log("Error");
    console.log(error);
  }
}

async function scrape_players(profile_url) {
  const PLAYER_DATA = {
    PLAYER: 0,
    NUMBER: 1,
    POSITION: 2,
    HEIGHT: 3,
    WEIGHT: 4,
    BIRTHDATE: 5,
    AGE: 6,
    EXPERIENCE: 7,
    SCHOOL: 8,
    HOWAQUIRED: 9,
  };
  Object.freeze(PLAYER_DATA);
  let players = {};

  let response = await axios.get(profile_url);

  try {
    const $ = cheerio.load(response.data);

    const playerTable = $(
      "div.TeamRoster_tableContainer__CUtM0 > table > tbody"
    ).children("tr");

    for (let i = 0; i < playerTable.length; i++) {
      let playerName =
        playerTable[`${i}`].firstChild.firstChild.children[PLAYER_DATA.PLAYER]
          .data;
      let playerLink = 
        NBA_BASE_URL + playerTable[`${i}`].firstChild.firstChild.attribs.href;
      let playerImageLink = await scrape_player_image(playerLink);
      let playerNumber;
      try {
        playerNumber =
          playerTable[`${i}`].children[PLAYER_DATA.NUMBER].children[0].data;
      } catch (error) {
        playerNumber = "";
      }

      let playerPos =
        playerTable[`${i}`].children[PLAYER_DATA.POSITION].children[0].data;
      let playerHeight =
        playerTable[`${i}`].children[PLAYER_DATA.HEIGHT].children[0].data;
      let playerWeight =
        playerTable[`${i}`].children[PLAYER_DATA.WEIGHT].children[0].data;
      let playerBirthDay =
        playerTable[`${i}`].children[PLAYER_DATA.BIRTHDATE].children[0].data;
      let playerAge =
        playerTable[`${i}`].children[PLAYER_DATA.AGE].children[0].data;
      let playerExp =
        playerTable[`${i}`].children[PLAYER_DATA.EXPERIENCE].children[0].data;
      let playerSchool =
        playerTable[`${i}`].children[PLAYER_DATA.SCHOOL].children[0].data;
      let playerAquisition;

      try {
        playerAquisition =
          playerTable[`${i}`].children[PLAYER_DATA.HOWAQUIRED].children[0].data;
      } catch (error) {
        playerAquisition = "";
      }

      players[`${playerName}`] = {
        number: playerNumber,
        position: playerPos,
        height: playerHeight,
        weight: playerWeight,
        birthday: playerBirthDay,
        age: playerAge,
        experience: playerExp,
        school: playerSchool,
        aquisition: playerAquisition,
        link: playerLink,
        playerImageLink: playerImageLink,
      };
    }

    return players;
  } catch (error) {
    console.log("Cheerio failed to load response at players ");
    console.log(error);
  }
}

async function scrape_player_image(player_url){
  let response = await axios.get(player_url);

  try {
    const $ = cheerio.load(response.data);
    let playerImageLink = $("img.PlayerImage_image__wH_YX")[0].attribs.src;

    return playerImageLink;
  } catch (error) {
    console.log("Cheerio failed to load response at player images ");
    console.log(error);
  }
}

export { scrape_teams };
