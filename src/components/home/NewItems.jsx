import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "../UI/Skeleton";
import Timer from "../UI/Timer";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
      );
      setNewItems(data);
      setIsLoading(false);
    })();
  }, []);
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {!isLoading && (
            <OwlCarousel
              className="owl-theme"
              loop
              margin={10}
              nav
              items={4}
              dots={false}
              responsive={{
                1200: { items: 4 },
                980: { items: 3 },
                768: { items: 2 },
                0: { items: 1 },
              }}
            >
              {newItems.map((item) => (
                <div key={item.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${item.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator"
                      >
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {item.expiryDate && <Timer expiryDate={item.expiryDate} />}
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="/" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="/" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="/">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
          {isLoading && (
            <OwlCarousel
              className="owl-theme"
              loop
              margin={10}
              nav
              items={4}
              dots={false}
              responsive={{
                1200: { items: 4 },
                980: { items: 3 },
                768: { items: 2 },
                0: { items: 1 },
              }}
            >
              {new Array(4).fill(0).map((_, index) => (
                <div key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <Skeleton width={50} height={50} borderRadius={100} />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="/" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="/" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="/">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Skeleton width="100%" height={320} />
                    </div>
                    <div className="nft__item_info">
                      <h4>
                        <Skeleton width="50%" height={20} />
                      </h4>
                      <div className="nft__item_price">
                        <Skeleton width="25%" height={20} />
                      </div>
                      <div className="nft__item_like">
                        <Skeleton width={50} height={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
