var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('mydb.db');
var check;
db.serialize(function() {

    db.run('CREATE TABLE if not exists player (id INT, name TEXT, RFID TEXT)');
    db.run('CREATE TABLE if not exists game (id INT, startTimestamp TEXT, endTimestamp TEXT)');
    db.run('CREATE TABLE if not exists frameResults (videoId INT, gameId INT, frameTimestamp TEXT, X REAL, Y REAL)');
    db.run('CREATE TABLE if not exists gameplayer (gameId INT, playerId INT, win INT, position INT)');
    db.run('CREATE TABLE if not exists sensorResults (gameId INT, sensorType INT, timestamp TEXT)');
    db.run('CREATE TABLE if not exists frameResults (gameId INT, timestamp TEXT, x INT, y INT, videoId INT)');
    db.run('CREATE TABLE if not exists video (gameId INT, id INT, filename TEXT)');

    var statement = db.prepare("INSERT INTO player VALUES (?, ?, ?)");
    for (var i = 0; i < 10; i++) {
        statement.run(i, "name " + i, "rfid" + i);
    }
    statement.finalize();

    db.each("SELECT id, name, RFID FROM player", function(err, row) {
        console.log(row.id + ": " + row.name + "\nRFID: " + row.RFID);
    });

    db.run("DELETE FROM player WHERE id > -1");
});

db.close();