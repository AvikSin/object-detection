img="";
status="";
objects=[]
function preload()
{
    img=loadImage("img5.jfif")
}

function setup()
{
    canvas = createCanvas(640 ,420)
    canvas.center()
    objectdetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";
}

function modelLoaded()
{
    console.log("modelLoaded");
    status=true;
    objectdetector.detect(img,gotResult);
}

function gotResult(error,results)
{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log(results)
        objects=results
    }
}
function draw()
{
    image(img ,0 ,0,640 ,420)
    if(status!="")
    {
        for(var i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="status:object detected";
            fill ("green");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);noFill();
            stroke("blue");
             rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}