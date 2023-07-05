export default function handler(req, res) {
  const { method, query } = req;
  console.log(query.slug[0]);
  switch (method) {
    case "GET":
      res.status(200).json({ message: "GET call" });
      break;
    case "POST":
      res.status(200).json({ message: "POST call" });
      break;
    case "PUT":
      res.status(200).json({ message: "PUT call" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} is not allowed`);
      break;
  }
}
