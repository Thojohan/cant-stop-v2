export function Decisions({
  commitDice,
  moves,
  diceArray,
  setOfDiceHandler,
  playerArray,
  gameStatus,
  activePlayer,
  dispatch,
  children,
}) {
  function continueHandler() {
    const tempComp = Object.entries(commitDice)
      .filter(([value, count]) => count >= moves.at(value - 2))
      .map(([el0, _el1]) => +el0);

    const dice = Array(4)
      .fill(0)
      .map(() => Math.floor(Math.random() * 6) + 1)
      .sort((a, b) => a - b);

    dispatch({ type: "rollDice", payload: { tempComp: tempComp, dice: dice } });

    const content = [
      {
        First: dice.at(0) + dice.at(1),
        Second: dice.at(2) + dice.at(3),
        Array1: [dice.at(0), dice.at(1)],
        Array2: [dice.at(2), dice.at(3)],
      },
      {
        First: dice.at(3) + dice.at(1),
        Second: dice.at(2) + dice.at(0),
        Array1: [dice.at(3), dice.at(1)],
        Array2: [dice.at(2), dice.at(0)],
      },
      {
        First: dice.at(2) + dice.at(1),
        Second: dice.at(3) + dice.at(0),
        Array1: [dice.at(2), dice.at(1)],
        Array2: [dice.at(3), dice.at(0)],
      },
    ].filter((el) => el);

    setOfDiceHandler(content);
  }

  function stopHandler() {
    const completed = Object.entries(commitDice).filter(
      ([key, value]) => +value >= +moves.at(+key - 2)
    );

    const newPlayerArray = playerArray
      .map((el, i) =>
        i === activePlayer - 1
          ? {
              ...el,
              selected: { ...el.selected, ...commitDice },
              completed: [...el.completed, ...completed],
            }
          : el
      )
      .map((el, i) => {
        if (i === activePlayer - 1) return el;
        const newSelectedObject = Object.entries(el.selected).reduce(
          (acc, [key, value]) =>
            completed
              .map(([key, _val]) => [+key])
              .find(([compKey, _compVal]) => +compKey === +key)
              ? acc
              : { ...acc, [key]: value },
          {}
        );

        return { ...el, selected: newSelectedObject };
      });

    const winner = newPlayerArray.at(activePlayer - 1).completed.length > 2;

    dispatch({
      type: "stopHandler",
      payload: {
        winner: winner,
        completed: completed,
        newPlayerArray: newPlayerArray,
      },
    });
  }

  return (
    <div className="decision-container">
      {diceArray.length > 0 && (
        <>
          <div className="dice-container">
            <img
              className="die"
              src={`./${diceArray.at(0)}-transparant.png`}
              alt="D1"
            />
            <img
              className="die"
              src={`./${diceArray.at(1)}-transparant.png`}
              alt="D2"
            />
            <img
              className="die"
              src={`./${diceArray.at(2)}-transparant.png`}
              alt="D3"
            />
            <img
              className="die"
              src={`./${diceArray.at(3)}-transparant.png`}
              alt="D4"
            />
          </div>
          <div className="result-container">{children}</div>
        </>
      )}
      <div className="button-container">
        <button
          className="main-button"
          onClick={() => dispatch({ type: "showCreateGame" })}
          disabled={!gameStatus === "hasBusted"}
        >
          New Game
        </button>
        <button
          className="main-button"
          onClick={continueHandler}
          disabled={
            gameStatus !== "decideProgress" && gameStatus !== "startTurn"
          }
        >
          {Object.keys(commitDice).length < 1 ? "Roll dice" : "Continue"}
        </button>
        <button
          className="main-button"
          onClick={stopHandler}
          disabled={
            (gameStatus !== "decideProgress" && gameStatus !== "startTurn") ||
            Object.keys(commitDice).length < 1
          }
        >
          Stop
        </button>
      </div>
    </div>
  );
}
