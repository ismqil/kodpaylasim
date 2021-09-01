const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-discord");
const session = require("express-session");
const cfg = require("./config.json")
const { JsonDatabase } = require("wio.db");
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`${cfg.isim} Code.`);
});

client.on('messageCreate', message => {
  if (message.content === 'ping') {
    message.channel.send('pong');
  }
});

const db = new JsonDatabase({
    databasePath:"./veritabani/kodlar.json"
  });
const kod = new JsonDatabase({
    databasePath:"./veritabani/kod.json"
});
const app = express();

passport.serializeUser((user, done) => {
  done(null, user);
 });
 
 passport.deserializeUser((obj, done) => {
     done(null, obj);
 });
let strategy = new Strategy({
  clientID: cfg.bot_id,
  clientSecret: cfg.bot_secret,
  callbackURL: cfg.bot_callback,
  scope: ["identify", "guilds"]
}, (accesToken, refreshToken, profile, done) => {
  process.nextTick( () => done(null, profile))
})

passport.use(strategy)

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.get("/giris", passport.authenticate("discord", {
  scopes: ["identify", "guilds"] }))
app.get("/callback", passport.authenticate("discord", {
  failureRedirect: "/hata" 
}), (req, res) => {
      res.redirect("/");
});
app.get('/cikis', function(req, res){
  req.logout();
  res.redirect('/');
});



app.post('/admin', function (req, res) {
  const result = Math.random().toString(36).substring(6)
  kod.set(result, req.body.kod)
  
  db.push(`codes.${req.body.kategori}`, `<div class="card text-white bg-dark mb-3" style="max-width: 18rem; margin: 5px; float: left;">
  <center><div class="card-header"><h1>${req.body.isim}</h1></div>
  <div class="card-body text-danger">
    <p class="card-text">${req.body.aciklama}</p>
    <a type="button" href="/${result}" class="btn btn-outline-warning">Koda Git</a>
  </div></center>
</div>`)
  res.send(`Kod eklendi. | <a href="/">Ana Sayfa</a>`);
});


