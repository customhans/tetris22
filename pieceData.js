const pieces = [
  {
    type: "iPiece",
    matrix: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    type: "jPiece",
    matrix: [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ],
  },
  {
    type: "lPiece",
    matrix: [
      [0, 0, 3],
      [3, 3, 3],
      [0, 0, 0],
    ],
  },
  {
    type: "oPiece",
    matrix: [
      [0, 4, 4, 0],
      [0, 4, 4, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
  {
    type: "sPiece",
    matrix: [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
    ],
  },
  {
    type: "tPiece",
    matrix: [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
    ],
  },
  {
    type: "zPiece",
    matrix: [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
    ],
  },
];

function createImageArray() {
  const imgs = [];
  const path = "./img/";
  const ext = ".png";

  pieces.forEach((piece) => {
    const original = new Image();
    const ghost = new Image();
    original.src = path + piece.type + ext;
    ghost.src = path + piece.type + "_ghost" + ext;

    imgs.push({
      original: original,
      ghost: ghost,
    })
  })
  return imgs;
}

const images = createImageArray();