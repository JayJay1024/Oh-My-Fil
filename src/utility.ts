const shortNames = new Map<string, string>();
shortNames.set('seal/v0/addpiece', 'AddPiece');
shortNames.set('seal/v0/hkcaddpiece', 'HKCAddPiece');
shortNames.set('seal/v0/precommit/1', 'PreCommit1');
shortNames.set('seal/v0/precommit/2', 'PreCommit2');
shortNames.set('seal/v0/commit/1', 'Commit1');
shortNames.set('seal/v0/commit/2', 'Commit2');
shortNames.set('seal/v0/finalize', 'Finalize');
shortNames.set('seal/v0/fetch', 'Fetch');
shortNames.set('seal/v0/unseal', 'Unseal');
shortNames.set('seal/v0/unsealread', 'UnsealRead');

export const taskShortName = (task: string): string | undefined => {
    return shortNames.get(task);
}

const shortShortNames = new Map<string, string>();
shortShortNames.set('seal/v0/addpiece', 'AP');
shortShortNames.set('seal/v0/hkcaddpiece', 'APH');
shortShortNames.set('seal/v0/precommit/1', 'PC1');
shortShortNames.set('seal/v0/precommit/2', 'PC2');
shortShortNames.set('seal/v0/commit/1', 'C1');
shortShortNames.set('seal/v0/commit/2', 'C2');
shortShortNames.set('seal/v0/finalize', 'FIN');
shortShortNames.set('seal/v0/fetch', 'GET');
shortShortNames.set('seal/v0/unseal', 'UNS');
shortShortNames.set('seal/v0/unsealread', 'URD');

export const taskShortShortName = (task: string): string | undefined => {
    return shortShortNames.get(task);
}
