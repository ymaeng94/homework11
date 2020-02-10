const express = require ("express");
const path = require ("path");
const fs = require ("fs");
const app = express ();
const PORT = 3000;

let noteData = [];

app.use(express.urlencoded ({ exrended: true }));
app.use(express.json());



// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "view.html"));
// });
// app.get("/add", function(req, res) {
//   res.sendFile(path.join(__dirname, "add.html"));
// });



app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/notes", function(req, res) {
  return res.sendFile(path.json(__dirname, "db.json"));
});







// app.get("/api/notes", function(req, res) {
//   return res.json(characters);
// });

// // Displays a single character, or returns false
// app.get("/api/notes", function(req, res) {
//   var chosen = req.params.character;

//   console.log(chosen);

//   for (var i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });






app.get("/api/notes", function(err, res) {
    try {
        noteData = fs.readFileSync("db.json","utf8")
        noteData = JSON.parse(noteData);
    }
    catch (err) {
    }
    res.json(noteData);
}); 





// app.post("/api/characters", function(req, res) {

//   var newcharacter = req.body;

//   console.log(newcharacter);


//   characters.push(newcharacter);

//   res.json(newcharacter);
// });






app.post("/api/notes", function(req, res) {
    try {

      notesData = fs.readFileSync("db.json", "utf8");

      noteData = JSON.parse(noteData);

      req.body.id=noteData.length;

      noteData.push(req.body);

      noteData = JSON.stringify(noteData);

      fs.writeFile("db.json",noteData, "utf8",function(err){
        if(err) throw err;
      });
      res.json(JSON.parse(noteData));

    } catch (err) {
      throw err;
    }
  });














  app.delete("/api/notes/:id", function(req,res) {

    try {
      noteData = fs.readFileSync("db.json","utf8");
      noteData = JSON.parse(noteData);
      noteData = notesData.filter(function(note){
        return note.id != req.params.id;
      });
    noteData = JSON.stringify(notesData);
    fs.writeFile("db.json",notesData, "utf8", function(err){
      if(err) throw err;
    });

    res.send(JSON.parse(notesData));

    } catch (err) {
      throw err;
    }
  });










  app.listen(PORT, function() {
  console.log("SERVER IS LISTENING: " + PORT);
  });      

