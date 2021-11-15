import urls from "../../../utils/urls";

const routes = [
  {
    name: "Home",
    link: urls.pages.index,
    auth: false,
    atEnd: false,
  },
  {
    name: "Adopt",
    link: urls.pages.adopt,
    auth: false,
    atEnd: false,
  },
  {
    name: "Login",
    link: urls.pages.login,
    auth: false,
    atEnd: true,
  },
  {
    name: "App Home",
    link: urls.pages.app.home,
    auth: true,
  },
  {
    name: "Admin",
    link: urls.pages.admin,
    auth: false,
  },
];

export default routes;
