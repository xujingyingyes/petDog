var express = require('express')
var app = express()
var request = require('request')
var ejs = require('ejs')
var env = {
   dev:'http://api.sy6.com/eurekaFrontBK',
  test:'http://api.shangyingjr.com/eurekaFrontBK',
  pre:'http://api.shangyingjf.com/eurekaFrontBK',
  prod:'https://api.sy8.com/eurekaFrontBK',
}[process.argv[2]]

var f = '';
var fa = '';
if(process.argv[2] !='dev'){
  f = '/seo';
  fa = '/';
}
app.set('view engine', 'ejs')
app.get(['/', '/list'], function(req, res) {
  res.redirect(f+'/list/1');
})

app.get(fa+'/list/:id', function(req, res) {
  var page = req.params.id || 1;
  request({
    headers: {
      client:1
    },
    url: env + '/api/content/fanincial/list?iPage=' + page,
  }, function(error, response, body) {
    console.log(response);
    if (response.statusCode == 200) {
      var $res = JSON.parse(response.body);
      var size;
      if ($res.resCode === '0000') {
        size = Math.ceil($res.resultCount / $res.pageSize);
        if (!$res.resultList.length) {
          return res.redirect(f+'/list/1');
        }
        console.log('get list 200')
        res.render('page/list', { list: $res.resultList, size: size });
      } else {
        res.send('error')
      }
    }else{
      console.log('error:',response.statusCode)
    }
  }
  );
})

app.get(fa+'/detail/:id', function(req, res) {
  request({
    headers: {
      client:1
    },
    url: env+'/api/content/fanaical/detail?id=' + req.params.id
  }, function(error, response, body) {
    if (response.statusCode == 200) {
      var $res = JSON.parse(response.body);
      // res.redirect(f+'/detail/'+$res.data.id);
      console.log('get detail 200')
      res.render('page/detail', { detail: $res.data });
    } else {
      console.log('error: ' + response.statusCode)
    }

  })
})
app.listen(90)
