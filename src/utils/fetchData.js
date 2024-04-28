export const options = {
  method: "GET",
  // url: 'https://exercisedb.p.rapidapi.com/exercises',
  params: { limit: "30" },
  headers: {
    "X-RapidAPI-Key": "4a54b43d10mshdd9bd6f1e9c5d51p1ee835jsn62bf55a50dd5",
    //   'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '4a54b43d10mshdd9bd6f1e9c5d51p1ee835jsn62bf55a50dd5',
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
};


export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
