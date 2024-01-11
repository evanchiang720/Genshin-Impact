const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'evan0720',
    database: 'employeeSystem'
});

app.post('/create', (req, res) => {
    console.log(req.body);
    const cid = req.body.cid;
    const character = req.body.character;
    const remark = req.body.remark;
    const level = req.body.level;
    const rarity = req.body.rarity;
    const birthday = req.body.birthday;
    const mainRole = req.body.mainRole;
    const useRate = req.body.useRate;
    const link = req.body.link;

    db.query(
        'INSERT INTO choose (cha, cid, remark, level, rarity, birthday, mainRole, useRate, link) VALUES (?,?,?,?,?,?,?,?,?)',
        [character, cid, remark, level, rarity, birthday, mainRole, useRate, link], 
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("Inserted")
            }
        }
    );
});

app.get('/employees', (req, res) => {
    db.query("SELECT * FROM choose", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/update', (req, res) => {
    const id = req.body.id;
    console.log(typeof req.body.level);
    console.log(req.body.level);
    if ((typeof req.body.remark) === "string" && req.body.remark !== "" && (typeof req.body.level) === "string" && req.body.level !== ""){
        const newRemark = req.body.remark;
        const newLevel = req.body.level;
        db.query("UPDATE choose SET remark = ?, level = ? WHERE id = ?", 
        [newRemark, newLevel, id], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
    }
    else if ((typeof req.body.remark) === "string" && req.body.remark !== ""){
        const newRemark = req.body.remark;
        db.query("UPDATE choose SET remark = ? WHERE id = ?", 
        [newRemark, id], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
    }
    else if ((typeof req.body.level) === "string" && req.body.level !== ""){
        const newLevel = req.body.level;
        db.query("UPDATE choose SET level = ? WHERE id = ?", 
            [newLevel, id], 
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            }
        );
    }
});

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM choose WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/getCharacterId/:chineseName', (req, res) => {
    const chineseName = req.params.chineseName;
    db.query("SELECT cid, link FROM translate WHERE chinese = ?", chineseName, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result[0]); // Assuming the query returns one result, adjust if needed
      }
    });
  });

app.get('/getCharacterInfo/:cid', (req, res) => {
    const cid = req.params.cid;
    db.query("SELECT rarity, birthday FROM genshin WHERE cid = ?", cid, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result); // Assuming the query returns one result, adjust if needed
      }
    });
  });

app.get('/getMainRole/:cid', (req, res) => {
    const cid = req.params.cid;
    db.query("SELECT gss.mainRole FROM genshinstats gss, genshin gs WHERE gss.Character = gs.character_name AND gs.cid = ?", cid, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result); // Assuming the query returns one result, adjust if needed
      }
    });
  });

app.get('/getUseRate/:cid', (req, res) => {
    
    const cid = req.params.cid;
    db.query("SELECT u.`4.31` FROM used u, translate t WHERE t.chinese = u.c AND t.cid = ? ", cid, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
      } else {
        res.send(result); // Assuming the query returns one result, adjust if needed
      }
    });
});


app.listen(3001, () => {
    console.log("Yes")
});
