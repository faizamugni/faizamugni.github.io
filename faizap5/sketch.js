var firebaseConfig = {
   apiKey: "AIzaSyDSqXnTnt3uVQTfLjz01ywrYptiA_5EkJg",
   authDomain: "faizap5.firebaseapp.com",
   databaseURL: "https://faizap5.firebaseio.com",
   projectId: "faizap5",
   storageBucket: "",
   messagingSenderId: "226563349858",
   appId: "1:226563349858:web:80ea99dd1a992d86"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
let database = firebase.database()
 
let scoreboard = {  }
let name2 = document.getElementById("names")
let x
let y

let a
let b 

let score;

let enemy;

let level;
let radius

let time;

function setup() {
  createCanvas(windowWidth, windowHeight);
  s= width/ 944
  x= 4
  y= 8
  
  a= 5
  b= 300
  
  c=[70,40,60,90,80,50]
  d=[100,300,500,700,600,100]
  
  score= 0

  enemy=3
  
  level= 1
  radius = 60
  
  time= 10
  
  
}

function draw() {

  if (time> 0) {
  background(255,128,255);
  fill(255, 0, 0)
  textSize(40)
  time = time - 0.05
  text("score: " + score, 500, 80)
   text("level: " + level, 500, 150)
  text("time: " + time.toFixed(0), 500, 115)
  circle(x* s, y, 60)
  //x= x+1
  if (score>=90 && level == 1) {
    level= 2
    score= 0
    enemy= enemy + 3
    radius=20 
  }

  
  if (score>=50 && level == 2) {
    level= 3
    score= 0
    enemy= enemy + 3
    radius=40
  }
    
  if (score>=80 && level == 3) {
    level= 4
    score= 0
    enemy= enemy + 3
    radius=60
  }
  
  if (dist( x, y, a, b) < 60 + 80) {
	score = score + 1
  }
  
if (keyIsDown(LEFT_ARROW)) {
    x = x - 8
  }
if (keyIsDown(RIGHT_ARROW)) {
    x = x + 8
  }
if (keyIsDown(UP_ARROW)) {
    y = y - 8
  }
if (keyIsDown(DOWN_ARROW)) {
    y = y + 8
  }

fill(0, 128, 0)
circle(a* s, b, 80)
  a= a+5

if ( a > width) {
	a= 0
}

 for (i=0; i<enemy; i=i+1) {
   fill(0, 0, 255)
circle(c[i]* s, d[i], radius)
  c[i]= c[i]+6
    if (dist( c[i], d[i], x, y) < radius + 30) {
	score = score - 1
    }
if ( c[i] > width) {
	  c[i]= 0
  }
 }
  }

  else {
    name2.innerHTML = "Name? <input id= 'something'><button onclick='restart()'>Restart</button> <button onclick= 'generate_alltime_leaderboard()'>all time leaderboard</button>"
    noLoop()

  }
  

}

function restart() { 
        let something = document.getElementById("something")
		name = something.value 
		database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
alert("Scoreboard: " +JSON.stringify(scoreboard,null,1)) 
        s= width/ 944
        x= 4
        y= 8
  
        a= 5
        b= 300
  
        c=[70,40,60,90,80,50]
        d=[100,300,500,700,600,100]
  
        score= 0

        enemy=3
  
        level= 1
        radius = 60
  
        time= 10
		loop()
		name2.innerHTML = ""
        generate_leaderboard()
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function(data) {
		alltime_leaderboard[data.key] = data.val()
		});
    	});
	if (Object.values(alltime_leaderboard).length > 0) {
	  alert("All-time leaderboard: " + JSON.stringify(alltime_leaderboard,null,1))
    	}
}

generate_alltime_leaderboard()
