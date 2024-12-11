import React from "react";

function NewsItem(props) {
  let { desc, title, imageURL, newsUrl, sourceName } = props;

  return (
    <div>
      <div className="card my-3">
        {/* Display the image directly from the API */}
        <img
          src={imageURL}
          className="card-img-top"
          alt="News"
          onError={(e) => {
            e.target.onerror = null;
            // e.target.src = "/News1.jpg"; // You can remove this if you don't want a fallback image
          }}
        />
        <div className="card-body">
          <h5 className="card-title">
            {title?.length > 80 ? `${title.slice(0, 80)}...` : title}
          </h5>
          <p className="w-100 fs-6 text-body-secondary text-end">
            - {sourceName}
          </p>
          <p className="card-text">
            {desc?.length > 150 ? `${desc.slice(0, 150)}...` : desc}
          </p>
          {newsUrl && (
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Read More...
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
