import React, { useCallback, useEffect, useState } from 'react'

const RandomQuoteAPI = () => {
    const [data, setData] = useState();
    const [quote, setQuote] = useState(0);
    const [history, setHistory] = useState([])
    const [api] = useState('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json');

    useEffect(() => {
        fetch(api)
        .then(response => {
            return response.json()
        })
        .then(data => {
            setData(data)
            const dataIndex = data ? Math.floor(Math.random() * data.length) : null;
            setQuote(data[dataIndex])
        })
        .catch(() => {
            console.log('error');
        })
    }, [api])

    const nextRandomQuote = useCallback(() => {
        const dataIndex = data ? Math.floor(Math.random() * data.length) : null;
        setQuote(data[dataIndex]);
        setHistory([...history, quote])
        console.log(history);
    }, [data, history, quote])

    const prevQuote = useCallback((e) => {
        if (history.length === 0) {
            e.preventDefault();
        } else {
            const previousQuote = history[history.length - 1]
            setQuote(previousQuote)
        }
    }, [history])

    console.log(history);
    return (
        <div className='random-quote'>
            <div className="next-prev-buttons">
                <button onClick={(e) => prevQuote(e)}>Prev quote</button>
                <button onClick={() => nextRandomQuote()}>Draw next quote</button>
            </div>
          <p>{quote.quote}</p>
          <p>{quote.author}</p>
      </div>
    );
};

export default RandomQuoteAPI;