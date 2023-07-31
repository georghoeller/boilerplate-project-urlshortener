require('dotenv').config();
const express = require('express');
const bodyParser   = require('body-parser');
const dns = require('node:dns');
const urlparser = require('url');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 8080;

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


// I can also make it with mongoDB
// https://www.youtube.com/watch?v=VP_FOwmGH44

// URL SHORTENER
let urlList = [];
app.post('/api/shorturl', function(req, res,next) {

  const bodyURL = req.body.url;

  dns.lookup(urlparser.parse(bodyURL).hostname, (err, address, family) => {

    // console.log('typeof address',typeof address)
    console.log('address: %j family: IPv%s', address, family);
    // console.log('error present?',err);

    if (!address) {

      console.log(err)
      res.json({ error: 'invalid url' });

    } else {
      
      const short_url_id = urlList.length+1;
      urlList.push( {
        short_url_id: short_url_id,
        original_url:bodyURL
      });
    
      console.log('urlList',urlList)
      console.log('urlList',urlList[0])
    
    
      console.log('continuing...')
      res.json({ 
        original_url : bodyURL,
        short_url : short_url_id 
      });
    }
  });


  
// } ,function(req,res){
  // console.log('continuing in the next...')
  // res.json({ error: 'invalid url' });

});

app.get('/api/shorturl/:short_url',function(req,res,next){

  var short_url_id = req.params.short_url-1;
  var redirectURL = urlList[short_url_id].original_url;

  console.log('GET short_url_id',short_url_id)
  console.log('GET urlList',urlList)
  console.log('GET redirectURL',redirectURL)

  res.redirect(redirectURL);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
