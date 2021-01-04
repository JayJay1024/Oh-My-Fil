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
