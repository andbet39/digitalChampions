app.controller("homeController", function($scope, $ionicModal, $cordovaCamera,$cordovaSocialSharing) {
  console.log("Home controller");


   $scope.shareAnywhere = function() {

      var canvas = document.getElementById('photoCanvas');
      var context = canvas.getContext('2d');

      var image = canvas.toDataURL('image/png');
      console.log(image);
        $cordovaSocialSharing.share("This is your message", "This is your subject", image, "http://blog.nraboy.com");
    }


  $scope.drawPic = function() {
    var canvas = document.getElementById('photoCanvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    
    imageObj.src = 'http://placehold.it/1080x1920/226622/000000';
    

    console.log("offsetWidth :" + canvas.offsetWidth);
    console.log("offsetHeight:" + canvas.offsetHeight);
    
    imageObj.onload = function() {
      context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, // source rectangle
        0, 0, canvas.width, canvas.height);

        var ratio = canvas.width/imageObj.width;
        var stampImg = new Image();
        stampImg.src = 'img/epicFail.gif';
        console.log("ratio :" + ratio);
          stampImg.onload = function() {
            console.log("stampWidth :" + stampImg.width);
            console.log("stampHeight:" + stampImg.height);

            stampsizew = stampImg.width*ratio*2;
            stampsizeh = stampImg.height*ratio*2;

            context.drawImage(stampImg,(canvas.offsetWidth/2-stampsizew/2),
                                       (canvas.offsetHeight*0.8-stampsizeh/2),stampsizew,stampsizeh);
          }
          context.font = "48px serif";

          context.fillText($scope.frase, 10, 50);
    };
  }



  $ionicModal.fromTemplateUrl('photo.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function(info) {
    $scope.frase = info;
    $scope.modal.show();
    $scope.resizeCanvas();
    $scope.takePicture();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

 
  $scope.resizeCanvas= function() {
        var canvasPad = document.getElementById('photoCanvas');

                    var ratio = 1;//window.devicePixelRatio || 1;
                    canvasPad.width = canvasPad.offsetWidth * ratio;
                    canvasPad.height = canvasPad.offsetHeight * ratio;
                    canvasPad.getContext("2d").scale(ratio, ratio);
                };



  $scope.takePicture = function() {
    console.log("Take picture");
    
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: 2, //Camera.PictureSourceType.CAMERA,//Camera.PictureSourceType.LIBRARY,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 1080,
      targetHeight: 1920,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      $scope.imgURI = "data:image/jpeg;base64," + imageData;
      var canvas = document.getElementById('photoCanvas');
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);

      var imageObj = new Image();
      imageObj.src = "data:image/jpeg;base64," + imageData;
      imageObj.onload = function() {
          context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, // source rectangle
                                      0, 0, canvas.width, canvas.height);
        var ratio = canvas.width/imageObj.width;
        var stampImg = new Image();
        stampImg.src = 'img/epicFail.gif';
        console.log("ratio :" + ratio);
          stampImg.onload = function() {
            console.log("stampWidth :" + stampImg.width);
            console.log("stampHeight:" + stampImg.height);

            stampsizew = stampImg.width*ratio*2;
            stampsizeh = stampImg.height*ratio*2;

            context.drawImage(stampImg,(canvas.offsetWidth/2-stampsizew/2),
                                       (canvas.offsetHeight*0.8-stampsizeh/2),stampsizew,stampsizeh);
          }
          context.font = "48px serif";

          context.fillText($scope.frase, 10, 50);

      };

      

    }, function(err) {
      // An error occured. Show a message to the user
    });
  }

});