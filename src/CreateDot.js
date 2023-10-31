export function CreateDot({
  position,
  value,
  commitedArray,
  color = "black",
  isTemp = false,
}) {
  const matchedValue = commitedArray
    .filter((el) => Object.keys(el).at(0) === `${value}`)
    .reduce((acc, el) => {
      if (el.length === 0) return acc;
      const [[key, val]] = Object.entries(el);
      let temp;

      if (+val >= position.at(+value - 2).length && isTemp === false) {
        const allFilledArray = Array(position.at(+value - 2).length)
          .fill(null)
          .map((_, i) => {
            return { [value]: i + 1 };
          });
        temp = allFilledArray;
      }
      return temp || [...acc, { [+key]: +val }];
    }, []);
  if (matchedValue.length < 1) return;

  return matchedValue.map((el, i) => (
    <span
      key={el + i}
      className="dot"
      style={{
        marginTop: `${position
          .at(+Object.keys(el) - 2)
          .at(+Object.values(el) - 1)}%`,
        backgroundColor: `${color}`,
        opacity: `${isTemp ? 0.8 : 0.5}`,
      }}
    ></span>
  ));
}
