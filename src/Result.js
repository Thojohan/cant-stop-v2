export function Result({
  el,
  sorted,
  render,
  commitDice,
  activePlayer,
  playerArray,
  dispatch,
  gameStatus,
  setOfDice,
}) {
  function progressHandler(e) {
    const newEl = e.target.dataset.value.split(",");

    const set = [...new Set(newEl), ...Object.entries(commitDice)]
      .map((el) => (typeof el === "object" ? el : [el, 0]))
      .map(([key, val]) => {
        const playerCommit = Object.entries(
          playerArray.at(activePlayer - 1).selected
        ).find(([prevkey, _val]) => +prevkey === +key);
        return [
          key,
          playerCommit && +playerCommit.at(1) > +val
            ? +playerCommit.at(1)
            : +val,
        ];
      });

    const modified = set
      .map((entry) =>
        newEl.filter((el) => +el === +entry.at(0)).length > 1
          ? [entry.at(0), +[entry.at(1) + 2]]
          : newEl.filter((el) => +el === +entry.at(0)).length === 1
          ? [entry.at(0), +[entry.at(1) + 1]]
          : entry
      )
      .reduce((acc, val) => ({ ...acc, [val.at(0)]: val.at(1) }), {});

    dispatch({
      type: "progressHandler",
      payload: { modified: modified, newEl: newEl },
    });
    setOfDice.current = [];
  }

  const alreadyCommited = sorted.filter(
    (el) => Object.keys(commitDice).find((e) => +e === +el) && +el
  );

  return (
    <div className="result-wrapper">
      <div className="result">
        <div className="result-segment" data-value={el.First}>
          <img
            className="die"
            src={`./${el.Array1.at(0)}-transparant.png`}
            alt=""
          />
          <img
            className="die"
            src={`./${el.Array1.at(1)}-transparant.png`}
            alt=""
          />
        </div>{" "}
        +
        <div className="result-segment" data-value={el.Second}>
          <img
            className="die"
            src={`./${el.Array2.at(0)}-transparant.png`}
            alt=""
          />
          <img
            className="die"
            src={`./${el.Array2.at(1)}-transparant.png`}
            alt=""
          />
        </div>
      </div>
      <div className="button-container dice-selector">
        {render === "a" && (
          <button data-value={sorted} onClick={progressHandler}>
            Advance on {sorted.join(" and ")}
          </button>
        )}
        {render === "b" &&
          (sorted.length === 1 ? (
            <button data-value={sorted.at(0)} onClick={progressHandler}>
              Advance on {sorted.at(0)}
            </button>
          ) : (
            <>
              <button data-value={sorted.at(0)} onClick={progressHandler}>
                Advance on {sorted.at(0)}
              </button>
              <button data-value={sorted.at(1)} onClick={progressHandler}>
                Advance on {sorted.at(1)}
              </button>
            </>
          ))}
        {render === "c" && (
          <button data-value={alreadyCommited} onClick={progressHandler}>
            Advance on {alreadyCommited.join(" and ")}
          </button>
        )}
        {render === "d" &&
          (gameStatus === "decideCombination" ||
            gameStatus === "hasBusted") && (
            <div>Can't progress on any track</div>
          )}
      </div>
    </div>
  );
}
