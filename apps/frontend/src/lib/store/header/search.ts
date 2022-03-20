import { writable, type Writable } from "svelte/store";

const search: Writable<string> = writable();

export default search;
