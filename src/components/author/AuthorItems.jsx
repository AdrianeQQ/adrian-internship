import React from "react";
import ItemCard from "../UI/ItemCard";

const AuthorItems = ({ user, isLoading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {!isLoading
            ? user.nftCollection.map((collection) => (
                <ItemCard
                  key={collection.id}
                  item={{
                    ...collection,
                    authorImage: user.authorImage,
                    authorId: user.authorId,
                  }}
                />
              ))
            : new Array(12)
                .fill(0)
                .map((_, index) => <ItemCard key={index} skeleton />)}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
