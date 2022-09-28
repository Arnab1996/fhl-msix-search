import {useState, useEffect} from "react";
import axios from "axios";

const headers = {
    'Content-Type': 'application/json',
    'api-key': 'y7HqhCMWxC8ZfpE8Q2YzLUs2HK1SP7HEUkVB7CZqhAAzSeCoYVCn'
}
const useFetch = () => {
    const [data, setData] = useState({
        slug: "",
        results: [],
    });

    useEffect(() => {
        if (data.slug !== "") {
            const timeoutId = setTimeout(() => {
                const fetch = async () => {
                    try {
                        const res = await axios.post(
                            "https://fhl-cognitive-search-local.search.windows.net/indexes/azureblob-index/docs/search?api-version=2016-09-01",
                            {
                                "count": true,
                                "skip": 0,
                                "top": 50,
                                "searchMode": "any",
                                "queryType": "simple",
                                "search": `${data.slug}`
                            },
                            {
                                headers
                            }
                        );
                        setData({...data, results: res.data});
                    } catch (err) {
                        console.error(err);
                    }
                };
                fetch().then(r => console.debug(data));
            }, 1500);
            return () => clearTimeout(timeoutId);
        }
    }, [data.slug]);

    return {data, setData};
};

export default useFetch;