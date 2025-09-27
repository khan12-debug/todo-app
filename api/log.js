export default function handler(req, res) {
  const xf = req.headers['x-forwarded-for'];
  const ip = xf ? xf.split(',')[0].trim() : (req.socket?.remoteAddress || '');
  const ua = req.headers['user-agent'] || '';

  console.log("Visitor IP:", ip);
  console.log("User-Agent:", ua);

  res.status(200).json({ message: "Logged!", ip, ua });
}