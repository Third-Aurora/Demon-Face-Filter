//@input Component.FaceStretchVisual faceStretch
//@input Component.FaceMaskVisual faceMask
//@input Component.RenderMeshVisual mouth
//@input Component.LiquifyVisual liquify

script.createEvent("UpdateEvent").bind(Update);
script.createEvent("MouthOpenedEvent").bind(MouthOpened);
script.createEvent("MouthClosedEvent").bind(MouthClosed);

var desiredIntensity = 0;

function MouthOpened(){
    desiredIntensity = 1;
}

function MouthClosed(){
    desiredIntensity = 0;
}

function Update(){
    var currIntensity = script.faceStretch.getFeatureWeight("Feature0");
    var intensity = lerp(currIntensity,desiredIntensity, getDeltaTime() * 4);
    script.faceStretch.setFeatureWeight("Feature0", intensity);
    script.faceMask.mainMaterial.mainPass.baseColor = new vec4(1, 1, 1, intensity);
    script.mouth.mainMaterial.mainPass.baseColor = new vec4(.15, .15, .15, intensity);
    script.liquify.radius = intensity * 4;
}

function lerp(start, end, t){
    return start * (1 - t) + end * t;
}