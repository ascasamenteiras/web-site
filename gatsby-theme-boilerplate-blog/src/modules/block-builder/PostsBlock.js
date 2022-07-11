import React, { useState } from 'react'

import { Link } from 'gatsby'
import { Row } from '../../components/InsertRow'
import PostCard from './PostCard'

const PostsBlock = ({
  postList,
  currentPage,
  typeLoad,
  isFirst,
  prevPage,
  isLast,
  nextPage,
  readMoreText,
  pagination,
  postsPerPage,
  classes,
  mouseOverEvent,
  mouseOutEvent,
}) => {
  const [currentFirstItem, setCurrentFirstItem] = useState(0)
  function handleCurrentFirstItem(current) {
    setCurrentFirstItem(current)
  }
  const handleBtnLoadMore = e => {
    e.preventDefault()
    handleCurrentFirstItem(currentFirstItem + postsPerPage)
  }
  const numCollections = Math.ceil(postList.length / postsPerPage)
  const nextCollection = currentFirstItem + postsPerPage
  const isLastClick = nextCollection >= postList.length
  const btnLoadMore = isLastClick ? (
    ' '
  ) : (
    <button onClick={e => handleBtnLoadMore(e)} value={currentFirstItem}>
      {pagination.loadMore}
    </button>
  )
  const initialLoad = typeLoad === 'push' ? 0 : currentFirstItem
  const posts = postList.slice(initialLoad, nextCollection)
  return (
    <div className="post-cards-wrapper">
      <section>
        <Row
          opt={{
            numColumns: 'auto-fit',
            classes: 'post-cards-row',
            widthColumns: 'minmax(290px, 1fr)',
          }}
        >
          {posts.map(
            (
              {
                node: {
                  frontmatter: { title, categories, featuredImage },
                  fields: { slug },
                },
              },
              i
            ) => {
              return (
                <PostCard
                  postImage={featuredImage}
                  linkUrl={slug}
                  title={title}
                  readMoreText={readMoreText}
                  key={i}
                  categories={categories}
                  classes={classes}
                  mouseOverEvent={mouseOverEvent}
                  mouseOutEvent={mouseOutEvent}
                />
              )
            }
          )}
        </Row>
        <Row opt={{ numRows: 1, isBoxed: true, classes: 'pagination' }}>
          {pagination.loadMoreBtn === true ? (
            <p className="btn-load-more">{btnLoadMore}</p>
          ) : (
            <>
              <p>
                {currentPage} de {numCollections}
              </p>
              {!isFirst && <Link to={prevPage}>← página anterior</Link>}
              {!isLast && <Link to={nextPage}>próxima página →</Link>}
            </>
          )}
        </Row>
      </section>
    </div>
  )
}

export default PostsBlock
