export const uniqById = (a) => {
  let seen = new Set();
  return a.filter((item) => {
    let k = item.id;
    return seen.has(k) ? false : seen.add(k);
  });
};

// function that takes care of manipulating cache
export const updateBookCache = (cache, query, addedBook) => {
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqById(allBooks.concat(addedBook)),
    };
  });
};
