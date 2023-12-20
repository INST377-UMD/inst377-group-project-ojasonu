const express = require('express')
var bodyParser = require('body-parser')
const supabaseClient = require('@supabase/supabase-js')
const app = express()
const port = 4000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://lrhismcsjpnbszcbocqh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyaGlzbWNzanBuYnN6Y2JvY3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1NDM5NjQsImV4cCI6MjAxNjExOTk2NH0.vIScM-aDOZh9mZ9F3laaVjJpojr0abTzDKEsX5vn_Ac'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname })
})

app.get('/about', (req, res) => {
    res.sendFile('public/about.html', { root: __dirname })
})

app.get('/index', async (req, res) => {
    console.log(`Getting home page`)

    const { data, error } = await supabase
        .from('lyricHistory')
        .select();

    if (error) {
        console.log(error)
    } else if (data) {
        res.send(data)
    }
})

app.post('/index', async (req, res) => {
    console.log('Adding Lyric')

    var songTitle = req.body.songTitle;
    var language = req.body.language;

    const { data, error } = await supabase
        .from('lyricHistory')
        .insert([
            { 'song': songTitle, 'language': language }
        ]);

    if (error) {
        console.log(error);
        res.status(500).send(error);
    } else {
        res.status(201).send(data);
    }
});



app.listen(port, () => {
    console.log('APP IS ALIVEEEEEE on port 4000')
})
