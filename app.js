const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const request = require('request');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  const campTemporaryDB = [
    {name: "Bishop group site", image: "https://live.staticflickr.com/4101/4752592043_6928ab3abe_k.jpg"},
    {name: "Orgo Campground", image: "https://live.staticflickr.com/4082/4753232364_406669131e_k.jpg"},
    {name: "Rolo Campground", image: "https://live.staticflickr.com/3246/2699036037_c4b5680b60_k.jpg"},
    {name: "Bis Campground", image: "https://live.staticflickr.com/1276/968007658_ff6574c532_k.jpg"},
    {name: "Laguna Campground", image: "https://live.staticflickr.com/8467/28750581650_02f8489f16_k.jpg"},
    {name: "Leo Carillo Campground", image: "https://live.staticflickr.com/3011/2997488895_37af05bdc0_k.jpg"},
    {name: "Kirk Creek Campground", image: "https://live.staticflickr.com/3191/3061337059_fe5950022c_k.jpg"},
    {name: "Siana Campground", image: "https://live.staticflickr.com/5597/15269411879_86a8bc43cc_k.jpg"},
    {name: "Luar Campground", image: "https://live.staticflickr.com/4423/37232133702_b8fbe71f97_k.jpg"},
    {name: "Camping at Occoneechee State Park", image: "https://live.staticflickr.com/3898/14445654425_3c9103d8d5_k.jpg"},
    {name: "Binf Campground", image: "https://live.staticflickr.com/7457/9586944536_aede975b9b_h.jpg"}
  ];

  res.render('campgrounds', {camps: campTemporaryDB});
});

// 404 - For non-existing page
app.get('*', (req, res) => res.send('404 Page Not Found'));

app.listen(3000, () => console.log('App start http://127.0.0.1:3000'));
