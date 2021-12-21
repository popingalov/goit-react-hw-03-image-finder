import URL from './settings';

export default async function takeImage(search, page) {
  const url = `${URL.BASE_URL}/?image_type=${URL.IMAGE_TYPE}&orientation=${URL.ORIENTATION}&q=${search}&page=${page}&per_page=${URL.QUANTITY_PER_PAGE}&key=${URL.KEY}`;
  const response = await fetch(url);
  const res = await response.json();
  const normalizeApi = res.hits.reduce((mass, el) => {
    mass.push({
      id: el.id,
      webformatURL: el.webformatURL,
      largeImageURL: el.largeImageURL,
    });
    return mass;
  }, []);
  /* if (normalizeApi.length < 1) {
    return;
  } */
  return normalizeApi;
}
