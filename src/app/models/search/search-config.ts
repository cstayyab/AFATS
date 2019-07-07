import {SearchOptions} from './search-options';
import SearchItem from './search-item';

/**
 * This class represents a config for search bar which will be customized by user.
 * It is saved as a JSON object to localStorage or will use Google as its default
 */
export default class SearchConfig {

    private searchItem : SearchItem = SearchOptions.OPT_GOOGLE

    slug = this.searchItem.key
    title = this.searchItem.displayName
    searchURL = this.searchItem.url
    /*
    options= {
        "safe": "active",
        "num": "50"
    }
     */
    queryParam = 'q'
    faClass= this.searchItem.faClass
    
}