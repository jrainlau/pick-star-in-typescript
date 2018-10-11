export const loadRes = (url, type = null) => {
  return new Promise((resolve, reject) => {
    cc.loader.loadRes(url, type, (err, res) => {
      if (err) {
        reject(err)
      }
      resolve(res)
    })
  })
}
