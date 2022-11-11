(function() {

var open_prototype = XMLHttpRequest.prototype.open;
var intercept_response = function(urlpattern, callback) {
   XMLHttpRequest.prototype.open = function() {
      arguments['1'].match(urlpattern) && this.addEventListener('readystatechange', function(event) {
         if ( this.readyState === 4 ) {
            var response = callback(event.target.responseText);
            Object.defineProperty(this, 'response',     {writable: true});
            Object.defineProperty(this, 'responseText', {writable: true});
            this.response = this.responseText = response;
         }
      });
      return open_prototype.apply(this, arguments);
   };
};

intercept_response(/https:\/\/twitter\.com\/i\/api\//i, function(response) {
   return response.replaceAll('is_blue_verified":true' , 'is_blue_verified":false');
});

})();