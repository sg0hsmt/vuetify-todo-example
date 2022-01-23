module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/vuetify-todo-example/" : "/",
  transpileDependencies: ["vuetify"],
};
