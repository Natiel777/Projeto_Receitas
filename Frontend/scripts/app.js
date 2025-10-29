import { listarUsuarios } from "./api.js";
import { renderUsuarios } from "./ui.js";

listarUsuarios().then(renderUsuarios);
