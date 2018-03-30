fetch("https://api.github.com/users/jisaacks/orgs")
  .then(resp => resp.json())
  .then(results => {
    // do something with results
  });
