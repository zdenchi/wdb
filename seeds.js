const mongoose = require('mongoose');
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const comment = require('./models/comment');

const data = [
  {
    name: "Auschwitz",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/74/Auschwitz-Work_Set_Free-new.JPG",
    description: "The Auschwitz concentration camp was a complex of over 40 concentration and extermination camps operated by Nazi Germany in occupied Poland during World War II and the Holocaust. It consisted of Auschwitz I, the main camp (Stammlager) in Oświęcim; Auschwitz II-Birkenau, a concentration and extermination camp built with several gas chambers; Auschwitz III-Monowitz, a labor camp created to staff a factory for the chemical conglomerate IG Farben; and dozens of subcamps. The camps became a major site of the Nazis' Final Solution to the Jewish Question."
  },
  {
    name: "Buchenwald",
    image: "https://veliky-novgorod.sm.news/wp-content/uploads/2020/05/08/9m-3-1300x675.jpg",
    description: "Buchenwald was a Nazi concentration camp established on Ettersberg [de] hill near Weimar, Germany, in July 1937. It was one of the first and the largest of the concentration camps within Germany's 1937 borders. Many actual or suspected communists were among the first internees."
  },
  {
    name: "Dachau",
    image: "https://holidaygid.ru/wp-content/uploads/2012/05/Dachau4.jpg",
    description: "Dachau was the first of the Nazi concentration camps opened in 1933, which was initially intended to hold political prisoners. It is located on the grounds of an abandoned munitions factory northeast of the medieval town of Dachau, about 16 km (10 mi) northwest of Munich in the state of Bavaria, in southern Germany. After its opening by Heinrich Himmler, its purpose was enlarged to include forced labor, and, eventually, the imprisonment of Jews, German and Austrian criminals, and finally foreign nationals from countries that Germany occupied or invaded. The Dachau camp system grew to include nearly 100 sub-camps, which were mostly work camps or Arbeitskommandos, and were located throughout southern Germany and Austria. The main camp was liberated by U.S. forces on 29 April 1945."
  }
];

function seedDB() {
  //Remove all campgrounds
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("removed campgrounds!");
    //add a few campgrounds
    data.forEach(seed => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          //create a comment
          Comment.create(
            {
              text: "This place is great, but I wish there was internet",
              author: "Homer"
            }, (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment");
              }
            }
          );
        }
      });
    });
  });
   //add a few comments
}

module.exports = seedDB;
