import { ModeProp } from "@/app/components/SetupWizard/Form";
import { Game } from "@/app/core/game";
import { gameInfo } from "@/app/states/game";
import { map } from "lodash";
import { useRecoilState } from "recoil";

export function SwapPosition({ onNext }: ModeProp) {
  const [info, setInfo] = useRecoilState(gameInfo);
  const game = new Game(info);

  const onClick = (teamIndex: number) => {
    setInfo(game.swapPosition(teamIndex - 1));
    setInfo(game.setServeTeam(info.servingTeam));
  };

  return (
    <div>
      <h2 className="font-semibold text-center text-xl mb-5">
        Do you need to swap position?
      </h2>
      <div className="flex gap-x-5">
        {map(info.teams, (item, index) => (
          <div key={index}>
            <h3 className="font-semibold text-center text-lg mb-3">
              {item.name}
            </h3>
            <button
              type="button"
              className="w-full rounded-md border border-indigo-600 px-3 py-2 text-sm font-semibold text-grey-900 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              onClick={() => onClick(item.id)}
            >
              Swap player position
            </button>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <button
          type="button"
          className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
          onClick={() => {
            setInfo({ ...info, isSetupComplete: true });
            onNext?.();
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
