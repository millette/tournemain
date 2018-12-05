export default (req, path) =>
  `${(req &&
    req.socket &&
    req.connection &&
    `${req.socket.encrypted || req.connection.encrypted ? "https" : "http"}://${
      req.hostname
    }`) ||
    ""}/${path}`
