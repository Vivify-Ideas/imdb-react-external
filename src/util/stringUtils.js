const getGenreStrings = genreString => {
  if (genreString && genreString.length > 0) {
    return genreString.replace(/ /g, '').split(',');
  }
  return [];
};

export default getGenreStrings;
