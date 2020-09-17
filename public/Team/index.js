let team = {
  "Board": {
    title: "Board Members",
    leads: [],
    coleads: [],
  },
  "Web": {
    title: "Web Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "Mobile": {
    title: "Mobile Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "ML": {
    title: "ML Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "AR/VR": {
    title: "AR/VR Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "Cyber": {
    title: "Cyber Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "BlockChain": {
    title: "Blockchain Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "Management": {
    title: "Management Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "Marketing": {
    title: "Marketing Team",
    leads: [],
    mentors: [],
    members: [],
  },
  "Designing": {
    title: "Design Team",
    leads: [],
    mentors: [],
    members: [],
  },
};
let data;

window.onload = () => {
  console.log("Team Page Loaded");
  fetchTeamData();
};

function fetchTeamData() {
  //console.log("featching team data");
  const url =
    "https://spreadsheets.google.com/feeds/list/158UVlY_oswJSCLbjl2uQu2qEKi9greNvYO5kveXvRiQ/1/public/full?alt=json";
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      data = result.feed.entry;
      //console.log(data);
      setTeamData(data);
      setHtml();
    })
    .catch((err) => {
      console.log(err);
    });
}

function setTeamData(data) {
  data.forEach((e) => {
    if (!team[parseKey(e, "department")]) {
      console.log("dept doesn't exist:", parseKey(e, "department"));
      return;
    }

    console.log(parseKey(e, "department"));
    if (parseKey(e, "designation") === "Lead") {
      team[parseKey(e, "department")].leads.push(e);
    } else if (parseKey(e, "designation") === "Colead") {
      if (team[parseKey(e, "department")].coleads)
        team[parseKey(e, "department")].coleads.push(e);
      else console.log("this dept has not colead position");
    } else if (parseKey(e, "designation") === "Mentor") {
      if (team[parseKey(e, "department")].mentors)
        team[parseKey(e, "department")].mentors.push(e);
    } else {
      if (team[parseKey(e, "department")].members)
        team[parseKey(e, "department")].members.push(e);
    }
  });

  //console.log(team);
}

function setHtml() {
  const teamContainer = document.getElementById("teamContainer");
  teamContainer.innerHTML = " ";
  let data = Object.keys(team);
  //console.log(data);
  let temp = " ";
  data.forEach((e) => {
    temp = "<div class='mb-100 wow fadeInUp'> ";
    temp += `<h2 class="mb-4 text-center">${e}</h2> <div class="row mx-0">`;

    temp += `  <div class="col-12 col-md-6"><div class="positionLine"><div class="position">${
      team[e].leads.length > 1 ? "Leads" : "Lead"
    }</div></div><div class="row justify-content-center">`;
    team[e].leads.forEach((l) => {
      temp += `  ${getCardHtml(
        parseKey(l, "name"),
        parseKey(l, "imageurl"),
        undefined,
        parseKey(l, "github"),
        parseKey(l, "linkedin"),
        parseKey(l, "twitter")
      )} `;
    });
    temp += "</div></div>";

    if (team[e].coleads) {
      temp += `  <div class="col-12 col-md-6 mt-5 mt-md-0"><div class="positionLine"><div class="position">Co-Leads</div></div><div class="row">`;
      team[e].coleads.forEach((l) => {
        temp += `${getCardHtml(
          parseKey(l, "name"),
          parseKey(l, "imageurl"),
          undefined,
          parseKey(l, "github"),
          parseKey(l, "linkedin"),
          parseKey(l, "twitter")
        )} `;
      });
      temp += "</div></div>";
    }

    if (team[e].mentors && team[e].mentors.length > 0) {
      temp += `  <div class="col-12 col-md-6 mt-5 mt-md-0"><div class="positionLine"><div class="position">${
        team[e].mentors.length > 1 ? "Mentors" : "Mentor"
      }</div></div><div class="row justify-content-center">`;
      team[e].mentors.forEach((l) => {
        temp += `${getCardHtml(
          parseKey(l, "name"),
          parseKey(l, "imageurl"),
          undefined,
          parseKey(l, "github"),
          parseKey(l, "linkedin"),
          parseKey(l, "twitter")
        )} `;
      });
      temp += "</div></div>";
    }

    if (team[e].members && team[e].members.length > 0) {
      temp += `  <div class="col-12 mt-5 wow fadeInUp" style='display:none' id="${e}-members"><div class="positionLine"><div class="position">Members</div></div><div class="row">`;
      team[e].members.forEach((l) => {
        temp += `${getCardHtml(
          parseKey(l, "name"),
          parseKey(l, "imageurl"),
          "col-6 col-md-3",
          parseKey(l, "github"),
          parseKey(l, "linkedin"),
          parseKey(l, "twitter")
        )}`;
      });
      temp += "</div></div>";
      temp += `<div class="positionLine w-100 mt-30"><div class="showMemberBtn" onClick="toggleMembers('${e}-members',this)">Show Members</div></div>`;
    }
    temp += "</div> </div>";
    //console.log(temp);
    teamContainer.innerHTML += temp;
  });
}

function parseKey(obj, key) {
  return obj["gsx$" + key].$t;
}

function getCardHtml(
  name,
  img_url,
  classValues = "col-6",
  github,
  linkedin,
  twitter
) {
  //console.log(name, img_url);
  return ` 
  <div class="${classValues}">
  <div class="row teamcard">
    <div class="col-12 text-center">
      <img
        src=${img_url}
        alt="pic"
      />
    </div>
    <div class="col-12 text-center mt-3">${name}</div>
    <div class="col-12 d-flex justify-content-around my-3">
      ${
        github
          ? `<div>
            <a
              href=${github}
              target="_blank"
              rel="noopener"
            >
              <i class="fab fa-github socialLinks" ></i>
            </a>
          </div>`
          : ""
      }

      ${
        linkedin
          ? `<div>
        <a
          href=${linkedin}
          target="_blank"
          rel="noopener"
        >
          <i class="fab fa-linkedin socialLinks"></i>
        </a>
      </div>`
          : ""
      }

    ${
      twitter
        ? `<div>
        <a href=${twitter} target="_blank" rel="noopener">
          <i class="fab fa-twitter socialLinks"></i>
        </a>
      </div>`
        : ""
    }
    </div>
    </div>
    </div>
  `;
}

function toggleMembers(id, ele) {
  //console.log(id, ele);
  const temp = document.getElementById(id);
  //console.log(temp.style.display);
  if (temp.style.display === "none") {
    temp.style.display = "block";
    ele.innerText = "Hide Members";
  } else {
    temp.style.display = "none";
    ele.innerText = "Show Members";
  }
}
