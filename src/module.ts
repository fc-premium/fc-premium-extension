export default class Module {
	public name: string;
	public version: string = '1.0';
	public description: string = 'Lorem ipsum dolor sit amet';
	public author: string = 'pytness';
	public enabled: boolean = true;
	public display: boolean = true;
	public settings: Object | null = null;


	constructor(name: string, settings: Object | null = null) {
		this.name = name;
		this.settings = settings
		this.description = this.description.repeat(Math.floor(Math.random() * 10) + 1);
	}

	public isDeprecated(): boolean {
		return true;
	}
}
