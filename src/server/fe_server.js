/**
 * Simple server for steam and messaging f11y
 */

const express = require("express");
const app = express();
const http = require("http");
const axios = require("axios").default;
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const passport = require("passport");
const session = require("express-session");
const passportSteam = require("passport-steam");
const SteamStrategy = passportSteam.Strategy;

const pgp = require("pg-promise")();

const dbConfig = {
	host: 'localhost',
	port: 5432,
	database: 'database_db_1',
	user: 'postgres',
	password: 'pwd'
};

var db = pgp(dbConfig);

const port = 4000;

let user;

// TODO: Remove this when you have an actual database
let games = [];

let allGames = [];

axios
    .get("https://api.steampowered.com/ISteamApps/GetAppList/v2/")
    .then((res) => {
        allGames = res.data.applist.apps;
    });

// Required to get data from user for sessions
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(
    new SteamStrategy(
        {
            returnURL: "http://localhost:" + port + "/api/auth/steam/return",
            realm: "http://localhost:" + port + "/",
            apiKey: "B423175B1FA7B513516CEC7BFD995F47",
        },
        function (identifier, profile, done) {
            process.nextTick(function () {
                profile.identifier = identifier;
                return done(null, profile);
            });
        }
    )
);

app.use(cors());

app.use(
    session({
        secret: "8X3P1TIX8ZQK8MB1VWHHB64MZ3AUM623",
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 3600000,
        },
    })
);

app.use(passport.initialize());

app.use(passport.session());

app.get("/", (req, res) => {
    res.send(req.user);
});

// Routes
app.get(
    "/api/auth/steam",
    passport.authenticate("steam", { failureRedirect: "/" }),
    function (req, res) {
        res.redirect("/");
    }
);

app.get(
    "/api/auth/steam/return",
    passport.authenticate("steam", { failureRedirect: "/" }),
    async function (req, res) {
        console.log(req.user._json.steamid);
        let steamId = req.user._json.steamid;

        // TODO: Remove this dummy value
        // steamId = "76561197960434622";
        try {
            const data = (
                await axios.get(
                    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=B423175B1FA7B513516CEC7BFD995F47&steamid=${steamId}&include_appinfo=true&format=json`
                )
            ).data;

            if (!!data.response.games) {
                games = data.response.games;
            }
        } catch (e) {
            console.log("An error occurred: ", e);
        }

        res.redirect("http://localhost:3000/profile");
    }
);

app.get("/games", async (req, res) => {
    if (games.length > 0) {
        console.log(games)
        const allGames = games.slice(0,games.length);

        const finalGames = allGames
            .map((game) => allGames.find((aGame) => aGame.appid === game.appid))
            .filter((game) => !!game)

        res.send(finalGames);
    } else {
        res.send([]);
    }
});

app.get("/getBio", async (req, res) => {
    let qry = "SELECT bio FROM user_info WHERE username = '" + user + "';"

    db.any(qry)
        .then((rows) => {
            console.log("qry.rows = ", rows)
            res.send(rows[0].bio)
        })
        .catch((err) => {
            console.log ("Error 156: ", err)
            res.send("")
        })
});

app.get("/setBio", async (req, res) => {
    let qry = "UPDATE user_info SET bio = '" + req.query.bio + "' WHERE username = '" + user + "';"

    db.any(qry)
        .then((rows) => {
            console.log("qry = ", qry)
            res.redirect("http://localhost:3000/profile")
        })
        .catch((err) => {
            console.log ("Error 170: ", err)
        })
});

app.get("/register", async (req, res) => {
    console.log ("Registering User");
    console.log("   req.body: ", req.body)
    console.log("   req.query: ", req.query)
    console.log("   req.params: ", req.params)
    console.log(" ")

    user = req.query.name; // user name entered into the form
    let pass = req.query.psw; // password entered into the form

    let reg = "INSERT INTO user_info(steamid, username, bio, password) VALUES('0','" + user + "', 'Default Bio', '" + pass + "');" // query to enter data
    let passcheck = "SELECT password FROM user_info WHERE (username = '" + user + "' AND password = '" + pass + "');"
    let namecheck = "SELECT username FROM user_info WHERE username = '" + user + "';"
    
    db.any(namecheck)
        .then((rows) => {
            if (rows.length == 0)
                throw "User does not exsist"
            console.log("User Exists")
            console.log ("Check 167: ", namecheck , " = " , rows)
            db.any(passcheck)
                .then((rows) => {
                    console.log ("User is Signing in")
                    console.log ("Check 182: ", passcheck , " = " , rows)
                    console.log ("Check 183: rows.password == pass = ", rows.password == pass, rows[0].password, pass)
                    if (rows[0].password == pass)
                        res.redirect("http://localhost:3000/profile")
                })
                .catch((err) => {
                    console.log ("Error 188: ", err)
                    console.log("Incorrect Password")
                    res.redirect("http://localhost:3000/auth/incorrect")
                })
        })
        .catch((err) => {
            console.log ("User does not exsist")
            console.log ("Registering User")
                    db.any(reg)
                        .then(() => {
                            res.redirect("http://localhost:3000/profile")
                        })
                        .catch((err) => {
                            console.log("Error 200: " , err)
                        });
            console.log("Error 171: " , err)
        });
        

    
});

app.get("/getUserName", async (req, res) => {
    let qry = "SELECT username FROM user_info WHERE username = '" + user + "'" // query to run test
    console.log("gathering username")
    console.log("User: ", user)

    db.any(qry)
        .then((rows) => {
            console.log ("Rows: ", rows)
            res.send(rows[0].username)
        })
        .catch((err) => {
            console.log(err)
            return
        })
});

io.on("connection", (socket) => {
    console.log("We got connection");

    socket.on("msg", (msg) => {
        console.log("This is message: ", msg);
        socket.broadcast.emit("msg", msg);
    });
});

// Listen
server.listen(port, () => {
    console.log("Listening, port " + port);
});