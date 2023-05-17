import React from "react";
import { Link } from "react-router-dom";
import Timer from "./Timer";
import Skeleton from "./Skeleton";

const ItemCard = ({ item, carousel, skeleton }) => {
  return (
    <div
      className={carousel || "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"}
      style={{ display: "block", backgroundSize: "cover" }}
    >
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={skeleton ? "/" : `/author/${item.authorId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
          >
            {skeleton ? (
              <Skeleton width={50} height={50} borderRadius={100} />
            ) : (
              <img className="lazy" src={item.authorImage} alt="" />
            )}
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {!skeleton && item.expiryDate && <Timer expiryDate={item.expiryDate} />}
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
          {skeleton ? (
            <Skeleton width="100%" height={320} />
          ) : (
            <Link to={`/item-details/${item.nftId}`}>
              <img
                src={item.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
            </Link>
          )}
        </div>
        <div className="nft__item_info">
          <Link to="/item-details">
            <h4>
              {skeleton ? <Skeleton width="50%" height={20} /> : item.title}
            </h4>
          </Link>
          <div className="nft__item_price">
            {skeleton ? (
              <Skeleton width="25%" height={20} />
            ) : (
              `${item.price} ETH`
            )}
          </div>
          <div className="nft__item_like">
            {skeleton ? (
              <Skeleton width={50} height={20} />
            ) : (
              <>
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
