"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");

const file = (name) => fs.readFileSync(path.join(__dirname, "..", name), "utf8");
const html = file("index.html");
const source = file("lessons.js");
const application = file("app.js");

function loadCourse() {
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: "lessons.js", timeout: 3000 });
  return sandbox.window.COURSE;
}

test("los datos de las lecciones se inicializan sin ReferenceError", () => {
  const course = loadCourse();
  assert.ok(course);
  assert.equal(course.kotlin.length, 4);
  assert.equal(course.android.length, 3);
  assert.equal(Object.values(course).flatMap((modules) => modules.flatMap((module) => module.items)).length, 32);
  for (const modules of Object.values(course)) {
    for (const module of modules) {
      assert.ok(module.id && module.name);
      for (const item of module.items) {
        assert.equal(item.length, 7);
        assert.ok(item.every((part) => typeof part === "string" || Array.isArray(part)));
      }
    }
  }
});

test("las interpolaciones de Kotlin se conservan como ejemplos de codigo", () => {
  const course = loadCourse();
  const snippets = course.kotlin.flatMap((module) => module.items.map((item) => item[3]));
  assert.ok(snippets.some((snippet) => snippet.includes("${pos + 1}")));
  assert.ok(snippets.some((snippet) => snippet.includes("${marca.uppercase()}")));
  assert.ok(snippets.some((snippet) => snippet.includes("${response.status.value}")));
});

test("HTML enlaza archivos correctos y contiene controles basicos", () => {
  for (const id of ["phases", "lessons", "lesson-section", "stat-lessons", "stat-exercises", "progress-label", "vehicle-list"]) {
    assert.ok(html.includes('id="' + id + '"'), "Falta #" + id);
  }
  assert.match(html, /src="lessons\.js\?v=2"/);
  assert.match(html, /src="app\.js\?v=2"/);
  new vm.Script(application, { filename: "app.js" });
});

test("el inicio de la aplicacion crea la navegacion y el laboratorio", () => {
  const elements = new Map();
  function node(id = "") {
    return {
      id, style: {}, dataset: {}, value: "", textContent: "", hidden: false, innerHTML: "",
      classList: { toggle() {} }, setAttribute() {}, scrollBy() {}, scrollIntoView() {}, focus() {},
    };
  }
  for (const m of html.matchAll(/\bid="([^"]+)"/g)) elements.set(m[1], node(m[1]));
  const get = (id) => elements.get(id);
  const section = get("lesson-section");
  Object.defineProperty(section, "innerHTML", {
    get() { return this._value || ""; },
    set(value) {
      this._value = value;
      for (const m of value.matchAll(/\bid="([^"]+)"/g)) elements.set(m[1], node(m[1]));
    },
  });
  const dataNode = (key, value) => ({ ...node(), dataset: { [key]: value } });
  const tracks = ["kotlin", "android"].map((key) => dataNode("track", key));
  const arrows = ["phases", "lessons"].map((key) => dataNode("scroll", key));
  const derived = (id, key) => [...get(id).innerHTML.matchAll(new RegExp('data-' + key + '="(\\d+)"', "g"))]
    .map((match) => dataNode(key, match[1]));
  const document = {
    documentElement: { dataset: { theme: "dark" } },
    querySelector(selector) { return get(selector.slice(1)) || null; },
    querySelectorAll(selector) {
      if (selector === ".track") return tracks;
      if (selector === ".nav-arrow") return arrows;
      if (selector === ".phase") return derived("phases", "phase");
      if (selector === ".lesson-link") return derived("lessons", "lesson");
      if (selector === "[data-edit]") return derived("vehicle-list", "edit");
      if (selector === "[data-delete]") return derived("vehicle-list", "delete");
      throw new Error("Selector inesperado: " + selector);
    },
  };
  const store = new Map();
  const localStorage = {
    getItem(key) { return store.get(key) || null; },
    setItem(key, value) { store.set(key, value); },
  };
  const sandbox = {
    window: {}, document, localStorage,
    navigator: { clipboard: { writeText: async () => {} } },
    confirm: () => true,
  };
  vm.runInNewContext(source, sandbox, { filename: "lessons.js" });
  sandbox.COURSE = sandbox.window.COURSE;
  vm.runInNewContext(application, sandbox, { filename: "app.js" });
  assert.equal(Number(get("stat-lessons").textContent), 32);
  assert.equal(derived("phases", "phase").length, 4);
  assert.match(get("lesson-section").innerHTML, /Kotlin desde cero/);
  assert.match(get("vehicle-list").innerHTML, /Toyota/);
  tracks[1].onclick();
  assert.equal(derived("phases", "phase").length, 3);
  assert.match(get("lesson-section").innerHTML, /Android Studio/);
  get("next-lesson").onclick();
  assert.match(get("lesson-section").innerHTML, /Composable y Text/);
});
