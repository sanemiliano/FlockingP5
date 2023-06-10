class Boid{
	
	
	color = "#3fd822";
	rotation = 0;

	constructor(sizee,initialPoint,id){
		this.width = 1*sizee;
		this.height = 2*sizee;
		this.position = createVector(initialPoint[0],initialPoint[1]);
		let plusOrMinus1 = Math.random() < 0.5 ? -1 : 1;
		let plusOrMinus2 = Math.random() < 0.5 ? -1 : 1;
		this.velocity = createVector((Math.random()*2)*plusOrMinus1,(Math.random()*2)*plusOrMinus2);
		this.minimumSeparation = 60;
		this.maxVelocity = 3;
		this.acceleration = createVector(0,0);
		this.id = id;
		this.cohesion = createVector(0,0);
		this.aligment = createVector(0,0);
		this.separation = createVector(0,0);
		this.friends = [];
		this.obstacles = [];
		this.referenceVec = createVector(0,-1);
		
	
	}

	sense(boids,friendsRadious,obstacles,obstacleDistance){
		this.acceleration.mult(0);
		this.friends = [];
		this.obstacles = [];
		for(let boid of boids){
			if(boid.id != this.id){
				if(this.position.dist(boid.position) < friendsRadious){
					this.friends.push(boid);
				}
			}
		}
		for(let obstacle of obstacles){
			if(this.position.dist(obstacle.position) < obstacleDistance){
				this.obstacles.push(obstacle);
			}
		}
	}
	decide(canvW,canvH){
		if(this.friends.length > 0){
			let cohesionWeight = document.getElementById("rangeCohesion").value;
			let aligmentWeight = document.getElementById("rangeAlignment").value;
			let separationWeight = document.getElementById("rangeSeparation").value;
			
	
			this.cohesion.mult(0);
			this.aligment.mult(0);
			this.separation.mult(0);

			let sepCount = 0;
 			for(let obstacle of obstacles){
				let auxVec = createVector(this.position.x,this.position.y);		
				auxVec.sub(obstacle.position);
				auxVec.normalize();
				auxVec.div(this.position.dist(obstacle.position));
				auxVec.mult(20);
				this.separation.add(auxVec);
			} 
			for(let friend of this.friends){
				this.cohesion.add(friend.position);	
 				this.aligment.add(friend.velocity);
				let distance = this.position.dist(friend.position);
				if(distance > 0 && distance < this.minimumSeparation){
					sepCount++;
					let auxVec = createVector(this.position.x,this.position.y);		
					auxVec.sub(friend.position);
					auxVec.normalize();
					auxVec.div(distance);
					this.separation.add(auxVec);
				} 
			}

			this.cohesion.div(this.friends.length);
			this.cohesion.sub(this.position);
			this.cohesion.x /= canvW;
			this.cohesion.y /= canvH;
			this.cohesion.mult(1);
			this.acceleration.add(this.cohesion);

 			this.aligment.div(this.friends.length);
			//this.aligment.sub(this.velocity);
			//this.aligment.normalize();
			this.aligment.div(8);
			this.acceleration.add(this.aligment);

			this.separation.div(sepCount);
			//this.separation.sub(this.velocity);
			//this.separation.normalize();
			//this.separation.div(5);
			this.acceleration.add(this.separation); 
		
		}
	}
	act(){
		push();
		this.velocity.add(this.acceleration);
		this.velocity.limit(1);
		this.rotation = this.velocity.angleBetween(this.referenceVec);
		this.position.add(this.velocity);
		translate(this.position.x,this.position.y);
		rotate(-this.rotation);
		fill(this.color);
		triangle(0,0,this.width,0,this.width/2,-this.height);
		pop();
	}
	
}

