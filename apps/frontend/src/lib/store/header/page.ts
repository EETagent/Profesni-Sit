import { writable, type Writable } from "svelte/store";

const activePage: Writable<string> = writable("Profesní Síť");

export default activePage;