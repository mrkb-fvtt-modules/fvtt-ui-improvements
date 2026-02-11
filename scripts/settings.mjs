export default class Settings {
    static initialize() {
        Hooks.on("init", () => {
            this._registerSettings();
        });
        Hooks.on("ready", () => {
            this.styledElementHandler();
        });
    }
    static _registerSettings() {
        game.settings.register("mrkb-ui-improvements", "styledHotbar", {
            name: "MRKB.StyledHotbarName",
            hint: "MRKB.StyledHotbarHint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            onChange: this.styledElementHandler.bind(this)
        });
        game.settings.register("mrkb-ui-improvements", "styledPauseScreen", {
            name: "MRKB.StyledPauseScreenName",
            hint: "MRKB.StyledPauseScreenHint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            onChange: this.styledElementHandler.bind(this)
        });
        game.settings.register("mrkb-ui-improvements", "styledPlayers", {
            name: "MRKB.StyledPlayersName",
            hint: "MRKB.StyledPlayersHint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            onChange: this.styledElementHandler.bind(this)
        });
        game.settings.register("mrkb-ui-improvements", "styledSceneControlsAndSidebarMenu", {
            name: "MRKB.StyledSceneControlsAndSidebarMenuName",
            hint: "MRKB.StyledSceneControlsAndSidebarMenuHint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            onChange: this.styledElementHandler.bind(this)
        });
        game.settings.register("mrkb-ui-improvements", "styledSceneNavigation", {
            name: "MRKB.StyledSceneNavigationName",
            hint: "MRKB.StyledSceneNavigationHint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            onChange: this.styledElementHandler.bind(this)
        });
        game.settings.register("mrkb-ui-improvements", "styledChatListBackground", {
            name: "MRKB.StyledChatListBackgroundName",
            hint: "MRKB.StyledChatListBackgroundHint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            onChange: this.styledElementHandler.bind(this)
        });
    }
    static _get(key) {
        return game.settings.get("mrkb-ui-improvements", key);
    }
    static styledElementHandler() {
        const hotbar = ui.hotbar.element;
        const pause = ui.pause.element;
        const players = ui.players.element;
        const sceneControls = ui.controls.element;
        const sidebarMenu = ui.sidebar.element.querySelector(".tabs > menu");
        const sceneNavigation = ui.nav.element;
        const chatLog = ui.chat.element.querySelector(".chat-log");

        const isHotbarStyled = this._get("styledHotbar");
        const isPauseStyled = this._get("styledPauseScreen");
        const isPlayersStyled = this._get("styledPlayers");
        const isSceneControlsAndSidebarMenuStyled = this._get("styledSceneControlsAndSidebarMenu");
        const isSceneNavigationStyled = this._get("styledSceneNavigation");
        const isChatListBackgroundStyled = this._get("styledChatListBackground");

        if (hotbar) hotbar.classList.toggle("styled", isHotbarStyled);
        if (pause) pause.classList.toggle("styled", isPauseStyled);
        if (players) players.classList.toggle("styled", isPlayersStyled);
        if (sceneControls) sceneControls.classList.toggle("styled", isSceneControlsAndSidebarMenuStyled);
        if (sidebarMenu) sidebarMenu.classList.toggle("styled", isSceneControlsAndSidebarMenuStyled);
        if (sceneNavigation) sceneNavigation.classList.toggle("styled", isSceneNavigationStyled);
        if (chatLog) chatLog.classList.toggle("styled", isChatListBackgroundStyled);

        ui.hotbar.render();
        ui.players.render();
    }
}