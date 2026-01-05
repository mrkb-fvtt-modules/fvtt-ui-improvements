Hooks.on("renderPlayers", (players, html) => {
    Players._appendAvatar(html);
});

class Players {
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
            charImg.src = c?.img;
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
}