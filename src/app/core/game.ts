import { TeamProp } from "@/app/components/SetupWizard/Player";
import { GameProp } from "@/app/states/game";

export class Game {
  info: GameProp;

  constructor(info: GameProp) {
    this.info = info;
  }

  setPlayerName(
    teamIndex: number,
    playerIndex: number,
    value: string
  ): GameProp {
    this.convertToEditableObject();
    this.info.teams[teamIndex].players[playerIndex].name = value;
    return this.info;
  }

  setServeTeam(teamId: number): GameProp {
    this.convertToEditableObject();
    const { teams } = this.info;

    this.resetServePlayer(teams);

    if (teamId === 0) {
      teams[0].players[1].toServe = true;
      teams[1].players[0].toReceive = true;
    } else {
      teams[1].players[0].toServe = true;
      teams[0].players[1].toReceive = true;
    }

    this.info.servingTeam = teamId;

    return this.info;
  }

  swapPosition(teamId: number): GameProp {
    this.convertToEditableObject();

    const { teams, servingTeam, isSetupComplete } = this.info;

    if (!isSetupComplete) {
      const [playerA, playerB] = teams[teamId].players;
      teams[teamId].players = [playerB, playerA];
    } else {
      if (servingTeam === teamId) {
        const [playerA, playerB] = teams[teamId].players;
        teams[teamId].players = [playerB, playerA];
      } else {
        this.info.servingTeam = teamId;
      }
    }

    return this.info;
  }

  setScore(teamId: number): GameProp {
    this.convertToEditableObject();

    this.info.teams[teamId].score += 1;

    return this.info;
  }

  setServePlayer(teamId: number): GameProp {
    this.convertToEditableObject();

    const { teams, servingTeam } = this.info;

    this.resetServePlayer(teams);

    const score = this.info.teams[teamId].score;

    if (this.info.servingTeam === 0) {
      this.info.teams[0].players[(score - 1) % 2].toServe = true;
      this.info.teams[1].players[score % 2].toReceive = true;
    } else {
      this.info.teams[0].players[(score - 1) % 2].toReceive = true;
      this.info.teams[1].players[score % 2].toServe = true;
    }

    return this.info;
  }

  setMessage(teamId: number): GameProp {
    this.convertToEditableObject();

    const { teams, servingTeam } = this.info;
    const isAll = teams[0].score === teams[1].score;
    const isLove =
      teams[0].score.toString().endsWith("0") &&
      teams[1].score.toString().endsWith("0");

    this.info.isServiceOver = teamId !== servingTeam;

    if (teamId === 0) {
      this.info.message = `${teams[0].score} - ${teams[1].score}`;
    } else {
      this.info.message = `${teams[1].score} - ${teams[0].score}`;
    }
    this.info.message = this.info.message.concat(
      "\n" +
        (isLove
          ? teams[0].score + " Love All"
          : isAll
          ? teams[0].score + " All"
          : "")
    );

    return this.info;
  }

  extendScore(): GameProp {
    this.convertToEditableObject();

    const { teams, gamePoint } = this.info;

    if (
      teams[0].score + teams[1].score >= 40 &&
      teams[0].score === teams[1].score &&
      gamePoint <= 30
    ) {
      this.info.gamePoint = teams[0].score + 2 <= 30 ? teams[0].score + 2 : 30;
    }

    return this.info;
  }

  isGameEnd(): GameProp {
    this.convertToEditableObject();

    const { teams, gamePoint } = this.info;

    for (const team of teams) {
      if (team.score >= gamePoint) {
        this.info.isEnd = true;
      }
    }

    return this.info;
  }

  private convertToEditableObject() {
    this.info = this.info && JSON.parse(JSON.stringify(this.info));
  }

  private resetServePlayer(teams: TeamProp[]) {
    for (const team of this.info.teams) {
      for (const player of team.players) {
        player.toServe = false;
        player.toReceive = false;
      }
    }
  }
}
