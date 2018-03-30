// You will need axios
import axios from 'axios';

function getOrgs(username) {
  return axios.get(`https://api.github.com/users/${username}/orgs`);
}

class UserView {
  constructor(user) {
    this.user = user;
    this.orgs = getOrgs(user.username); <1>
  }

  defaultView() {
    // show the default view
  }

  orgView() {
    // show loading screen
    this.orgs.then(resp => { <2>
      const orgs = resp.orgs;
      // show the orgs
    })
  }
}
