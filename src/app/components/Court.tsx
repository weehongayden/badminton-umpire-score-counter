import { PlayerProp } from "@/app/components/SetupWizard/Player";
import { gameInfo } from "@/app/states/game";
import { classNames } from "@/app/utils";
import { isEmpty, trim } from "lodash";
import { IBM_Plex_Mono } from "next/font/google";
import { useRecoilValue } from "recoil";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  preload: false,
});

export function Court() {
  const info = useRecoilValue(gameInfo);

  const generateClassName = (player: PlayerProp) => {
    if (!isEmpty(player)) {
      const toServe = classNames(
        player.toServe ? "active-serve" : "",
        "flex justify-center player"
      );
      const toReceive = player.toReceive ? "active-receive" : "";

      return trim(`${toServe} ${toReceive}`);
    }
  };

  return (
    <>
      <div className="court-info">
        <div className="bg-transparent border-none"></div>
        <div className="bg-transparent border-none text-center">Team A</div>
        <div className="bg-transparent border-none"></div>
        <div className="bg-transparent border-none"></div>
        <div className="bg-transparent border-none text-center">Team B</div>
        <div className="bg-transparent border-none"></div>
      </div>

      <div className="score-info">
        <div className="bg-transparent border-none"></div>
        <div className="bg-transparent border-none text-center">
          <p className={`${ibmPlexMono.className} text-lg font-medium`}>
            {info.teams[0].score}
          </p>
        </div>
        <div className="bg-transparent border-none"></div>
        <div className="bg-transparent border-none"></div>
        <div className="bg-transparent border-none text-center">
          <p className={`${ibmPlexMono.className} text-lg font-medium`}>
            {info.teams[1].score}
          </p>
        </div>
        <div className="bg-transparent border-none"></div>
      </div>

      <div className="court">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>

        <div></div>
        <div className={generateClassName(info.teams[0].players[0])}>
          <span>{info.teams[0].players[0]?.name}</span>
        </div>
        <div></div>
        <div></div>
        <div className={generateClassName(info.teams[1].players[0])}>
          <span>{info.teams[1].players[0]?.name}</span>
        </div>
        <div></div>
        <div></div>
        <div className={generateClassName(info.teams[0].players[1])}>
          <span>{info.teams[0].players[1]?.name}</span>
        </div>
        <div className={generateClassName(info.teams[1].players[1])}>
          <span>{info.teams[1].players[1]?.name}</span>
        </div>
        <div></div>

        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}
