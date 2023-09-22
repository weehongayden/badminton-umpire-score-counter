import { ModeProp } from "@/app/components/SetupWizard/Form";
import { Game } from "@/app/core/game";
import { gameInfo } from "@/app/states/game";
import { classNames } from "@/app/utils";
import { isEmpty, kebabCase, map, some } from "lodash";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export type TeamProp = {
  id: number;
  name: string;
  score: number;
  players: PlayerProp[];
};

export type PlayerProp = {
  name: string;
  toServe: boolean;
  toReceive: boolean;
  [key: string]: any;
};

export function Player({ onNext }: ModeProp) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [numberOfPlayers, setNumberOfPlayer] = useState(1);
  const [info, setInfo] = useRecoilState(gameInfo);
  const game = new Game(info);

  const checkIsAllFilled = () => {
    return some(info.teams, (team: TeamProp) =>
      some(team.players, (player: PlayerProp) => isEmpty(player.name))
    );
  };

  useEffect(() => {
    if ([1, 2, 3].includes(info.mode)) {
      setNumberOfPlayer(2);
    }
  }, [info.mode]);

  useEffect(() => {
    setIsDisabled(checkIsAllFilled);
  }, [info.teams]);

  return (
    <div>
      <h2 className="font-semibold text-center text-xl mb-5">Player Details</h2>
      {map(info.teams, (team: TeamProp, teamIndex: number) => (
        <div key={`${team.name}-${teamIndex}`}>
          <label className="block my-5 text-lg text-center font-medium leading-6 text-gray-900">
            {team.name}
          </label>
          <div className="isolate -space-y-px rounded-md shadow-sm">
            {team.players.map((_, playerIndex) => (
              <div
                key={`name-${kebabCase(team.name) + playerIndex}`}
                className={`${classNames(
                  playerIndex === 0 ? "rounded-b-none" : "rounded-t-none",
                  "relative rounded-md px-3 pb-1.5 pt-2.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-indigo-600"
                )}`}
              >
                <label
                  htmlFor={`name-${kebabCase(team.name) + playerIndex}`}
                  className="block text-xs font-medium text-gray-900"
                >
                  Player Name - {playerIndex ? "Even" : "Odd"}
                </label>
                <input
                  type="text"
                  name="name"
                  id={`name-${kebabCase(team.name) + playerIndex}`}
                  className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Jane Smith"
                  onChange={(e) => {
                    setInfo(
                      game.setPlayerName(teamIndex, playerIndex, e.target.value)
                    );
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-10">
        <button
          type="button"
          className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
          disabled={isDisabled}
          onClick={() => {
            onNext?.();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
