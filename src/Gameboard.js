import { CreateDot } from "./CreateDot";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const position = [
  [710, 610, 510],
  [810, 710, 610, 510, 410],
  [910, 810, 710, 610, 510, 410, 310],
  [1010, 910, 810, 710, 610, 510, 410, 310, 210],
  [1110, 1010, 910, 810, 710, 610, 510, 410, 310, 210, 110],
  [1210, 1110, 1010, 910, 810, 710, 610, 510, 410, 310, 210, 110, 10],
  [1110, 1010, 910, 810, 710, 610, 510, 410, 310, 210, 110],
  [1010, 910, 810, 710, 610, 510, 410, 310, 210],
  [910, 810, 710, 610, 510, 410, 310],
  [810, 710, 610, 510, 410],
  [710, 610, 510],
];

export function Gameboard({ commitDice, playerArray }) {
  const [parent] = useAutoAnimate();
  const commitedArray = Object.keys(commitDice).map((el) => ({
    [+el]: +commitDice[+el],
  }));
  console.log(commitDice, playerArray);

  const mixArray =
    [
      ...playerArray?.map((el) => {
        const color = el.color;
        const selected = Object.entries(el.selected).map(([key, value]) => ({
          [key]: value,
        }));
        return [color, selected];
      }),
      [null, commitedArray],
    ] || [];

  console.log("hei");

  return (
    <section className="gameboard-container">
      <div className="inner-div">
        {Array(11)
          .fill(null)
          .map((_el, ind) => (
            <div ref={parent} className="board-row" id={ind + 2} key={ind}>
              {mixArray.map((el, i) => (
                <CreateDot
                  key={i}
                  position={position}
                  value={ind + 2}
                  color={el.at(0) || undefined}
                  commitedArray={el.at(1)}
                  isTemp={!el.at(0) ? true : false}
                />
              ))}
            </div>
          ))}
      </div>
    </section>
  );
}
