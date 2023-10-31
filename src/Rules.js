import { useEffect } from "react";

export function Rules({ closeModalHandler }) {
  useEffect(() => {
    document.addEventListener("keydown", closeModalHandler);

    return () => document.removeEventListener("keydown", closeModalHandler);
  }, [closeModalHandler]);

  return (
    <div className="modal-wrapper">
      <div className="modal" onClick={closeModalHandler}>
        <div className="dialog-wrapper">
          <div className="dialog-box">
            <button className="round-button" onClick={closeModalHandler}>
              X
            </button>
            <h2>Overview</h2>
            <br />
            <p>
              Can't Stop is a game of rolling dice and knowing when to stop
              pushing one's luck. Designed by Sid Sackson in 1980 and originally
              published by Parker Brothers. It's since been released many times
              in new editions and localised versions. This version follow the
              original rules and the game board is fan made
            </p>
            <br /> <h3>This implementation</h3>
            <p>
              This game is developed in native React and CSS by me, Thomas
              Johannessen. All code is written from scratch. There are no
              intention of commercial use, it's a learning project. Thus I claim
              Fair Use of copyrighted material.
            </p>
            <br />
            <h3>Rules</h3>
            <p>
              There are 11 routes to the top of the board, represented by
              columns 2 to 12. At the start of the game, all routes are open and
              players may overtake one another. Once a player has reached the
              top of the board, that route is closed and other players lose
              their progress. The winner is the first player that reaches the
              top of the board by three different routes. Can't Stop is played
              with a board consisting of 11 columns, numbered from 2 to 12, four
              dice, and three black circles as temporary markers. Each player
              has a progress marker in their color for each column.
            </p>
            <br />
            <h3>Splitting Dice</h3>
            <p>
              On a player's turn, they roll the four dice, split them into two
              groups of two dice however they like, then advance a step on each
              column whose sum is equal to some group of the dice.
            </p>
            <br />
            <h4>Examples:</h4>
            <p>
              <strong>Roll: 3,3,4,4.</strong> The player can split them to 3,3
              and 4,4, advancing a step on each of columns 6 and 8, or the
              player can split them to 3,4 and 3,4, advancing two steps on
              column 7.
            </p>
            <p>
              <strong>Roll: 2,3,4,5.</strong> The player can split them in three
              ways: 2,3 and 4,5 (columns 5 and 9), or split them to 2,4 and 3,5
              (columns 6 and 8), or or split them to 2,5 and 3,4 (columns 7 and
              7).
            </p>
            <p>
              <strong>Roll: 4,4,4,6.</strong> There is only one way to split it:
              4,4 and 4,6, which means columns 8 and 10. Roll: 1,1,1,1. There is
              only one way to split it: 1,1 and 1,1, which means columns 2 and
              2.
            </p>
            <br />
            <h3>Temporary Markers</h3>
            <p>
              In a turn, a player may only advance in three columns. (This is
              pivotally important to understanding what moves are allowed or
              disallowed.) The temporary markers are to help the player in
              keeping track of their progress. However, one must make as many
              moves as possible.
            </p>
            <br />
            <h4>Examples:</h4>
            <p>
              The player hasn't moved at all and rolled 2,3,4,5. They decide to
              split as 2,3 and 4,5, advancing on columns 5 and 9. This is
              allowed; they advanced on columns 5 and 9. They may not choose to
              advance only on column 5 or only on column 9 because they must
              perform all moves possible.
            </p>
            <p>
              The player has moved on columns 4 and 5 and rolled 2,3,4,5. They
              decide to split as 2,3 and 4,5, advancing on columns 5 and 9. This
              is allowed; they advanced on columns 5 and 9.
            </p>
            <p>
              The player has moved on columns 2 and 3 and rolled 2,3,4,5. They
              decide to split as 2,3 and 4,5, and so should have advanced on
              columns 5 and 9. But this is not allowed; it makes them advance on
              four columns. They must pick either 5 or 9 to advance from. The
              player has moved on columns 2, 3, and 12 and rolled 2,3,4,5. No
              matter how they split the dice, they cannot advance.
            </p>
            <br />
            <h3>Stopping One's Turn</h3>
            <p>
              A player keeps their turn until they choose to stop or they cannot
              advance (like the last of the examples above). In the former case,
              the progress markers for the columns advanced are moved up to the
              locations of the temporary markers. In the latter case, the
              temporary markers are removed; the progress markers are not moved.
            </p>
            <br />
            <h4>Examples:</h4>
            <p>
              The player decides to stop after advancing 3 steps on column 7, 2
              steps on column 8, and 1 step on column 9, after previously have
              advanced 4 steps on column 6 and 3 steps on column 9. Now their
              position is 4 steps on column 6, 3 steps on column 7, 2 steps on
              column 8, and 4 steps on column 9.
            </p>
            <p>
              The player advanced 3 steps on column 7, 2 steps on column 8, and
              1 step on column 9, after previously have advanced 4 steps on
              column 6 and 3 steps on column 9. They roll the dice and cannot
              advance. The temporary markers are removed, and the progress
              markers remain at 4 steps on column 6, and 3 steps on column 9.
            </p>
            <br />
            <h3>Completing A Column</h3>
            <p>
              When the player decides to stop and they have reached the end of a
              column, that column is scored for that player and no other player
              may advance in that column. For example, if column 5 has been
              scored and the player splits a 2,3,4,5 to 2,3 and 4,5, they cannot
              advance on column 5 because it has been scored.
            </p>
            <br />
            <h3>Winning Condition</h3>
            <p>When a player completes three columns, they win. </p>
            <br />
            <h3>Strategy</h3>
            <p>
              The strategy of the game is based on knowing when to stop. As one
              keeps playing, they still have the risk of losing all progress on
              the turn; stopping will save the progress but gives the other
              players a turn each. Knowing which is more beneficial helps.
            </p>
            <br />
            <p>
              Columns with more extreme numbers are less probable (a 2 is only
              scored by a 1,1 and a 12 is only scored by a 6,6, while a 7 is
              scored by six pairs of dice), so they have fewer steps to work on.
              One's strategy can also revolve on choosing whether to aim for
              middle columns or extreme columns.
            </p>
            <br />
            <p>
              One more element of strategy consists of pursuing the same columns
              as your opponent(s), as scoring the column before they do can
              deprive them of their advantage, esp. if they are only ahead in a
              few columns including this.
            </p>
            <br />
            <p>
              <strong>
                This rules overview is copied from the BoardGameArena wiki-page
                for Can't Stop
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
