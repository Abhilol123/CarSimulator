class Boundary {
	constructor(x1, y1, x2, y2) {
		this.point1 = { x: x1, y: y1 };
		this.point2 = { x: x2, y: y2 };
	}

	touch(boundary) {
		let p1 = this.point1;
		let p2 = this.point2;
		let p3 = boundary.point1;
		let p4 = boundary.point2;
		let den = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
		let t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / den;
		let u = -((p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x)) / den;
		if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
			return ({
				x: ((p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x) - (p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x)) / den,
				y: ((p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x)) / den
			});
		}
		return false;
	}

	draw(r, g, b, a) {
		push();
		stroke(r, g, b, a);
		strokeWeight(2);
		line(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
		pop();
	}
}