app.get('/admin', function(req, res) {

if (req.user) {
if (req.user.id == 852882209299234826, 647759712556679178) {
res.send(`<!doctype html>
<html lang="tr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    <title>${cfg.isim} Code Share | Ana sayfa.</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
</head>
    <body style="background-color:#313131;">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Pluton</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Ana Sayfa</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${cfg.dc}">Discord</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Kodlar
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="/bdfd">BDFD</a></li>
              <li><a class="dropdown-item" href="/aoi">AOI.js</a></li>
              <li><a class="dropdown-item" href="/altyapilar">Altyapılar</a></li>
            </ul>
          </li>
        </ul>
        <div class="dropdown">
        <img style="border-radius:50%; margin-right:2px;width:30px;height:30px;" src="https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32">
        <a href="#" style="color:white;text-decoration: none; margin-right:15px;" class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <b>${req.user.username}</b>#${req.user.discriminator}
        </a>
        <ul style="margin-right: 15px;" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="/profil">Profil</a></li>
          <li><a class="dropdown-item" href="/admin">Kod Paylaş</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="/cikis">Çıkış Yap</a></li>
        </ul>
      </div>
      </div>
    </div>
  </nav>
<center><form style="margin-top: 20px; margin: 5px;"action="/admin" method="post">
  <input style="width:50%; margin-top: 31px;" placeholder="Kod Adı" type="text" class="form-control" name="isim">
  <input style="width:50%; margin-top: 31px;" placeholder="Kod Açıklaması" type="text" class="form-control" name="aciklama">
  <input style="width:50%; height: 256px;" placeholder="$description[31]" type="text" class="form-control" name="kod"> 
  <select name="kategori" style="width:50%" class="form-select">
    <option value="altyapilar">Altyapı</option>
    <option value="bdfd">BDFD</option>
    <option value="aoi">AOIjs</option>
  </select>
  <input type="submit">
</form></center>
<script src="https://kit.fontawesome.com/d3920ff265.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
</body>
</html`)} else { res.redirect("/hata?text=Yetersiz+yetki.&title=403")}
} else { res.redirect("/")}
})
app.get('/', function(req, res) {    
  if (req.user) { 
    
    var embed = new MessageEmbed().setTitle("Siteye bir kullanıcı giriş yaptı.").setDescription(`${req.user.username}#${req.user.discriminator} (<@!${req.user.id}>) tarafından siteye giriş yapıldı.`).setThumbnail(`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`).setColor("GOLD") 
    client.channels.cache.get(`${cfg.kanal}`).send({ embeds: [embed] })
   res.send(`<!doctype html>
  <html lang="tr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
      <title>${cfg.isim} Code Share | Ana sayfa.</title>
      <style>
      body { 
        font-family: 'Bebas Neue', cursive;
        font-size: 20px;
        background-color: #313131;
      }
      img.pomp { 
        margin-top: 31px;
        border-radius: 50%;
        border: 2px groove #313132;
        width: 256px;
        height: 256px;
        position: relative;
        animation-name: ball;
        animation-duration: 2s;
        animation-iteration-count: infinite;
       }
       @keyframes ball {
        0% {
        top: 0px;
        }
        50% {
        top: 40px;
        }
        100% {
        top: 0px;
        }
        }      
        </style>
    </head>
    <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Pluton</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Ana Sayfa</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${cfg.dc}">Discord</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Kodlar
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="/bdfd">BDFD</a></li>
              <li><a class="dropdown-item" href="/aoi">AOI.js</a></li>
              <li><a class="dropdown-item" href="/altyapilar">Altyapılar</a></li>
            </ul>
          </li>
        </ul>
        <div class="dropdown">
        <img style="border-radius:50%; margin-right:2px;width:30px;height:30px;" src="https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32">
        <a href="#" style="color:white;text-decoration: none; margin-right:15px;" class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <b>${req.user.username}</b>#${req.user.discriminator}
        </a>
        <ul style="margin-right: 15px;" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="/profil">Profil</a></li>
          <li><a class="dropdown-item" href="/admin">Kod Paylaş</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="/cikis">Çıkış Yap</a></li>
        </ul>
      </div>
      </div>
    </div>
  </nav>
      <center> <img class="pomp" src="${cfg.resim}"> <br>
      <h1 style="color:white; margin-top:40px;">${cfg.isim} Code</h1>
      <a href="${cfg.dc}" class="btn btn-primary" type="button"><i class="fab fa-discord"></i> Discord</a>
      </center>
      <script src="https://kit.fontawesome.com/d3920ff265.js" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
    </body>
  </html>`) } else {
    res.send(`<!doctype html>
    <html lang="tr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        <title>${cfg.isim} Code Share | Ana sayfa.</title>
        <style>
        body { 
          font-family: 'Bebas Neue', cursive;
          font-size: 20px;
          background-color: #313131;
        }
        img { 
          margin-top: 31px;
          border-radius: 50%;
          border: 2px groove #313132;
          width: 256px;
          height: 256px;
          position: relative;
          animation-name: ball;
          animation-duration: 2s;
          animation-iteration-count: infinite;
         }
         @keyframes ball {
          0% {
          top: 0px;
          }
          50% {
          top: 40px;
          }
          100% {
          top: 0px;
          }
          }      
          </style>
      </head>
      <body>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Pluton</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Ana Sayfa</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${cfg.dc}">Discord</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Kodlar
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/bdfd">BDFD</a></li>
                <li><a class="dropdown-item" href="/aoi">AOI.js</a></li>
                <li><a class="dropdown-item" href="/altyapilar">Altyapılar</a></li>
              </ul>
            </li>
          </ul>
            <a class="btn btn-outline-success" href="/giris" type="submit">Giriş</a>
        </div>
      </div>
    </nav>
        <center> <img src="${cfg.resim}"> <br>
        <h1 style="color:white; margin-top:40px;">${cfg.isim} Code</h1>
        <a href="${cfg.dc}" class="btn btn-primary" type="button"><i class="fab fa-discord"></i> Discord</a>
        </center>
        <script src="https://kit.fontawesome.com/d3920ff265.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
      </body>
    </html>`)
  }

});
app.get('/profil', function(req, res) {    
  if (req.user) { res.send(`<!doctype html>
  <html lang="tr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
      <title>${req.user.username} | ${cfg.isim} Code</title>
      <style>
      body { 
        font-family: 'Bebas Neue', cursive;
        font-size: 20px;
        background-color: #313131;
      }
      img.pomp { 
        margin-top: 31px;
        border-radius: 50%;
        border: 2px groove #313132;
        width: 256px;
        height: 256px;
        position: relative;
        animation-name: ball;
        animation-duration: 2s;
        animation-iteration-count: infinite;
       }
       @keyframes ball {
        0% {
        top: 0px;
        }
        50% {
        top: 40px;
        }
        100% {
        top: 0px;
        }
        }      
        </style>
    </head>
    <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Pluton</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Ana Sayfa</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${cfg.dc}">Discord</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Kodlar
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="/bdfd">BDFD</a></li>
              <li><a class="dropdown-item" href="/aoi">AOI.js</a></li>
              <li><a class="dropdown-item" href="/altyapilar">Altyapılar</a></li>
            </ul>
          </li>
        </ul>
        <div class="dropdown">
        <img style="border-radius:50%; margin-right:2px;width:30px;height:30px;" src="https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32">
        <a href="#" style="color:white;text-decoration: none; margin-right:15px;" class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <b>${req.user.username}</b>#${req.user.discriminator}
        </a>
        <ul style="margin-right: 15px;" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="/profil">Profil</a></li>
          <li><a class="dropdown-item" href="/admin">Kod Paylaş</a></li>
          <li><a class="dropdown-item" href="/cikis">Çıkış Yap</a></li>
        </ul>
      </div>
      </div>
    </div>
  </nav>
      <center> <img class="pomp" src="https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png"> <br>
      <h1 style="color:white; margin-top:40px;">${req.user.username}#${req.user.discriminator}</h1>
      </center>
      <script src="https://kit.fontawesome.com/d3920ff265.js" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
    </body>
  </html>`) } else {
res.redirect("/")
  }
})
app.get("/hata", function(req, res) {
if (req.query.text) { t = req.query.title
  res.send(`${t} | ${req.query.text}`)
}
res.send("Web sitesi bilinmeyen bir hata ile karşılaştı.")
})

