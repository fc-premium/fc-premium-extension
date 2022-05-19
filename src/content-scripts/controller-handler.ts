import { Core } from 'fc-premium-core'

import StorageEntries = Core.Definitions.StorageEntries;


Core.Controller.setControllerMethods({
	getter: (keys: string | string[]): any => {
		return JSON.parse(<string>localStorage.getItem(<string>keys));
	},

	setter: (key: string, value: any): void => {
		return localStorage.setItem(key, JSON.stringify(value));
	},

	deleter: (key: string): void => {
		localStorage.removeItem(key);
	},

	lister: (): string[] => {
		let list: string[] = [];

		for (let i = 0; i < localStorage.length; i++) {
			const key: string = <string>localStorage.key(i);

			if (key.startsWith(StorageEntries.root))
				list.push(key)
		}

		return list;
	},
});
