export default function handler(req, res) {
  const apiKey = req.headers["x-api-key"];

  // Secret Key (এটা বদলে নেবেন)
  if (apiKey !== "MY_SECRET_KEY_ABC123") {
    return res.status(403).json({ error: "Access Denied" });
  }

  // আপনার JSON data
  const jsonData = {
    admin: true,
    message: "Secure admin data"
  };

  return res.status(200).json(jsonData);
}
