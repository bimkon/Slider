

function importAll(resolve:any) {
    resolve.keys().forEach(resolve);
  }
importAll(require.context('../src/', true, /\.ts$|\.scss$/));

