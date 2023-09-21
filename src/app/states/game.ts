import { TeamProp } from "@/app/components/SetupWizard/Player";
import { atom } from "recoil";

export type GameProp = {
  mode: number;
  message: string;
  gamePoint: number;
  isServiceOver: boolean;
  isEnd: boolean;
  teams: TeamProp[];
  servingTeam: number;
  isSetupComplete: boolean;
};

export const defaultValue = {
  mode: -1,
  message: "",
  gamePoint: 21,
  isServiceOver: false,
  isEnd: false,
  teams: [
    {
      id: 1,
      name: "Team A",
      score: 0,
      players: [],
    },
    {
      id: 2,
      name: "Team B",
      score: 0,
      players: [],
    },
  ],
  servingTeam: -1,
  isSetupComplete: false,
};

export const gameInfo = atom<GameProp>({
  key: "gameInfo",
  default: defaultValue,
});
