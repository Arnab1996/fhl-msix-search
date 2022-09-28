// @src/api/cognitive-search.js

import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    'api-key': 'y7HqhCMWxC8ZfpE8Q2YzLUs2HK1SP7HEUkVB7CZqhAAzSeCoYVCn'
}

const body = {
    "count": true,
    "skip": 0,
    "top": 50,
    "searchMode": "any",
    "queryType": "simple",
    "search": "FileRedirection"
}

export default axios.post = () => (
    "https://fhl-cognitive-search-local.search.windows.net/indexes/azureblob-index/docs/search?api-version=2016-09-01",
        body,
        {headers}
);