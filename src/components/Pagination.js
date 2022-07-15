function Pagination(props) {
  const {
    articlePerPage,
    articlesCount,
    activePageIndex,
    updateCurrentPageIndex,
  } = props;
  let numberOfPage = Math.ceil(articlesCount / articlePerPage);
  let pagesArray = [];
  for (let i = 1; i <= numberOfPage; i++) {
    pagesArray.push(i);
  }
  return (
    <div className='pagination'>
      <span
        onClick={() =>
          updateCurrentPageIndex(
            activePageIndex - 1 < 1 ? 1 : activePageIndex - 1
          )
        }
        className='span-box'
      >
        {'<'}
      </span>
      {pagesArray.map((page, i) => (
        <span
          key={i}
          onClick={() => updateCurrentPageIndex(page)}
          className={activePageIndex === page ? 'active span-box' : 'span-box'}
        >
          {page}
        </span>
      ))}
      <span
        onClick={() =>
          updateCurrentPageIndex(
            activePageIndex + 1 > numberOfPage
              ? numberOfPage
              : activePageIndex + 1
          )
        }
        className='span-box'
      >
        {'>'}
      </span>
    </div>
  );
}

export default Pagination;
