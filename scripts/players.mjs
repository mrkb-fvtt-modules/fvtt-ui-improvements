export default class Players {
    static initialize() {
        Hooks.on("renderPlayers", (players, html) => {
            const styledPlayers = game.settings.get("mrkb-ui-improvements", "styledPlayers");
            if (!styledPlayers) return;
            this._appendAvatar(html);
            this._appendExpandButton(html);
        });
    }
    static _appendAvatar(html) {
        const users = game.users;
        users.forEach(function(u) {
            const c = u.character;

            const target = html.querySelector(`li[data-user-id=\"${u.id}\"]`);
            if (target === null) return;

            const userImg = document.createElement("img");
            userImg.src = game.users.get(u.id).avatar;
            userImg.className = "user-avatar player-avatar";

            const charImg = document.createElement("img");
            charImg.src = c?.img || "icons/svg/mystery-man.svg";
            charImg.className = "character-avatar player-avatar";
            if (!c) charImg.style.opacity = "0";

            target.prepend(userImg, charImg);

            const name = target.querySelector(".player-name");

            const userSpan = document.createElement("span");
            userSpan.className = "user-name";
            userSpan.innerText = u.name;

            const charSpan = document.createElement("span");
            charSpan.className = "character-name";
            charSpan.innerText = c?.name || u.name;
            charSpan.onclick = () => {
                if (!c || c?.permission < 2) return;
                c.sheet.render(true);
            }

            name.replaceChildren(userSpan, charSpan);
        });
    }
    static _appendExpandButton(html) {
        const playersActive = html.querySelector("#players-active");
        const playersInactive = html.querySelector("#players-inactive");

        const expandButton = document.createElement("button");
        expandButton.className = "players-expand-button";
        expandButton.innerHTML = `<i class='fas fa-caret-down'></i><span>${game.i18n.localize("MRKB.InactivePlayers")}</span>`;
        expandButton.onclick = () => {
            playersInactive.classList.toggle("expanded");
            expandButton.classList.toggle("expanded");
        };

        playersInactive.after(expandButton);
    }
}