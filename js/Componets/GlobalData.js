const global = {
  currentPath: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalResults: "",
    totalPages: "",
  },
  pages: {
    current: 1,
    total: "",
  },
  api: {
    apiKey: "d22d98fd43210ef8f253f6b8d4d44d03",
    apiUrl: "https://api.themoviedb.org/3/",
  },
  // rootPath: "",
  rootPath: "/Movies-N-TV_shows",
};

export { global };
