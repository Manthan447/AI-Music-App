song_1 = "";
song_2= "";
song_1_status = "";
song_2_status = "";
leftwrist_x = 0; 
leftwrist_y = 0;
rightwrist_x = 0;
rightwrist_y = 0;
scoreleftwrist = 0;
scorerightwrist = 0;


function preload() { song_1 = loadSound("music.mp3");
song_2 = loadSound("music2.mp3");
}


function setup(){
canvas = createCanvas(600,500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video , modelLoaded);
poseNet.on('pose',gotPoses);
}

function draw(){
    image(video,0,0,600,500);
    song_1_status = song_1.isPlaying();
    song_2_status = song_2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(scorerightwrist >0.2){
        circle(rightwrist_x , rightwrist_y, 20);
        song_2.stop();
        if(song_1_status == false){
            song_1.play();
            document.getElementById("song_name").innerHTML = "Playing Dj music";
        }
    }   
    
    if(scoreleftwrist > 0.2){   
        
    circle(leftwrist_x,leftwrist_y,20);
    song_1.stop();
    if(song_2_status == false){
        song_2.play();
        document.getElementById("song_name").innerHTML = "Playing Peter Pan music";
    }
    }
}


function modelLoaded(){
    console.log("Posenet is intialized");
}

function gotPoses(results){
    if(results.length>0) 
    {
        console.log(results);
         scoreleftwrist = results[0].pose.keypoints[9].score;
         scorerightwrist = results[0].pose.keypoints[10].score;
         console.log("Right wrist Score = " + scorerightwrist);
         console.log("Left Wrist Score = " + scoreleftwrist);
        leftwrist_x = results[0].pose.leftWrist.x; 
        leftwrist_y = results[0].pose.leftWrist.y;
        rightwrist_x = results[0].pose.rightWrist.x;
        rightwrist_x = results[0].pose.rightWrist.y;
        
        console.log("leftwrist_x = " + leftwrist_x + "leftwrist_y = "+ leftwrist_y);
        console.log("rightwrist_x = " + rightwrist_x + "rightwrist_y = "+ rightwrist_y);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}