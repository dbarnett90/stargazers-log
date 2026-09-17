async function loadStarredRepos() {
  const list = document.getElementById("stargazers-list");

  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch events.json: ${response.status}`);
    }
    const events = await response.json();
    renderStarredRepos(events, list);
  } catch (error) {
    list.innerHTML = `<li>Could not load starred repositories: ${error.message}</li>`;
  }
}

function renderStarredRepos(events, list) {
  list.innerHTML = "";

  events.forEach((event) => {
    const item = document.createElement("li");

    const link = document.createElement("a");
    link.className = "repo-name";
    link.href = event.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = event.repo;

    const description = document.createElement("p");
    description.className = "repo-description";
    description.textContent = event.description;

    const starredAt = document.createElement("span");
    starredAt.className = "starred-at";
    starredAt.textContent = `Starred on ${new Date(event.starredAt).toLocaleDateString()}`;

    item.append(link, description, starredAt);
    list.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", loadStarredRepos);
