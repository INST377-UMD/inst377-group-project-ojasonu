// language selection
document.addEventListener("DOMContentLoaded", () => {
    // Populate language selection dropdown
    fetch("https://libretranslate.com/languages")
        .then(response => response.json())
        .then(languages => {
            const languageSelect = document.getElementById("languageSelect");
            languages.forEach(lang => {
                const option = document.createElement("option");
                option.value = lang.code;
                option.textContent = lang.name;
                languageSelect.appendChild(option);
            });
        });

    const form = document.getElementById('lyricsForm');
    const originalLyricsDiv = document.getElementById('originalLyrics');
    const translatedLyricsDiv = document.getElementById('translatedLyrics');
    const languageSelect = document.getElementById('languageSelect'); // Get the language select dropdown
    let currentLyrics = ''; // Variable to store the current lyrics for translation

    // Fetch song lyrics from the API
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const songTitle = document.getElementById('song').value;
        fetchLyrics(songTitle);
    });
    // fetch song lyrics in English
    function fetchLyrics(songTitle) {
        const encodedTitle = encodeURIComponent(songTitle);
        const Url = `https://some-random-api.com/lyrics?title=${encodedTitle}`;

        fetch(Url)
            .then(res => res.json())
            .then(json => {
                if (json.lyrics) {
                    // Display the lyrics
                    originalLyricsDiv.innerText = json.lyrics;
                    document.getElementById('songInfo').innerText +=  json.title + " - " + json.author;

                    // Store the current lyrics
                    currentLyrics = json.lyrics;

                    if (languageSelect.value) {
                        translateLyrics(currentLyrics, languageSelect.value);

                    }
                } else {
                    originalLyricsDiv.innerText = "Lyrics not found for " + songTitle;
                }
            })
            .catch(error => {
                console.error("Error fetching lyrics:", error);
                originalLyricsDiv.innerText = "Error occurred while fetching lyrics.";
            });
    }

    // Event listener for the language selection dropdown
    languageSelect.addEventListener('change', function () {
        if (currentLyrics && this.value) {
            translateLyrics(currentLyrics, this.value);
        }
    });
    // function to translate original Lyrics
    function translateLyrics(originalText, targetLang) {
        const apiKey = "AIzaSyDYw0mT-UpdfoogHcMVkQz7yz1U9f5gai4";
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;


        const requestBody = {
            q: originalText,
            target: targetLang
        };


        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                if (data.data && data.data.translations) {
                    const translatedText = data.data.translations.map(t => t.translatedText).join('\n');
                    translatedLyricsDiv.innerText = translatedText;

                } else {
                    throw new Error('Translation failed or no translation available.');
                }
            })
            .catch(error => {
                console.error('Error during translation:', error);
                translatedLyricsDiv.innerText = "Error occurred while translating lyrics.";
            });
    }
});
// function to fetch lyric history from supabase database
async function getLyricHistory() {
    console.log('Fetching Lyric History')
    var host = window.location.origin;

    var test = await fetch(`${host}/index`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((res) => res)
        .then(async res => {
            console.log(res)

            const element = document.getElementById('errorBox')
            if (element) {
                element.remove();
            }

            console.log('Status:', res.status)
            if (res.status === 200 || res.status === 304) {
                return res.json()
            }
            throw Error(JSON.stringify(await res.json()));
        })
        .then((res) => {
            console.log(res)
            const element = document.getElementById("lyricHistoryInfo");
            if (element) {
                element.remove();
            }

            var table = document.createElement('table');
            table.setAttribute('id', 'lyricHistoryInfo')

            var tableRow = document.createElement('tr');

            var tableHeading1 = document.createElement('th');
            tableHeading1.innerHTML = "ID"
            tableRow.appendChild(tableHeading1)

            var tableHeading2 = document.createElement('th');
            tableHeading2.innerHTML = "Song"
            tableRow.appendChild(tableHeading2)

            var tableHeading3 = document.createElement('th');
            tableHeading3.innerHTML = "Language"
            tableRow.appendChild(tableHeading3)

            var tableHeading4 = document.createElement('th');
            tableHeading4.innerHTML = "Created At"
            tableRow.appendChild(tableHeading4)

            table.appendChild(tableRow)
            document.body.appendChild(table)
            for (let i = 0; i < res.length; i++) {
                var lyricRow = document.createElement('tr');
                var lyricId = document.createElement('td');
                var lyricSong = document.createElement('td');
                var lyricLanguage = document.createElement('td');
                var lyricCreatedAt = document.createElement('td');

                lyricId.innerHTML = res[i].id;
                lyricSong.innerHTML = res[i].song;
                lyricLanguage.innerHTML = res[i].language;
                lyricCreatedAt.innerHTML = new Date(res[i].created_at).toLocaleString();

                lyricRow.appendChild(lyricId);
                lyricRow.appendChild(lyricSong);
                lyricRow.appendChild(lyricLanguage);
                lyricRow.appendChild(lyricCreatedAt);

                table.appendChild(lyricRow);
            }

        })
        .catch((error) => {
            console.log('Error:', JSON.parse(error.message))
            var errorDiv = document.createElement('div')
            errorDiv.setAttribute('class', 'errorBox');
            errorDiv.setAttribute('id', 'errorBox')

            var h1 = document.createElement('h1');
            h1.innerHTML = `Error Occurred:`

            var p = document.createElement('p');
            p.innerHTML = `${JSON.parse(error.message).message}`

            errorDiv.appendChild(h1);
            errorDiv.appendChild(p);
            document.body.appendChild(errorDiv)
        })
}
// dynamically add lyric history to the webpage
async function addLyric(event) {
    // prevent page refresh
    event.preventDefault();
    console.log('Adding Lyric')
    var host = window.location.origin;

    const songTitle = document.getElementById('song').value;
    const language = document.getElementById('languageSelect').value;

    fetch(`${host}/index`, {
        method: 'POST',
        body: JSON.stringify({
            "songTitle": songTitle,
            "language": language
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text().then(text => text ? JSON.parse(text) : {});
        })
        .then(data => {
            console.log('Lyric added:', data);

            getLyricHistory();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Function to add a new row to the table directly without refetching the entire history
function addLyricToTable(song, language, createdAt) {
    const table = document.getElementById('lyricHistoryInfo');
    const row = table.insertRow();
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);

    cell1.innerHTML = table.rows.length - 1;
    cell2.innerHTML = song;
    cell3.innerHTML = language;
    cell4.innerHTML = createdAt;
}


// Add event listener to the form
document.getElementById('lyricsForm').addEventListener('submit', addLyric);
// typed js library
document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('#typed', {
        strings: ["Lyric Finder", "Enter Your Favourite Song Title"],
        typeSpeed: 80,
        backSpeed: 80,
        loop: true,
        cursorChar: '|',
        shuffle: false,
        smartBackspace: true,
    });
});
// typed js library
document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('#history', {
        strings: ["Users Favourite Songs"],
        typeSpeed: 80,
        backSpeed: 80,
        loop: true,
        cursorChar: '|',
        shuffle: false,
        smartBackspace: true,
    });
});

window.onload = getLyricHistory;
