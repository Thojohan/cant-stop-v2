import { useRef, useEffect, useReducer } from "react";
import { Gameboard } from "./Gameboard";
import { Player } from "./Player";
import { Result } from "./Result";
import { DiceResultSorter } from "./DiceResultSorter";
import { Decisions } from "./Decisions";
import { CreateGame } from "./CreateGame";
import { Rules } from "./Rules";

const initialState = {
  activePlayer: 1,
  gameStatus: "",
  completedRow: [],
  tempCompleted: [],
  commitDice: {},
  logArray: [],
  winner: null,
  moves: [3, 5, 7, 9, 11, 13, 11, 9, 7, 5, 3],
  playerArray: [],
  showCreateGame: false,
  showRules: false,
  diceArray: [],
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "setInitialState":
      return {};
    case "startGame":
      return {
        ...initialState,
        playerArray: payload,
        gameStatus: "startTurn",
      };

    case "rollDice":
      return {
        ...state,
        gameStatus: "decideCombination",
        tempCompleted: payload.tempComp,
        diceArray: payload.dice,
      };
    case "stopHandler":
      return {
        ...state,
        gameStatus: payload.winner ? "gameEnd" : "startTurn",
        winner: payload.winner ? state.activePlayer - 1 : null,
        activePlayer: payload.winner
          ? state.activePlayer
          : state.playerArray.at(state.activePlayer)
          ? state.activePlayer + 1
          : 1,
        commitDice: {},
        tempCompleted: [],
        playerArray: payload.newPlayerArray,
        completedRow: [
          ...state.completedRow,
          ...payload.completed.map((el) => +el.at(0)),
        ],
        logArray: [
          ...state.logArray,
          [
            state.playerArray.at(state.activePlayer - 1),
            "decided to stop and save their progress",
          ],

          ...(payload.completed.length > 0
            ? [
                [
                  state.playerArray.at(state.activePlayer - 1),
                  [
                    `won row ${[
                      ...payload.completed.map(([key, _val]) => +key),
                    ].join(" and ")} !!`,
                  ],
                  "completed",
                ],
              ]
            : ""),
          ...(payload.winner
            ? [
                [
                  state.playerArray.at(state.activePlayer - 1),
                  [`completed three columns and won the game !!`],
                  "won",
                ],
              ]
            : ""),
        ],
      };
    case "progressHandler":
      return {
        ...state,
        commitDice: payload.modified,
        gameStatus: "decideProgress",
        diceArray: [],
        logArray: [
          ...state.logArray,
          [
            state.playerArray.at(state.activePlayer - 1),
            `advanced on column ${[...payload.newEl].join(" and column ")}`,
          ],
        ],
      };
    case "busted":
      return {
        ...state,
        gameStatus: "hasBusted",
        logArray: [
          ...state.logArray,
          [
            state.playerArray.at(state.activePlayer - 1),
            "couldn't continue, and lost all progress they made this turn",
          ],
        ],
      };
    case "bustedTimeout":
      return {
        ...state,
        gameStatus: "startTurn",
        activePlayer: state.playerArray.at(state.activePlayer)
          ? state.activePlayer + 1
          : 1,
        commitDice: [],
        diceArray: [],
      };
    case "showCreateGame":
      return {
        ...state,
        showCreateGame: true,
      };
    case "showRules":
      return {
        ...state,
        showRules: true,
      };
    case "closeModals":
      return {
        ...state,
        showCreateGame: false,
        showRules: false,
      };
    default: {
      throw new Error("Unknown action");
    }
  }
}

export default function App() {
  const [
    {
      activePlayer,
      gameStatus,
      completedRow,
      tempCompleted,
      commitDice,
      logArray,
      winner,
      moves,
      playerArray,
      showCreateGame,
      showRules,
      diceArray,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const timerRef = useRef(null);
  const setOfDice = useRef([]);

  function setOfDiceHandler(input) {
    timerRef.current = null;
    setOfDice.current = input;
  }

  const handledArray = DiceResultSorter(
    setOfDice.current,
    [...completedRow, ...tempCompleted],
    commitDice,
    moves,
    playerArray.at(activePlayer - 1)?.selected
  );

  useEffect(() => {
    if (timerRef.current)
      return () => {
        clearTimeout(timerRef.current);
      };
    if (!handledArray) return;
    if (gameStatus === "hasBusted") return;
    const bustCount = handledArray?.filter(
      (el) => el.renderCode === "d"
    ).length;
    if (bustCount < 3) return;
    dispatch({ type: "busted" });
    timerRef.current = setTimeout(() => {
      dispatch({ type: "bustedTimeout" });
    }, 3500);
  }, [handledArray, playerArray, gameStatus]);

  function closeModalHandler(e) {
    console.log(e);
    if (
      e.key === "Escape" ||
      e.target.className.includes("dialog-wrapper") ||
      e.target.className.includes("round-button")
    )
      dispatch({ type: "closeModals" });
  }

  return (
    <div className="page-container">
      <Gameboard
        commitDice={commitDice}
        playerArray={playerArray}
        dispatch={dispatch}
      />
      <section className="admin-container">
        <div className="title-container">
          <button
            className="round-button"
            onClick={() => dispatch({ type: "showRules" })}
          >
            ?
          </button>
          <p className="title" style={{ fontSize: "3.5rem" }}>
            Can't Stop
          </p>
          <p style={{ fontSize: "1.2rem" }}>a Sid Sackson game</p>
        </div>
        <div className="player-area">
          {playerArray?.map((el, i) => {
            if (!el || !el.name) return "";
            return (
              <Player
                playerName={el.name}
                playerNumber={i + 1}
                stars={playerArray.at(i).completed.length}
                backgroundColor={el.color}
                key={el.name + el.color}
                isActive={i + 1 === activePlayer}
                winner={winner === i}
              />
            );
          })}
        </div>
        <div className="game-log scrollbar">
          {[...logArray].reverse().map((el, i) => (
            <p
              key={i}
              style={{
                fontWeight:
                  el.at(2) === "completed" || el.at(2) === "won"
                    ? "bold"
                    : "normal",
              }}
            >
              <span style={{ color: el.at(0).color }}> {el.at(0).name}</span>{" "}
              {el.at(1)}
            </p>
          ))}
        </div>
        <Decisions
          commitDice={commitDice}
          moves={moves}
          diceArray={diceArray}
          activePlayer={activePlayer}
          gameStatus={gameStatus}
          setOfDiceHandler={setOfDiceHandler}
          playerArray={playerArray}
          dispatch={dispatch}
        >
          {setOfDice.current.length > 0 &&
            setOfDice.current.map((el, i) => (
              <Result
                key={i}
                el={el}
                setOfDice={setOfDice}
                handledArray={handledArray}
                sorted={handledArray.at(i).sorted}
                render={handledArray.at(i).renderCode}
                playerArray={playerArray}
                commitDice={commitDice}
                gameStatus={gameStatus}
                activePlayer={activePlayer}
                dispatch={dispatch}
              />
            ))}
        </Decisions>
      </section>
      {showCreateGame && (
        <CreateGame dispatch={dispatch} closeModalHandler={closeModalHandler} />
      )}
      {showRules && <Rules closeModalHandler={closeModalHandler} />}
    </div>
  );
}
