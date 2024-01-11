import { useState, useEffect } from "react";


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortcontroller = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortcontroller.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('could not fetch the data for that resource')
                    }

                    return res.json()
                })
                .then(data => {
                    setError(null);
                    setData(data);
                    setIsPending(false);
                })
                .catch((err) => {
                    if (err.name === 'AbortError') {
                        console.log('fetch aborted')
                    }
                    else {
                        setError(err.message);
                        setIsPending(false);
                    }
                })
        }, 1000);

        return  () => abortcontroller.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;