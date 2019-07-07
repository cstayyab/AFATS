import SearchItem from './search-item';

export class SearchOptions {

    public static OPT_TWITTER: SearchItem = {
        faClass: 'twitter',
        displayName: 'Twitter',
        key: 'OPT_TWITTER',
        url: 'https://twitter.com/search'
    }
    
    public static OPT_GOOGLE: SearchItem = {
        faClass: 'google',
        displayName: 'Google',
        key: 'OPT_GOOGLE',
        url: 'https://google.com/search'
    }
    
    public static OPT_DDG: SearchItem = {
        faClass: 'ddg',
        displayName: 'DuckDuckGo',
        key: 'OPT_DDG',
        url: 'https://duckduckgo.com/'
    }
}