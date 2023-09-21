import { ModeProp } from "@/app/components/SetupWizard/Form";
import { Game } from "@/app/core/game";
import { gameInfo } from "@/app/states/game";
import { classNames } from "@/app/utils";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { map } from "lodash";
import { useRecoilState } from "recoil";

export function Serve({ onNext }: ModeProp) {
  const [info, setInfo] = useRecoilState(gameInfo);
  const game = new Game(info);

  const onUpdate = (option: number & { id: number }) => {
    setInfo(game.setServeTeam(option.id - 1));
  };

  return (
    <div>
      <h2 className="font-semibold text-center text-xl mb-5">Serving Team</h2>
      <div className="flex flex-col gap-4">
        <RadioGroup value={info.servingTeam} onChange={onUpdate}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-4">
            {map(info.teams, (item, index) => (
              <RadioGroup.Option
                key={index}
                value={item}
                className={({ active }) =>
                  classNames(
                    active
                      ? "border-indigo-600 ring-2 ring-indigo-600"
                      : "border-gray-300",
                    "relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between"
                  )
                }
              >
                {({ active, checked }) => (
                  <>
                    <span className="flex items-center">
                      <span className="flex flex-col text-sm">
                        <RadioGroup.Label
                          as="span"
                          className="font-medium text-gray-900"
                        >
                          {item.name}
                        </RadioGroup.Label>
                      </span>
                    </span>
                    <span
                      className={classNames(
                        active ? "border" : "border-2",
                        checked ? "border-indigo-600" : "border-transparent",
                        "pointer-events-none absolute -inset-px rounded-lg"
                      )}
                      aria-hidden="true"
                    />
                    <CheckIcon className="hidden ui-checked:block" />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <div className="mt-10 flex flex-col gap-y-2">
        <button
          type="button"
          className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-300"
          disabled={info.servingTeam === -1}
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
