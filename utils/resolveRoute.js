const resolveRoute = (route) => {
  let key = route;
  if (route.startsWith(process.env.DOMAIN)) {
    key = route.replace(process.env.DOMAIN, "");
  }
  if (key.startsWith("/")) {
    key = key.substring(1);
  }
  return key;
};

module.exports = resolveRoute;
