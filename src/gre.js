// Swibe Gesture Recognition Engine
export default {
	// Check if the conditions are right to open the menu
	open({ startX, endX }) {
		this.openCond1 = startX < 20;
		this.openCond2 = endX > startX;

		return this.openCond1 && this.openCond2 ? true : false;
	},

	// Check if the conditions are right to close the menu
	close({ startX, startY, endX, endY }) {
		this.distX = endX - startX;
		this.distY = endY - startY;
		this.angle = ((Math.atan(this.distY / this.distX) * 180) / Math.PI) + 90;

		this.closeCond1 = endX < startX;
		this.closeCond2 = this.distY < 280;
		this.closeCond3 = this.distX < -30;
		this.closeCond4 = this.angle > (90 - 35);
		this.closeCond5 = this.angle < (90 + 35);

		return this.closeCond1 && this.closeCond2 && this.closeCond3 && this.closeCond4 && this.closeCond5 ? true : false;
	}
}
