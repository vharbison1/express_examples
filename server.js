const config =
{
    host: 'localhost',
    port: 5432,
    database: 'restaurants',
    user: 'postgres',
    password: 'Pokemon1'
};

var express = require('express');
var bodyParser = require('body-parser');

//Promise and Sanitize input to prevent unexpected queries into data-base
const pgp = require('pg-promise')();
const db = pgp(config);

//Start Server
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/restaurants/:id', function(req, res){
    let id = req.params.id;

        db.query(`SELECT * FROM restaurants WHERE id=${id}`)    
            .then((results) => {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(results));
                })
            .catch((e) => {
                console.error(e);
                });
});

/* app.get('/api/restaurants', function(req, res){
    db.query('SELECT * FROM restaurants')
        .then((results) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(results));
            })
        .catch((e) => {
             console.error(e);
            });
}); */

/* app.post('/api/restaurants', function(req,res)
{
    let name = req.body.name;
    
    db.result(`INSERT INTO restaurants(name) VALUES ('${name}')`)
    .then((result) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
    })
    .catch((e) => {
        console.error(e);
    });
}) */

app.post('/api/restaurants', function (req, res) {
    let data = {
      name : req.body.name,
      address_line1 : req.body.address_line1,
      city : req.body.city
    };

    let query = "INSERT INTO restaurants(name, address_line1, city) VALUES (${name}, ${address_line1}, ${city})";
    db.result(query, data)
      .then((result) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      })
      .catch((e) => {
        console.error(e);
      });
  });

  app.put('/api/restaurants/:id', function(req,res)
  {

    let id = req.params.id;

    let data = {
      id : id,
      name : req.body.name,
      address_line1 : req.body.address_line1,
      city : req.body.city,
      state : req.body.state,
      zip : req.body.zip
    };

    let query = "UPDATE restaurants SET name=${name}, address_line1=${address_line1} WHERE id=${id}";
    db.result(query, data)
    .then((result) => {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    })
    .catch((e) => {
      console.error(e);
    });

  });

  app.delete('/api/restaurants/', function(req, res)
  {
      let id = req.body.id;

      let query = `DELETE FROM restaurants WHERE id=${id}`;
      db.result(query)
      .then((result) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      })
      .catch((e) => {
        console.error(e);
      });
  });


app.listen(3000, function(){
    console.log('Todo List API is now listening on port 3000...');
})

/* db.query('SELECT * FROM restaurants')
  .then((results) => {
    results.forEach((row) => {
      console.log(row);
      console.log(row.id, row.name);
    })
  })
  .catch((e) => {
    console.error(e);
  });

  db.result("INSERT INTO restaurants(name) VALUES ('Burger King')")
   .then((result) => {
       console.log(result);
   })
   .catch((e) => {
      console.error(e);
    }); */