/*
    Simulation de dos semaforos y sensor usando FMS
    ITESS-TICS Francisco Javier Montecillo Puente
    diciembre 2024
*/

// model
class  TrafficLight {    
    #states = ['G', 'O', 'R'];
    #timeInState =[1,1,2];        // this numbers are related to the duration on a statel 'G' => 1 sec, 'O' => 2 sec
    #state;
    #time;
    constructor(iniitialState) {
        this.#state = iniitialState;
        this.#time = 0 ;
    }

    get state() {
        return this.#state;
    }

    update(deltaTime) {
        let index = this.#states.indexOf(this.#state);
        this.#time += deltaTime;
        // change next state autonomously
        if (this.#time > this.#timeInState[index]) {
            index = (index + 1) % 3
            this.#state = this.#states[index];            
            this.#time = 0;
        }
    }
}

class Sensor {
    #state
    constructor(state) {
        this.#state = state;
    }

    set state(state) {
        this.#state = state;
    }

    get state() {
        return this.#state;
    }
}
// model-view   : using compositon  separate "view"
class City {
    #canvas;
    #ctx;
    #trafficLight1;
    #trafficLight2
    
    constructor(canvas) {
        // canvas context
        this.#canvas = canvas;
        this.#ctx = canvas.getContext("2d");
        canvas.width = 800; //px
        canvas.height = 500; //px        

        // traffic lights
        this.#trafficLight1 = new TrafficLight("G");
        this.#trafficLight2 = new TrafficLight("R");

    }

    get trafficLight1State() {
        return this.#trafficLight1.state;        
    }

    get trafficLight2State() {
        return this.#trafficLight2.state;        
    }

    update(deltaTime) {
        this.#trafficLight1.update(deltaTime);
        this.#trafficLight2.update(deltaTime);
    }
    
    // drawing streets
    drawSteets() {
        this.#ctx.lineWidth = 2;
        this.#ctx.moveTo(0, 300);
        this.#ctx.lineTo(500, 300);
        this.#ctx.lineTo(500, 0);
        this.#ctx.moveTo(0, 400);
        this.#ctx.lineTo(500, 400);
        this.#ctx.lineTo(500, 500);

        this.#ctx.moveTo(800, 300);
        this.#ctx.lineTo(600, 300);
        this.#ctx.lineTo(600, 0);
        this.#ctx.moveTo(800, 400);
        this.#ctx.lineTo(600, 400);
        this.#ctx.lineTo(600, 500);
        this.#ctx.stroke();
    }

    drawTrafficLight1(state) {
        this.#ctx.strokeRect(580, 305, 30, 90);
        this.#ctx.beginPath();
        this.#ctx.arc(595, 320, 12, 0, 2 * Math.PI);        
        this.#ctx.stroke(); 
        if (state =='G') {
            this.#ctx.fillStyle = "green";
            this.#ctx.fill();
        } 
        
        this.#ctx.beginPath();
        this.#ctx.arc(595, 350, 12, 0, 2 * Math.PI);
        this.#ctx.stroke();
        if (state =='O') {
            this.#ctx.fillStyle = "orange";
            this.#ctx.fill();
        } 

        this.#ctx.beginPath();
        this.#ctx.arc(595, 380, 12, 0, 2 * Math.PI);
        this.#ctx.stroke();
        if (state =='R') {
            this.#ctx.fillStyle = "red";
            this.#ctx.fill();
        } 
    }

    drawTrafficLight2(state) {
        this.#ctx.strokeRect(505, 405, 90, 30);
        this.#ctx.beginPath();
        this.#ctx.arc(520, 420, 12, 0, 2 * Math.PI);        
        this.#ctx.stroke(); 
        if (state =='G') {
            this.#ctx.fillStyle = "green";
            this.#ctx.fill();
        } 
        
        this.#ctx.beginPath();
        this.#ctx.arc(550, 420, 12, 0, 2 * Math.PI);
        this.#ctx.stroke();
        if (state =='O') {
            this.#ctx.fillStyle = "orange";
            this.#ctx.fill();
        } 

        this.#ctx.beginPath();
        this.#ctx.arc(580, 420, 12, 0, 2 * Math.PI);
        this.#ctx.stroke();
        if (state =='R') {
            this.#ctx.fillStyle = "red";
            this.#ctx.fill();
        } 
    }

    drawLabels() {
        this.#ctx.font = "12px Arial";        
        this.#ctx.fillStyle = "black";
        this.#ctx.fillText("Traffic light 1", 605, 295);

        this.#ctx.fillStyle = "black";
        this.#ctx.fillText("Traffic light 2", 415, 415);

    }

    draw() {
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.drawSteets();
        this.drawTrafficLight1(this.#trafficLight1.state);
        this.drawTrafficLight2(this.#trafficLight2.state);

        this.drawLabels();

    }

    
}

// concurrency time thread 100 miliseconds
time = 0;
city = new City(document.getElementById("cityCanva"));
city.draw();

// controller
setInterval(simulationCity, 100);
function simulationCity() {
    time += 0.1;
    city.update(0.1);
    city.draw();
    console.log("current time: " + time);
    console.log("Traffic light state: " + city.trafficLight1State);
}