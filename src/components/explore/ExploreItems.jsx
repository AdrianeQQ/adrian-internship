import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemCard from "../UI/ItemCard";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState(8);
  const [filter, setFilter] = useState("");
  const loadData = useCallback(async () => {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${
        filter ? `?filter=${filter}` : ""
      }`
    );
    setExploreItems(data);
    setIsLoading(false);
  }, [filter]);
  useEffect(() => {
    loadData();
  }, [loadData]);
  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(event) => setFilter(event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!isLoading &&
        exploreItems
          .slice(0, cards)
          .map((item) => <ItemCard item={item} key={item.id} />)}
      {isLoading &&
        new Array(8)
          .fill(0)
          .map((_, index) => <ItemCard key={index} skeleton />)}
      {!isLoading && cards < 16 && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={() => setCards((prevCards) => prevCards + 4)}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
