$(
    function () {
        $.getJSON("config.json").done(function (data) {
            var title = (data.title !== undefined || data.title.trim() !== "") ? data.title : "Title Here";
            var description = (data.description !== undefined || data.description.trim() !== "") ? data.description : "Description Here";
            var search = (data.defaultEngine !== undefined || data.defaultEngine.trim() !== "") ? data.defaultEngine : "google";
            window.defaultEngine = search;
            search = data.searchEngines.find(findEngine);
            window.defaultEngine = undefined;
            if (search == undefined) {
                search = {
                    "slug": "google",
                    "title": "Google",
                    "url": "https://www.google.com/search",
                    "queryParam": "q",
                    "options": {
                        "safe": "active",
                        "num": "50"
                    },
                    "faClass": "fab fa-google"
                };
            }
            var tiles = (data.tiles != undefined) ? data.tiles : {};
            setUpPage(title, description, search, tiles);
        });
    }
);

function setUpPage(title, description, search, tiles) {
    document.title = title + " - AFATS";
    $('#title').html(title);
    $('#description').html(description);
    if (search.faClass !== undefined) {
        $('#searchicon').html(`<i class='${search.faClass}'></i>`);
    } else {
        var icon = (new URL(search.url)).origin + "/favicon.ico";
        $('#searchicon').html(`<img src="${icon}" />`);
    }
    var searchHolder = (search.title !== undefined) ? search.title : "";
    $('#searchbox').val("");
    $('#searchbox').attr('placeholder', "Search " + searchHolder + " . . .");
    window.search = search;
    // $('#searchbtn').click(searchNow);
    $('#tiles').html("");
    tiles.forEach(function (element) {
        $('#tiles').append(`<div class="col-xs-12  col-sm-6 col-md-4 col-lg-3 py-2">
        <div class="card bg-dark text-light afats-tile">
            <div class="card-body">
                <a class="card-title h5 text-light" href="${element.url}" target="_blank">${element.title}</a>
                <p class="card-text">${element.description}</p>
            </div>
        </div>
    </div>`);
    });
    $('#searchbox').keyup(function (e) {
        if (e.keyCode == 13) {
            $('#searchbtn').trigger("click");
        }
    });

}
function findEngine(engine) {
    if (engine.slug === window.defaultEngine) {
        return true;
    }
}

function searchNow() {
    query = $('#searchbox').val().trim();
    if (query != "" && window.search != undefined && window.search.url != undefined && window.search.queryParam != undefined) {
        var queryString = window.search.url + "?" + window.search.queryParam + "=" + query;
        if (window.search.options != undefined && (typeof window.search.options == "object") && (window.search.options !== null)) {
            Object.keys(window.search.options).forEach(function (option) {
                if (window.search.options.hasOwnProperty(option)) {
                    queryString += "&" + option + "=" + window.search.options[option];
                }
            });
        }
        var win = window.open(queryString, '_blank');
        if (win) {
            //Browser has allowed it to be opened
            win.focus();
        } else {
            //Browser has blocked it
            alert('Please allow popups to open search results in new tab.');
        }
    }
}