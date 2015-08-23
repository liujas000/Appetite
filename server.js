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
  // fs.readFile('comments.json', function(err, data) {
  //   res.setHeader('Cache-Control', 'no-cache');
  //   res.json(JSON.parse(data));
  // });
});

app.post('/getRestaurants', function(req, res) {

  yelp.search({
    term: req.body.term,
    sort: req.body.sort, 
    location: req.body.location, 
    radius_filter: req.body.radius_filter,
    category_filter: req.body.category_filter    
  }, function(error, data) {
    if(error) {
      console.log(error);
      res.sendStatus(500);
    } else {
      res.status(200).send(data);
    }
  })
  // fs.readFile('comments.json', function(err, data) {
  //   var comments = JSON.parse(data);
  //   comments.push(req.body);
  //   fs.writeFile('comments.json', JSON.stringify(comments, null, 4), function(err) {
  //     res.setHeader('Cache-Control', 'no-cache');
  //     res.json(comments);
  //   });
  // });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
