import { GameProp } from "@/app/states/game";
import { atom } from "recoil";

type LogProp = {
  logs: GameProp[];
};

export const logInfo = atom<LogProp>({
  key: "logInfo",
  default: {
    logs: [],
  },
});
