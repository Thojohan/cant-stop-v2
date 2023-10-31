export function Player({
  playerName,
  isActive,
  backgroundColor,
  stars,
  winner,
}) {
  return (
    <div
      className="player"
      style={{
        backgroundImage: winner
          ? `linear-gradient(90deg, ${backgroundColor}, gold)`
          : `linear-gradient(90deg, ${backgroundColor}, white)`,
        borderStyle: `${isActive ? "Solid" : "None"}`,
        borderColor: `${winner ? "gold" : "black"}`,
        transform: winner ? "scaleY(1.15)" : "",
      }}
    >
      <p>{`${playerName}`}</p>
      <p>⭐ {stars}</p>
    </div>
  );
}
