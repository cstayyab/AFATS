$(
    function () {
        $.getJSON("config.json").done(function (data) {
            data = updateFromLocalStorage(data);
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
            localStorage.setItem("afats", JSON.stringify(data)) // Update Config version
            
            // If enabled, replace description with random quote ( Should be last part in this function)
            if(data.replaceDescriptionWithQuotes === true) {
                $.getJSON("https://api.quotable.io/random").done(function(quote){
                    description = `&quot;${quote.content}&quot; ~${quote.author}`
                    setUpPage(title, description, search, tiles);
                })
            } else {
                setUpPage(title, description, search, tiles);
            }
        
        });
    }
);
function updateFromLocalStorage(data) {
    afats = JSON.parse(localStorage.getItem("afats") || "null");
    if (afats === undefined || afats === null) {
        localStorage.setItem("afats", JSON.stringify(data));
        return data;
    }
    data.title = afats.title || data.title;
    data.description = afats.description || data.description;
    data.defaultEngine = afats.defaultEngine || data.defaultEngine;
    data.searchEngines = afats.searchEngines || data.searchEngines;
    data.tiles = afats.tiles || data.tiles;
    data.replaceDescriptionWithQuotes = (afats.replaceDescriptionWithQuotes === undefined || afats.replaceDescriptionWithQuotes === null) ? data.replaceDescriptionWithQuotes : afats.replaceDescriptionWithQuotes;
    return data;
}

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
    updateQuickLinks(tiles);
    $('#searchbox').keyup(function (e) {
        e.stopPropagation();
        if (e.keyCode == 13) {
            $('#searchbtn').trigger("click");
        }
    });

    $(".card-body button.close").click(function () {
        var slug = $(this).attr("data-slug");
        removeQuickLink(slug);
        $(this).parent().parent().parent().remove();

    });

    $("#settingsModal").on('shown.bs.modal', function () {
        afats = JSON.parse(localStorage.getItem("afats"));
        $('#chgTitle').val(afats.title || "No Title Found");
        $("#chgDescription").val(afats.description || "No Description Found");
        $("#chgDEngine").html("");
        afats.searchEngines.forEach(function (value) {
            $("#chgDEngine").append(`<option value="${value.slug}">${value.title}</option>`);
        });
        $("#chgDEngine option[value=" + afats.defaultEngine + "]").prop("selected", true);
        $("#chgDEngine option[value=" + afats.defaultEngine + "]").attr("selected", "selected"); //for compatibility
        $('#chgReplaceQuotes').prop('checked', afats.replaceDescriptionWithQuotes);
    });
    $("#quickLinkModal").on('shown.bs.modal', function () {
        $("#chgQLURL").focus();
        $("#chgQLURL").val("");
        $('#chgURLTitle').val("");
        $('#chgURLDescription').val("");
    });
    $("#chgQLURL").on('blur', function (e) {
        if (e.originalEvent.explicitOriginalTarget == $('#quickLinkModal')[0]) {
            return;
        }
        if (this.checkValidity()) {
            $.getJSON("https://api.linkpreview.net/?key=5d1c8813b02c068d1764561c1b041f7c37b41abb5f8dd&q=" + $(this).val()).done(function (data) {
                $('#chgURLTitle').val(data.title);
                $('#chgURLDescription').val(data.description);
            }).fail(function () {
                $('#chgURLTitle').val("");
                $('#chgURLDescription').val("");
                alert("An Error occured while fetching the preview of requested URL. \nPlease manually type the information.");
            });
        }
    });
    $("#btnAddQuickLink").click(function() {
        title = $('#chgURLTitle')[0];
        description = $('#chgURLDescription')[0];
        url = $('#chgQLURL')[0];
        if(title.checkValidity() && description.checkValidity() && url.checkValidity()) {
            title = $(title).val();
            description = $(description).val();
            url = $(url).val();
            slug = slugify(url);
            removeQuickLink(slug);
            addQuickLink(url,title,description,slug);
            $('#quickLinkModal').modal('toggle');
        } else {
            alert("Please fill all the fields!");
        }
    });
    $("#btnSaveSettings").click(function () {
        afats = JSON.parse(localStorage.getItem("afats"));
        afats.title = $('#chgTitle').val();
        afats.description = $('#chgDescription').val();
        window.defaultEngine = $('#chgDEngine').val();
        search = afats.searchEngines.find(findEngine);
        window.defaultEngine = undefined;
        if (search !== undefined) {
            afats.defaultEngine = $('#chgDEngine').val();
        }
        afats.replaceDescriptionWithQuotes = $('#chgReplaceQuotes').prop('checked');
        localStorage.setItem('afats', JSON.stringify(afats));
        setUpPage(afats.title, afats.description, search, afats.tiles);
        $('#settingsModal').modal('toggle');
    });

}
function findEngine(engine) {
    if (engine.slug === window.defaultEngine) {
        return true;
    }
}
function removeQuickLink(slug) {
    afats = JSON.parse(localStorage.getItem('afats'));
    delin = null;
    afats.tiles = afats.tiles.filter(function (link) {
        return link.slug != slug;
    });
    localStorage.setItem('afats', JSON.stringify(afats));
    updateQuickLinks(afats.tiles);
}
function addQuickLink(url, title, description, slug) {
    afats = JSON.parse(localStorage.getItem('afats'));
    afats.tiles.push({
        "slug": slug,
        "title": title,
        "description": description,
        "url": url
    });
    localStorage.setItem('afats', JSON.stringify(afats));
    updateQuickLinks(afats.tiles);
}
function updateQuickLinks(links) {
    $('#tiles').html("");
    links.forEach(function (element) {
        $('#tiles').append(`<div class="col-xs-12  col-sm-6 col-md-4 col-lg-3 py-2">
        <div class="card bg-dark text-light afats-tile">
        
            <div class="card-body">
            <button type="button" class="close" aria-label="Close" data-slug="${element.slug}"><span aria-hidden="true" class="text-white">&times;</span></button>
                <a class="card-title h5 text-light" href="${element.url}" target="_blank">${element.title}</a>
                
                <p class="card-text">${element.description}</p>
            </div>
        </div>
    </div>`);
    });
}
/**
 * 
 * @see https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1
 * 
 */
function slugify(string) {
    a = 'àáäâãåăæąçćčđèéėëêęǵḧìíïîįłḿǹńňñòóöôœøṕŕřßśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;'
    b = 'aaaaaaaaacccdeeeeeeghiiiiilmnnnnooooooprrssssttuuuuuuuuuwxyyzzz------'
    p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
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