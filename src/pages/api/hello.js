// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const { sid } = req.body;
  //console.log('sid: ', sid);

  try {
    if (sid === '948F6035CCEDAEFF3604A9F772098E48') {
      res.status(200).json({
        "name": 'Vladimir Hiuk',
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmxhZGltaXIgSGl1ayJ9.dnBZ1Yq5CMNEykHsgeK8tQTtwWYXK3eGrLtUq57fHDI",
        "accessTokenExpiry": 1671979985000,
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmxhZGltaXIgSGl1ayJ9.dnBZ1Yq5CMNEykHsgeK8tQTtwWYXK3eGrLtUq57fHDI",
        "sid": "948F6035CCEDAEFF3604A9F772098E48"
      });
    } else {
      res.status(401).json({
        message: 'Unauthorized'
      })
    }
  } catch (err) {
    res.status(500).send({ error: 'failed to fetch data' })
  }
  /*console.log('req: ', req);
  console.log('res: ', res);*/
  //console.log('req.body: ', req.body);

}
