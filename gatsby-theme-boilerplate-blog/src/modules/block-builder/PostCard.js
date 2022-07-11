import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { BsSmartwatch } from "react-icons/bs";
const PostCard = ({
  postImage,
  linkUrl,
  title,
  excerpt,
  readMoreText,
  classes,
}) => {
  const imageQuery = getImage(postImage.childrenImageSharp[0]);
  return (
    <div className='post-card' role='listitem' aria-label='Cartão de Postagem'>
      <Link to={linkUrl}>
        <GatsbyImage
          image={imageQuery}
          alt={"title"}
          placeholder={"NONE"}
          critical='true'
          className={classes}
        />
      </Link>
      <div className='watch-later'>
        <BsSmartwatch />
        <span>Ler mais tarde</span>
      </div>
      <div className='post-card-content'>
        <Link to={linkUrl}>
          <h2>{title}</h2>
        </Link>
        {excerpt === true ? (
          <Link to={linkUrl}>
            <p>{excerpt}</p>
          </Link>
        ) : null}
        {readMoreText === true ? (
          <Link to={linkUrl} className='card-posts-link'>
            <p>{readMoreText}</p>
          </Link>
        ) : null}
      </div>
    </div>
  );
};
export default PostCard;
