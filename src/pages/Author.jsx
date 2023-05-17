import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [isFollowed, setIsFollowed] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      );
      setUser(data);
      setIsLoading(false);
    })();
  }, [authorId]);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>
        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {!isLoading ? (
                        <img src={user.authorImage} alt="" />
                      ) : (
                        <Skeleton width={150} height={150} borderRadius={300} />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {!isLoading ? (
                            <>
                              {user.authorName}
                              <span className="profile_username">
                                @{user.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {user.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </>
                          ) : (
                            <>
                              <Skeleton
                                height={30}
                                width={200}
                                custom={{ display: "block", marginBottom: 10 }}
                              />
                              <Skeleton
                                height={20}
                                width={100}
                                custom={{ display: "block", marginBottom: 10 }}
                              />
                              <Skeleton
                                height={20}
                                width={200}
                                custom={{ display: "block" }}
                              />
                            </>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {!isLoading ? (
                        <>
                          <div className="profile_follower">
                            {user.followers + isFollowed} followers
                          </div>
                          <Link
                            to="#"
                            className="btn-main"
                            onClick={() =>
                              setIsFollowed((prevFollowed) => !prevFollowed)
                            }
                          >
                            {isFollowed ? "Unfollow" : "Follow"}
                          </Link>
                        </>
                      ) : (
                        <Skeleton height={40} width={250} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems user={user} isLoading={isLoading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
