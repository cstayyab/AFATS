# Away From All The Shit (AFATS)

by *[cstayyab](https://github.com/cstayyab)*

Away From All The Shit (AFATS) [basically designed for myself] is a browser home page / new tab document for people who want a clean, efficient and productive homepage that is totally in their control and cann be used on all the devices with cross-browser compatibility.

## Working

It basically works by the predefined `config.json` file present in the root directory. The `config.json` provides the default attributes for the homepage. These are basically static for now and can only be changed by directly editing `config.json`.  

### config.json Options

These are the options that can be changed according to your willingness.

`title` : Title of the page and the main heading that will be displayed on homepage.

`description`: A small description that will be desplayed below the tagline.

`searchEngines`: An array representing the a collection search engines. Each element can contaain the following:

&nbsp;&nbsp;&nbsp;&nbsp;`slug`: A generic identifier containing only alphanummeric characters.

&nbsp;&nbsp;&nbsp;&nbsp;`title`: A user-friendly name of the Search Engine.

&nbsp;&nbsp;&nbsp;&nbsp;`url`: The URL of the search page

&nbsp;&nbsp;&nbsp;&nbsp;`queryParam`: The query parameter which should contain the search string.

&nbsp;&nbsp;&nbsp;&nbsp;`options`(optional): An object conatining key-value pair representing additonal parameters to be passed to the search page.

&nbsp;&nbsp;&nbsp;&nbsp;`faClass`(optional): The font-awesome classes as the icon of the search engine. (e.g. `"fab fa-google"`)

`defaultEngine`: String containing the `slug` of the search engine you want to make default.

`tiles`: List of favorite links that will be displayed in form of tiles below the search bar. Following are the fields in each of them:

&nbsp;&nbsp;&nbsp;&nbsp;`slug`: A generic identifier for link containing on alphanumeric characters.

&nbsp;&nbsp;&nbsp;&nbsp;`url`: URL to the Webpage

&nbsp;&nbsp;&nbsp;&nbsp;`title`: Friendly name for the page

&nbsp;&nbsp;&nbsp;&nbsp;`description`: Short description of the link

## Future Improvements

* Implementation of `LocalStorage` to replace the default configuration set by `config.json` and make it dynamic.

* Provide an interface on frontend to easily change the parameters in `LocalStorage`
