import { useState } from 'react';

function BotonLike(props) {
    const data={props};
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{score} Likes </h1>
      <button onClick={() => setScore(score + 1)}>
        Like
      </button>
    </div>
  );
}

export default BotonLike;