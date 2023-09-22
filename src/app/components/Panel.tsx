import { TeamProp } from "@/app/components/SetupWizard/Player";
import { Game } from "@/app/core/game";
import { defaultValue, gameInfo } from "@/app/states/game";
import { logInfo } from "@/app/states/log";
import { classNames } from "@/app/utils";
import { useRecoilState } from "recoil";

export function Panel() {
  const [info, setInfo] = useRecoilState(gameInfo);
  const [logs, setLogs] = useRecoilState(logInfo);

  const game = new Game(info);

  const updateScore = (teamId: number) => {
    setInfo(game.setScore(teamId));
    setInfo(game.setMessage(teamId));
    setInfo(game.swapPosition(teamId));
    setInfo(game.setServePlayer(teamId));
    setInfo(game.extendScore());
    setInfo(game.isGameEnd());

    const updatedLogs = [...logs.logs, info];
    setLogs((prevState) => ({ ...prevState, logs: updatedLogs }));
  };

  const revert = () => {
    const log = logs.logs;

    if (log.length > 0) {
      const updatedLogs = log.slice(0, -1);
      const lastLog = logs.logs[logs.logs.length - 1];

      if (lastLog) {
        setInfo(lastLog);
      }

      setLogs((prevState) => ({ ...prevState, logs: updatedLogs }));
    }
  };

  const resetValue = () => {
    setInfo(defaultValue);
  };

  return (
    info.isSetupComplete && (
      <div className="flex flex-col gap-y-5">
        <div className="text-center h-12">
          {info.isEnd ? (
            <p>
              Game End
              <br />
              <span className="font-bold">
                {info.teams[info.servingTeam].name} win
              </span>
            </p>
          ) : (
            <>
              {info.isServiceOver && <p>Service Over</p>}
              {<p>{info.message}</p>}
            </>
          )}
        </div>
        <h2 className="font-semibold text-center text-xl">Panel</h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10">
          {info.teams.map((team: TeamProp, index: number) => (
            <button
              key={`${team.name}-${index}`}
              type="button"
              className={`${classNames(
                info.isEnd
                  ? "text-gray-300 border-gray-300"
                  : "text-grey-900 border-indigo-600 ",
                "w-full rounded-md border px-3 py-2 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              )}`}
              disabled={info.isEnd}
              onClick={() => updateScore(index)}
            >
              Add Point <br />
              {team.name}
            </button>
          ))}
        </div>

        <button
          type="button"
          className={`${classNames(
            info.isEnd ? "bg-red-200" : "bg-red-600 ",
            "w-full rounded-md border px-3 py-2 text-sm text-white font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          )}`}
          disabled={info.isEnd}
          onClick={revert}
        >
          Revert
        </button>

        {info.isEnd && (
          <button
            type="button"
            className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
            onClick={resetValue}
          >
            Reset
          </button>
        )}
      </div>
    )
  );
}
