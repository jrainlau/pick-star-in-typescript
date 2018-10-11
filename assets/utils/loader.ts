export const loadRes = (url) => {
  return new Promise((resolve, reject) => {
    cc.loader.loadRes(url, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}
