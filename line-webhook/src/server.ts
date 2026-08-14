import app from "./app";

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`🚀 LINE Webhook server running at http://localhost:${port}`);
  console.log(`💚 Health check: http://localhost:${port}/health`);
});