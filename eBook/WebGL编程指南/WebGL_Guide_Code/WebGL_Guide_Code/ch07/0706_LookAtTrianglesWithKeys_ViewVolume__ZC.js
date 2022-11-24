// LookAtTrianglesWithKey_ViewVolume.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_ViewMatrix;\n' +
  'uniform mat4 u_ProjMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ProjMatrix * u_ViewMatrix * a_Position;\n' +// ZC: 原来的
//  '  gl_Position =  a_Position * u_ViewMatrix * u_ProjMatrix;\n' +// ZC: 我的
  '  v_Color = a_Color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

function main() {
  // Retrieve <canvas> element
  var canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Set the vertex coordinates and color (the blue triangle is in the front)
  var n = initVertexBuffers(gl);
  if (n < 0) {
    console.log('Failed to specify the vertex infromation');
    return;
  }

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Get the storage locations of u_ViewMatrix and u_ProjMatrix variables
  var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  var u_ProjMatrix = gl.getUniformLocation(gl.program, 'u_ProjMatrix');
  if (!u_ViewMatrix || !u_ProjMatrix) { 
    console.log('Failed to get u_ViewMatrix or u_ProjMatrix');
    return;
  }

  // Create the matrix to specify the view matrix
  var viewMatrix = new Matrix4();
  // Register the event handler to be called on key press
 document.onkeydown = function(ev){ keydown(ev, gl, n, u_ViewMatrix, viewMatrix); };

  // Create the matrix to specify the viewing volume and pass it to u_ProjMatrix
  var projMatrix = new Matrix4();
  projMatrix.setOrtho(-1.0, 1.0, -1.0, 1.0, 0.0, 2.0);//   <--   <--   <--   <--   <--   <--   <--   <--   <--   <--   <--   <--   <--   <--   <--
  gl.uniformMatrix4fv(u_ProjMatrix, false, projMatrix.elements);

  draw(gl, n, u_ViewMatrix, viewMatrix);   // Draw the triangles


//   ***   ***   ***   ***   ***   ***   ***   ***   ***   ***   ***   ***   ***   ***   ***

  var matrixView = new Matrix4();
  matrixView.setLookAt(1.20, 0.0, 1.0, 0, 0, 0, 0, 1, 0);
  var matrixProj = new Matrix4();
  matrixProj.setOrtho(-1.0, 1.0, -1.0, 1.0, 0.0, 2.0);

  console.log("matrixView :");
  for (var i=0; i<16; i++)
	  console.log("  "+matrixView.elements[i]);
  console.log("");
  console.log("matrixProj :");
  for (var i=0; i<16; i++)
	  console.log("  "+matrixProj.elements[i]);
  console.log("");

  var m1 = matrixView.multiply(matrixProj);
  var m2 = matrixProj.multiply(matrixView);

  console.log("m1 :");
  for (var i=0; i<16; i++)
	  console.log("  "+m1.elements[i]);
  console.log("");
  console.log("m2 :");
  for (var i=0; i<16; i++)
	  console.log("  "+m2.elements[i]);
  console.log("");

  var x1 = -1;
  var y1 = 1;
  var z1 = -2;
  var n1 = 1;

  var x2 = -1;
  var y2 = -1;
  var z2 = -2;
  var n2 = 1;

  var x3 = 1;
  var y3 = 1;
  var z3 = -2;
  var n3 = 1;

//  var x4 = 1;
//  var y4 = -1;
//  var z4 = -2;
//  var n4 = 1;
  var x4 = -0.5;
  var y4 = 0;
  var z4 = 0;
  var n4 = 1;

  console.log();
  console.log("---   ---   ---");
  console.log();

  console.log(x1*m1.elements[0] + y1*m1.elements[4] + z1*m1.elements[8] +  n1*m1.elements[12]);
  console.log(x1*m1.elements[1] + y1*m1.elements[5] + z1*m1.elements[9] +  n1*m1.elements[13]);
  console.log(x1*m1.elements[2] + y1*m1.elements[6] + z1*m1.elements[10] + n1*m1.elements[14]);
  console.log(x1*m1.elements[3] + y1*m1.elements[7] + z1*m1.elements[11] + n1*m1.elements[15]);
  console.log("");

  console.log(x2*m1.elements[0] + y2*m1.elements[4] + z2*m1.elements[8] +  n2*m1.elements[12]);
  console.log(x2*m1.elements[1] + y2*m1.elements[5] + z2*m1.elements[9] +  n2*m1.elements[13]);
  console.log(x2*m1.elements[2] + y2*m1.elements[6] + z2*m1.elements[10] + n2*m1.elements[14]);
  console.log(x2*m1.elements[3] + y2*m1.elements[7] + z2*m1.elements[11] + n2*m1.elements[15]);
  console.log("");

  console.log(x3*m1.elements[0] + y3*m1.elements[4] + z3*m1.elements[8] +  n3*m1.elements[12]);
  console.log(x3*m1.elements[1] + y3*m1.elements[5] + z3*m1.elements[9] +  n3*m1.elements[13]);
  console.log(x3*m1.elements[2] + y3*m1.elements[6] + z3*m1.elements[10] + n3*m1.elements[14]);
  console.log(x3*m1.elements[3] + y3*m1.elements[7] + z3*m1.elements[11] + n3*m1.elements[15]);
  console.log("");

  console.log(x4*m1.elements[0] + y4*m1.elements[4] + z4*m1.elements[8] +  n4*m1.elements[12]);
  console.log(x4*m1.elements[1] + y4*m1.elements[5] + z4*m1.elements[9] +  n4*m1.elements[13]);
  console.log(x4*m1.elements[2] + y4*m1.elements[6] + z4*m1.elements[10] + n4*m1.elements[14]);
  console.log(x4*m1.elements[3] + y4*m1.elements[7] + z4*m1.elements[11] + n4*m1.elements[15]);
  console.log("");

  console.log("");
  console.log("---   ---   ---   ---");
  console.log("");

  var p1 = m2.multiplyVector4(new Vector4([-0.5, 0, 0.0, 1]));
  console.log(p1.elements[0]);
  console.log(p1.elements[1]);
  console.log(p1.elements[2]);
  console.log(p1.elements[3]);
  console.log("");

  var p2 = matrixView.multiplyVector4(new Vector4([-0.5, 0, 0.0, 1]));
  p3 = matrixProj.multiplyVector4(p2);
  console.log(p3.elements[0]);
  console.log(p3.elements[1]);
  console.log(p3.elements[2]);
  console.log(p3.elements[3]);
  console.log("");

  var p4 = matrixProj.multiplyVector4(new Vector4([-0.5, 0, 0.0, 1]));
  p5 = matrixView.multiplyVector4(p4);
  console.log(p5.elements[0]);
  console.log(p5.elements[1]);
  console.log(p5.elements[2]);
  console.log(p5.elements[3]);
  console.log("");

/*
  console.log("");
  console.log("---   ---   ---   ---");
  console.log("");

  var p2 = m2.multiplyVector3(new Vector3([-0.5, 0, 0]));
  console.log(p2.elements[0]);
  console.log(p2.elements[1]);
  console.log(p2.elements[2]);
  console.log("");
*/
}