app.get('/bdfd', function (req, res) {
  if (req.user) { 
    var a = db.get("codes.bdfd")
    var b = a.join(' ')
   res.send(`<!doctype html>
  <html lang="tr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
      <title>${cfg.isim} Code Share | Ana sayfa.</title>
      <style>
      body { 
        font-family: 'Bebas Neue', cursive;
        font-size: 20px;
        background-color: #313131;
      }
      img.pomp { 
        margin-top: 31px;
        border-radius: 50%;
        border: 2px groove #313132;
        width: 256px;
        height: 256px;
        position: relative;
        animation-name: ball;
        animation-duration: 2s;
        animation-iteration-count: infinite;
       }
       @keyframes ball {
        0% {
        top: 0px;
        }
        50% {
        top: 40px;
        }
        100% {
        top: 0px;
        }
        }      
        </style>
    </head>
    <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Pluton</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Ana Sayfa</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${cfg.dc}">Discord</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Kodlar
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="/bdfd">BDFD</a></li>
              <li><a class="dropdown-item" href="/aoi">AOI.js</a></li>
              <li><a class="dropdown-item" href="/altyapilar">Altyapılar</a></li>
            </ul>
          </li>
        </ul>
        <div class="dropdown">
        <img style="border-radius:50%; margin-right:2px;width:30px;height:30px;" src="https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32">
        <a href="#" style="color:white;text-decoration: none; margin-right:15px;" class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <b>${req.user.username}</b>#${req.user.discriminator}
        </a>
        <ul style="margin-right: 15px;" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="/profil">Profil</a></li>
          <li><a class="dropdown-item" href="/admin">Kod Paylaş</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="/cikis">Çıkış Yap</a></li>
        </ul>
      </div>
      </div>
    </div>
  </nav><center><h1 style="color:white; margin-top: 20px;">Bot Designer For Discord</h1><hr style="color:white;" width="75%"></center><br>
     ${b}
      <script src="https://kit.fontawesome.com/d3920ff265.js" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
    </body>
  </html>`) } else {
    res.send(`<!doctype html>
    <html lang="tr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        <title>${cfg.isim} Code Share | Ana sayfa.</title>
        <style>
        body { 
          font-family: 'Bebas Neue', cursive;
          font-size: 20px;
          background-color: #313131;
        }
        img { 
          margin-top: 31px;
          border-radius: 50%;
          border: 2px groove #313132;
          width: 256px;
          height: 256px;
          position: relative;
          animation-name: ball;
          animation-duration: 2s;
          animation-iteration-count: infinite;
         }
         @keyframes ball {
          0% {
          top: 0px;
          }
          50% {
          top: 40px;
          }
          100% {
          top: 0px;
          }
          }      
          </style>
      </head>
      <body>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Pluton</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Ana Sayfa</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${cfg.dc}">Discord</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Kodlar
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/bdfd">BDFD</a></li>
                <li><a class="dropdown-item" href="/aoi">AOI.js</a></li>
                <li><a class="dropdown-item" href="/altyapilar">Altyapılar</a></li>
              </ul>
            </li>
          </ul>
            <a class="btn btn-outline-success" href="/giris" type="submit">Giriş</a>
        </div>
      </div>
    </nav>
        <center> 
        <h1 style="color:white; margin-top:40px;">Lütfen giriş yapınız.</h1>
        </center>
        <script src="https://kit.fontawesome.com/d3920ff265.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
      </body>
    </html>`)
}});


