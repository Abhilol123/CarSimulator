const w = 800;
const h = 800;
const initialXPos = w / 2;
const initialYPos = h / 2;
const numberOfRays = 50;
const stopIfCollision = true;

let car;
let temp = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
let temp1 = { x: 0, y: 0 };
let notPressed = true;
let boundary = [];

function setup() {
	createCanvas(w, h);
	car = new Car(initialXPos, initialYPos, numberOfRays);
	boundary.push(new Boundary(0, 0, w, 0));
	boundary.push(new Boundary(w, 0, w, h));
	boundary.push(new Boundary(w, h, 0, h));
	boundary.push(new Boundary(0, h, 0, 0));
}

function draw() {
	background(51);

	// handle car controls
	if (keyIsPressed) {
		switch (key) {
			case "w":
			case "ArrowUp":
				car.gas();
				break;
			case "s":
			case "ArrowDown":
				car.brake();
				break;
			case "a":
			case "ArrowLeft":
				car.rotateLeft();
				break;
			case "d":
			case "ArrowRight":
				car.rotateRight();
				break;
			default:
				car.angVelocity = 0;
				break;
		}
	} else {
		car.angVelocity = 0;
	}

	// draw everything
	car.update();
	car.draw();
	for (let i = 0; i < boundary.length; i++) {
		boundary[i].draw(255, 255, 255, 255);
	}

	// check for collision
	for (let i = 0; i < boundary.length; i++) {
		for (let j = 0; j < 4; j++) {
			if (car.boundary[j].touch(boundary[i])) {
				if (stopIfCollision) noLoop();
			}
		}
	}

}

function mousePressed() {
	// add boundary
	if (notPressed) {
		temp1.x = mouseX;
		temp1.y = mouseY;
		notPressed = false;
	} else {
		temp[0].x = temp1.x;
		temp[0].y = temp1.y;
		temp[1].x = mouseX;
		temp[1].y = mouseY;
		temp1.x = mouseX;
		temp1.y = mouseY;
		boundary.push(new Boundary(temp[0].x, temp[0].y, temp[1].x, temp[1].y));
		notPressed = true;
	}
}
