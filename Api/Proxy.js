export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  const path = req.query.path || "";
  const params = { ...req.query };
  delete params.path;

  const qs = new URLSearchParams(params).toString();
  const url = `https://v3.football.api-sports.io/${path}${qs ? "?" + qs : ""}`;

  const r = await fetch(url, {
    headers: {
      "x-apisports-key": process.env.API_KEY
    }
  });

  const data = await r.json();
  res.status(200).json(data);
}
