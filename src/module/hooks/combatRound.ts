export const combatRound = (combat: Combat, updateData: { round: number; turn: number }, updateOptions: any) => {
    if (game.combat && game.readyCheck.formData && game.readyCheck.formData['reset-combat']) {
        game.readyCheck.start(game.readyCheck.formData, { notify: false });
    }
};
