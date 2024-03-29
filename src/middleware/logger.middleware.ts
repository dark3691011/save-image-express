export const loggerMiddleware = (req: any, res: any, next: () => void) => {
  console.log("-------------------------");
  console.log(new Date().toISOString());
  console.log(
    JSON.stringify({
      baseUrl: req.baseUrl,
      body: req.body,
      param: req.param,
      query: req.query,
    })
  );
  console.log("-------------------------");
  next();
};
