async function loadStarredRepos() {
  const list = document.getElementById("stargazers-list");

  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch events.json: ${response.status}`);
    }
    const events = await response.json();
    if (!Array.isArray(events)) {
      throw new Error("events.json did not contain a list of repositories");
    }
    renderStarredRepos(events, list);
  } catch (error) {
    list.textContent = "";
    const errorItem = document.createElement("li");
    errorItem.textContent = `Could not load starred repositories: ${error.message}`;
    list.appendChild(errorItem);
  }
}

function renderStarredRepos(events, list) {
  list.textContent = "";

  if (events.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No starred repositories yet.";
    list.appendChild(emptyItem);
    return;
  }

  events.forEach((event) => {
    if (!event.repo || !event.url) {
      return;
    }

    const item = document.createElement("li");

    const link = document.createElement("a");
    link.className = "repo-name";
    link.href = event.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = event.repo;

    const newTabHint = document.createElement("span");
    newTabHint.className = "sr-only";
    newTabHint.textContent = " (opens in new tab)";
    link.appendChild(newTabHint);

    const description = document.createElement("p");
    description.className = "repo-description";
    description.textContent = event.description || "No description provided.";

    const starredAt = document.createElement("span");
    starredAt.className = "starred-at";
    const starredDate = new Date(event.starredAt);
    starredAt.textContent = Number.isNaN(starredDate.getTime())
      ? "Starred date unknown"
      : `Starred on ${starredDate.toLocaleDateString()}`;

    item.append(link, description, starredAt);
    list.appendChild(item);
  });
}

document.addEventListener("DOMContentLoaded", loadStarredRepos);
