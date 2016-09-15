export default class API {
  constructor(url = 'https://s3.amazonaws.com/vgv-public/tests/astro-native/task.json') {
    this.url = url;
  }

  getAll() {
    return fetch(this.url)
      .then(result => result.json());
  }
}
