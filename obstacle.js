class Obstacle{
	

	color = "#e7ff00";
	
	constructor(sizee,mouseX,mouseY){
		this.sizee = 1*sizee;
		this.position = createVector(mouseX,mouseY);
		
	}
	drawObstacle(){
		push();
		translate(this.position.x,this.position.y);
		fill(this.color);
		circle(0,0,this.sizee);
		pop();
	}
}