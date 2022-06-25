exports.postId = (req, res) => {
  let log = { error_400: "Cannot make a POST request with a parameter"}
  let lo = JSON.stringify(log, null, 2)
  console.log(lo)
  res.status(400).json({ error: "Cannot make a POST request with a parameter"});
}

exports.patchñId = (req, res) => {
  let log = { error_400: "Cannot make a PATCH request without a parameter"}
  let lo = JSON.stringify(log, null, 2)
  console.log(lo)
  res.status(400).json({ error: "Cannot make a PATCH request without a parameter"});
}

exports.delñId = (req, res) => {
  let log = { error_400: "Cannot make a DELETE request without a parameter"}
  let lo = JSON.stringify(log, null, 2)
  console.log(lo)
  res.status(400).json({ error: "Cannot make a DELETE request without a parameter"})
}
