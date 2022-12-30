export default function handler(req, res) {
  if (req.method === `POST`) {
    res.send(`I am POST`);
  } else {
    res.send(`I am GET`);
    // Handle other methods or return error
  }
}
