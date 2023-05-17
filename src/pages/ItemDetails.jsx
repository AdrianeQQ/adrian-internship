import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [nft, setNft] = useState({});
  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
      );
      setNft(data);
      setIsLoading(false);
    })();
  }, [nftId]);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {!isLoading ? (
                  <img
                    src={nft.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                ) : (
                  <Skeleton width="100%" height="100%" />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>
                    {!isLoading ? (
                      `${nft.title} #${nft.tag}`
                    ) : (
                      <Skeleton height={50} width="60%" />
                    )}
                  </h2>
                  <div className="item_info_counts">
                    {!isLoading ? (
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {nft.views}
                      </div>
                    ) : (
                      <Skeleton height={30} />
                    )}
                    {!isLoading ? (
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {nft.likes}
                      </div>
                    ) : (
                      <Skeleton height={30} />
                    )}
                  </div>
                  {!isLoading ? (
                    <p>
                      doloremque laudantium, totam rem aperiam, eaque ipsa quae
                      ab illo inventore veritatis et quasi architecto beatae
                      vitae dicta sunt explicabo.
                    </p>
                  ) : (
                    <Skeleton height={100} width="100%" />
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link
                            to={!isLoading ? `/author/${nft.ownerId}` : "/"}
                          >
                            {!isLoading ? (
                              <img
                                className="lazy"
                                src={nft.ownerImage}
                                alt=""
                              />
                            ) : (
                              <Skeleton
                                height={50}
                                width={50}
                                borderRadius={100}
                              />
                            )}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          {!isLoading ? (
                            <Link to={`/author/${nft.ownerId}`}>
                              {nft.ownerName}
                            </Link>
                          ) : (
                            <Skeleton height={20} width={100} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link
                            to={!isLoading ? `/author/${nft.creatorId}` : "/"}
                          >
                            {!isLoading ? (
                              <img
                                className="lazy"
                                src={nft.creatorImage}
                                alt=""
                              />
                            ) : (
                              <Skeleton
                                height={50}
                                width={50}
                                borderRadius={100}
                              />
                            )}
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          {!isLoading ? (
                            <Link to={`/author/${nft.creatorId}`}>
                              {nft.creatorName}
                            </Link>
                          ) : (
                            <Skeleton height={20} width={100} />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    {!isLoading ? (
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{nft.price}</span>
                      </div>
                    ) : (
                      <Skeleton height={30} width="20%" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