//   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---   ---

function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([
    // Vertex coordinates and color
     0.0,  0.5,  -0.4,  0.4,  1.0,  0.4, // The back green one
    -0.5, -0.5,  -0.4,  0.4,  1.0,  0.4,
     0.5, -0.5,  -0.4,  1.0,  0.4,  0.4, 
   
     0.5,  0.4,  -0.2,  1.0,  0.4,  0.4, // The middle yellow one
    -0.5,  0.4,  -0.2,  1.0,  1.0,  0.4,
     0.0, -0.6,  -0.2,  1.0,  1.0,  0.4, 

     0.0,  0.5,   0.0,  0.4,  0.4,  1.0,  // The front blue one 
//    -0.5, -0.5,   0.0,  0.4,  0.4,  1.0,
    -0.5, -0.0,   0.0,  0.4,  0.4,  1.0,
     0.5, -0.5,   0.0,  1.0,  0.4,  0.4, 
  ]);
  var n = 9;

  // Create a buffer object
  var vertexColorbuffer = gl.createBuffer();  
  if (!vertexColorbuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Write vertex information to buffer object
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorbuffer);
  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);

  var FSIZE = verticesColors.BYTES_PER_ELEMENT;
  // Assign the buffer object to a_Position and enable the assignment
  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if(a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FSIZE * 6, 0);
  gl.enableVertexAttribArray(a_Position);
  // Assign the buffer object to a_Color and enable the assignment
  var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if(a_Color < 0) {
    console.log('Failed to get the storage location of a_Color');
    return -1;
  }
  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3);
  gl.enableVertexAttribArray(a_Color);

  return n;
}

var g_EyeX = 0.0, g_EyeY = 0.0, g_EyeZ = 1.0; // Eye position
function keydown(ev, gl, n, u_ViewMatrix, viewMatrix) {
    if(ev.keyCode == 39) { // The right arrow key was pressed
      g_EyeX += 0.01;
    } else 
    if (ev.keyCode == 37) { // The left arrow key was pressed
      g_EyeX -= 0.01;
    } else { return; } // Prevent the unnecessary drawing
    draw(gl, n, u_ViewMatrix, viewMatrix);    
}

function draw(gl, n, u_ViewMatrix, viewMatrix) {
  // Set the matrix to be used for to set the camera view
  viewMatrix.setLookAt(g_EyeX, g_EyeY, g_EyeZ, 0, 0, 0, 0, 1, 0);

  // Pass the view projection matrix
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Draw the rectangle
  gl.drawArrays(gl.TRIANGLES, 0, n);


  var nf = document.getElementById('nearFar');
  nf.innerHTML = 'g_EyeX: ' + Math.round(g_EyeX * 100) /100;
}

