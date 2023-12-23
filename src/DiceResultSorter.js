export function DiceResultSorter(
  setOfDice,
  completedRow,
  commitDice,
  moves,
  selected
) {
  if (setOfDice.length < 1) return;
  const mapped = setOfDice.map((el) => {
    const sorted = [+el.First, +el.Second].filter(
      (el) => !completedRow.find((e) => +e === el)
    );

    const previousCommit = Object.keys(commitDice);
    const alreadyCommited = sorted.filter(
      (el) => previousCommit.find((e) => +e === +el) && +el
    );

    const isOnlyOneStepLeft =
      el.First === el.Second &&
      (+moves.at(el.First - 2) - 1 === +commitDice[+el.First] ||
        +moves.at(el.First - 2) - 1 === +selected[+el.First]);

    console.log(el.First);
    console.log(+selected[+el.First]);
    console.log(+commitDice[+el.First]);
    console.log(+moves.at(el.First - 2));

    console.log(isOnlyOneStepLeft);
    console.log(commitDice);

    function possibleDice() {
      if (sorted.length < 1) return "d";
      if (
        previousCommit.length > 2 &&
        !previousCommit.find((el) => sorted.find((e) => +el === +e))
      )
        return "d";
      if (isOnlyOneStepLeft) return "b";
      if (previousCommit.length < 2) return "a";
      if (previousCommit.length < 3 && el.First === el.Second) return "a";
      if (previousCommit.length > 2) return "c";
      if (alreadyCommited.length > 1) return "a";
      if (alreadyCommited.length > 0 && previousCommit.length < 3) return "a";

      if (previousCommit.length > 1 && alreadyCommited.length < 2) return "b";
      return "";
    }

    const renderCode = possibleDice();
    console.log(renderCode);

    return {
      renderCode: renderCode,
      sorted: sorted,
      alreadyCommited: alreadyCommited,
    };
  });
  return mapped;
}
