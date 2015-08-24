/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var when = require('when');
var yelp = require("yelp").createClient({
    "consumer_key": "jIYW8uxC8VurEH7yOWdSzA",
    "consumer_secret":  "MxyA-cFMyW7pex9Ps0TAJ0_KIv4",
    "token":  "4Ttp3qLN7vOr5d_O2H_ljepUTkOOnlGk",
    "token_secret": "9zp_SHdyAwjdBna26gIL2VeDmNA"
});
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/comments.json', function(req, res) {
  yelp.search({term: "food", location: "4334 17th Street San Francisco CA 94114"}, function(error, data) {
    console.log(error);
    console.log(data);
    res.send(data);
  });
});

//http://www.yelp.com/search?find_desc=Food&find_loc=444+Townsend+St%2C+San+Francisco%2C+CA&ns=1#start=0&attrs=RestaurantsPriceRange2.4


app.post('/getRestaurants', function(req, res) {

  yelp.search({
    term: req.body.term,
    limit: 20,
    sort: req.body.sort, 
    location: req.body.location, 
    radius_filter: req.body.radius_filter,
    category_filter: req.body.category_filter
    //attrs: 'RestaurantsPriceRange2.4'    
  }, function(error, data) {
    if(error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      var result = findThreeBasic(data.businesses, req.body);
      console.log('result is:', result);
      res.status(200).send({arr: result});

      // when(findThreePromise(data.businesses, req.body))
      //   .then(function(arr) {
      //     res.status(200).send(arr);
      //   })
      //   .otherwise(function(err) {
      //     res.status(500).send(err);
      //   })
    }
  })
});

findThreeBasic = function(businesses, conditions) {
  var result = [];
  var chosen = [];
  console.log("businesses:", businesses);
  while(result.length < 3) {
    //Pick a random int from 0 to businesses.length - 1
    var index = Math.floor(Math.random() * businesses.length);
    var next_business = businesses[index];
    console.log("next businesses!")
    var name = next_business.name;
    var site = next_business.url;
    if(chosen.indexOf(name) === -1) {
      result.push(next_business);
      chosen.push(name);
      businesses.splice(index, 1);
    }
  }
  return result;
}


findThreePromise = function(businesses, conditions) {
  var deferred = when.defer();
  var result = [];
  var chosen = [];
  while(result.length < 3) {
    //Pick a random int from 0 to businesses.length - 1
    var index = Math.floor(Math.random() * businesses.length);
    var next_business = businesses[index];
    var name = next_business.name;
    var site = next_business.url;
    if(chosen.indexOf(name) === -1) {
      result.push(next_business);
      chosen.push(name);
      businesses.splice(index, 1);
    }
    //Make a request to the site
    //Parse for price
  }
  return deferred.promise;
}


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
