
const post = (url, data) => {
  let _data = new window.URLSearchParams();
  for (let k in data) {
    _data.append(k, data[k]);
  }
  return fetch(url, {
    body: _data,
    method: 'POST'
  }).then(res => res.json()).catch(error => {
    console.error(error);
  });
}

export {post};
