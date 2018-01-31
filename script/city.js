THREE.City = function(options){

  THREE.Object3D.call(this);
  this.name = "city_" + this.id;
  options = options || {};

  function params(value, defaultValue){
    return value !== undefined ? value : defaultValue;
  }

  this.baseModelPath = params(options.baseModelPath, "/models/" );
  this.modelPath = params(options.modelPath, [] );

  this.firstLevel = params(options.firstLevel, []);
  this.secondLevel = params(options.secondLevel, []);
  this.thirdLevel = params(options.thirdLevel, []);

  this.firstLayerObject = params(options.firstLayerObject, []);
  this.secondLayerObject = params(options.secondLayerObject, []);
  this.thirdLayerObject = params(options.thirdLayerObject, []);
  this.firstLayerTexture = params(options.firstLayerTexture, []);
  this.secondLayerTexture = params(options.secondLayerTexture, []);
  this.thirdLayerTexture = params(options.thirdLayerTexture, []);

  this.loading();

  this.material = new THREE.MeshBasicMaterial({
  });

  this.mesh = new THREE.Object3D();
};

THREE.City.prototype = Object.create(THREE.Object3D.prototype);

THREE.City.prototype.loading = async function(){

    var loading = document.createElement("div");
    loading.style.position = "absolute";
    loading.className = "loading";
    loading.style.top = "0px";
    loading.style.left = "0px";
    loading.style.width = "100vw";
    loading.style.height = "100vh";
    loading.style.background = "rgba(255, 255, 255, 0.7)";
    loading.style.color = "black";
    loading.style.zIndex = 1000000000000;

    var loadingText = document.createElement("h1");
    loadingText.className = "text";
    loadingText.style.display = "flex";
    loadingText.style.alignItems = "center";
    loadingText.style.justifyContent = "center";
    loadingText.style.width = "100%";
    loadingText.style.height = "100%";
    loadingText.style.color = "black";
    loading.appendChild(loadingText);
    document.body.appendChild(loading);



    function onProgress( xhr ) {
      if ( xhr.lengthComputable ) {
        var percentComplete = xhr.loaded / xhr.total * 100;
        var text = document.getElementsByClassName("text")[0];
        text.innerHTML = Math.round(percentComplete, 2) + '% Downloaded';
      }
    };

    function onError( xhr ) { };

    function loadingFadeOut(element) {

        var op = 1;  // initial opacity
        var timer = setInterval(function () {
            if (op <= 0.1){
                clearInterval(timer);
                element.style.display = 'none';
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op -= op * 0.1;
        }, 50);
    }

    var objLoader = new THREE.OBJLoader();
    var mtlLoader = new THREE.MTLLoader();

    function loadObj(index){

        var modelPath = this.modelPath[index];
        var baseModelPath = this.baseModelPath;
        var mtl = this.thirdLayerTexture[index];

        return new Promise(function(resolve, reject){
            objLoader.setPath( baseModelPath + modelPath + "/" );
            mtlLoader.setTexturePath( baseModelPath + modelPath + "/" );
            mtlLoader.setPath( baseModelPath + modelPath + "/" );

            mtlLoader.load( mtl, function( materials ) {
                resolve(materials);
            });
        });

    }

    function loadMtl(index, materials){

        var obj = this.thirdLayerObject[index];
        return new Promise(function(resolve, reject){

            materials.preload();
            objLoader.setMaterials( materials );
            objLoader.load( obj, function ( object ) {
                scene.add( object );
                resolve("success");
            }, onProgress, onError );

        })
    }

    for (var i = 0 ; i < this.thirdLayerObject.length ; i++){
        var materials = await loadObj.call(this, i);
        await loadMtl.call(this, i, materials);
    }
    loadingFadeOut(document.getElementsByClassName("loading")[0]);

}

THREE.City.prototype.render = function(options, camera){

      options = options || {};

      function params(value, defaultValue){
        return value !== undefined ? value : defaultValue;
      }

      // if (camera.position.y > this.firstBoundary){
      //     this.root
      // }
};
