import SearchProvider from './search-provider';

export class SearchOptions {

    public static OPT_TWITTER: SearchProvider = {
        faClass: 'twitter',
        displayName: 'Twitter',
        key: 'OPT_TWITTER',
        searchURL: 'https://twitter.com/search',
        queryParam: 'q'
    }
    
    public static OPT_GOOGLE: SearchProvider = {
        faClass: 'google',
        displayName: 'Google',
        key: 'OPT_GOOGLE',
        searchURL: 'https://google.com/search',
        queryParam: 'q'
    }
    
    public static OPT_DDG: SearchProvider = {
        faClass: 'ddg',
        displayName: 'DuckDuckGo',
        key: 'OPT_DDG',
        searchURL: 'https://duckduckgo.com/',
        queryParam: 'q'
    }
}