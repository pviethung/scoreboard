// How many do we want to draw?
export default function randomAvatar() {
  // Max value for a color component
  var MAX_COLOR = 200;

  // Min value for a color component
  var MIN_COLOR = 120;

  // Chance of a square being filled [0, 1]
  var FILL_CHANCE = 0.5;

  // Size of a grid square in pixels
  var SQUARE = 20;

  // Number of squares width and height
  var GRID = 5;

  // Padding on the edge of the canvas in px
  var PADDING = SQUARE / 2;

  // Size of the canvas
  var SIZE = SQUARE * GRID + PADDING * 2;

  // MILLIS BETWEEN REFRESH
  var DRAW_INTERVAL = 600;

  /**
   * Setup a context and size for a canvas
   */
  var setupCanvas = function (c: HTMLCanvasElement) {
    var ctx = c.getContext('2d');
    c.width = SIZE;
    c.height = SIZE;

    return ctx;
  };

  // SETUP THE CANVAS AND DRAWING CONTEXT
  var ctxs: CanvasRenderingContext2D;
  var canvas = document.createElement('canvas');
  var canvas2dCtx = setupCanvas(canvas);
  if (canvas2dCtx) ctxs = canvas2dCtx;
  /**
   * Fill in a square on the canvas.
   */
  var fillBlock = function (
    x: number,
    y: number,
    color: number[],
    ctx: CanvasRenderingContext2D
  ) {
    ctx.beginPath();
    ctx.rect(PADDING + x * SQUARE, PADDING + y * SQUARE, SQUARE, SQUARE);
    ctx.fillStyle = 'rgb(' + color.join(',') + ')';
    ctx.fill();
  };

  /**
   * Pick random squares to fill in.
   */
  var generateIdenticon = function (ctx: CanvasRenderingContext2D) {
    // FILL CANVAS BG
    ctx.beginPath();
    ctx.rect(0, 0, SIZE, SIZE);
    ctx.fillStyle = '#F0ECE6';
    ctx.fill();

    // GENERATE COLOR
    var color = genColor();

    // FILL THE SQUARES
    for (var x = 0; x < Math.ceil(GRID / 2); x++) {
      for (var y = 0; y < GRID; y++) {
        if (Math.random() < FILL_CHANCE) {
          fillBlock(x, y, color, ctx);

          // FILL RIGHT SIDE SYMMETRICALLY
          if (x < Math.floor(GRID / 2)) {
            fillBlock(GRID - 1 - x, y, color, ctx);
          }
        }
      }
    }
  };

  /**
   * Generate a random color with low saturation.
   */
  var genColor = function () {
    var rgb = [];
    for (var i = 0; i < 3; i++) {
      var val = Math.floor(Math.random() * 256);
      var minEnforced = Math.max(MIN_COLOR, val);
      var maxEnforced = Math.min(MAX_COLOR, minEnforced);
      rgb.push(maxEnforced);
    }
    return rgb;
  };

  var draw = function () {
    generateIdenticon(ctxs);
    return ctxs.canvas.toDataURL()
  };

  // DRAW A NEW EVERY n MILLIS
  return draw();
}
