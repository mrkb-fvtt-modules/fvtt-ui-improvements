export default class Hotbar {
    static initialize() {
        Hooks.on("renderHotbar", (hotbar, html) => {
            const isStyled = game.settings.get("mrkb-ui-improvements", "styledHotbar");
            if (!isStyled) return;
            this._createHotbarElement.bind(this, hotbar, html)();
        });
    }
    static _createHotbarElement(hotbar, html) {
        const actionBarElement = html.querySelector("#action-bar");
        const userHotbar = game.user.hotbar;
        const page = ui.hotbar.page;
        const nextPage = (page === 5) ? 1 : page + 1;

        const createLine = (j, isFirstLine) => {
            const line = document.createElement("ul");
            line.className = "action-bar-line";
            line.dataset.line = (j).toString();

            for (let i = 0; i < 10; i++) {
                const keyNumber = (j - 1) * 10 + i + 1;
                const macroId = userHotbar[keyNumber];
                const macro = game.macros.get(macroId);

                const slot = document.createElement("li");
                slot.className = "slot";
                slot.classList.add(macro ? "full" : "open");
                slot.role = "button";
                slot.dataset.slot = (keyNumber).toString();
                slot.dataset.action = "execute";
                slot.areaLabel = macro ? macro.name : "Empty Slot";

                if (macro) {
                    slot.dataset.tooltip = macro.name;
                    slot.draggable = true;

                    const icon = document.createElement("img");
                    icon.className = "slot-icon";
                    icon.src = macro.img;
                    icon.alt = macro.name;
                    slot.append(icon);
                }

                const key = document.createElement("span");
                key.className = "key";
                key.innerHTML = (isFirstLine ? "" : "↑") + ((i + 1) % 10).toString();
                slot.append(key);

                line.append(slot);
            }

            return line;
        }

        actionBarElement.replaceChildren(
            createLine(page, true),
            createLine(nextPage, false)
        );

        document.addEventListener("keydown", this._hotbarListener.bind(this), true);
    }
    static _hotbarListener(e) {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA" || e.target.isContentEditable) return;

        console.log(e);

        const key = e.keyCode - 48;
        if (key < 0 || key > 9) return;

        const page = ui.hotbar.page;
        const baseNumber = (e.shiftKey) ? page * 10 : (page - 1) * 10;

        const macroId = game.user.hotbar[baseNumber + key];
        if (!macroId) return;

        const macro = game.macros.get(macroId);
        if (!macro) return;

        e.preventDefault();
        e.stopImmediatePropagation();
        macro.execute();
    }
}