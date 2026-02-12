export default class Settings {
    static initialize() {
        Hooks.on("init", this._registerSettings.bind(this));
        Hooks.on("renderHotbar", this.styledElementHandler.bind(this, "hotbar"));
        Hooks.on("renderGamePause", this.styledElementHandler.bind(this, "pause"));
        Hooks.on("renderPlayers", this.styledElementHandler.bind(this, "players"));
        Hooks.on("renderSceneControls", this.styledElementHandler.bind(this, "controls"));
        Hooks.on("renderSidebar", this.styledElementHandler.bind(this, "sidebar"));
        Hooks.on("renderSceneNavigation", this.styledElementHandler.bind(this, "navigation"));
        Hooks.on("renderChatLog", this.styledElementHandler.bind(this, "chat"));
    }
    static _registerSettings() {
        game.settings.register("mrkb-ui-improvements", "styledHotbar", {
            name: "MRKB.StyledHotbarName",
            hint: "MRKB.StyledHotbarHint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            onChange: () => ui?.hotbar?.render()
        });
        game.settings.register("mrkb-ui-improvements", "styledPauseScreen", {
            name: "MRKB.StyledPauseScreenName",
            hint: "MRKB.StyledPauseScreenHint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            onChange: this.styledElementHandler.bind(this, "pause")
        });
        game.settings.register("mrkb-ui-improvements", "styledPlayers", {
            name: "MRKB.StyledPlayersName",
            hint: "MRKB.StyledPlayersHint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            onChange: () => ui?.players?.render()
        });
        game.settings.register("mrkb-ui-improvements", "styledSceneControlsAndSidebarMenu", {
            name: "MRKB.StyledSceneControlsAndSidebarMenuName",
            hint: "MRKB.StyledSceneControlsAndSidebarMenuHint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            onChange: this.styledElementHandler.bind(this, "controls")
        });
        game.settings.register("mrkb-ui-improvements", "styledSceneNavigation", {
            name: "MRKB.StyledSceneNavigationName",
            hint: "MRKB.StyledSceneNavigationHint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            onChange: this.styledElementHandler.bind(this, "navigation")
        });
        game.settings.register("mrkb-ui-improvements", "styledChatListBackground", {
            name: "MRKB.StyledChatListBackgroundName",
            hint: "MRKB.StyledChatListBackgroundHint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            onChange: this.styledElementHandler.bind(this, "chat")
        });
    }
    static _get(key) {
        return game.settings.get("mrkb-ui-improvements", key);
    }
    static styledElementHandler(type) {
        if (!type) return;

        switch (type) {
            case "pause":
                ui.pause.element.classList.toggle("styled", this._get("styledPauseScreen"));
                break;
            case "controls":
            case "sidebar":
                const sceneControls = ui.controls.element;
                const sidebarMenu = ui.sidebar.element?.querySelector(".tabs > menu");
                const isStyled = this._get("styledSceneControlsAndSidebarMenu");
                if (sceneControls) sceneControls.classList.toggle("styled", isStyled);
                if (sidebarMenu) sidebarMenu.classList.toggle("styled", isStyled);
                break;
            case "navigation":
                ui.nav.element.classList.toggle("styled", this._get("styledSceneNavigation"));
                break;
            case "chat":
                const chat = ui.chat.element;
                if (chat) chat.classList.toggle("styled", this._get("styledChatListBackground"));
                break;
        }
    }
}