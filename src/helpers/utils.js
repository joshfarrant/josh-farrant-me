/**
 * Calculates coordinates of an equilateral triangle's 3 vertices
 * given the coordinates of the origin and the edge length.
 * Takes an optional 4th param to rotate the triangle
 * θ degrees about the origin, and an optional 5th param
 * to instead rotate about the center (half height)
 */
export const getEquilateralTriangleCoordinates = (
  originX = 0,
  originY = 0,
  edgeLength = 10,
  rotateDegrees = 0,
  rotateAboutCenter = false,
) => {
  // A triangle's height is √3/2 * edgeLength
  const triangleHeight = (Math.sqrt(3) / 2) * edgeLength;
  const halfEdgeLength = edgeLength / 2;

  /**
   * Simplified trig to calculate distance between
   * origin and bottom-left vertex, p1.
   * radius = (edgeLength / 2) / sin(60º)
   * sin(60º) = √3/2
   * radius = (edgeLength / 2) / (√3/2)
   * ∴ radius = edgeLength / √3
   *
   *          Origin
   *          .
   *         /|
   * radius / | edgeNormal
   *       /  |
   *      /___|
   *     p1   C
   *
   * (5/5 Marks) ✓
   */
  const radius = edgeLength / Math.sqrt(3);

  // Some Pythagoras to calculate distance between center of bottom edge and origin
  const edgeNormal = Math.sqrt((radius ** 2) - (halfEdgeLength ** 2));

  // Bottom-left vertex
  const p1 = [
    originX - halfEdgeLength,
    originY + edgeNormal,
  ];

  // Top vertex
  const p2 = [
    originX,
    originY - (triangleHeight - edgeNormal),
  ];

  // Bottom-right vertex
  const p3 = [
    originX + halfEdgeLength,
    originY + edgeNormal,
  ];

  // Convert given rotation (in degrees) to radians
  const rotateRads = rotateDegrees * (Math.PI / 180);
  // These will be useful shortly
  const sinRads = Math.sin(rotateRads);
  const cosRads = Math.cos(rotateRads);

  // All of our coords
  const coords = [
    p1,
    p2,
    p3,
  ];

  // Distance between triangle's center and origin
  const centerOriginOffset = (edgeNormal - radius) / 2;

  // Figure out the true origin, if we're rotating
  const trueOriginY = originY + (rotateAboutCenter && rotateDegrees ? centerOriginOffset : 0);

  /**
   * Translate the origin (or center) of the triangle back to the origin, (0,0)
   * Rotate the points θ radians about the origin
   * Translate the center of the triangle back to it's original location
   */
  const rotatedCoords = coords
    .map(([x, y]) => ([
      x - originX,
      y - trueOriginY,
    ]))
    .map(([x, y]) => ([
      (x * cosRads) - (y * sinRads),
      (y * cosRads) + (x * sinRads),
    ]))
    .map(([x, y]) => ([
      x + originX,
      y + trueOriginY,
    ]));

  return {
    vertices: rotatedCoords,
    origin: [originX, trueOriginY],
    rotation: rotateDegrees,
  };
};

export const getTriangleSetCoordinate = (
  containerWidth,
  containerHeight,
  triangles,
  tSize,
  tY,
  tYOffset = 0,
  tMargin = 10,
) => {
  // Number of triangles to draw
  const tCount = triangles.length;

  // Distance between centers or adjacent triangles
  const separation = (tSize / 2) + tMargin;

  // Distance between the first triangle's center and the last's
  const totalWidth = (tCount - 1) * separation;

  if (totalWidth > containerWidth) {
    throw new Error(`
      Container too small for requested triangles. Either increase
      the container size, decrease the triangle size, or decrease
      the number of triangles.
    `);
  }

  // Get starting point, x, of first triangle
  const firstTriangleX = (containerWidth - totalWidth) / 2;

  // Generate coords
  const coords = triangles.map((x, i) => ([
    firstTriangleX + (i * separation),
    tY,
  ]));

  return coords.map(([x, y], i) => {
    const inverted = i % 2 !== 0;
    const offsetY = inverted ? y - tYOffset : y;
    return getEquilateralTriangleCoordinates(
      x,
      offsetY,
      tSize,
      inverted ? 180 : 0, // Rotate every other triangle
      true,
    );
  });
};
