const express = require('express')
const nunjucks = require('nunjucks')
const server = express()
const videos = require("./data")

server.use(express.static('public'))


server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res) {
    const about = {
        avatar_url:"https://i.pinimg.com/originals/1e/3b/9f/1e3b9f9c0f9a14104bb641979b1e2696.jpg",
        name: "Kingdom Hearts",
        role: "",
        link : [
            {name: "PSN", url: ""},
            {name: "PSN", url: ""},
        ]

    }
    return res.render("about", {about})

})


server.get('/', function(req, res) {
    return res.render("about")
})
server.get('/lista', function(req, res) {
    return res.render("lista", {items: videos})
})
server.get('/video', function(req, res) {
    const id = req.query.id

    const video = videos.find(function (video) {
      return video.id == id
    })

    if (!video) {
        return res.send ("404 - Video not found!")
    }

    return res.render("video", {item: video})
})

server.listen('3333', function () {
    console.log("server is running ")
}) 