app.get('/aoi', function (req, res) {
  if (req.user) { 
    var a = db.get("codes.aoi")
    var b = a.join(' ')
   res.send(`<!doctype html>
  <html lang="tr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
      <title>${cfg.isim} Code Share | Ana sayfa.</title>
      <style>
      body { 
        font-family: 'Bebas Neue', cursive;
        font-size: 20px;
        background-color: #313131;
      }
      img.pomp { 
        margin-top: 31px;
        border-radius: 50%;
        border: 2px groove #313132;
        width: 256px;
        height: 256px;
        position: relative;
        animation-name: ball;
        animation-duration: 2s;
        animation-iteration-count: infinite;
       }
       @keyframes ball {
        0% {
        top: 0px;
        }
        50% {
        top: 40px;
        }
        100% {
        top: 0px;
        }
        }      
        </style>
    </head>
    <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Pluton</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Ana Sayfa</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${cfg.dc}">Discord</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Kodlar
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="/bdfd">BDFD</a></li>
              <li><a class="dropdown-item" href="/aoi">AOI.js</a></li>
              <li><a class="dropdown-item" href="/altyapilar">Altyapılar</a></li>
            </ul>
          </li>
        </ul>
        <div class="dropdown">
        <img style="border-radius:50%; margin-right:2px;width:30px;height:30px;" src="https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32">
        <a href="#" style="color:white;text-decoration: none; margin-right:15px;" class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <b>${req.user.username}</b>#${req.user.discriminator}
        </a>
        <ul style="margin-right: 15px;" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="/profil">Profil</a></li>
          <li><a class="dropdown-item" href="/admin">Kod Paylaş</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="/cikis">Çıkış Yap</a></li>
        </ul>
      </div>
      </div>
    </div>
  </nav><center><h1 style="color:white; margin-top: 20px;">AOI.js</h1><hr style="color:white;" width="75%"></center><br>
     ${b}
      <script src="https://kit.fontawesome.com/d3920ff265.js" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
    </body>
  </html>`) } else {
    res.send(`<!doctype html>
    <html lang="tr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        <title>${cfg.isim} Code Share | Ana sayfa.</title>
        <style>
        body { 
          font-family: 'Bebas Neue', cursive;
          font-size: 20px;
          background-color: #313131;
        }
        img { 
          margin-top: 31px;
          border-radius: 50%;
          border: 2px groove #313132;
          width: 256px;
          height: 256px;
          position: relative;
          animation-name: ball;
          animation-duration: 2s;
          animation-iteration-count: infinite;
         }
         @keyframes ball {
          0% {
          top: 0px;
          }
          50% {
          top: 40px;
          }
          100% {
          top: 0px;
          }
          }      
          </style>
      </head>
      <body>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Pluton</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Ana Sayfa</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${cfg.dc}">Discord</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Kodlar
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/bdfd">BDFD</a></li>
                <li><a class="dropdown-item" href="/aoi">AOI.js</a></li>
                <li><a class="dropdown-item" href="/altyapilar">Altyapılar</a></li>
              </ul>
            </li>
          </ul>
            <a class="btn btn-outline-success" href="/giris" type="submit">Giriş</a>
        </div>
      </div>
    </nav>
        <center> 
        <h1 style="color:white; margin-top:40px;">Lütfen giriş yapınız.</h1>
        </center>
        <script src="https://kit.fontawesome.com/d3920ff265.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
      </body>
    </html>`)
}});

