import { React, useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

const GNEWS_API_KEY = "51cde1d8bbfa203e12c93c462d307817"; // Your GNews API key

function News(props) {
  let category = props.category;
  let [articles, setArticles] = useState([]);
  let [totalResults, setTotalResults] = useState(0);
  let [page, setPage] = useState(1);

  let resultNews = async () => {
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&page=${page}&apikey=${GNEWS_API_KEY}`;
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(parsedData.articles || []); // Store articles in state
      setTotalResults(parsedData.totalResults || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  let fetchData = async () => {
    const url = `https://gnews.io/api/v4/top-headlines?category=${category}&page=${
      page + 1
    }&apikey=${GNEWS_API_KEY}`;
    setPage(page + 1);
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles((prevArticles) =>
        prevArticles.concat(parsedData.articles || [])
      );
    } catch (error) {
      console.error("Error fetching more data:", error);
    }
  };

  useEffect(() => {
    resultNews();
  }, [category]);

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchData}
      hasMore={articles.length < totalResults}
      loader={<h4 className="text-center">Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Wait! Loading Latest News</b>
        </p>
      }
    >
      <div className="container my-3">
        <div className="row">
          {articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  sourceName={element.source.name} // Article source name
                  title={element.title} // Article title
                  desc={element.description} // Article description
                  imageURL={element.image} // Image URL from GNews API
                  newsUrl={element.url} // Link to the full article
                />
              </div>
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
}

News.defaultProps = {
  category: "general",
};

export default News;
