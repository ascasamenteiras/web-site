export default function handler(req, res) {
  if (req.method === `POST`) {
    res.send(`I am POST3`);
  } else {
    res.send(`I am GET3`);
    // Handle other methods or return error
  }
}