app.get('/altyapilar', function (req, res) {
  if (req.user) { 
    var a = db.get("codes.altyapilar")
    var b = a.join(' ')
   res.send(`<!doctype html>
  <html lang="tr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
      <title>${cfg.isim} Code Share | Ana sayfa.</title>
      <style>
      body { 
        font-family: 'Bebas Neue', cursive;
        font-size: 20px;
        background-color: #313131;
      }
      img.pomp { 
        margin-top: 31px;
        border-radius: 50%;
        border: 2px groove #313132;
        width: 256px;
        height: 256px;
        position: relative;
        animation-name: ball;
        animation-duration: 2s;
        animation-iteration-count: infinite;
       }
       @keyframes ball {
        0% {
        top: 0px;
        }
        50% {
        top: 40px;
        }
        100% {
        top: 0px;
        }
        }      
        </style>
    </head>
    <body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Pluton</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Ana Sayfa</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="${cfg.dc}">Discord</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Kodlar
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="/bdfd">BDFD</a></li>
              <li><a class="dropdown-item" href="/aoi">AOI.js</a></li>
              <li><a class="dropdown-item" href="/altyapilar">Altyapılar</a></li>
            </ul>
          </li>
        </ul>
        <div class="dropdown">
        <img style="border-radius:50%; margin-right:2px;width:30px;height:30px;" src="https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32">
        <a href="#" style="color:white;text-decoration: none; margin-right:15px;" class="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          <b>${req.user.username}</b>#${req.user.discriminator}
        </a>
        <ul style="margin-right: 15px;" class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><a class="dropdown-item" href="/profil">Profil</a></li>
          <li><a class="dropdown-item" href="/admin">Kod Paylaş</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item" href="/cikis">Çıkış Yap</a></li>
        </ul>
      </div>
      </div>
    </div>
  </nav><center><h1 style="color:white; margin-top: 20px;">Altyapılar</h1><hr style="color:white;" width="75%"></center><br>
     ${b}
      <script src="https://kit.fontawesome.com/d3920ff265.js" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
    </body>
  </html>`) } else {
    res.send(`<!doctype html>
    <html lang="tr">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
        <title>${cfg.isim} Code Share | Ana sayfa.</title>
        <style>
        body { 
          font-family: 'Bebas Neue', cursive;
          font-size: 20px;
          background-color: #313131;
        }
        img { 
          margin-top: 31px;
          border-radius: 50%;
          border: 2px groove #313132;
          width: 256px;
          height: 256px;
          position: relative;
          animation-name: ball;
          animation-duration: 2s;
          animation-iteration-count: infinite;
         }
         @keyframes ball {
          0% {
          top: 0px;
          }
          50% {
          top: 40px;
          }
          100% {
          top: 0px;
          }
          }      
          </style>
      </head>
      <body>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Pluton</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Ana Sayfa</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="${cfg.dc}">Discord</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Kodlar
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="/bdfd">BDFD</a></li>
                <li><a class="dropdown-item" href="/aoi">AOI.js</a></li>
                <li><a class="dropdown-item" href="/altyapilar">Altyapılar</a></li>
              </ul>
            </li>
          </ul>
            <a class="btn btn-outline-success" href="/giris" type="submit">Giriş</a>
        </div>
      </div>
    </nav>
        <center> 
        <h1 style="color:white; margin-top:40px;">Lütfen giriş yapınız.</h1>
        </center>
        <script src="https://kit.fontawesome.com/d3920ff265.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj" crossorigin="anonymous"></script>
      </body>
    </html>`)
}});
const listener = app.listen(3000, (err) => {
  if (err) throw err;
  console.log("site başladı")
})
client.login(cfg.token);
app.get('/:result', function(req, res) {
  res.send(kod.get(req.params.result) ? `${kod.get(req.params.result)}` : `istenen URL bulunamadı`)
})