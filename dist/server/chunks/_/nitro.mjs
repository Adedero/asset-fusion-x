import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import * as path from 'node:path';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';
import { unlink as unlink$1, mkdir, writeFile as writeFile$1, rm } from 'fs/promises';
import axios from 'axios';
import { join as join$1, resolve as resolve$2 } from 'path';
import http from 'node:http';
import https from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { CronJob } from 'cron';
import * as process$1 from 'node:process';
import { fileURLToPath } from 'node:url';
import * as runtime from '@prisma/client/runtime/library';
import nodemailer from 'nodemailer';
import { config as config$2 } from 'dotenv';
import { promises, existsSync } from 'node:fs';
import { isValidIP, normalizeIP } from '@better-auth/core/utils';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin } from 'better-auth/plugins';
import { getIcons } from '@iconify/utils';
import { createHash } from 'node:crypto';
import { consola } from 'consola';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  if (value[0] === '"' && value[value.length - 1] === '"' && value.indexOf("\\") === -1) {
    return value.slice(1, -1);
  }
  const _value = value.trim();
  if (_value.length <= 9) {
    switch (_value.toLowerCase()) {
      case "true": {
        return true;
      }
      case "false": {
        return false;
      }
      case "undefined": {
        return void 0;
      }
      case "null": {
        return null;
      }
      case "nan": {
        return Number.NaN;
      }
      case "infinity": {
        return Number.POSITIVE_INFINITY;
      }
      case "-infinity": {
        return Number.NEGATIVE_INFINITY;
      }
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    const nextChar = input[_base.length];
    if (!nextChar || nextChar === "/" || nextChar === "?") {
      return input;
    }
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const nextChar = input[_base.length];
  if (nextChar && nextChar !== "/" && nextChar !== "?") {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === void 0) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : void 0
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== void 0 && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return Promise.resolve()}};const c$1=class c{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=m(e._destroy,t._destroy);}};function _(){return Object.assign(c$1.prototype,i$1.prototype),Object.assign(c$1.prototype,l$1.prototype),c$1}function m(...n){return function(...e){for(const t of n)t(...e);}}const g=_();class A extends g{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== void 0) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, void 0, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

async function validateData(data, fn) {
  try {
    const res = await fn(data);
    if (res === false) {
      throw createValidationError();
    }
    if (res === true) {
      return data;
    }
    return res ?? data;
  } catch (error) {
    throw createValidationError(error);
  }
}
function createValidationError(validateError) {
  throw createError$1({
    status: 400,
    statusMessage: "Validation Error",
    message: validateError?.message || "Validation Error",
    data: validateError
  });
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function getValidatedQuery(event, validate) {
  const query = getQuery(event);
  return validateData(query, validate);
}
function getRouterParams(event, opts = {}) {
  let params = event.context.params || {};
  if (opts.decode) {
    params = { ...params };
    for (const key in params) {
      params[key] = decode(params[key]);
    }
  }
  return params;
}
function getRouterParam(event, name, opts = {}) {
  const params = getRouterParams(event, opts);
  return params[name];
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}
function getRequestHost(event, opts = {}) {
  if (opts.xForwardedHost) {
    const _header = event.node.req.headers["x-forwarded-host"];
    const xForwardedHost = (_header || "").split(",").shift()?.trim();
    if (xForwardedHost) {
      return xForwardedHost;
    }
  }
  return event.node.req.headers.host || "localhost";
}
function getRequestProtocol(event, opts = {}) {
  if (opts.xForwardedProto !== false && event.node.req.headers["x-forwarded-proto"] === "https") {
    return "https";
  }
  return event.node.req.connection?.encrypted ? "https" : "http";
}
function getRequestURL(event, opts = {}) {
  const host = getRequestHost(event, opts);
  const protocol = getRequestProtocol(event, opts);
  const path = (event.node.req.originalUrl || event.path).replace(
    /^[/\\]+/g,
    "/"
  );
  return new URL(path, `${protocol}://${host}`);
}
function toWebRequest(event) {
  return event.web?.request || new Request(getRequestURL(event), {
    // @ts-ignore Undici option
    duplex: "half",
    method: event.method,
    headers: event.headers,
    body: getRequestWebStream(event)
  });
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      if (_resolved instanceof FormData) {
        return new Response(_resolved).bytes().then((uint8arr) => Buffer.from(uint8arr));
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !/\bchunked\b/i.test(
    String(event.node.req.headers["transfer-encoding"] ?? "")
  )) {
    return Promise.resolve(void 0);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
async function readValidatedBody(event, validate) {
  const _body = await readBody(event, { strict: true });
  return validateData(_body, validate);
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return void 0;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => void 0);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== void 0) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
    for (const [key, value] of entries) {
      if (value !== void 0) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : void 0;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === void 0 ? void 0 : await val;
      if (_body !== void 0) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, void 0);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, void 0);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, void 0)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, void 0, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, void 0, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, void 0, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === void 0 && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = void 0;
    this._after = void 0;
    this._deprecatedMessages = void 0;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = void 0;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = void 0;
      _function = void 0;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : void 0;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== void 0) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== void 0) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s$1=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  if (value instanceof FormData || value instanceof URLSearchParams) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (contentType === "text/event-stream") {
    return "stream";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: void 0,
      error: void 0
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
      if (!(context.options.headers instanceof Headers)) {
        context.options.headers = new Headers(
          context.options.headers || {}
          /* compat */
        );
      }
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        const contentType = context.options.headers.get("content-type");
        if (typeof context.options.body !== "string") {
          context.options.body = contentType === "application/x-www-form-urlencoded" ? new URLSearchParams(
            context.options.body
          ).toString() : JSON.stringify(context.options.body);
        }
        if (!contentType) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch({ fetch, Headers: Headers$1, AbortController });
const $fetch$1 = ofetch;

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "has",
  "hasItem",
  "get",
  "getItem",
  "getItemRaw",
  "set",
  "setItem",
  "setItemRaw",
  "del",
  "remove",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  nsStorage.keys = nsStorage.getKeys;
  nsStorage.getItems = async (items, commonOptions) => {
    const prefixedItems = items.map(
      (item) => typeof item === "string" ? base + item : { ...item, key: base + item.key }
    );
    const results = await storage.getItems(prefixedItems, commonOptions);
    return results.map((entry) => ({
      key: entry.key.slice(base.length),
      value: entry.value
    }));
  };
  nsStorage.setItems = async (items, commonOptions) => {
    const prefixedItems = items.map((item) => ({
      key: base + item.key,
      value: item.value,
      options: item.options
    }));
    return storage.setItems(prefixedItems, commonOptions);
  };
  return nsStorage;
}
function normalizeKey$1(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$1(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$1(base);
  return base ? base + ":" : "";
}
function filterKeyByDepth(key, depth) {
  if (depth === void 0) {
    return true;
  }
  let substrCount = 0;
  let index = key.indexOf(":");
  while (index > -1) {
    substrCount++;
    index = key.indexOf(":", index + 1);
  }
  return substrCount <= depth;
}
function filterKeyByBase(key, base) {
  if (base) {
    return key.startsWith(base) && key[key.length - 1] !== "$";
  }
  return key[key.length - 1] !== "$";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$1 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$1,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : void 0,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$1(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$1(isStringItem ? item : item.key);
      const value = isStringItem ? void 0 : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === void 0) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$1(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      let allMountsSupportMaxDepth = true;
      for (const mount of mounts) {
        if (!mount.driver.flags?.maxDepth) {
          allMountsSupportMaxDepth = false;
        }
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$1(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      const shouldFilterByDepth = opts.maxDepth !== void 0 && !allMountsSupportMaxDepth;
      return allKeys.filter(
        (key) => (!shouldFilterByDepth || filterKeyByDepth(key, opts.maxDepth)) && filterKeyByBase(key, base)
      );
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$1(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$1(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {

};

const normalizeKey = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore, maxDepth) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        if (maxDepth === void 0 || maxDepth > 0) {
          const dirFiles = await readdirRecursive(
            entryPath,
            ignore,
            maxDepth === void 0 ? void 0 : maxDepth - 1
          );
          files.push(...dirFiles.map((f) => entry.name + "/" + f));
        }
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME,
    options: opts,
    flags: {
      maxDepth: true
    },
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys(_base, topts) {
      return readdirRecursive(r("."), opts.ignore, topts?.maxDepth);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function serialize$1(o){return typeof o=="string"?`'${o}'`:new c().serialize(o)}const c=/*@__PURE__*/function(){class o{#t=new Map;compare(t,r){const e=typeof t,n=typeof r;return e==="string"&&n==="string"?t.localeCompare(r):e==="number"&&n==="number"?t-r:String.prototype.localeCompare.call(this.serialize(t,true),this.serialize(r,true))}serialize(t,r){if(t===null)return "null";switch(typeof t){case "string":return r?t:`'${t}'`;case "bigint":return `${t}n`;case "object":return this.$object(t);case "function":return this.$function(t)}return String(t)}serializeObject(t){const r=Object.prototype.toString.call(t);if(r!=="[object Object]")return this.serializeBuiltInType(r.length<10?`unknown:${r}`:r.slice(8,-1),t);const e=t.constructor,n=e===Object||e===void 0?"":e.name;if(n!==""&&globalThis[n]===e)return this.serializeBuiltInType(n,t);if(typeof t.toJSON=="function"){const i=t.toJSON();return n+(i!==null&&typeof i=="object"?this.$object(i):`(${this.serialize(i)})`)}return this.serializeObjectEntries(n,Object.entries(t))}serializeBuiltInType(t,r){const e=this["$"+t];if(e)return e.call(this,r);if(typeof r?.entries=="function")return this.serializeObjectEntries(t,r.entries());throw new Error(`Cannot serialize ${t}`)}serializeObjectEntries(t,r){const e=Array.from(r).sort((i,a)=>this.compare(i[0],a[0]));let n=`${t}{`;for(let i=0;i<e.length;i++){const[a,l]=e[i];n+=`${this.serialize(a,true)}:${this.serialize(l)}`,i<e.length-1&&(n+=",");}return n+"}"}$object(t){let r=this.#t.get(t);return r===void 0&&(this.#t.set(t,`#${this.#t.size}`),r=this.serializeObject(t),this.#t.set(t,r)),r}$function(t){const r=Function.prototype.toString.call(t);return r.slice(-15)==="[native code] }"?`${t.name||""}()[native]`:`${t.name}(${t.length})${r.replace(/\s*\n\s*/g,"")}`}$Array(t){let r="[";for(let e=0;e<t.length;e++)r+=this.serialize(t[e]),e<t.length-1&&(r+=",");return r+"]"}$Date(t){try{return `Date(${t.toISOString()})`}catch{return "Date(null)"}}$ArrayBuffer(t){return `ArrayBuffer[${new Uint8Array(t).join(",")}]`}$Set(t){return `Set${this.$Array(Array.from(t).sort((r,e)=>this.compare(r,e)))}`}$Map(t){return this.serializeObjectEntries("Map",t.entries())}}for(const s of ["Error","RegExp","URL"])o.prototype["$"+s]=function(t){return `${s}(${t})`};for(const s of ["Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Uint16Array","Int32Array","Uint32Array","Float32Array","Float64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join(",")}]`};for(const s of ["BigInt64Array","BigUint64Array"])o.prototype["$"+s]=function(t){return `${s}[${t.join("n,")}${t.length>0?"n":""}]`};return o}();

function isEqual(object1, object2) {
  if (object1 === object2) {
    return true;
  }
  if (serialize$1(object1) === serialize$1(object2)) {
    return true;
  }
  return false;
}

const e=globalThis.process?.getBuiltinModule?.("crypto")?.hash,r="sha256",s="base64url";function digest(t){if(e)return e(r,t,s);const o=createHash(r).update(t);return globalThis.process?.versions?.webcontainer?o.digest().toString(s):o.digest(s)}

function hash$1(input) {
  return digest(serialize$1(input));
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  ui: {
    colors: {
      primary: "azure",
      neutral: "slate"
    }
  }
});

const inlineAppConfig = {
  "nuxt": {},
  "ui": {
    "colors": {
      "primary": "green",
      "secondary": "blue",
      "success": "green",
      "info": "blue",
      "warning": "yellow",
      "error": "red",
      "neutral": "slate"
    },
    "icons": {
      "arrowDown": "i-lucide-arrow-down",
      "arrowLeft": "i-lucide-arrow-left",
      "arrowRight": "i-lucide-arrow-right",
      "arrowUp": "i-lucide-arrow-up",
      "caution": "i-lucide-circle-alert",
      "check": "i-lucide-check",
      "chevronDoubleLeft": "i-lucide-chevrons-left",
      "chevronDoubleRight": "i-lucide-chevrons-right",
      "chevronDown": "i-lucide-chevron-down",
      "chevronLeft": "i-lucide-chevron-left",
      "chevronRight": "i-lucide-chevron-right",
      "chevronUp": "i-lucide-chevron-up",
      "close": "i-lucide-x",
      "copy": "i-lucide-copy",
      "copyCheck": "i-lucide-copy-check",
      "dark": "i-lucide-moon",
      "ellipsis": "i-lucide-ellipsis",
      "error": "i-lucide-circle-x",
      "external": "i-lucide-arrow-up-right",
      "eye": "i-lucide-eye",
      "eyeOff": "i-lucide-eye-off",
      "file": "i-lucide-file",
      "folder": "i-lucide-folder",
      "folderOpen": "i-lucide-folder-open",
      "hash": "i-lucide-hash",
      "info": "i-lucide-info",
      "light": "i-lucide-sun",
      "loading": "i-lucide-loader-circle",
      "menu": "i-lucide-menu",
      "minus": "i-lucide-minus",
      "panelClose": "i-lucide-panel-left-close",
      "panelOpen": "i-lucide-panel-left-open",
      "plus": "i-lucide-plus",
      "reload": "i-lucide-rotate-ccw",
      "search": "i-lucide-search",
      "stop": "i-lucide-square",
      "success": "i-lucide-circle-check",
      "system": "i-lucide-monitor",
      "tip": "i-lucide-lightbulb",
      "upload": "i-lucide-upload",
      "warning": "i-lucide-triangle-alert"
    }
  },
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "cssLayer": "components",
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codex",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "cuida",
      "dashicons",
      "devicon",
      "devicon-plain",
      "dinkie-icons",
      "duo-icons",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fa7-brands",
      "fa7-regular",
      "fa7-solid",
      "fad",
      "famicons",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-color",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "garden",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "ix",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "lineicons",
      "logos",
      "ls",
      "lsicon",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-icon-theme",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "meteor-icons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "nrk",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "picon",
      "pixel",
      "pixelarticons",
      "prime",
      "proicons",
      "ps",
      "qlementine-icons",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "roentgen",
      "si",
      "si-glyph",
      "sidekickicons",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "stash",
      "streamline",
      "streamline-block",
      "streamline-color",
      "streamline-cyber",
      "streamline-cyber-color",
      "streamline-emojis",
      "streamline-flex",
      "streamline-flex-color",
      "streamline-freehand",
      "streamline-freehand-color",
      "streamline-kameleon-color",
      "streamline-logos",
      "streamline-pixel",
      "streamline-plump",
      "streamline-plump-color",
      "streamline-sharp",
      "streamline-sharp-color",
      "streamline-stickies-color",
      "streamline-ultimate",
      "streamline-ultimate-color",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "temaki",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 1500
  }
};

const appConfig = defuFn(appConfig0, inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return void 0;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = void 0;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner) : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "bdc5c0f0-f905-4830-8b6a-9de498ffe16d",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "appName": "AssetFusionX",
    "appCopyrightYear": null,
    "defaultErrorMsg": "Something happened and we are working on it. Please, try again alter",
    "emailAddress": "info@assetfusionx.com",
    "minPasswordLength": 8,
    "maxAccounts": 20,
    "minDepositAmount": 100,
    "maxDepositAmount": 100000,
    "getRequestLimit": 20
  },
  "icon": {
    "serverKnownCssClasses": []
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
const _sharedAppConfig = _deepFreeze(klona(appConfig));
function useAppConfig(event) {
  {
    return _sharedAppConfig;
  }
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}

const config$1 = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config$1.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

/**
* Nitro internal functions extracted from https://github.com/nitrojs/nitro/blob/v2/src/runtime/internal/utils.ts
*/
function isJsonRequest(event) {
	// If the client specifically requests HTML, then avoid classifying as JSON.
	if (hasReqHeader(event, "accept", "text/html")) {
		return false;
	}
	return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
	const value = getRequestHeader(event, name);
	return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
	if (event.handled || isJsonRequest(event)) {
		// let Nitro handle JSON errors
		return;
	}
	// invoke default Nitro error handler (which will log appropriately if required)
	const defaultRes = await defaultHandler(error, event, { json: true });
	// let Nitro handle redirect if appropriate
	const status = error.status || error.statusCode || 500;
	if (status === 404 && defaultRes.status === 302) {
		setResponseHeaders(event, defaultRes.headers);
		setResponseStatus(event, defaultRes.status, defaultRes.statusText);
		return send(event, JSON.stringify(defaultRes.body, null, 2));
	}
	const errorObject = defaultRes.body;
	// remove proto/hostname/port from URL
	const url = new URL(errorObject.url);
	errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
	// add default server message (keep sanitized for unhandled errors)
	errorObject.message = error.unhandled ? errorObject.message || "Server Error" : error.message || errorObject.message || "Server Error";
	// we will be rendering this error internally so we can pass along the error.data safely
	errorObject.data ||= error.data;
	errorObject.statusText ||= error.statusText || error.statusMessage;
	delete defaultRes.headers["content-type"];
	delete defaultRes.headers["content-security-policy"];
	setResponseHeaders(event, defaultRes.headers);
	// Access request headers
	const reqHeaders = getRequestHeaders(event);
	// Detect to avoid recursion in SSR rendering of errors
	const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
	// HTML response (via SSR)
	const res = isRenderingError ? null : await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject), {
		headers: {
			...reqHeaders,
			"x-nuxt-error": "true"
		},
		redirect: "manual"
	}).catch(() => null);
	if (event.handled) {
		return;
	}
	// Fallback to static rendered error page
	if (!res) {
		const { template } = await import('./error-500.mjs');
		setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
		return send(event, template(errorObject));
	}
	const html = await res.text();
	for (const [header, value] of res.headers.entries()) {
		if (header === "set-cookie") {
			appendResponseHeader(event, header, value);
			continue;
		}
		setResponseHeader(event, header, value);
	}
	setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
	return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"system\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _uYC4RJyfI3WAb4kIPWMSZOmfhOpxQsUG4FivPvJq1A = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

function defineNitroPlugin(def) {
  return def;
}

function round(value, decimals = 2) {
  if (!Number.isFinite(value)) {
    return NaN;
  }
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new Error("Decimals must be a non-negative integer");
  }
  const factor = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

const AccountStatus = {
  active: "active",
  dormant: "dormant",
  closed: "closed"
};
const ProfitDistribution = {
  daily: "daily",
  weekly: "weekly",
  bi_weekly: "bi_weekly",
  monthly: "monthly"
};
const InvestmentStatus = {
  open: "open",
  closed: "closed",
  paused: "paused",
  terminated: "terminated"
};
const TransactionType = {
  deposit: "deposit",
  withdrawal: "withdrawal",
  transfer: "transfer",
  investment: "investment",
  profit: "profit"
};
const TransactionStatus = {
  pending: "pending",
  successfull: "successfull",
  reversed: "reversed",
  failed: "failed"
};

const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client"
    },
    "output": {
      "value": "C:\\Users\\adedero\\dev\\apps\\asset-fusion-x\\server\\generated\\prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "windows",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "debian-openssl-1.0.x"
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "C:\\Users\\adedero\\dev\\apps\\asset-fusion-x\\prisma\\schema.prisma",
    "isCustomOutput": true
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.19.2",
  "engineVersion": "c2990dca591cba766e3b7ef5d9e8a84796e47ab7",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "sqlite",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_FILE",
        "value": null
      }
    }
  },
  "inlineSchema": 'generator client {\n  provider      = "prisma-client"\n  output        = "../server/generated/prisma"\n  binaryTargets = ["native", "debian-openssl-1.0.x"]\n  //engineType = "client"\n}\n\ndatasource db {\n  provider = "sqlite"\n  url      = env("DATABASE_FILE")\n}\n\ngenerator json {\n  provider = "prisma-json-types-generator"\n}\n\ngenerator zod {\n  provider = "zod-prisma-types"\n  output   = "../shared/zod"\n}\n\nenum UserRole {\n  admin\n  user\n}\n\nmodel User {\n  id            String    @id @default(uuid())\n  name          String\n  email         String    @unique\n  emailVerified Boolean\n  image         String?\n  role          UserRole  @default(user)\n  banned        Boolean?\n  banReason     String?\n  banExpires    DateTime?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n\n  // Existing Relations\n  profile  Profile?\n  sessions Session[]\n  accounts Account[]\n\n  // New Relations\n  createdAccounts                 FinancialAccount[]               @relation("UserCreatedAccounts")\n  accountMemberships              AccountUser[]\n  createdJointAccountRequests     JointAccountRequest[]\n  receivedJointAccountRequests    JointAccountRequest[]            @relation("JointRequestRecipient")\n  createdJointAccountModRequests  JointAccountModRequest[]\n  notifications                   Notification[]\n  approvedJointAccountModRequests JointAccountModRequestApproval[]\n\n  @@map("user")\n}\n\nmodel Session {\n  id             String   @id @default(uuid())\n  userId         String\n  token          String   @unique\n  expiresAt      DateTime\n  ipAddress      String?\n  userAgent      String?\n  impersonatedBy String?\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n\n  // Relation\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id @default(uuid())\n  userId                String\n  accountId             String\n  providerId            String\n  accessToken           String?\n  refreshToken          String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  idToken               String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  // Relation\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@index([accountId, providerId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id @default(uuid())\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum KycStatus {\n  pending\n  verified\n  rejected\n  resubmit\n}\n\nenum GovernmentIdType {\n  international_passport\n  national_id\n  driving_license\n}\n\nmodel Profile {\n  id               String            @id @default(uuid())\n  userId           String            @unique\n  address          String?\n  country          String?\n  state            String?\n  city             String?\n  postalCode       String?\n  governmentId     String?\n  governmentIdType GovernmentIdType?\n  governmentIdExt  String?\n  kycStatus        KycStatus?\n  createdAt        DateTime          @default(now())\n  updatedAt        DateTime          @updatedAt\n\n  // Relation\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map("profile")\n}\n\nmodel BusinessProfile {\n  id                 String   @id @default(uuid())\n  financialAccountId String   @unique\n  address            String?\n  creationMonth      String?\n  creationYear       Int?\n  proofOfAddress     String?\n  proofOfAddressExt  String?\n  certificate        String?\n  certificateExt     String?\n  approved           Boolean\n  createdAt          DateTime @default(now())\n  updatedAt          DateTime @updatedAt\n\n  // Relation\n  account FinancialAccount @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n\n  @@map("business_profile")\n}\n\nenum AccountType {\n  personal\n  business\n}\n\nenum AccountOwnership {\n  single\n  joint\n}\n\nenum AccountStatus {\n  active\n  dormant\n  closed\n}\n\nmodel FinancialAccount {\n  id                 String           @id @default(uuid())\n  creatorId          String\n  name               String\n  number             String\n  status             AccountStatus    @default(active)\n  type               AccountType      @default(personal)\n  ownership          AccountOwnership @default(single)\n  balance            Float            @default(0)\n  totalTransactions  Int              @default(0)\n  totalInvestments   Int              @default(0)\n  firstTransactionAt DateTime?\n  lastTransactionAt  DateTime?\n  closedAt           DateTime?\n  dormantAt          DateTime?\n  createdAt          DateTime         @default(now())\n  updatedAt          DateTime         @updatedAt\n\n  // Relations\n  creator                 User                     @relation("UserCreatedAccounts", fields: [creatorId], references: [id], onDelete: Cascade)\n  businessProfile         BusinessProfile?\n  accountUsers            AccountUser[]\n  jointAccountRequests    JointAccountRequest[]\n  jointAccountModRequests JointAccountModRequest[]\n  notifications           Notification[]\n  transactions            Transaction[]\n  receivedTransactions    Transaction[]            @relation("RecipientTransaction")\n  investments             Investment[]\n\n  @@index([status])\n  @@map("financial_account")\n}\n\nenum AccountUserRole {\n  owner\n  co_owner\n  manager\n  admin\n  accountant\n  investor\n  contributor\n  legal_guardian\n  signatory\n}\n\nmodel AccountUser {\n  id                 String          @id @default(uuid())\n  userId             String\n  financialAccountId String\n  role               AccountUserRole @default(owner)\n  ownership          Float           @default(100)\n  autosign           Boolean         @default(false)\n  createdAt          DateTime        @default(now())\n  updatedAt          DateTime        @updatedAt\n\n  // Relations\n  user             User             @relation(fields: [userId], references: [id], onDelete: Cascade)\n  financialAccount FinancialAccount @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n  transactions     Transaction[]\n  investments      Investment[]\n\n  @@unique([userId, financialAccountId])\n  @@index([financialAccountId])\n  @@map("account_user")\n}\n\nenum JointAccountRequestStatus {\n  pending\n  accepted\n  rejected\n}\n\nmodel JointAccountRequest {\n  id                 String                    @id @default(uuid())\n  creatorId          String\n  recipientName      String\n  recipientEmail     String\n  role               AccountUserRole\n  ownership          Float\n  recipientId        String? // If user already has an account\n  financialAccountId String\n  description        String?\n  lastReminderAt     DateTime?\n  reminderCount      Int                       @default(0)\n  status             JointAccountRequestStatus @default(pending)\n  createdAt          DateTime                  @default(now())\n  updatedAt          DateTime                  @updatedAt\n\n  // Relation\n  creator          User             @relation(fields: [creatorId], references: [id], onDelete: Cascade)\n  recipient        User?            @relation("JointRequestRecipient", fields: [recipientId], references: [id], onDelete: Cascade)\n  financialAccount FinancialAccount @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n\n  @@map("joint_account_request")\n}\n\nenum JointAccountModRequestType {\n  transfer\n  withdrawal\n  name_change\n}\n\nmodel JointAccountModRequest {\n  id                 String                     @id @default(uuid())\n  creatorId          String\n  financialAccountId String\n  type               JointAccountModRequestType\n  transactionId      String?\n  description        String?\n  createdAt          DateTime                   @default(now())\n  updatedAt          DateTime                   @updatedAt\n\n  creator     User             @relation(fields: [creatorId], references: [id], onDelete: Cascade)\n  account     FinancialAccount @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n  transaction Transaction?     @relation(fields: [transactionId], references: [id], onDelete: Cascade)\n\n  approvals JointAccountModRequestApproval[]\n\n  @@map("joint_account_mod_request")\n}\n\nmodel JointAccountModRequestApproval {\n  id                       String                    @id @default(uuid())\n  jointAccountModRequestId String\n  approverId               String\n  status                   JointAccountRequestStatus @default(pending)\n  createdAt                DateTime                  @default(now())\n  updatedAt                DateTime                  @updatedAt\n\n  request  JointAccountModRequest @relation(fields: [jointAccountModRequestId], references: [id], onDelete: Cascade)\n  approver User                   @relation(fields: [approverId], references: [id], onDelete: Cascade)\n\n  @@map("joint_account_mod_approval")\n}\n\nenum ProfitDistribution {\n  daily\n  weekly\n  bi_weekly\n  monthly\n}\n\nenum InvestmentPlanCategory {\n  forex\n  stocks\n  real_estate\n  bonds\n  commodities\n  cryptocurrencies\n  derivatives\n}\n\nmodel InvestmentPlan {\n  id                       String                 @id @default(uuid())\n  name                     String\n  category                 InvestmentPlanCategory\n  minimumDeposit           Float\n  maximumDeposit           Float\n  duration                 Int\n  profitDistribution       ProfitDistribution     @default(daily)\n  percentageTotalReturn    Float\n  percentagePeriodicReturn Float\n  terminationFee           Float                  @default(0)\n  createdAt                DateTime               @default(now())\n  updatedAt                DateTime               @updatedAt\n\n  @@unique([category, name])\n  @@map("investment_plan")\n}\n\nenum InvestmentStatus {\n  open\n  closed\n  paused\n  terminated\n}\n\nmodel Investment {\n  id                      String                 @id @default(uuid())\n  financialAccountId      String\n  investorId              String\n  deposit                 Float\n  investmentName          String\n  totalProfit             Float                  @default(0)\n  profitCount             Int                    @default(0)\n  status                  InvestmentStatus       @default(open)\n  pausedAt                DateTime?\n  pausedReason            String?\n  closedAt                DateTime?\n  closedReason            String?\n  terminatedAt            DateTime?\n  terminatedReason        String?\n  category                InvestmentPlanCategory\n  daysCompleted           Int                    @default(0)\n  duration                Int\n  totalReturn             Float\n  periodicReturn          Float\n  profitDistribution      ProfitDistribution     @default(daily)\n  terminationFee          Float                  @default(0)\n  lastProfitDistributedAt DateTime?\n  createdAt               DateTime               @default(now())\n  updatedAt               DateTime               @updatedAt\n\n  // Relation\n  investor         AccountUser      @relation(fields: [investorId], references: [id], onDelete: Cascade)\n  transactions     Transaction[]\n  financialAccount FinancialAccount @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n  profits          Profit[]\n\n  @@index([financialAccountId])\n  @@index([status])\n  @@map("investment")\n}\n\nmodel Profit {\n  id             String    @id @default(uuid())\n  investmentId   String\n  number         Int\n  intendedAmount Float\n  actualAmount   Float\n  isDistributed  Boolean   @default(false)\n  distributedAt  DateTime?\n  createdAt      DateTime  @default(now())\n  updatedAt      DateTime  @updatedAt\n\n  // Relations\n  investment Investment @relation(fields: [investmentId], references: [id], onDelete: Cascade)\n\n  @@map("profit")\n}\n\nenum TransactionType {\n  deposit\n  withdrawal\n  transfer\n  investment\n  profit\n}\n\nenum TransactionStatus {\n  pending\n  successfull\n  reversed\n  failed\n}\n\nenum TransactionMedium {\n  wire\n  crypto\n}\n\nmodel Transaction {\n  id                             String            @id @default(uuid())\n  amount                         Float\n  currency                       String            @default("USD")\n  USDAmount                      Float\n  rate                           Float             @default(1)\n  charges                        Float             @default(0)\n  financialAccountId             String\n  type                           TransactionType\n  initiatorAccountId             String?\n  recipientAccountId             String?\n  investmentId                   String?\n  status                         TransactionStatus @default(pending)\n  parentTransactionId            String?\n  approvedAt                     DateTime?\n  failedAt                       DateTime?\n  failReason                     String?\n  depositWalletAddress           String?\n  depositWalletAddressNetwork    String?\n  withdrawalWalletAddress        String?\n  withdrawalWalletAddressNetwork String?\n  bank                           String?\n  bankAccount                    String?\n  description                    String?\n  createdAt                      DateTime          @default(now())\n  updatedAt                      DateTime          @updatedAt\n\n  initiator               AccountUser?             @relation(fields: [initiatorAccountId], references: [id])\n  financialAccount        FinancialAccount         @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n  recipientAccount        FinancialAccount?        @relation("RecipientTransaction", fields: [recipientAccountId], references: [id])\n  investment              Investment?              @relation(fields: [investmentId], references: [id], onDelete: Cascade)\n  jointAccountModRequests JointAccountModRequest[]\n  parentTransaction       Transaction?             @relation("childTransactions", fields: [parentTransactionId], references: [id])\n  childTransactions       Transaction[]            @relation("childTransactions")\n\n  @@map("transaction")\n}\n\nenum NotificationBodyType {\n  string\n  html\n}\n\nmodel Notification {\n  id                 String               @id @default(uuid())\n  title              String\n  body               String\n  bodyType           NotificationBodyType @default(string)\n  userId             String?\n  financialAccountId String?\n  link               String?\n  isRead             Boolean              @default(false)\n  createdAt          DateTime             @default(now())\n  updatedAt          DateTime             @updatedAt\n\n  user             User?             @relation(fields: [userId], references: [id], onDelete: Cascade)\n  financialAccount FinancialAccount? @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n\n  @@map("notification")\n}\n\nmodel Currency {\n  id                                   String    @id @default(uuid())\n  name                                 String\n  symbol                               String    @unique\n  image                                String?\n  rate                                 Float\n  rateUpdatedAt                        DateTime?\n  walletAddress                        String?\n  walletAddressNetwork                 String?\n  wireTransferDepositBankName          String?\n  wireTransferDepositBankAccountNumber String?\n  allowWithdrawal                      Boolean   @default(false)\n  allowDeposit                         Boolean   @default(true)\n  automaticallyUpdateRate              Boolean   @default(true)\n  withdrawalCharge                     Float     @default(0)\n  createdAt                            DateTime  @default(now())\n  updatedAt                            DateTime  @updatedAt\n\n  @@map("currency")\n}\n\nmodel Settings {\n  id               String  @id @default(uuid())\n  allowWithdrawals Boolean\n\n  @@map("settings")\n}\n\nmodel BannedIp {\n  id        String    @id @default(uuid())\n  ipAddress String    @unique\n  reason    String\n  userId    String?\n  expiresAt DateTime?\n  createdAt DateTime  @default(now())\n  updatedAt DateTime  @updatedAt\n\n  @@index([userId])\n  @@map("banned_ip")\n}\n',
  "inlineSchemaHash": "aab0b2d3de580bb200c6cf816e3339041002a22613d6502e26730f83579c1dc7",
  "copyEngine": true,
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "dirname": ""
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"dbName":"user","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"emailVerified","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"image","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"UserRole","nativeType":null,"default":"user","isGenerated":false,"isUpdatedAt":false},{"name":"banned","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"banReason","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"banExpires","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"profile","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Profile","nativeType":null,"relationName":"ProfileToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"sessions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Session","nativeType":null,"relationName":"SessionToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"accounts","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Account","nativeType":null,"relationName":"AccountToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAccounts","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"UserCreatedAccounts","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"accountMemberships","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AccountUser","nativeType":null,"relationName":"AccountUserToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdJointAccountRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountRequest","nativeType":null,"relationName":"JointAccountRequestToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"receivedJointAccountRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountRequest","nativeType":null,"relationName":"JointRequestRecipient","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdJointAccountModRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequest","nativeType":null,"relationName":"JointAccountModRequestToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"notifications","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Notification","nativeType":null,"relationName":"NotificationToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"approvedJointAccountModRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequestApproval","nativeType":null,"relationName":"JointAccountModRequestApprovalToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Session":{"dbName":"session","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"token","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"expiresAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"ipAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"userAgent","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"impersonatedBy","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"SessionToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Account":{"dbName":"account","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"accountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"providerId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"accessToken","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"refreshToken","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"accessTokenExpiresAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"refreshTokenExpiresAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"scope","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"idToken","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"password","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"AccountToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Verification":{"dbName":"verification","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"identifier","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"value","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"expiresAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Profile":{"dbName":"profile","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"address","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"state","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"city","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"postalCode","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"governmentId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"governmentIdType","kind":"enum","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"GovernmentIdType","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"governmentIdExt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"kycStatus","kind":"enum","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"KycStatus","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"ProfileToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"BusinessProfile":{"dbName":"business_profile","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"address","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"creationMonth","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"creationYear","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"proofOfAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"proofOfAddressExt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"certificate","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"certificateExt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"approved","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"account","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"BusinessProfileToFinancialAccount","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"FinancialAccount":{"dbName":"financial_account","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"creatorId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"number","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"AccountStatus","nativeType":null,"default":"active","isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"AccountType","nativeType":null,"default":"personal","isGenerated":false,"isUpdatedAt":false},{"name":"ownership","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"AccountOwnership","nativeType":null,"default":"single","isGenerated":false,"isUpdatedAt":false},{"name":"balance","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"totalTransactions","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"totalInvestments","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"firstTransactionAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"lastTransactionAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"closedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"dormantAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"creator","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"UserCreatedAccounts","relationFromFields":["creatorId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"businessProfile","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"BusinessProfile","nativeType":null,"relationName":"BusinessProfileToFinancialAccount","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"accountUsers","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AccountUser","nativeType":null,"relationName":"AccountUserToFinancialAccount","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"jointAccountRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountRequest","nativeType":null,"relationName":"FinancialAccountToJointAccountRequest","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"jointAccountModRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequest","nativeType":null,"relationName":"FinancialAccountToJointAccountModRequest","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"notifications","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Notification","nativeType":null,"relationName":"FinancialAccountToNotification","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"transactions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"FinancialAccountToTransaction","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"receivedTransactions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"RecipientTransaction","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"investments","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Investment","nativeType":null,"relationName":"FinancialAccountToInvestment","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"AccountUser":{"dbName":"account_user","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"AccountUserRole","nativeType":null,"default":"owner","isGenerated":false,"isUpdatedAt":false},{"name":"ownership","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":100,"isGenerated":false,"isUpdatedAt":false},{"name":"autosign","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"AccountUserToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"financialAccount","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"AccountUserToFinancialAccount","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"transactions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"AccountUserToTransaction","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"investments","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Investment","nativeType":null,"relationName":"AccountUserToInvestment","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["userId","financialAccountId"]],"uniqueIndexes":[{"name":null,"fields":["userId","financialAccountId"]}],"isGenerated":false},"JointAccountRequest":{"dbName":"joint_account_request","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"creatorId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"recipientName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"recipientEmail","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AccountUserRole","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"ownership","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"recipientId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"lastReminderAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"reminderCount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"JointAccountRequestStatus","nativeType":null,"default":"pending","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"creator","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"JointAccountRequestToUser","relationFromFields":["creatorId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"recipient","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"JointRequestRecipient","relationFromFields":["recipientId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"financialAccount","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"FinancialAccountToJointAccountRequest","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"JointAccountModRequest":{"dbName":"joint_account_mod_request","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"creatorId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequestType","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"transactionId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"creator","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"JointAccountModRequestToUser","relationFromFields":["creatorId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"account","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"FinancialAccountToJointAccountModRequest","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"transaction","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"JointAccountModRequestToTransaction","relationFromFields":["transactionId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"approvals","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequestApproval","nativeType":null,"relationName":"JointAccountModRequestToJointAccountModRequestApproval","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"JointAccountModRequestApproval":{"dbName":"joint_account_mod_approval","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"jointAccountModRequestId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"approverId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"JointAccountRequestStatus","nativeType":null,"default":"pending","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"request","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequest","nativeType":null,"relationName":"JointAccountModRequestToJointAccountModRequestApproval","relationFromFields":["jointAccountModRequestId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"approver","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"JointAccountModRequestApprovalToUser","relationFromFields":["approverId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"InvestmentPlan":{"dbName":"investment_plan","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"category","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"InvestmentPlanCategory","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"minimumDeposit","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"maximumDeposit","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"duration","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"profitDistribution","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ProfitDistribution","nativeType":null,"default":"daily","isGenerated":false,"isUpdatedAt":false},{"name":"percentageTotalReturn","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"percentagePeriodicReturn","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"terminationFee","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[["category","name"]],"uniqueIndexes":[{"name":null,"fields":["category","name"]}],"isGenerated":false},"Investment":{"dbName":"investment","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"investorId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"deposit","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"investmentName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"totalProfit","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"profitCount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"InvestmentStatus","nativeType":null,"default":"open","isGenerated":false,"isUpdatedAt":false},{"name":"pausedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"pausedReason","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"closedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"closedReason","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"terminatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"terminatedReason","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"category","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"InvestmentPlanCategory","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"daysCompleted","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"duration","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"totalReturn","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"periodicReturn","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"profitDistribution","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ProfitDistribution","nativeType":null,"default":"daily","isGenerated":false,"isUpdatedAt":false},{"name":"terminationFee","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"lastProfitDistributedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"investor","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AccountUser","nativeType":null,"relationName":"AccountUserToInvestment","relationFromFields":["investorId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"transactions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"InvestmentToTransaction","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccount","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"FinancialAccountToInvestment","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"profits","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Profit","nativeType":null,"relationName":"InvestmentToProfit","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Profit":{"dbName":"profit","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"investmentId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"number","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"intendedAmount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"actualAmount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"isDistributed","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"distributedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"investment","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Investment","nativeType":null,"relationName":"InvestmentToProfit","relationFromFields":["investmentId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Transaction":{"dbName":"transaction","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"amount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"currency","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":"USD","isGenerated":false,"isUpdatedAt":false},{"name":"USDAmount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"rate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":1,"isGenerated":false,"isUpdatedAt":false},{"name":"charges","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"TransactionType","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"initiatorAccountId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"recipientAccountId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"investmentId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"TransactionStatus","nativeType":null,"default":"pending","isGenerated":false,"isUpdatedAt":false},{"name":"parentTransactionId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"approvedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"failedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"failReason","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"depositWalletAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"depositWalletAddressNetwork","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"withdrawalWalletAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"withdrawalWalletAddressNetwork","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"bank","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"bankAccount","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"initiator","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AccountUser","nativeType":null,"relationName":"AccountUserToTransaction","relationFromFields":["initiatorAccountId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccount","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"FinancialAccountToTransaction","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"recipientAccount","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"RecipientTransaction","relationFromFields":["recipientAccountId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"investment","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Investment","nativeType":null,"relationName":"InvestmentToTransaction","relationFromFields":["investmentId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"jointAccountModRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequest","nativeType":null,"relationName":"JointAccountModRequestToTransaction","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"parentTransaction","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"childTransactions","relationFromFields":["parentTransactionId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"childTransactions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"childTransactions","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Notification":{"dbName":"notification","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"body","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"bodyType","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"NotificationBodyType","nativeType":null,"default":"string","isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"link","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"isRead","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"NotificationToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"financialAccount","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"FinancialAccountToNotification","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Currency":{"dbName":"currency","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"symbol","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"image","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"rate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"rateUpdatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"walletAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"walletAddressNetwork","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"wireTransferDepositBankName","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"wireTransferDepositBankAccountNumber","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"allowWithdrawal","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"allowDeposit","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"automaticallyUpdateRate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"withdrawalCharge","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Settings":{"dbName":"settings","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"allowWithdrawals","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","nativeType":null,"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"BannedIp":{"dbName":"banned_ip","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"ipAddress","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"reason","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"expiresAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{"UserRole":{"values":[{"name":"admin","dbName":null},{"name":"user","dbName":null}],"dbName":null},"KycStatus":{"values":[{"name":"pending","dbName":null},{"name":"verified","dbName":null},{"name":"rejected","dbName":null},{"name":"resubmit","dbName":null}],"dbName":null},"GovernmentIdType":{"values":[{"name":"international_passport","dbName":null},{"name":"national_id","dbName":null},{"name":"driving_license","dbName":null}],"dbName":null},"AccountType":{"values":[{"name":"personal","dbName":null},{"name":"business","dbName":null}],"dbName":null},"AccountOwnership":{"values":[{"name":"single","dbName":null},{"name":"joint","dbName":null}],"dbName":null},"AccountStatus":{"values":[{"name":"active","dbName":null},{"name":"dormant","dbName":null},{"name":"closed","dbName":null}],"dbName":null},"AccountUserRole":{"values":[{"name":"owner","dbName":null},{"name":"co_owner","dbName":null},{"name":"manager","dbName":null},{"name":"admin","dbName":null},{"name":"accountant","dbName":null},{"name":"investor","dbName":null},{"name":"contributor","dbName":null},{"name":"legal_guardian","dbName":null},{"name":"signatory","dbName":null}],"dbName":null},"JointAccountRequestStatus":{"values":[{"name":"pending","dbName":null},{"name":"accepted","dbName":null},{"name":"rejected","dbName":null}],"dbName":null},"JointAccountModRequestType":{"values":[{"name":"transfer","dbName":null},{"name":"withdrawal","dbName":null},{"name":"name_change","dbName":null}],"dbName":null},"ProfitDistribution":{"values":[{"name":"daily","dbName":null},{"name":"weekly","dbName":null},{"name":"bi_weekly","dbName":null},{"name":"monthly","dbName":null}],"dbName":null},"InvestmentPlanCategory":{"values":[{"name":"forex","dbName":null},{"name":"stocks","dbName":null},{"name":"real_estate","dbName":null},{"name":"bonds","dbName":null},{"name":"commodities","dbName":null},{"name":"cryptocurrencies","dbName":null},{"name":"derivatives","dbName":null}],"dbName":null},"InvestmentStatus":{"values":[{"name":"open","dbName":null},{"name":"closed","dbName":null},{"name":"paused","dbName":null},{"name":"terminated","dbName":null}],"dbName":null},"TransactionType":{"values":[{"name":"deposit","dbName":null},{"name":"withdrawal","dbName":null},{"name":"transfer","dbName":null},{"name":"investment","dbName":null},{"name":"profit","dbName":null}],"dbName":null},"TransactionStatus":{"values":[{"name":"pending","dbName":null},{"name":"successfull","dbName":null},{"name":"reversed","dbName":null},{"name":"failed","dbName":null}],"dbName":null},"TransactionMedium":{"values":[{"name":"wire","dbName":null},{"name":"crypto","dbName":null}],"dbName":null},"NotificationBodyType":{"values":[{"name":"string","dbName":null},{"name":"html","dbName":null}],"dbName":null}},"types":{}}');
config.engineWasm = void 0;
config.compilerWasm = void 0;
function getPrismaClientClass(dirname) {
  config.dirname = dirname;
  return runtime.getPrismaClient(config);
}

globalThis["__dirname"] = path.dirname(fileURLToPath(globalThis._importMeta_.url));
const PrismaClient = getPrismaClientClass(__dirname);
path.join(__dirname, "query_engine-windows.dll.node");
path.join(process$1.cwd(), "server/generated/prisma/query_engine-windows.dll.node");
path.join(__dirname, "libquery_engine-debian-openssl-1.0.x.so.node");
path.join(process$1.cwd(), "server/generated/prisma/libquery_engine-debian-openssl-1.0.x.so.node");

const prisma = new PrismaClient();

function normalizeException(exception) {
  let message = "";
  if (exception instanceof FetchError) {
    if (exception.data) {
      if (exception.data.statusMessage) {
        message = exception.data.statusMessage;
      } else if (exception.data.message) {
        message = exception.data.message;
      }
    } else if (exception.statusMessage) {
      message = exception.statusMessage;
    } else if (exception.message) {
      message = exception.message;
    } else if (exception.statusText) {
      message = exception.statusText;
    }
  } else if (exception instanceof Error) {
    message = exception.message;
  } else if (typeof exception === "string") {
    message = exception;
  } else if (typeof exception === "object" && exception !== null && !Array.isArray(exception)) {
    if ("message" in exception && typeof exception.message === "string") {
      message = exception.message;
    } else if ("error" in exception && typeof exception.error === "string") {
      message = exception.error;
    }
  } else {
    message = String(exception);
  }
  return new Error(message);
}

const nodemailerConfig = {
  host: "assetfusionx.com",
  auth: {
    user: "info@assetfusionx.com",
    pass: "$assetfusionx$"
  },
  port: parseInt("465")
};
const transporter = nodemailer.createTransport(nodemailerConfig);
const sendEmail = async (mailOptions) => {
  var _a;
  try {
    const info = await transporter.sendMail({
      from: { name: "AssetFusionX", address: (_a = process.env.EMAIL_USER) != null ? _a : "" },
      ...mailOptions
    });
    return { data: info, error: null };
  } catch (error) {
    return { data: null, error: normalizeException(error) };
  }
};

function Layout(body, params) {
  const logo = "https://assetfusionx.com/logo.png";
  const { subject } = params;
  return `
<html lang="en">
  <head>
    <style>
      html {
        font-size: 15px;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        outline: none;
        border: none;
      }

      body {
        width: 100vw;
        font-family: Verdana, Tahoma, Inter, sans-serif;
        font-size: 1rem;
      }

      .div {
        margin: 0.25rem 0 0.25rem 0;
      }

      .container {
        margin: auto;
        width: 98%;
        max-width: 32rem;
        padding: 1.2rem;
      }

      .rounded {
        border-radius: 5px;
      }

      .text-muted {
        color: #303030;
      }

      .link {
        color: #2354b8;
      }

      .link:hover {
        text-decoration: underline;
      }

      section {
        margin: 1rem 0;
      }

      .title {
        font-weight: 600;
        font-size: 1.3rem;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div style="width: 100%; height: 100%; border: 1px solid rgba(0, 0, 0, 0.1)">
        <header style="background-color: #f0f0f0; padding: 1rem;">
          <img src="${logo}" alt="AssetFusionX Logo" width="40" height="40">
        </header>

        <div style="padding: 1rem;">
          <section>
            <h1 class="text-muted title">
              ${subject}
            </h1>
          </section>

          ${body}
        </div>
      </div>

      <section class="text-muted" style="font-size: 0.785rem; text-align: center">
        &copy; <a class="link" href="https://assetfusionx.com" target="_blank" ref="noopener">AssetFusionX</a>. All Rights Reserved.
      </section>
    </div>
  </body>
</html>`;
}

function conditional(condition, returnString) {
  if (condition) return String(returnString.if);
  else return String(returnString.else);
}

function Button({
  label,
  href,
  centered = true
}) {
  return `
<div style="${centered ? "margin: auto;" : ""}">
  <a 
    href="${href}" 
    style="
      display: inline-block; 
      padding: 10px 16px; 
      background-color: #2563eb; 
      color: white; 
      text-decoration: none; 
      border-radius: 6px;
      font-family: inherit;
    "
  >
    ${label}
  </a>
</div>
`;
}

function financialAccountCreateEmail(params) {
  const { user, data, subject, role = "user" } = params != null ? params : {};
  const accountLink = conditional(role === "user", {
    if: `${process.env.BASE_URL}/user/accounts/${data.account.id}`,
    else: `${process.env.BASE_URL}/users/${user.id}/accounts/${data.account.id}`
  });
  const body = `<section>
  <section>
    <p>
      Hello,
      <b>${conditional(role === "user", { if: user.name, else: "Admin" })}</b>
    </p>
    <p>
      You are receiving this email because  
      ${conditional(role === "user", {
    if: "you",
    else: user.name
  })} opened a new account.
    </p>
  </section>

  <section>
    <p>Account name: <b>${data.account.name}</b></p>
    <p>Type: <b>${data.account.type}</b></p>
    <p>Ownership Type: <b>${data.account.ownership}</b></p>
  </section>

  <section>
    ${Button({ label: "View account details", href: accountLink })}
  </section>

  <section>
    <p>
      Thank your for using ${process.env.APP_NAME}. ${conditional(
    role === "user",
    {
      if: "If you did not open an account, please contact us immediately and reset your password.",
      else: ""
    }
  )} 
    </p>
  </section>
</section>`;
  return Layout(body, { subject });
}

const onFinancialAccountCreate = (ctx) => {
  var _a;
  const subject = "Financial Account Creation";
  const userEmail = financialAccountCreateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  const adminEmail = financialAccountCreateEmail({
    role: "admin",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  Promise.all([
    sendEmail({
      to: ctx.user.email,
      subject,
      html: userEmail
    }),
    sendEmail({
      to: (_a = process.env.ADMIN_EMAL) != null ? _a : process.env.EMAIL_USER,
      subject,
      html: adminEmail
    }),
    prisma.notification.create({
      data: {
        userId: ctx.user.id,
        title: subject,
        bodyType: "string",
        body: `You created a new account: ${ctx.data.account.name}`
      }
    })
  ]);
};

function depositCreateEmail$1(params) {
  const { user, data, subject, role = "user" } = params != null ? params : {};
  const body = `<section>
  <section>
    <p>
      Hello, <b>${conditional(role === "user", { if: user.name, else: "Admin" })}</b>
    </p>

    <p>
      You are receiving this email because 
      ${conditional(role === "user", {
    if: "you",
    else: user.name
  })} opened a new deposit request.
    </p>
  </section>

  <section>
    <p>Amount
      <b style="font-size: 2.5rem;">$${data.transaction.USDAmount.toLocaleString()}</b>
    </p>
    <p>Account: <b>${data.account.name}</b></p>
  </section>

  <section>
    <p>
      Thank your for using ${process.env.APP_NAME}. ${conditional(
    role === "user",
    {
      if: "If you did not initiate this deposit, please contact us immediately and reset your password.",
      else: ""
    }
  )} 
    </p>
  </section>
</section>`;
  return Layout(body, { subject });
}

const onDepositCreate = (ctx) => {
  var _a;
  const subject = "New Deposit Request";
  const userEmail = depositCreateEmail$1({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  const adminEmail = depositCreateEmail$1({
    role: "admin",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  Promise.all([
    sendEmail({
      to: ctx.user.email,
      subject,
      html: userEmail
    }),
    sendEmail({
      to: (_a = process.env.ADMIN_EMAL) != null ? _a : process.env.EMAIL_USER,
      subject,
      html: adminEmail
    }),
    prisma.notification.create({
      data: {
        userId: ctx.user.id,
        financialAccountId: ctx.data.account.id,
        title: subject,
        bodyType: "string",
        body: `You initiated a deposit request of $${ctx.data.transaction.USDAmount.toLocaleString()} on your account ${ctx.data.account.name}`
      }
    })
  ]);
};

function depositCreateEmail(params) {
  const { user, data, subject, role = "user" } = params != null ? params : {};
  const body = `<section>
  <section>
    <p>
      Hello, <b>${conditional(role === "user", { if: user.name, else: "Admin" })}</b>
    </p>

    <p>
      You are receiving this email because 
      ${conditional(role === "user", {
    if: "you",
    else: user.name
  })} opened a new withdrawal request
    </p>
  </section>

  <section>
    <p>Amount
      <b style="font-size: 2.5rem;">$${data.transaction.USDAmount.toLocaleString()}</b>
    </p>
    <p>Account: <b>${data.account.name}</b></p>
  </section>

  <section>
    <p>
      Thank your for using ${process.env.APP_NAME}. ${conditional(
    role === "user",
    {
      if: "If you did not initiate this withdrawal, please contact us immediately and reset your password.",
      else: ""
    }
  )} 
    </p>
  </section>
</section>`;
  return Layout(body, { subject });
}

const onWithdrawalCreate = (ctx) => {
  var _a;
  const subject = "New Deposit Request";
  const userEmail = depositCreateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  const adminEmail = depositCreateEmail({
    role: "admin",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  Promise.all([
    sendEmail({
      to: ctx.user.email,
      subject,
      html: userEmail
    }),
    sendEmail({
      to: (_a = process.env.ADMIN_EMAL) != null ? _a : process.env.EMAIL_USER,
      subject,
      html: adminEmail
    }),
    prisma.notification.create({
      data: {
        userId: ctx.user.id,
        financialAccountId: ctx.data.account.id,
        title: subject,
        bodyType: "string",
        body: `You initiated a withdrawal request of $${ctx.data.transaction.USDAmount.toLocaleString()} on your account ${ctx.data.account.name}`
      }
    })
  ]);
};

function ivestmentCreateEmail(params) {
  const { user, data, subject, role = "user" } = params != null ? params : {};
  const body = `<section>
  <section>
    <p>
      Hello, <b>${conditional(role === "user", { if: user.name, else: "Admin" })}</b>
    </p>

    <p>
      You are receiving this email because 
      ${conditional(role === "user", {
    if: "you",
    else: user.name
  })} started a new investment.
    </p>
  </section>

  <section>
    <p>Deposit Amount: <b>$${data.investment.deposit.toLocaleString()}</b></p>
    <p>Investment Name: <b>${data.investment.investmentName}</b></p>
    <p>Duration: <b>${data.investment.duration} days</b></p>
    <p>Account: <b>${data.account.name}</b></p>
  </section>

    <section>
      <p>
        Thank your for using ${process.env.APP_NAME}. ${conditional(
    role === "user",
    {
      if: "If you did not start this investment, please contact us immediately and reset your password.",
      else: ""
    }
  )} 
      </p>
    </section>
</section>`;
  return Layout(body, { subject });
}

const onInvestmentCreate = (ctx) => {
  var _a;
  const subject = "New Financial Investment";
  const userEmail = ivestmentCreateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  const adminEmail = ivestmentCreateEmail({
    role: "admin",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  Promise.all([
    sendEmail({
      to: ctx.user.email,
      subject,
      html: userEmail
    }),
    sendEmail({
      to: (_a = process.env.ADMIN_EMAL) != null ? _a : process.env.EMAIL_USER,
      subject,
      html: adminEmail
    }),
    prisma.notification.create({
      data: {
        userId: ctx.user.id,
        financialAccountId: ctx.data.account.id,
        title: subject,
        bodyType: "string",
        body: `You started a new investment with $${ctx.data.investment.deposit.toLocaleString()} on your account ${ctx.data.account.name}`
      }
    })
  ]);
};

function transactionStatusUpdateEmail(params) {
  const { user, data, subject, role = "user" } = params != null ? params : {};
  const body = `<section>
  <section>
    <p>
      Hello, <b>${conditional(role === "user", {
    if: user.name,
    else: "Admin"
  })}</b>
    </p>

    <p>
      You are receiving this email because 
      ${conditional(role === "user", {
    if: "your",
    else: `${user.name}'s`
  })} ${data.transaction.type} request on the account ${data.account.name} has been marked as ${data.transaction.status}.
    </p>
    <p>
      ${data.transaction.type === "deposit" && data.transaction.status === "successfull" ? "Your account has been credited with $" + data.transaction.USDAmount.toLocaleString() : ""}
      ${data.transaction.type === "withdrawal" && data.transaction.status === "failed" ? "The withdrawal amount of $" + (data.transaction.USDAmount + data.transaction.charges).toLocaleString() + " has been reversed" : ""}
    </p>
  </section>

  <section>
    <p>
      Thank your for using ${process.env.APP_NAME}.
    </p>
  </section>
</section>`;
  return Layout(body, { subject });
}

const onTransactionStatusUpdate = (ctx) => {
  var _a;
  const subject = `Update On ${ctx.data.transaction.type === "deposit" ? "Deposit" : "Withdrawal"} Request`;
  const userEmail = transactionStatusUpdateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  const adminEmail = transactionStatusUpdateEmail({
    role: "admin",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  Promise.all([
    sendEmail({
      to: ctx.user.email,
      subject,
      html: userEmail
    }),
    sendEmail({
      to: (_a = process.env.ADMIN_EMAL) != null ? _a : process.env.EMAIL_USER,
      subject,
      html: adminEmail
    }),
    prisma.notification.create({
      data: {
        userId: ctx.user.id,
        financialAccountId: ctx.data.account.id,
        title: subject,
        bodyType: "string",
        body: `The ${ctx.data.transaction.type} request on the account ${ctx.data.account.name} has been marked as ${ctx.data.transaction.status}.`
      }
    })
  ]);
};

function investmentStatusUpdateEmail(params) {
  const { user, data, subject, role = "user" } = params != null ? params : {};
  const body = `<section>
  <section>
    <p>
      Hello, <b>${conditional(role === "user", {
    if: user.name,
    else: "Admin"
  })}</b>
    </p>

    <p>
      You are receiving this email because there is an update on the status of 
      ${conditional(role === "user", {
    if: "your",
    else: user.name + "'s"
  })} investment.
    </p>
  </section>

  <section>
    <p>Investment Name: <b>${data.investment.investmentName}</b></p>
    <p>Duration: <b>${data.investment.duration} days</b></p>
    <p>Account: <b>${data.account.name}</b></p>
    <p>The investment status is: <b>${data.investment.status}</b></p>
    ${data.investment.status === "terminated" && `<p>Termination Reason: <b>${data.investment.terminatedReason}</b></p>`}
    ${data.investment.status === "paused" && `<p>Termination Reason: <b>${data.investment.pausedReason}</b></p>`}
    ${data.investment.status === "closed" && `<p>Termination Reason: <b>${data.investment.closedReason}</b></p>`}
  </section>

    <section>
      <p>
        Thank your for using ${process.env.APP_NAME}. ${conditional(
    role === "user",
    {
      if: "If this is not your investment, please contact us immediately and reset your password.",
      else: ""
    }
  )} 
      </p>
    </section>
</section>`;
  return Layout(body, { subject });
}

const onInvestmentStatusUpdate = (ctx) => {
  var _a;
  const subject = "Financial Investment Status Update";
  const userEmail = investmentStatusUpdateEmail({
    role: "user",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  const adminEmail = investmentStatusUpdateEmail({
    role: "admin",
    subject,
    user: ctx.user,
    data: ctx.data
  });
  Promise.all([
    sendEmail({
      to: ctx.user.email,
      subject,
      html: userEmail
    }),
    sendEmail({
      to: (_a = process.env.ADMIN_EMAL) != null ? _a : process.env.EMAIL_USER,
      subject,
      html: adminEmail
    }),
    prisma.notification.create({
      data: {
        userId: ctx.user.id,
        financialAccountId: ctx.data.account.id,
        title: subject,
        bodyType: "string",
        body: `The status of your investment ${ctx.data.investment.investmentName} has been updated to ${ctx.data.investment.status}.`
      }
    })
  ]);
};

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
class NotificationEmitter {
  constructor() {
    __publicField(this, "emitter", new EventEmitter());
  }
  emit(eventName, ...eventArg) {
    this.emitter.emit(eventName, ...eventArg);
  }
  on(eventName, handler) {
    this.emitter.on(eventName, handler);
  }
  off(eventName, handler) {
    this.emitter.off(eventName, handler);
  }
}
const notificationEmitter = new NotificationEmitter();
notificationEmitter.on("error", (err) => {
  console.error("Notification Emitter Error", err);
});
notificationEmitter.on("financial-account:create", onFinancialAccountCreate);
notificationEmitter.on("deposit:create", onDepositCreate);
notificationEmitter.on("withdrawal:create", onWithdrawalCreate);
notificationEmitter.on("transaction-status:update", onTransactionStatusUpdate);
notificationEmitter.on("investment:create", onInvestmentCreate);
notificationEmitter.on("investment-status:update", onInvestmentStatusUpdate);

async function distributeProfit() {
  var _a;
  const startOfToday = getStartOfTodayUTC();
  const now = /* @__PURE__ */ new Date();
  try {
    const eligibleInvestments = await prisma.investment.findMany({
      where: {
        status: InvestmentStatus.open,
        createdAt: { lt: startOfToday },
        financialAccount: { status: AccountStatus.active }
      },
      include: {
        financialAccount: true,
        investor: {
          select: {
            user: true
          }
        },
        profits: true
      }
    });
    if (!eligibleInvestments.length) {
      return;
    }
    for (const investment of eligibleInvestments) {
      try {
        if (!isDistributionDue(investment)) {
          continue;
        }
        const nextProfit = investment.profits.find(
          (profit) => profit.number - investment.profitCount === 1
        );
        if (!nextProfit) {
          continue;
        }
        const payout = nextProfit.actualAmount;
        const newTotalProfit = investment.totalProfit + payout;
        const newBalance = round(
          investment.financialAccount.balance + newTotalProfit
        );
        const actualDaysCompleted = Math.max(
          1,
          daysBetween(new Date(investment.createdAt), startOfToday)
        );
        const investmentUpdates = {
          totalProfit: round(newTotalProfit),
          profitCount: investment.profitCount + 1,
          lastProfitDistributedAt: now,
          ...actualDaysCompleted > investment.daysCompleted ? { daysCompleted: actualDaysCompleted } : void 0
        };
        const profitUpdates = {
          isDistributed: true,
          distributedAt: now
        };
        const isLastCycle = ((_a = investmentUpdates.daysCompleted) != null ? _a : 0) + 1 >= investment.duration;
        if (isLastCycle) {
          investmentUpdates.status = InvestmentStatus.closed;
          investmentUpdates.closedAt = now;
          investmentUpdates.closedReason = "Investment cycle completed";
          notificationEmitter.emit("investment-status:update", {
            user: investment.investor.user,
            data: {
              investment: {
                ...investment,
                ...investmentUpdates
              },
              account: investment.financialAccount
            }
          });
        }
        const txs = [
          prisma.investment.update({
            where: { id: investment.id },
            data: investmentUpdates
          }),
          prisma.profit.update({
            where: {
              id: nextProfit.id
            },
            data: profitUpdates
          }),
          prisma.transaction.create({
            data: {
              amount: payout,
              USDAmount: payout,
              type: TransactionType.profit,
              status: TransactionStatus.successfull,
              investmentId: investment.id,
              financialAccountId: investment.financialAccountId,
              initiatorAccountId: investment.investorId,
              description: `Profit distribution (${isLastCycle ? "final" : investment.profitDistribution}) for ${investment.investmentName}`,
              approvedAt: now
            }
          }),
          prisma.notification.create({
            data: {
              title: "Profit Distribution",
              body: `You have received a profit distribution of $${payout.toLocaleString()} on your investment ${investment.investmentName}`,
              financialAccountId: investment.financialAccountId,
              link: `/user/accounts/${investment.financialAccountId}/investments/${investment.id}`
            }
          })
        ];
        if (isLastCycle) {
          txs.push(
            prisma.financialAccount.update({
              where: { id: investment.financialAccountId },
              data: { balance: newBalance }
            })
          );
        }
        await prisma.$transaction(txs);
      } catch (error) {
        console.error(
          `Failed to process profit distribution for investment ${investment.id}:`,
          error
        );
      }
    }
  } catch (error) {
    console.error(
      "Error during profit distribution setup or initial fetch.",
      error
    );
  }
}
function isDistributionDue(investment) {
  const now = /* @__PURE__ */ new Date();
  const last = investment.lastProfitDistributedAt ? new Date(investment.lastProfitDistributedAt) : null;
  switch (investment.profitDistribution) {
    case ProfitDistribution.daily:
      return !last || daysBetween(last, now) >= 1;
    case ProfitDistribution.weekly:
      return !last || daysBetween(last, now) >= 7;
    case ProfitDistribution.bi_weekly:
      return !last || daysBetween(last, now) >= 14;
    case ProfitDistribution.monthly:
      return !last || daysBetween(last, now) >= 30;
    default:
      return false;
  }
}
function daysBetween(d1, d2) {
  return Math.floor((d2.getTime() - d1.getTime()) / (1e3 * 60 * 60 * 24));
}
function getStartOfTodayUTC() {
  const now = /* @__PURE__ */ new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
}

const _GBY3HA5exdA68h8yC4L9zD177sv_RqzzDR8qqLpvMfY = defineNitroPlugin(() => {
  new CronJob(
    "*/30 * * * *",
    async function() {
      await distributeProfit();
    },
    null,
    // onComplete
    true
    // start
  );
});

const _kih1UH2_ggJj_xrP_grbTF23vkpZ9xkwyYngR3i5n0 = defineNitroPlugin(() => {
  config$2({ quiet: true });
});

const plugins = [
  _uYC4RJyfI3WAb4kIPWMSZOmfhOpxQsUG4FivPvJq1A,
_GBY3HA5exdA68h8yC4L9zD177sv_RqzzDR8qqLpvMfY,
_kih1UH2_ggJj_xrP_grbTF23vkpZ9xkwyYngR3i5n0
];

const assets = {
  "/logo.png": {
    "type": "image/png",
    "etag": "\"8693-eL5Fl1t6wDGD6TOZQYx/ZD7Ecw4\"",
    "mtime": "2026-02-25T21:50:27.696Z",
    "size": 34451,
    "path": "../public/logo.png"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"18-j8OIsL9qGDmNZ+lHhp2tyH4XtaE\"",
    "mtime": "2026-02-25T21:50:27.696Z",
    "size": 24,
    "path": "../public/robots.txt"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"325fc-hS2DUiI+No6LCRWWmoeDjSrrjyc\"",
    "mtime": "2026-02-25T21:50:27.608Z",
    "size": 206332,
    "path": "../public/favicon.ico"
  },
  "/_nuxt/-7KF7Ksm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"223-E6w/16EmZDO7NVbeVCSUQ+XFR3A\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 547,
    "path": "../public/_nuxt/-7KF7Ksm.js"
  },
  "/_nuxt/26P4-8QO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5a3-7MYVxya9JqS4ReQR/Pqj3mqlMfU\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 1443,
    "path": "../public/_nuxt/26P4-8QO.js"
  },
  "/_nuxt/4C7uNxTt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fc0-bdWQVoJAeSljgTrpwlFCaB9zews\"",
    "mtime": "2026-09-04T08:36:04.150Z",
    "size": 4032,
    "path": "../public/_nuxt/4C7uNxTt.js"
  },
  "/_nuxt/4N6_SQ8W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33a3-0SINMWKHApTkYWNKTNrGv7FZIcI\"",
    "mtime": "2026-09-04T08:36:04.146Z",
    "size": 13219,
    "path": "../public/_nuxt/4N6_SQ8W.js"
  },
  "/_nuxt/6l2IdqqB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"742f-ojEYJ+7E0edkkadpU4ltc99vrSY\"",
    "mtime": "2026-09-04T08:36:04.148Z",
    "size": 29743,
    "path": "../public/_nuxt/6l2IdqqB.js"
  },
  "/_nuxt/9ThFSRxC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20a-dQJ8BWv4HS7IZbEXbVesaiSYSQ8\"",
    "mtime": "2026-09-04T08:36:04.147Z",
    "size": 522,
    "path": "../public/_nuxt/9ThFSRxC.js"
  },
  "/_nuxt/9Sj_QenJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e-0OW+1XYJEH1z7qtsmO8ASFjxOi8\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 30,
    "path": "../public/_nuxt/9Sj_QenJ.js"
  },
  "/_nuxt/aIULrQPd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a5-9UZgfYgN4bsQfpMLWKe0mLkqv4U\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 1189,
    "path": "../public/_nuxt/aIULrQPd.js"
  },
  "/_nuxt/a9WTHs9V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b20-55ljGRoeCy05PAJoNSp4fIdi1A0\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 15136,
    "path": "../public/_nuxt/a9WTHs9V.js"
  },
  "/_nuxt/B30pwpMX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1569-fsGMDUq0qGHj44p+bDlx31GWKWM\"",
    "mtime": "2026-09-04T08:36:04.146Z",
    "size": 5481,
    "path": "../public/_nuxt/B30pwpMX.js"
  },
  "/_nuxt/B5EF2vUG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b5e-tcijbKN4EQMtAJNbRQd71uBKrTU\"",
    "mtime": "2026-09-04T08:36:04.153Z",
    "size": 2910,
    "path": "../public/_nuxt/B5EF2vUG.js"
  },
  "/_nuxt/B5wPoUFn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c23-w0Oj4AT02FZlKEVKGKFAzs0+/SI\"",
    "mtime": "2026-09-04T08:36:04.146Z",
    "size": 11299,
    "path": "../public/_nuxt/B5wPoUFn.js"
  },
  "/_nuxt/BaMp3GjN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"947-WkYl70/XrglI5//5X6jrBRaPeks\"",
    "mtime": "2026-09-04T08:36:04.151Z",
    "size": 2375,
    "path": "../public/_nuxt/BaMp3GjN.js"
  },
  "/_nuxt/B5yzzD7t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ac5-l4t0VdPlH+qyn5JySkFlfQxfQgk\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 6853,
    "path": "../public/_nuxt/B5yzzD7t.js"
  },
  "/_nuxt/BBFeWvfN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"390e-Il09qahSRm3X2woHjf57gH5pQkI\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 14606,
    "path": "../public/_nuxt/BBFeWvfN.js"
  },
  "/_nuxt/BbZZJUbN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dd-py2JVqUWY0cotauVKQcZw7QzP2A\"",
    "mtime": "2026-09-04T08:36:04.153Z",
    "size": 221,
    "path": "../public/_nuxt/BbZZJUbN.js"
  },
  "/_nuxt/BBlQ5scc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3524-rls6YuVecHwakMpWf++lYfykR/g\"",
    "mtime": "2026-09-04T08:36:04.153Z",
    "size": 13604,
    "path": "../public/_nuxt/BBlQ5scc.js"
  },
  "/_nuxt/BCjPBWJU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bef-lghlUq1/JMpUAeVMl8jrIn9mUkg\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 7151,
    "path": "../public/_nuxt/BCjPBWJU.js"
  },
  "/img/buildings.gif": {
    "type": "image/gif",
    "etag": "\"1c979b-wMrXSFYQ7E3K7FN99ily+7ygRQA\"",
    "mtime": "2026-02-25T21:50:27.616Z",
    "size": 1873819,
    "path": "../public/img/buildings.gif"
  },
  "/img/investment.gif": {
    "type": "image/gif",
    "etag": "\"1a163c-h9iQAqizr1z0MSlmV4/0LCDrz+4\"",
    "mtime": "2026-02-25T21:50:27.632Z",
    "size": 1709628,
    "path": "../public/img/investment.gif"
  },
  "/_nuxt/BDZnt64s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21e-jRmSKTpZOtwfC+rUClTZkESVav0\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 542,
    "path": "../public/_nuxt/BDZnt64s.js"
  },
  "/_nuxt/BF0XlUH7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ef9-0oX5+FU22KruOwzfVti7xjMu2uQ\"",
    "mtime": "2026-09-04T08:36:04.148Z",
    "size": 7929,
    "path": "../public/_nuxt/BF0XlUH7.js"
  },
  "/_nuxt/BIpI0Us3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e3-C3HLQpvUXdMyHbfiOIcALwPoLRg\"",
    "mtime": "2026-09-04T08:36:04.155Z",
    "size": 227,
    "path": "../public/_nuxt/BIpI0Us3.js"
  },
  "/_nuxt/Biv2ViTv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"8f2-uBbw/sfy5B5PNNu0Bzk0NZ8faJE\"",
    "mtime": "2026-09-04T08:36:04.153Z",
    "size": 2290,
    "path": "../public/_nuxt/Biv2ViTv.js"
  },
  "/_nuxt/BgHiAluX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d19-3o0+JHKJoPZgBXmrvnhAR/DDRTk\"",
    "mtime": "2026-09-04T08:36:04.146Z",
    "size": 3353,
    "path": "../public/_nuxt/BgHiAluX.js"
  },
  "/_nuxt/BH_7N617.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"22a-maPso9kG281aOpmWukMXrEgb1YE\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 554,
    "path": "../public/_nuxt/BH_7N617.js"
  },
  "/_nuxt/BIyu-qwL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d14-w63iWkF/Kq+lxZ3h/LJpa38HEr0\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 3348,
    "path": "../public/_nuxt/BIyu-qwL.js"
  },
  "/_nuxt/Biv6IEPd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1eb-Ee3yTh9/+mAhrUDwXvtohIYBY9o\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 491,
    "path": "../public/_nuxt/Biv6IEPd.js"
  },
  "/_nuxt/BK4hID75.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"25fb-GOMiX/pNMmQVeuZfhttos/iBnf0\"",
    "mtime": "2026-09-04T08:36:04.156Z",
    "size": 9723,
    "path": "../public/_nuxt/BK4hID75.js"
  },
  "/_nuxt/BJTDmEXP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ccc-W/6JrYeve1Zu/pB6o3sJzWPo7Dc\"",
    "mtime": "2026-09-04T08:36:04.149Z",
    "size": 3276,
    "path": "../public/_nuxt/BJTDmEXP.js"
  },
  "/_nuxt/BKpUN_HP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20da-NRZaHnmCz/UsOGxtpodJauuKjr4\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 8410,
    "path": "../public/_nuxt/BKpUN_HP.js"
  },
  "/_nuxt/BKqqD9Ka.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"39c4-9S7o1n7CtD4ny7vXqwL22uEjjQc\"",
    "mtime": "2026-09-04T08:36:04.153Z",
    "size": 14788,
    "path": "../public/_nuxt/BKqqD9Ka.js"
  },
  "/_nuxt/BKzpD1-Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4e5-k2TwVH1XMOD15e2CJ+erwkHCf5Q\"",
    "mtime": "2026-09-04T08:36:04.146Z",
    "size": 46309,
    "path": "../public/_nuxt/BKzpD1-Y.js"
  },
  "/_nuxt/BlZFd8Ja.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"137d-GMefo5boX57fmRCrW+o8592VWgQ\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 4989,
    "path": "../public/_nuxt/BlZFd8Ja.js"
  },
  "/_nuxt/BLY2wPlN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c4-fFUK/JC96SqwfbTwy8CkB8HKkpY\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 452,
    "path": "../public/_nuxt/BLY2wPlN.js"
  },
  "/_nuxt/BKzpS7EI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1367-1CY/Jwx5rh1Nk0isZeCJUfb7s3E\"",
    "mtime": "2026-09-04T08:36:04.153Z",
    "size": 4967,
    "path": "../public/_nuxt/BKzpS7EI.js"
  },
  "/_nuxt/BMXLihqR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2ea9-JS+F4s+wan3xv5UBGU+sR31a79c\"",
    "mtime": "2026-09-04T08:36:04.156Z",
    "size": 11945,
    "path": "../public/_nuxt/BMXLihqR.js"
  },
  "/_nuxt/BOitNEWX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"344-wiDmUIMcYv3E1l2U62Qq1jvHGxU\"",
    "mtime": "2026-09-04T08:36:04.149Z",
    "size": 836,
    "path": "../public/_nuxt/BOitNEWX.js"
  },
  "/_nuxt/BnsHjL9E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16db-RauN35S/bPN0KqaaAtj5qjfKPUA\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 5851,
    "path": "../public/_nuxt/BnsHjL9E.js"
  },
  "/_nuxt/BNm4qq9G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"31bc-YkoKNPOLheDl7ShPq1dfnEI5x94\"",
    "mtime": "2026-09-04T08:36:04.156Z",
    "size": 12732,
    "path": "../public/_nuxt/BNm4qq9G.js"
  },
  "/_nuxt/BoSLb46G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6c716-QTiLwSdbmRF8f0ptmVonhgHHBXc\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 444182,
    "path": "../public/_nuxt/BoSLb46G.js"
  },
  "/vid/animation-01.mp4": {
    "type": "video/mp4",
    "etag": "\"206b2f-WxlnaRGMdb9hXupWC5otyg5yzCM\"",
    "mtime": "2026-02-25T21:50:27.708Z",
    "size": 2124591,
    "path": "../public/vid/animation-01.mp4"
  },
  "/_nuxt/Bo_no0ab.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5d-rHBBcAbW9LQQk+zE7wfqHeEbxkE\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 93,
    "path": "../public/_nuxt/Bo_no0ab.js"
  },
  "/_nuxt/BPrYg2xt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1440-JMQGDjkgXyXXvPqNxWdi1SmJiIk\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 5184,
    "path": "../public/_nuxt/BPrYg2xt.js"
  },
  "/vid/animation-02.mp4": {
    "type": "video/mp4",
    "etag": "\"3ce49f-k2iIGipKhiXyCfC6+QqUE3xUEuc\"",
    "mtime": "2026-02-25T21:50:27.720Z",
    "size": 3990687,
    "path": "../public/vid/animation-02.mp4"
  },
  "/_nuxt/BRrur1HE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6d5-NhU7T/Vi/ICxYZ5c+DhLWInMf4U\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 1749,
    "path": "../public/_nuxt/BRrur1HE.js"
  },
  "/_nuxt/BS55AXdh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"219f-U3ec4s6M0vZOsTrSELQ2fnNJ0HI\"",
    "mtime": "2026-09-04T08:36:04.151Z",
    "size": 8607,
    "path": "../public/_nuxt/BS55AXdh.js"
  },
  "/_nuxt/BU8ZsOdE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f5-9E3ftSxqoA8gJnL+iKjthz9Nsx4\"",
    "mtime": "2026-09-04T08:36:04.148Z",
    "size": 501,
    "path": "../public/_nuxt/BU8ZsOdE.js"
  },
  "/_nuxt/BrVe1C47.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2366-56ar2hclw4droQakkKKDpdbkXJk\"",
    "mtime": "2026-09-04T08:36:04.155Z",
    "size": 9062,
    "path": "../public/_nuxt/BrVe1C47.js"
  },
  "/_nuxt/BTOQN2_4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"406f-80oYN49Lrrils8qpsmSTb9os+b0\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 16495,
    "path": "../public/_nuxt/BTOQN2_4.js"
  },
  "/_nuxt/BX1GsLt4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"114-+LUEVa38jkZdbZo8msLfbLxCuNk\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 276,
    "path": "../public/_nuxt/BX1GsLt4.js"
  },
  "/_nuxt/BxbM8Em0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"997-oededOVe+3daGZgGZUwlxDwdC8Q\"",
    "mtime": "2026-09-04T08:36:04.156Z",
    "size": 2455,
    "path": "../public/_nuxt/BxbM8Em0.js"
  },
  "/_nuxt/By6NtxhR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"423b-nm2CQZBPiYVfT6jPocOCE+gE7Tc\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 16955,
    "path": "../public/_nuxt/By6NtxhR.js"
  },
  "/_nuxt/BxNP2L4y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5da4-VOptM+7tyM+gGuyv0GDTbN5bq+4\"",
    "mtime": "2026-09-04T08:36:04.153Z",
    "size": 23972,
    "path": "../public/_nuxt/BxNP2L4y.js"
  },
  "/_nuxt/bsLPM5gF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6992f-xWPOnwOttY6l3EftbrSWuyG5Mds\"",
    "mtime": "2026-09-04T08:36:04.143Z",
    "size": 432431,
    "path": "../public/_nuxt/bsLPM5gF.js"
  },
  "/_nuxt/BZgaOJ8W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d6-S2oNki/O2lkws2TWpUJEUptEoV4\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 726,
    "path": "../public/_nuxt/BZgaOJ8W.js"
  },
  "/_nuxt/B_Rkm42_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19f0-NYFDSY6a74SNBORkzwdiCjtfS18\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 6640,
    "path": "../public/_nuxt/B_Rkm42_.js"
  },
  "/_nuxt/Bzr520pe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"57b1-Lzf72MDN5f8y33DhieFbJ2OruHY\"",
    "mtime": "2026-09-04T08:36:04.160Z",
    "size": 22449,
    "path": "../public/_nuxt/Bzr520pe.js"
  },
  "/_nuxt/C0RMwUKb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6c1-EMeQQeC9an/mDU0LQFsfb/05fdY\"",
    "mtime": "2026-09-04T08:36:04.151Z",
    "size": 1729,
    "path": "../public/_nuxt/C0RMwUKb.js"
  },
  "/_nuxt/C3CO0Z_o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"90-X8dYOI22T1bLBmCXBrVUVV0FbYc\"",
    "mtime": "2026-09-04T08:36:04.147Z",
    "size": 144,
    "path": "../public/_nuxt/C3CO0Z_o.js"
  },
  "/_nuxt/C3npS8vC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7d-nbW5YAXslhzO7iI9vjTMJ6KkmGc\"",
    "mtime": "2026-09-04T08:36:04.151Z",
    "size": 125,
    "path": "../public/_nuxt/C3npS8vC.js"
  },
  "/_nuxt/C6DSsRh7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"152-RamOIvgQWaPhuaBanQGPDI1b5No\"",
    "mtime": "2026-09-04T08:36:04.153Z",
    "size": 338,
    "path": "../public/_nuxt/C6DSsRh7.js"
  },
  "/_nuxt/Ca5TNEii.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e0-aDwsWnK9wscHtoE8RI06tUxmlnc\"",
    "mtime": "2026-09-04T08:36:04.147Z",
    "size": 1248,
    "path": "../public/_nuxt/Ca5TNEii.js"
  },
  "/_nuxt/CaL-UZPZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"808-f3mUT7vDDnVoQ4kEzqm1iJsQ5Qc\"",
    "mtime": "2026-09-04T08:36:04.148Z",
    "size": 2056,
    "path": "../public/_nuxt/CaL-UZPZ.js"
  },
  "/_nuxt/CALpEgDt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2127-59xJqhUNTKzTzkvWFoL9W4Pvh/E\"",
    "mtime": "2026-09-04T08:36:04.150Z",
    "size": 8487,
    "path": "../public/_nuxt/CALpEgDt.js"
  },
  "/_nuxt/Cap7P5U2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ddb-KYpqLuEKlf5fwzYhKgb91BvOOcA\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 3547,
    "path": "../public/_nuxt/Cap7P5U2.js"
  },
  "/_nuxt/CAWmclVH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a682-vTx9tlQtbpPAUjdz0NGqK2ZQIdw\"",
    "mtime": "2026-09-04T08:36:04.159Z",
    "size": 42626,
    "path": "../public/_nuxt/CAWmclVH.js"
  },
  "/_nuxt/CCZRqCzu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cd8-kIWJGBG9xXf2X3ov88S/CaY/YL4\"",
    "mtime": "2026-09-04T08:36:04.159Z",
    "size": 3288,
    "path": "../public/_nuxt/CCZRqCzu.js"
  },
  "/_nuxt/CevZWMhA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"44ac-yJfl+df640EKz68UvmbfZU4bBCk\"",
    "mtime": "2026-09-04T08:36:04.156Z",
    "size": 17580,
    "path": "../public/_nuxt/CevZWMhA.js"
  },
  "/_nuxt/CgG3N8NQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ac0-mRmfzMXBsSuzWScFJNbT5wt3NJE\"",
    "mtime": "2026-09-04T08:36:04.155Z",
    "size": 2752,
    "path": "../public/_nuxt/CgG3N8NQ.js"
  },
  "/_nuxt/CGXFgPn8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"226e-/ZQvfApxAtdJ7gZlJrwrQZsKgA8\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 8814,
    "path": "../public/_nuxt/CGXFgPn8.js"
  },
  "/_nuxt/ChRclvJ-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6b-rBe7DvpIcfXU3km160ev1lSyBhk\"",
    "mtime": "2026-09-04T08:36:04.147Z",
    "size": 107,
    "path": "../public/_nuxt/ChRclvJ-.js"
  },
  "/_nuxt/Chsryzk0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2bde-bQwBborfCUeMfkzR6mKO0mvrNJA\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 11230,
    "path": "../public/_nuxt/Chsryzk0.js"
  },
  "/_nuxt/CHRJlye5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fca-0ue89SuYlTHSmq5ioWwrf0XZkuc\"",
    "mtime": "2026-09-04T08:36:04.151Z",
    "size": 4042,
    "path": "../public/_nuxt/CHRJlye5.js"
  },
  "/_nuxt/Cj7Eh-33.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"253-QO5fbgiv8GnMNiBqr24NFUxek68\"",
    "mtime": "2026-09-04T08:36:04.148Z",
    "size": 595,
    "path": "../public/_nuxt/Cj7Eh-33.js"
  },
  "/_nuxt/CJg9viPK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"765-dedNue8pxak5NvR5ma/Coq3CpoM\"",
    "mtime": "2026-09-04T08:36:04.146Z",
    "size": 1893,
    "path": "../public/_nuxt/CJg9viPK.js"
  },
  "/_nuxt/CjEYxqUo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21c1-0kYuTtmsjSlf6AuU3qPstwsI7fc\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 8641,
    "path": "../public/_nuxt/CjEYxqUo.js"
  },
  "/_nuxt/CJgPktbq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"968-3yV4uoCNcWMYQ7g8iHpEvzATe9U\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 2408,
    "path": "../public/_nuxt/CJgPktbq.js"
  },
  "/_nuxt/CJqU7O5E.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1597-f+qx+vbX/SZsdbJolNo77AsuKvI\"",
    "mtime": "2026-09-04T08:36:04.155Z",
    "size": 5527,
    "path": "../public/_nuxt/CJqU7O5E.js"
  },
  "/_nuxt/CJrNKTCg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6d2-MB8/ZXI56wS98VsEu/jrOo37eog\"",
    "mtime": "2026-09-04T08:36:04.146Z",
    "size": 1746,
    "path": "../public/_nuxt/CJrNKTCg.js"
  },
  "/_nuxt/CmJ0sKcR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a19-CmqDy+QM9wtU0105csGdOfONkBk\"",
    "mtime": "2026-09-04T08:36:04.149Z",
    "size": 10777,
    "path": "../public/_nuxt/CmJ0sKcR.js"
  },
  "/_nuxt/Co-PYD2P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"833-DrTS9LfYvLRe4fTfg4NRW+ALEH4\"",
    "mtime": "2026-09-04T08:36:04.155Z",
    "size": 2099,
    "path": "../public/_nuxt/Co-PYD2P.js"
  },
  "/_nuxt/COHsc5Is.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29e-pIzcr0Lz526B8idUua925L4OJXA\"",
    "mtime": "2026-09-04T08:36:04.147Z",
    "size": 670,
    "path": "../public/_nuxt/COHsc5Is.js"
  },
  "/_nuxt/Cpj98o6Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec-QtY1KaLA8vnMK3l2IvajpxyuPmY\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 236,
    "path": "../public/_nuxt/Cpj98o6Y.js"
  },
  "/_nuxt/CQ9On_q6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"170d-hJyV0fPzm05t/xc9KsyjMCBH9m4\"",
    "mtime": "2026-09-04T08:36:04.148Z",
    "size": 5901,
    "path": "../public/_nuxt/CQ9On_q6.js"
  },
  "/_nuxt/CQy2j_5Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"375-xuI5EQ03prTUw+HYoxpS7fLBPto\"",
    "mtime": "2026-09-04T08:36:04.143Z",
    "size": 885,
    "path": "../public/_nuxt/CQy2j_5Q.js"
  },
  "/_nuxt/CThI6zHJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9c-mIMtUrWHB6FnCwxtLREeGdM264g\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 156,
    "path": "../public/_nuxt/CThI6zHJ.js"
  },
  "/_nuxt/Cs8YNziV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"63f-8lx6mLDonM4tp1rK37numYq/pms\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 1599,
    "path": "../public/_nuxt/Cs8YNziV.js"
  },
  "/_nuxt/CTLIKuk9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a93-HtoUAf7zXsvsC+b7aPILffccLk0\"",
    "mtime": "2026-09-04T08:36:04.156Z",
    "size": 2707,
    "path": "../public/_nuxt/CTLIKuk9.js"
  },
  "/_nuxt/CTsSwAPt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"366d-HyLhZGe3IkplsgiKbBm3I/kUNrU\"",
    "mtime": "2026-09-04T08:36:04.146Z",
    "size": 13933,
    "path": "../public/_nuxt/CTsSwAPt.js"
  },
  "/_nuxt/CtVuMUnO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"459-3ds+2yYzDjRzZ6+Hzow4D7iGcTk\"",
    "mtime": "2026-09-04T08:36:04.156Z",
    "size": 1113,
    "path": "../public/_nuxt/CtVuMUnO.js"
  },
  "/_nuxt/CTyBPOzk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b6-iLwJ6l9mxT4fr/iFRkoOC9RV4Pk\"",
    "mtime": "2026-09-04T08:36:04.148Z",
    "size": 694,
    "path": "../public/_nuxt/CTyBPOzk.js"
  },
  "/_nuxt/CW1yIHJU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b71-H/ssiIwgn2uMmnsDxqc58+uQU0o\"",
    "mtime": "2026-09-04T08:36:04.149Z",
    "size": 2929,
    "path": "../public/_nuxt/CW1yIHJU.js"
  },
  "/_nuxt/CWcf4zNX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2765-DUIypNhcsomrcMHne8Tk6lZyh6w\"",
    "mtime": "2026-09-04T08:36:04.149Z",
    "size": 10085,
    "path": "../public/_nuxt/CWcf4zNX.js"
  },
  "/_nuxt/CWd9Cd1G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"140-Coph/sNAfEstgkhpztsBjfP+SRU\"",
    "mtime": "2026-09-04T08:36:04.155Z",
    "size": 320,
    "path": "../public/_nuxt/CWd9Cd1G.js"
  },
  "/_nuxt/CXsTtxbY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1664-FFi8S4i9TQhh++9q0kz4mfDqZU8\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 5732,
    "path": "../public/_nuxt/CXsTtxbY.js"
  },
  "/_nuxt/CXz0CeEf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"808-z+n3XNhFqid3xB+DRB52rE+WNpw\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 2056,
    "path": "../public/_nuxt/CXz0CeEf.js"
  },
  "/_nuxt/CY4LDTjp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"70e-WBywzeP6BcMeI3/EqNs5QPNQY00\"",
    "mtime": "2026-09-04T08:36:04.149Z",
    "size": 1806,
    "path": "../public/_nuxt/CY4LDTjp.js"
  },
  "/_nuxt/CzO4IW8j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3664-MfWUlb7roZHFuLzZRFdYbzPS6hE\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 13924,
    "path": "../public/_nuxt/CzO4IW8j.js"
  },
  "/_nuxt/CYBAn60P.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"504-uKmm7DpMqiYnwMS6BjaxI4G0h5c\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 1284,
    "path": "../public/_nuxt/CYBAn60P.js"
  },
  "/_nuxt/D184T0kD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c1-O3sIejhHOWOtAc9DyiWE7gwx5E8\"",
    "mtime": "2026-09-04T08:36:04.147Z",
    "size": 705,
    "path": "../public/_nuxt/D184T0kD.js"
  },
  "/_nuxt/D05bVhNM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4691-zMHi7c04JsGrOUrddYFX/EYE9ZY\"",
    "mtime": "2026-09-04T08:36:04.156Z",
    "size": 18065,
    "path": "../public/_nuxt/D05bVhNM.js"
  },
  "/_nuxt/D3FNrbnm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"99-Yt97MX+5SjsMQcTgolLhvseZC8U\"",
    "mtime": "2026-09-04T08:36:04.148Z",
    "size": 153,
    "path": "../public/_nuxt/D3FNrbnm.js"
  },
  "/_nuxt/D6ucexgt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"113-mX561ed8mfRSGkekf4Ww5hkL4CI\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 275,
    "path": "../public/_nuxt/D6ucexgt.js"
  },
  "/_nuxt/D7ZqfHZN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e3-/H+xxJ5MlUX/y+3lBrVQonLi13o\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 995,
    "path": "../public/_nuxt/D7ZqfHZN.js"
  },
  "/_nuxt/d27VyMIT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a39b-qXS22pOgHChT/vTqLbNIJ52bDNA\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 41883,
    "path": "../public/_nuxt/d27VyMIT.js"
  },
  "/_nuxt/D7uws6fd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"166-RaktAnCW529hpf7IPBdnT3YMF3Q\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 358,
    "path": "../public/_nuxt/D7uws6fd.js"
  },
  "/_nuxt/D8WtP8zj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"47ff-NbVJPy5adeap+FvEEVVoiQVCT8Q\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 18431,
    "path": "../public/_nuxt/D8WtP8zj.js"
  },
  "/_nuxt/D96YVwK4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"abd-/29e1TBXp6H42PGqyk4gLl6WtX8\"",
    "mtime": "2026-09-04T08:36:04.153Z",
    "size": 2749,
    "path": "../public/_nuxt/D96YVwK4.js"
  },
  "/_nuxt/D9B1UaIg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e6-X81fKxNZb17Lqq/IBerVuyFi/V8\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 230,
    "path": "../public/_nuxt/D9B1UaIg.js"
  },
  "/_nuxt/D9ePLOi5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"10db-pn21FRW/PZ0s+XCWb9BHn+e5NZA\"",
    "mtime": "2026-09-04T08:36:04.146Z",
    "size": 4315,
    "path": "../public/_nuxt/D9ePLOi5.js"
  },
  "/_nuxt/DAqhlAsw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fb5-vDjiYpHrTKKYEuJKNQs99k3hbHY\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 4021,
    "path": "../public/_nuxt/DAqhlAsw.js"
  },
  "/_nuxt/DcA5nusM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1752-YhEfgLfgmGTxxO4OWzgT0Gha3WI\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 5970,
    "path": "../public/_nuxt/DcA5nusM.js"
  },
  "/_nuxt/DbSH3Sy1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26f46-OSDay5bl+0EHTupJh07Y3AxyTZ4\"",
    "mtime": "2026-09-04T08:36:04.151Z",
    "size": 159558,
    "path": "../public/_nuxt/DbSH3Sy1.js"
  },
  "/_nuxt/DCSBvxqH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9cd-OvL+T7lx5BeU3tlo7lRrNW8VNq4\"",
    "mtime": "2026-09-04T08:36:04.155Z",
    "size": 2509,
    "path": "../public/_nuxt/DCSBvxqH.js"
  },
  "/_nuxt/Dd60kLyz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b27e-e1P7XfruOH6u2SX2h6wJ+b27HKo\"",
    "mtime": "2026-09-04T08:36:04.147Z",
    "size": 111230,
    "path": "../public/_nuxt/Dd60kLyz.js"
  },
  "/_nuxt/DeuzRBk-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"509-jRmyYgTkVc3TmWQUZSHF04EMLoM\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 1289,
    "path": "../public/_nuxt/DeuzRBk-.js"
  },
  "/_nuxt/Dfe3NNe6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f0-b95hWIPnunu+wCR/nSf1QquM6oc\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 496,
    "path": "../public/_nuxt/Dfe3NNe6.js"
  },
  "/_nuxt/DhirHCtI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"84c6-sgiHOYY2xKNU1XB5ulDYn1TVshI\"",
    "mtime": "2026-09-04T08:36:04.149Z",
    "size": 33990,
    "path": "../public/_nuxt/DhirHCtI.js"
  },
  "/_nuxt/DHwN7Iwh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"229-eqpPHkCZxTqUDgkS84JuJZYN/sY\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 553,
    "path": "../public/_nuxt/DHwN7Iwh.js"
  },
  "/_nuxt/Di9o0GNI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26b9c-Cq2ecegIHWBWJ0ChuCzqDvfPOKw\"",
    "mtime": "2026-09-04T08:36:04.161Z",
    "size": 158620,
    "path": "../public/_nuxt/Di9o0GNI.js"
  },
  "/_nuxt/DIiZkkhn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18bb-+Zm+3T1TBmWJY8K3Y5x38bq6Qn8\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 6331,
    "path": "../public/_nuxt/DIiZkkhn.js"
  },
  "/_nuxt/DlAUqK2U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2026-09-04T08:36:04.146Z",
    "size": 91,
    "path": "../public/_nuxt/DlAUqK2U.js"
  },
  "/_nuxt/DItZ0IVC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f0-zbl5lTVWJU+saYmWygOj9djU+T8\"",
    "mtime": "2026-09-04T08:36:04.155Z",
    "size": 496,
    "path": "../public/_nuxt/DItZ0IVC.js"
  },
  "/_nuxt/Dkm3ViKx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7c-v/wTKHYkAnATzampDQXBVNIBuIY\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 124,
    "path": "../public/_nuxt/Dkm3ViKx.js"
  },
  "/_nuxt/Dl_1__Gj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"362e-ROeW4dcMoYpbE1LoP+0H/Lz/VhM\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 13870,
    "path": "../public/_nuxt/Dl_1__Gj.js"
  },
  "/_nuxt/DmIvwtQ4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f08-ZvoDB142MkWhNywOJg/8D+vIehk\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 7944,
    "path": "../public/_nuxt/DmIvwtQ4.js"
  },
  "/_nuxt/DmqCS8uH.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4ff-RWRoh4772YukYPxyZuMmWGzwMAg\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 1279,
    "path": "../public/_nuxt/DmqCS8uH.js"
  },
  "/_nuxt/DNzuIBlt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2765-EMvrgRwkj7UYW+7IWhkv1OKDDXY\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 10085,
    "path": "../public/_nuxt/DNzuIBlt.js"
  },
  "/_nuxt/DRvv3Pa1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9bf-bz+cUboujhEHXl6f3YlCiXTyDM0\"",
    "mtime": "2026-09-04T08:36:04.148Z",
    "size": 2495,
    "path": "../public/_nuxt/DRvv3Pa1.js"
  },
  "/_nuxt/DoSbGpRD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"313-Tj2EPYe++Sl0S//xX9JK74hHUbU\"",
    "mtime": "2026-09-04T08:36:04.149Z",
    "size": 787,
    "path": "../public/_nuxt/DoSbGpRD.js"
  },
  "/_nuxt/Ds2nBgaz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"389d-hnzyraeG5fulgd87HK2Ddtht/Es\"",
    "mtime": "2026-09-04T08:36:04.156Z",
    "size": 14493,
    "path": "../public/_nuxt/Ds2nBgaz.js"
  },
  "/_nuxt/DP_LVnXA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34bc8-zKYP6jNyENlJEoqMJio1kuf/hB8\"",
    "mtime": "2026-09-04T08:36:04.155Z",
    "size": 216008,
    "path": "../public/_nuxt/DP_LVnXA.js"
  },
  "/_nuxt/Dsaz7ZGA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24d-K3PiDkR/mYRFru65JJVdG+jmE8Y\"",
    "mtime": "2026-09-04T08:36:04.155Z",
    "size": 589,
    "path": "../public/_nuxt/Dsaz7ZGA.js"
  },
  "/_nuxt/Dshp-UMV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"360-V/AOlXmf89pugCowe9+nLnzVkYc\"",
    "mtime": "2026-09-04T08:36:04.155Z",
    "size": 864,
    "path": "../public/_nuxt/Dshp-UMV.js"
  },
  "/_nuxt/DUgLWHNg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c0c-ot0WUMG/bvMwUbKkGu5+LSLLzvg\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 7180,
    "path": "../public/_nuxt/DUgLWHNg.js"
  },
  "/_nuxt/dvNIHppw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15af-CtiyS7qBElcAFuqVPJ5UF6a+hYw\"",
    "mtime": "2026-09-04T08:36:04.143Z",
    "size": 5551,
    "path": "../public/_nuxt/dvNIHppw.js"
  },
  "/_nuxt/DVuUBdu0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4634-4eVdVVQbOJNLfo2lx7rCw+9V7w0\"",
    "mtime": "2026-09-04T08:36:04.159Z",
    "size": 17972,
    "path": "../public/_nuxt/DVuUBdu0.js"
  },
  "/_nuxt/DVxv5sO0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"140-hyWOJvLuL2ftF/2Rmrxcda/fGcg\"",
    "mtime": "2026-09-04T08:36:04.159Z",
    "size": 320,
    "path": "../public/_nuxt/DVxv5sO0.js"
  },
  "/_nuxt/DW6ahom2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"243a-55wAbRvxmCZ8QwI9bElVtGE2UsQ\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 9274,
    "path": "../public/_nuxt/DW6ahom2.js"
  },
  "/_nuxt/Dx5sjDNm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5dffd-lBdZ0QW5cIfulHKqFninJrJII0A\"",
    "mtime": "2026-09-04T08:36:04.160Z",
    "size": 385021,
    "path": "../public/_nuxt/Dx5sjDNm.js"
  },
  "/_nuxt/DXEQVQnt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"31151-TyUyRNm9rR2JDwpyAxcruTmmr6A\"",
    "mtime": "2026-09-04T08:36:04.160Z",
    "size": 201041,
    "path": "../public/_nuxt/DXEQVQnt.js"
  },
  "/_nuxt/D_OLCqda.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c7a7-ueTURydYzztpcYJ6f43PEMA/qPo\"",
    "mtime": "2026-09-04T08:36:04.150Z",
    "size": 116647,
    "path": "../public/_nuxt/D_OLCqda.js"
  },
  "/_nuxt/D_yQ6NgM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"516-0Mo7iU8B6bU00HtIXr9XivW+Gno\"",
    "mtime": "2026-09-04T08:36:04.156Z",
    "size": 1302,
    "path": "../public/_nuxt/D_yQ6NgM.js"
  },
  "/_nuxt/e-gxIwX2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"688-wnopi+s3iK74TY+2Qmx2jAuIdWc\"",
    "mtime": "2026-09-04T08:36:04.146Z",
    "size": 1672,
    "path": "../public/_nuxt/e-gxIwX2.js"
  },
  "/_nuxt/E9Y9tgmv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"206d-hVrTFU5abkSuhIRVzzwaH9iAVLM\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 8301,
    "path": "../public/_nuxt/E9Y9tgmv.js"
  },
  "/_nuxt/entry.CQs8IwrG.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2c30f-GxFQavqxWJ7loZqkctu8plb8+8E\"",
    "mtime": "2026-09-04T08:36:04.057Z",
    "size": 181007,
    "path": "../public/_nuxt/entry.CQs8IwrG.css"
  },
  "/_nuxt/fmDablL3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"895-sAU9bxsScshCeWcdOUQrXjzU6E8\"",
    "mtime": "2026-09-04T08:36:04.151Z",
    "size": 2197,
    "path": "../public/_nuxt/fmDablL3.js"
  },
  "/_nuxt/GeistMono.BlNDD6KS.ttf": {
    "type": "font/ttf",
    "etag": "\"21a4c-gm9w2ENvXcfFhYWyTL/dr//O2vQ\"",
    "mtime": "2026-09-04T08:36:04.141Z",
    "size": 137804,
    "path": "../public/_nuxt/GeistMono.BlNDD6KS.ttf"
  },
  "/_nuxt/h9tOzdeh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"db9-637C5mcX/U/YvJQs/9eehn5M9Fs\"",
    "mtime": "2026-09-04T08:36:04.159Z",
    "size": 3513,
    "path": "../public/_nuxt/h9tOzdeh.js"
  },
  "/_nuxt/hqZOX0sN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"181d-x2TmDxT5hHzCNk+jazv4ddQWaY4\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 6173,
    "path": "../public/_nuxt/hqZOX0sN.js"
  },
  "/_nuxt/index.BqFlsUUz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"306-d9DUMcHhxURSpw6sOUqXnsw2eGs\"",
    "mtime": "2026-09-04T08:36:04.141Z",
    "size": 774,
    "path": "../public/_nuxt/index.BqFlsUUz.css"
  },
  "/_nuxt/jAuvyuU3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e41-1a7EBlhYghtFnBV2XFxx/wyhyQ0\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 7745,
    "path": "../public/_nuxt/jAuvyuU3.js"
  },
  "/_nuxt/jFYhBC76.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"224-FHzXPBCuJL9jsLYPNEezdythwVM\"",
    "mtime": "2026-09-04T08:36:04.151Z",
    "size": 548,
    "path": "../public/_nuxt/jFYhBC76.js"
  },
  "/_nuxt/KGE2r2Ty.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5e4-BHlCUsoz4JdFVDh+qOJiKX6Cp1c\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 1508,
    "path": "../public/_nuxt/KGE2r2Ty.js"
  },
  "/_nuxt/kleYpylX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c06-8/A7S4mM1Qn0YJQ8NZGyeT6rVMk\"",
    "mtime": "2026-09-04T08:36:04.145Z",
    "size": 7174,
    "path": "../public/_nuxt/kleYpylX.js"
  },
  "/_nuxt/kRIii9yh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f3-yYb3MkTdiuhHjcDfFDHvLT+nO3M\"",
    "mtime": "2026-09-04T08:36:04.148Z",
    "size": 499,
    "path": "../public/_nuxt/kRIii9yh.js"
  },
  "/_nuxt/KW8BKiw1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c46-jY7XfrAg/nF/qSVO/ajh+kmELiY\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 23622,
    "path": "../public/_nuxt/KW8BKiw1.js"
  },
  "/_nuxt/LzFInfQN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"201f-KfdVMmMAqksLPS4w4ZHP5CKGjDU\"",
    "mtime": "2026-09-04T08:36:04.144Z",
    "size": 8223,
    "path": "../public/_nuxt/LzFInfQN.js"
  },
  "/_nuxt/MHoRMp5c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"430-3UdMJ1ByRerHa3uqGnbXtOZP+FQ\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 1072,
    "path": "../public/_nuxt/MHoRMp5c.js"
  },
  "/_nuxt/Mhue4wfn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2988-ml8esk8JwyzVqeajsPYj+nflZC4\"",
    "mtime": "2026-09-04T08:36:04.155Z",
    "size": 10632,
    "path": "../public/_nuxt/Mhue4wfn.js"
  },
  "/_nuxt/mPS7ogTe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"67a-KIS/G/KX2P9bMZOTut46L3IeJ3Y\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 1658,
    "path": "../public/_nuxt/mPS7ogTe.js"
  },
  "/_nuxt/partner-list.phP7Mvgh.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"27c-UYcm/JERbzV/wmR6YOEolOKZrXE\"",
    "mtime": "2026-09-04T08:36:04.143Z",
    "size": 636,
    "path": "../public/_nuxt/partner-list.phP7Mvgh.css"
  },
  "/_nuxt/password.D7e_onzx.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1b-TMZKD6boIOYNoDcCE4aOxomJVYw\"",
    "mtime": "2026-09-04T08:36:04.143Z",
    "size": 27,
    "path": "../public/_nuxt/password.D7e_onzx.css"
  },
  "/_nuxt/Poppins.CTKNfV9P.ttf": {
    "type": "font/ttf",
    "etag": "\"26a20-/dMALn2BTuR8HBuEh8csa7s6LQA\"",
    "mtime": "2026-09-04T08:36:04.141Z",
    "size": 158240,
    "path": "../public/_nuxt/Poppins.CTKNfV9P.ttf"
  },
  "/_nuxt/Pw4dY5b4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c59-/fhtC3XSXEfSZ0Mzm9cmo2raGGg\"",
    "mtime": "2026-09-04T08:36:04.153Z",
    "size": 3161,
    "path": "../public/_nuxt/Pw4dY5b4.js"
  },
  "/_nuxt/pxEP7ILB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2116-nUIWcZ0BbjAlzmnyhBBZs6WJ83g\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 8470,
    "path": "../public/_nuxt/pxEP7ILB.js"
  },
  "/_nuxt/p_xkxlx9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1506-cxFRUUvRTD1riq4j3pRDiphmyes\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 5382,
    "path": "../public/_nuxt/p_xkxlx9.js"
  },
  "/_nuxt/QoALX99s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21d9-mJUgOTk6i0iRTFsqKelCtMDkEJI\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 8665,
    "path": "../public/_nuxt/QoALX99s.js"
  },
  "/_nuxt/Rg7Z_NIR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"34609-iMyE5zY1AWgMXIYzyRtdJ5YD0DE\"",
    "mtime": "2026-09-04T08:36:04.153Z",
    "size": 214537,
    "path": "../public/_nuxt/Rg7Z_NIR.js"
  },
  "/_nuxt/s0LOqEsk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f86-uvSC8/chqykL9bK8wGALbzks3z0\"",
    "mtime": "2026-09-04T08:36:04.150Z",
    "size": 3974,
    "path": "../public/_nuxt/s0LOqEsk.js"
  },
  "/_nuxt/sEbWt9d8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2dd4-hTjK4K/C01IzR0Irx2RcMo+fbOM\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 11732,
    "path": "../public/_nuxt/sEbWt9d8.js"
  },
  "/_nuxt/sJE1ypTo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bb-DvpLMQSFHjSgqUvqVJBAR0NQ8lo\"",
    "mtime": "2026-09-04T08:36:04.149Z",
    "size": 443,
    "path": "../public/_nuxt/sJE1ypTo.js"
  },
  "/_nuxt/skjQzF-B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7e-tKeJrCn+VUcu/ag0baBsau2wHLs\"",
    "mtime": "2026-09-04T08:36:04.149Z",
    "size": 126,
    "path": "../public/_nuxt/skjQzF-B.js"
  },
  "/_nuxt/sy-B81sz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f1f-HyL3GKehoUQfZ5tHEvBzcOmuQKQ\"",
    "mtime": "2026-09-04T08:36:04.154Z",
    "size": 7967,
    "path": "../public/_nuxt/sy-B81sz.js"
  },
  "/_nuxt/tJfgLrYi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"86b-CT9AeO7f5GkeJFXh+ocreQB0sDk\"",
    "mtime": "2026-09-04T08:36:04.151Z",
    "size": 2155,
    "path": "../public/_nuxt/tJfgLrYi.js"
  },
  "/_nuxt/TLVTypeM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"84-mQqMT+sFFoxG5ufLnX4OEswTgIw\"",
    "mtime": "2026-09-04T08:36:04.151Z",
    "size": 132,
    "path": "../public/_nuxt/TLVTypeM.js"
  },
  "/_nuxt/tuFR8MeD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"820-QN/0EpKvlxaCfl62FQZISnn9N90\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 2080,
    "path": "../public/_nuxt/tuFR8MeD.js"
  },
  "/_nuxt/v-table.BzAvpRaz.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ae-H2baAMXsbb/EWycGxLCR5QEoRb4\"",
    "mtime": "2026-09-04T08:36:04.141Z",
    "size": 174,
    "path": "../public/_nuxt/v-table.BzAvpRaz.css"
  },
  "/_nuxt/vISq6kJE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"102ae-kd4VdfQhWSOYWfZlwCxtnS72W2Y\"",
    "mtime": "2026-09-04T08:36:04.147Z",
    "size": 66222,
    "path": "../public/_nuxt/vISq6kJE.js"
  },
  "/_nuxt/vcYOaj6w.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9b7-+B0kLOmPxDX8AkOvCJVIu6VsWdo\"",
    "mtime": "2026-09-04T08:36:04.152Z",
    "size": 2487,
    "path": "../public/_nuxt/vcYOaj6w.js"
  },
  "/_nuxt/V_7ynNSv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2dcd-Qg6v5OVD4zCRf/6bVMMPt60db7E\"",
    "mtime": "2026-09-04T08:36:04.147Z",
    "size": 11725,
    "path": "../public/_nuxt/V_7ynNSv.js"
  },
  "/_nuxt/XQ04X8w1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"365c-+n/P0c5RkPErOzRtkt0VY395oRk\"",
    "mtime": "2026-09-04T08:36:04.156Z",
    "size": 13916,
    "path": "../public/_nuxt/XQ04X8w1.js"
  },
  "/_nuxt/ZQ-eWj5F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6b9-lvOGEc7rY22QWANba5yOfoQEOLM\"",
    "mtime": "2026-09-04T08:36:04.153Z",
    "size": 1721,
    "path": "../public/_nuxt/ZQ-eWj5F.js"
  },
  "/_nuxt/ZTdr74Vr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24e2-zNcBhWOD4P25VO1OslCXdP+2Oxc\"",
    "mtime": "2026-09-04T08:36:04.157Z",
    "size": 9442,
    "path": "../public/_nuxt/ZTdr74Vr.js"
  },
  "/img/customers/executives.jpg": {
    "type": "image/jpeg",
    "etag": "\"1868c-MtaFRjfWMSBA+WFCEkCWQftWnVs\"",
    "mtime": "2026-02-25T21:50:27.620Z",
    "size": 99980,
    "path": "../public/img/customers/executives.jpg"
  },
  "/img/customers/investors.jpg": {
    "type": "image/jpeg",
    "etag": "\"a0c2-Ump14YaHOpNKT0vmJMqpBpU3W1g\"",
    "mtime": "2026-02-25T21:50:27.620Z",
    "size": 41154,
    "path": "../public/img/customers/investors.jpg"
  },
  "/img/customers/new-to-investing.jpg": {
    "type": "image/jpeg",
    "etag": "\"adce-y0X23YMivRn0tr+/MO75W7QsLP8\"",
    "mtime": "2026-02-25T21:50:27.620Z",
    "size": 44494,
    "path": "../public/img/customers/new-to-investing.jpg"
  },
  "/img/customers/private-clients.jpg": {
    "type": "image/jpeg",
    "etag": "\"2ffca-FlC6bCaB0K9LpTdASmziTwO5bMo\"",
    "mtime": "2026-02-25T21:50:27.620Z",
    "size": 196554,
    "path": "../public/img/customers/private-clients.jpg"
  },
  "/img/customers/retirees.jpg": {
    "type": "image/jpeg",
    "etag": "\"569e-NPmoiG6327rGXeJU1qOeA+x5Vpc\"",
    "mtime": "2026-02-25T21:50:27.620Z",
    "size": 22174,
    "path": "../public/img/customers/retirees.jpg"
  },
  "/img/icons/image.svg": {
    "type": "image/svg+xml",
    "etag": "\"541-JTG/7SZVoeezHaulFOUQN7KzPtw\"",
    "mtime": "2026-02-25T21:50:27.620Z",
    "size": 1345,
    "path": "../public/img/icons/image.svg"
  },
  "/_nuxt/sCF47cdm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17837a-SPqGFfoU4FrlgDiD7hUMB+q/tTU\"",
    "mtime": "2026-09-04T08:36:04.178Z",
    "size": 1540986,
    "path": "../public/_nuxt/sCF47cdm.js"
  },
  "/img/icons/pdf.svg": {
    "type": "image/svg+xml",
    "etag": "\"390-r8S/r1oYBetLWdj6tVdUo2Fq7jc\"",
    "mtime": "2026-02-25T21:50:27.620Z",
    "size": 912,
    "path": "../public/img/icons/pdf.svg"
  },
  "/img/loaders/route-loader.gif": {
    "type": "image/gif",
    "etag": "\"78883-JeKg+np7l/lxSh59mOWmmhQNUYs\"",
    "mtime": "2026-02-25T21:50:27.640Z",
    "size": 493699,
    "path": "../public/img/loaders/route-loader.gif"
  },
  "/img/partners/avaloq.svg": {
    "type": "image/svg+xml",
    "etag": "\"1694-vebQOUcyLRI/h28B8v69EHV/rKg\"",
    "mtime": "2026-02-25T21:50:27.688Z",
    "size": 5780,
    "path": "../public/img/partners/avaloq.svg"
  },
  "/img/partners/holded.png": {
    "type": "image/png",
    "etag": "\"12a2-RXIdnMsdruk9AMzlqnNH2ygXiTw\"",
    "mtime": "2026-02-25T21:50:27.688Z",
    "size": 4770,
    "path": "../public/img/partners/holded.png"
  },
  "/img/partners/monarch.png": {
    "type": "image/png",
    "etag": "\"1e01-/9gIes8F8ZEvI9ak0OqP2QukJgY\"",
    "mtime": "2026-02-25T21:50:27.688Z",
    "size": 7681,
    "path": "../public/img/partners/monarch.png"
  },
  "/img/partners/metaco.png": {
    "type": "image/png",
    "etag": "\"23657-Xn/sVA+MPfd+26oRKOFEKJHEqgU\"",
    "mtime": "2026-02-25T21:50:27.688Z",
    "size": 144983,
    "path": "../public/img/partners/metaco.png"
  },
  "/img/partners/otransfer.png": {
    "type": "image/png",
    "etag": "\"5b0b-aBjMePlDAkU3JjWk1kCNR20Z45Y\"",
    "mtime": "2026-02-25T21:50:27.692Z",
    "size": 23307,
    "path": "../public/img/partners/otransfer.png"
  },
  "/img/partners/sygnum.png": {
    "type": "image/png",
    "etag": "\"114f-RPaAZ0PjUS+e3yLXz5w5peKJ1sU\"",
    "mtime": "2026-02-25T21:50:27.692Z",
    "size": 4431,
    "path": "../public/img/partners/sygnum.png"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-xIsB9jnPp+//xonCfvfdRp1N8WU\"",
    "mtime": "2026-09-04T08:36:42.304Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/img/pages/about/mission.jpg": {
    "type": "image/jpeg",
    "etag": "\"6bbe-Tyd428zh5unz3GH9/C5XxWtp3Rk\"",
    "mtime": "2026-02-25T21:50:27.648Z",
    "size": 27582,
    "path": "../public/img/pages/about/mission.jpg"
  },
  "/img/pages/about/partnerships.jpg": {
    "type": "image/jpeg",
    "etag": "\"27096-pv3nqczIqE/xrGBZgo3d+s3EUo0\"",
    "mtime": "2026-02-25T21:50:27.652Z",
    "size": 159894,
    "path": "../public/img/pages/about/partnerships.jpg"
  },
  "/img/pages/about/team-at-work.jpg": {
    "type": "image/jpeg",
    "etag": "\"297cb-KaOYwy1XQ6HWeQ3QNYPSPk+n3ws\"",
    "mtime": "2026-02-25T21:50:27.652Z",
    "size": 169931,
    "path": "../public/img/pages/about/team-at-work.jpg"
  },
  "/img/pages/investments/automated-investment-platform.jpg": {
    "type": "image/jpeg",
    "etag": "\"19400-welsBPIRNsMQ8qpYzknf4B/vm1g\"",
    "mtime": "2026-02-25T21:50:27.652Z",
    "size": 103424,
    "path": "../public/img/pages/investments/automated-investment-platform.jpg"
  },
  "/img/pages/investments/bond-certificate.jpg": {
    "type": "image/jpeg",
    "etag": "\"35868-E5osCyvoZkVyylig145wmBLkAFc\"",
    "mtime": "2026-02-25T21:50:27.656Z",
    "size": 219240,
    "path": "../public/img/pages/investments/bond-certificate.jpg"
  },
  "/img/pages/investments/bonds.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e32d-i2w0ja0w82e+WXiYPD0cAhM9OUE\"",
    "mtime": "2026-02-25T21:50:27.656Z",
    "size": 123693,
    "path": "../public/img/pages/investments/bonds.jpg"
  },
  "/img/pages/investments/clock-tower.jpg": {
    "type": "image/jpeg",
    "etag": "\"33e6e-1unJgSXnWTHweuiWaxJ06z11U8s\"",
    "mtime": "2026-02-25T21:50:27.656Z",
    "size": 212590,
    "path": "../public/img/pages/investments/clock-tower.jpg"
  },
  "/img/loaders/initial-loader.gif": {
    "type": "image/gif",
    "etag": "\"a0300-GhC39hEBe/X9xt7jFMJTS1yUfL4\"",
    "mtime": "2026-02-25T21:50:27.636Z",
    "size": 656128,
    "path": "../public/img/loaders/initial-loader.gif"
  },
  "/img/pages/investments/commodities.webp": {
    "type": "image/webp",
    "etag": "\"6cc4-NYEa2neEzLKqCFAn2igEY2vlJSQ\"",
    "mtime": "2026-02-25T21:50:27.656Z",
    "size": 27844,
    "path": "../public/img/pages/investments/commodities.webp"
  },
  "/img/pages/investments/commodity-etfs.webp": {
    "type": "image/webp",
    "etag": "\"179d6-x422jInOigsVzRBZw5NNGaPNTuo\"",
    "mtime": "2026-02-25T21:50:27.656Z",
    "size": 96726,
    "path": "../public/img/pages/investments/commodity-etfs.webp"
  },
  "/img/users/vEesX1QVV5dnpP44EFeUo9GzkiERJUHm-1753115855827.jpeg": {
    "type": "image/jpeg",
    "etag": "\"8556c-uPJpf4ktPLTsNevje8OCaiuaOPk\"",
    "mtime": "2026-02-25T21:50:27.696Z",
    "size": 546156,
    "path": "../public/img/users/vEesX1QVV5dnpP44EFeUo9GzkiERJUHm-1753115855827.jpeg"
  },
  "/img/pages/about/about-us.jpg": {
    "type": "image/jpeg",
    "etag": "\"a9fa1-SNL3P8hkPR7CO4H1MQppDtVTWhk\"",
    "mtime": "2026-02-25T21:50:27.644Z",
    "size": 696225,
    "path": "../public/img/pages/about/about-us.jpg"
  },
  "/img/pages/about/careers.jpg": {
    "type": "image/jpeg",
    "etag": "\"a4299-FPFuI+liB/Mc13sQmeXsi2fKPL4\"",
    "mtime": "2026-02-25T21:50:27.648Z",
    "size": 672409,
    "path": "../public/img/pages/about/careers.jpg"
  },
  "/img/pages/about/our-journey.jpg": {
    "type": "image/jpeg",
    "etag": "\"ac9b4-+szjHJWlwkclIj9ROWH55k28h60\"",
    "mtime": "2026-02-25T21:50:27.652Z",
    "size": 706996,
    "path": "../public/img/pages/about/our-journey.jpg"
  },
  "/img/pages/investments/commodity-types.jpg": {
    "type": "image/jpeg",
    "etag": "\"760be-m257GjwlIabwUlXiYf1vQQCwT64\"",
    "mtime": "2026-02-25T21:50:27.660Z",
    "size": 483518,
    "path": "../public/img/pages/investments/commodity-types.jpg"
  },
  "/img/partners/alphasense.png": {
    "type": "image/png",
    "etag": "\"1e26f7-FQrfkAqOBVazo/30gJUYVxaPoFE\"",
    "mtime": "2026-02-25T21:50:27.688Z",
    "size": 1976055,
    "path": "../public/img/partners/alphasense.png"
  },
  "/img/pages/investments/commodity-types.svg": {
    "type": "image/svg+xml",
    "etag": "\"24b2f-YTC4gSuPWKIBEARrInYcYbnmfWA\"",
    "mtime": "2026-02-25T21:50:27.660Z",
    "size": 150319,
    "path": "../public/img/pages/investments/commodity-types.svg"
  },
  "/img/pages/investments/crypto-dashboard.png": {
    "type": "image/png",
    "etag": "\"2b6da-ThUZzTFo6LDAWD15lqpnw5hyUL0\"",
    "mtime": "2026-02-25T21:50:27.660Z",
    "size": 177882,
    "path": "../public/img/pages/investments/crypto-dashboard.png"
  },
  "/img/pages/investments/cryptocurrencies.jpg": {
    "type": "image/jpeg",
    "etag": "\"297f8-khoYq0W7T8mfORde5wlWXqk/geE\"",
    "mtime": "2026-02-25T21:50:27.664Z",
    "size": 169976,
    "path": "../public/img/pages/investments/cryptocurrencies.jpg"
  },
  "/img/pages/investments/diversified-portfolio.jpg": {
    "type": "image/jpeg",
    "etag": "\"6f62-Wio5zYVcw87pGvQIiiCHvm9k+jk\"",
    "mtime": "2026-02-25T21:50:27.664Z",
    "size": 28514,
    "path": "../public/img/pages/investments/diversified-portfolio.jpg"
  },
  "/img/pages/investments/expert-analyzing-data.jpg": {
    "type": "image/jpeg",
    "etag": "\"ce31-+hXu/5Q+2S/ooN9AYNTXW1zYC3A\"",
    "mtime": "2026-02-25T21:50:27.664Z",
    "size": 52785,
    "path": "../public/img/pages/investments/expert-analyzing-data.jpg"
  },
  "/img/pages/investments/financial-documents-and-calculator.jpg": {
    "type": "image/jpeg",
    "etag": "\"c9be-Nhs5/v6NRyormbW6cWHAaVm3DN4\"",
    "mtime": "2026-02-25T21:50:27.664Z",
    "size": 51646,
    "path": "../public/img/pages/investments/financial-documents-and-calculator.jpg"
  },
  "/img/pages/investments/financial-stability.jpg": {
    "type": "image/jpeg",
    "etag": "\"2458f-FKT8An16AOuHv/1IjRnpgIuEfyk\"",
    "mtime": "2026-02-25T21:50:27.664Z",
    "size": 148879,
    "path": "../public/img/pages/investments/financial-stability.jpg"
  },
  "/img/pages/investments/forex.jpg": {
    "type": "image/jpeg",
    "etag": "\"58ff-Y1QC3cZ2PyQ2hWAtKCeFVuOlSxU\"",
    "mtime": "2026-02-25T21:50:27.664Z",
    "size": 22783,
    "path": "../public/img/pages/investments/forex.jpg"
  },
  "/img/pages/investments/foreign-currencies.jpg": {
    "type": "image/jpeg",
    "etag": "\"4b5b2-h0g8qMkwSMHiWgqG7JyNMkjjRhc\"",
    "mtime": "2026-02-25T21:50:27.664Z",
    "size": 308658,
    "path": "../public/img/pages/investments/foreign-currencies.jpg"
  },
  "/img/pages/investments/global-stock-market.webp": {
    "type": "image/webp",
    "etag": "\"21ada-kMwFqs1R9pjWLhY32UNm+AzUCjw\"",
    "mtime": "2026-02-25T21:50:27.668Z",
    "size": 137946,
    "path": "../public/img/pages/investments/global-stock-market.webp"
  },
  "/img/pages/investments/grains.jpg": {
    "type": "image/jpeg",
    "etag": "\"13e61-+kY3r/Irw5nwLKlIYPaUNoDhXsU\"",
    "mtime": "2026-02-25T21:50:27.668Z",
    "size": 81505,
    "path": "../public/img/pages/investments/grains.jpg"
  },
  "/img/pages/investments/global-economic-data.jpg": {
    "type": "image/jpeg",
    "etag": "\"10b76-NnKs62bmzSyRNgRNvW8zxPjKf8U\"",
    "mtime": "2026-02-25T21:50:27.668Z",
    "size": 68470,
    "path": "../public/img/pages/investments/global-economic-data.jpg"
  },
  "/img/pages/investments/high-liquidity.jpg": {
    "type": "image/jpeg",
    "etag": "\"c0de-DYkcflvcL/nbPWCw2Y+1L4iH/Zw\"",
    "mtime": "2026-02-25T21:50:27.668Z",
    "size": 49374,
    "path": "../public/img/pages/investments/high-liquidity.jpg"
  },
  "/img/pages/investments/investment-analyst.png": {
    "type": "image/png",
    "etag": "\"17e00-SZ8L+SSOxZ7TpPQjA7G88832ohA\"",
    "mtime": "2026-02-25T21:50:27.668Z",
    "size": 97792,
    "path": "../public/img/pages/investments/investment-analyst.png"
  },
  "/img/pages/investments/leverage-scale.jpg": {
    "type": "image/jpeg",
    "etag": "\"564f-CAWOmGdTwLY0QAlllY4hsZngMT4\"",
    "mtime": "2026-02-25T21:50:27.668Z",
    "size": 22095,
    "path": "../public/img/pages/investments/leverage-scale.jpg"
  },
  "/img/pages/investments/mining-commodity.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c7d1-yIwrouz/MHSJC9FZ39S+skw2Gvk\"",
    "mtime": "2026-02-25T21:50:27.668Z",
    "size": 182225,
    "path": "../public/img/pages/investments/mining-commodity.jpg"
  },
  "/img/pages/investments/secure-transaction.jpg": {
    "type": "image/jpeg",
    "etag": "\"be4e-D60r51acizWay1CjfYcOhI0rhPc\"",
    "mtime": "2026-02-25T21:50:27.668Z",
    "size": 48718,
    "path": "../public/img/pages/investments/secure-transaction.jpg"
  },
  "/img/pages/investments/property-types.jpg": {
    "type": "image/jpeg",
    "etag": "\"35fca-qUpV4CA88l2U1Nheo3Ywi6hhJ9U\"",
    "mtime": "2026-02-25T21:50:27.668Z",
    "size": 221130,
    "path": "../public/img/pages/investments/property-types.jpg"
  },
  "/img/pages/investments/steady-income-flow.jpg": {
    "type": "image/jpeg",
    "etag": "\"369ea-/m52BJttkHAC3uD7T6wE7XjliEE\"",
    "mtime": "2026-02-25T21:50:27.672Z",
    "size": 223722,
    "path": "../public/img/pages/investments/steady-income-flow.jpg"
  },
  "/img/pages/investments/stocks.jpg": {
    "type": "image/jpeg",
    "etag": "\"c205-teNk7iOm46fU9mBULoDxwd0pMdo\"",
    "mtime": "2026-02-25T21:50:27.672Z",
    "size": 49669,
    "path": "../public/img/pages/investments/stocks.jpg"
  },
  "/img/pages/investments/understanding-forex.jpg": {
    "type": "image/jpeg",
    "etag": "\"10463-0zl5uJki64VrcIWgZeRRYqAVAlE\"",
    "mtime": "2026-02-25T21:50:27.672Z",
    "size": 66659,
    "path": "../public/img/pages/investments/understanding-forex.jpg"
  },
  "/img/pages/investments/types-of-stocks.png": {
    "type": "image/png",
    "etag": "\"3e20f-Xljgp3ujIVcVNO/mB6yoz4Aqthg\"",
    "mtime": "2026-02-25T21:50:27.672Z",
    "size": 254479,
    "path": "../public/img/pages/investments/types-of-stocks.png"
  },
  "/img/pages/investments/what-are-stocks.svg": {
    "type": "image/svg+xml",
    "etag": "\"13602-DL0sEmq86UjFP8nT0+seEoQg5B0\"",
    "mtime": "2026-02-25T21:50:27.672Z",
    "size": 79362,
    "path": "../public/img/pages/investments/what-are-stocks.svg"
  },
  "/_nuxt/builds/meta/bdc5c0f0-f905-4830-8b6a-9de498ffe16d.json": {
    "type": "application/json",
    "etag": "\"58-gLD5p+tGo5yQAI1MviuRacIKVEw\"",
    "mtime": "2026-09-04T08:36:42.305Z",
    "size": 88,
    "path": "../public/_nuxt/builds/meta/bdc5c0f0-f905-4830-8b6a-9de498ffe16d.json"
  },
  "/img/pages/investments/what-is-cryptocurrency.png": {
    "type": "image/png",
    "etag": "\"9dcd3-awodgtmBrlETf1CLtnM/5B/mRJ4\"",
    "mtime": "2026-02-25T21:50:27.676Z",
    "size": 646355,
    "path": "../public/img/pages/investments/what-is-cryptocurrency.png"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};
const basename = function(p, extension) {
  const segments = normalizeWindowsPath(p).split("/");
  let lastSegment = "";
  for (let i = segments.length - 1; i >= 0; i--) {
    const val = segments[i];
    if (val) {
      lastSegment = val;
      break;
    }
  }
  return extension && lastSegment.endsWith(extension) ? lastSegment.slice(0, -extension.length) : lastSegment;
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _9wNLeV = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

function getClientIp(event) {
  const forwarded = getRequestHeader(event, "x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0].trim();
    if (isValidIP(ip)) return normalizeIP(ip);
  }
  return null;
}

const _dDwdpL = defineEventHandler(async (event) => {
  const { pathname } = getRequestURL(event);
  if (pathname.startsWith("/_")) return;
  const ip = getClientIp(event);
  if (!ip) return;
  const ban = await prisma.bannedIp.findUnique({ where: { ipAddress: ip } });
  if (ban && (!ban.expiresAt || ban.expiresAt > /* @__PURE__ */ new Date())) {
    throw createError$1({
      statusCode: 403,
      statusMessage: `Your IP address has been banned. Reason: ${ban.reason}`,
      fatal: true
    });
  }
});

function emailVerificationTemplate({
  user,
  url,
  subject
}) {
  const body = `
<section>
  <section>
    Hello, <b>${user.name}</b>
    <p>Thank you for signing up on AssetFusionX. To continue, you have to verify your email address.</p>
  </section>

  <section>
    ${Button({ label: "Verify email", href: url, centered: true })}
  </section>
</section>
`;
  return Layout(body, { subject });
}

function resetPasswordTemplate({
  user,
  url,
  subject
}) {
  const body = `
<section>
  <section>
    Hello, <b>${user.name}</b>
    <p>You have initiated a password reset on your account. Click the button below to continue.</p>
  </section>

  <section>
    ${Button({ label: "Reset password", href: url, centered: true })}
  </section>
</section>
`;
  return Layout(body, { subject });
}

function emailChangeTemplate({
  user,
  url,
  subject
}) {
  const body = `
<section>
  <section>
    Hello, <b>${user.name}</b>
    <p>
      You are trying to change the email associated with your AssetFusionX account. 
    </p>
  </section>

  <section>
    ${Button({ label: "Change email", href: url, centered: true })}
  </section>
</section>
`;
  return Layout(body, { subject });
}

const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "sqlite" }),
  logger: {
    disabled: true
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({
        user,
        /* newEmail, */
        url
        /* token */
      }) => {
        const subject = "Approve email change";
        await sendEmail({
          to: user.email,
          subject,
          html: emailChangeTemplate({ user, url, subject })
        });
      }
    },
    additionalFields: {
      role: {
        type: "string"
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    sendResetPassword: async ({
      user,
      url
      /* token */
    }) => {
      const subject = "Reset your password";
      const { error } = await sendEmail({
        to: user.email,
        subject,
        html: resetPasswordTemplate({ user, url, subject })
      });
      if (error) throw error;
    }
  },
  emailVerification: {
    sendVerificationEmail: async ({
      user,
      url
      /* token */
    }) => {
      const subject = "Verify your email address";
      const { error } = await sendEmail({
        to: user.email,
        subject,
        html: emailVerificationTemplate({ user, url, subject })
      });
      if (error) throw error;
    }
  },
  plugins: [admin()]
});

const _VdxJch = defineEventHandler(async (event) => {
  const requestUrl = getRequestURL(event);
  const isUserRoute = requestUrl.pathname.includes("/user");
  const isAdminRoute = requestUrl.pathname.includes("/admin");
  if (isUserRoute || isAdminRoute) {
    const expectedRoles = isAdminRoute ? ["admin"] : ["admin", "user"];
    const session = await auth.api.getSession(event);
    if (!session) {
      throw createError$1({
        statusCode: 401,
        statusMessage: "You must be logged in to access this resource."
      });
    }
    const role = session.user.role;
    if (!expectedRoles.includes(role)) {
      throw createError$1({
        statusCode: 403,
        statusMessage: "Access denied. You are not authorized to access this page",
        fatal: true
      });
    }
    event.context.user = session.user;
  }
});

const _SxA8c9 = defineEventHandler(() => {});

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

function baseURL() {
	// TODO: support passing event to `useRuntimeConfig`
	return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
	// TODO: support passing event to `useRuntimeConfig`
	return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
	return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
	// TODO: support passing event to `useRuntimeConfig`
	const app = useRuntimeConfig().app;
	const publicBase = app.cdnURL || app.baseURL;
	return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

function getPercentagePeriodicReturn(plan) {
  const divisorMap = {
    daily: 1,
    weekly: 7,
    bi_weekly: 14,
    monthly: 30
  };
  const divisor = divisorMap[plan.profitDistribution];
  const periods = plan.duration / divisor;
  if (periods <= 0) return 0;
  return plan.percentageTotalReturn / periods;
}

async function checkUserKycApproval(userId) {
  const profile = await prisma.profile.findUnique({
    where: { userId }
  });
  if (!profile) {
    return {
      data: null,
      error: {
        statusCode: 400,
        statusMessage: "This action could not be completed because your profile information is incomplete."
      },
      success: false
    };
  }
  if (!profile.kycStatus || profile.kycStatus === "resubmit") {
    return {
      data: null,
      success: false,
      error: {
        statusCode: 400,
        statusMessage: "You must verify your identity to continue. Go to 'profile' > 'KYC' to begin verification."
      }
    };
  }
  if (profile.kycStatus === "pending") {
    return {
      data: null,
      success: false,
      error: {
        statusCode: 400,
        statusMessage: "Your KYC verification is still pending. Please try again later. "
      }
    };
  }
  if (profile.kycStatus === "rejected") {
    return {
      data: null,
      success: false,
      error: {
        statusCode: 400,
        statusMessage: "Your KYC verification has been rejected. Please, contact the admin."
      }
    };
  }
  return {
    success: true,
    data: profile,
    error: null
  };
}
async function checkBusinessProfileApproval(accountId) {
  const businessProfile = await prisma.businessProfile.findUnique({
    where: { financialAccountId: accountId }
  });
  if (!businessProfile) {
    return {
      success: false,
      data: null,
      error: {
        statusCode: 400,
        statusMessage: "This action could not be completed because your business profile information is incomplete."
      }
    };
  }
  if (!businessProfile.approved) {
    return {
      success: false,
      data: null,
      error: {
        statusCode: 400,
        statusMessage: "Your business profile has not yet been approved. Please, try again later."
      }
    };
  }
  return {
    success: true,
    data: businessProfile,
    error: null
  };
}

function getPrefix(accountType, ownership) {
  const typeMap = {
    personal: "1",
    business: "2"
  };
  const ownershipMap = {
    single: "3",
    joint: "4"
  };
  return typeMap[accountType] + ownershipMap[ownership];
}
function generateSecureRandomDigits(length) {
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  return Array.from(randomValues).map((n) => (n % 10).toString()).join("");
}
function generateAccountNumber(accountType, ownership, totalLength = 10) {
  const prefix = getPrefix(accountType, ownership);
  const randomLength = totalLength - prefix.length;
  const randomPart = generateSecureRandomDigits(randomLength);
  return prefix + randomPart;
}

async function saveFile(options) {
  const { id, base64Data, extension, outputDir } = options;
  const base64 = base64Data.replace(/^data:.*;base64,/, "");
  const buffer = Buffer.from(base64, "base64");
  const filename = `${id}-${Date.now()}.${extension}`;
  const filepath = resolve$1(join(outputDir, filename));
  try {
    await mkdir(resolve$1(outputDir), { recursive: true });
    await writeFile$1(filepath, buffer);
    let urlPath = outputDir;
    if (urlPath.startsWith("public/")) {
      urlPath = urlPath.slice("public/".length);
    } else if (urlPath === "public") {
      urlPath = "";
    }
    urlPath = urlPath.replace(/^\/+/, "");
    const documentUrl = `${process.env.BASE_URL}/${urlPath ? urlPath + "/" : ""}${filename}`;
    return {
      data: { path: filepath, name: filename, url: documentUrl },
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: normalizeException(error)
    };
  }
}
async function removeFileByUrl(url) {
  try {
    const baseUrl = process.env.BASE_URL || "";
    const relativePath = url.replace(baseUrl, "").replace(/^\/+/, "");
    const fullPath = resolve$1("public", relativePath);
    await unlink$1(fullPath);
    return {
      success: true,
      error: null
    };
  } catch (error) {
    return {
      success: false,
      error: normalizeException(error)
    };
  }
}

function getRequestParam(event, name, force) {
  const param = getRouterParam(event, name);
  if (!param) {
    throw createError$1({
      statusCode: 400,
      statusMessage: `Missing required param: ${name}`
    });
  }
  return param;
}

const COINLAYER_API = process.env.COINLAYER_API;
const COINLAYER_API_KEY = process.env.COINLAYER_API_KEY;
async function getUpdatedCurrencyData(currency) {
  if (!currency.automaticallyUpdateRate) {
    return currency;
  }
  const ONE_DAY_AGO = (/* @__PURE__ */ new Date()).getTime() - 24 * 60 * 60 * 1e3;
  const updatedAt = currency.rateUpdatedAt ? new Date(currency.rateUpdatedAt).getTime() : null;
  if (!updatedAt || updatedAt < ONE_DAY_AGO) {
    try {
      const uri = `${COINLAYER_API}/live?access_key=${COINLAYER_API_KEY}&target=USD&symbols=${currency.symbol.toUpperCase()}`;
      const response = await axios.get(uri);
      const data = response.data;
      if (!data.error) {
        const coinbaseRate = data.rates[currency.symbol.toUpperCase()];
        if (coinbaseRate) {
          const updatedCurrency = await prisma.currency.update({
            where: { id: currency.id },
            data: {
              rate: coinbaseRate,
              rateUpdatedAt: /* @__PURE__ */ new Date()
            }
          });
          return updatedCurrency;
        }
        return currency;
      }
      return currency;
    } catch (error) {
      console.error(
        `Failed to retrieve new rate for ${currency.name} from Coinbase`,
        error
      );
      return currency;
    }
  } else {
    return currency;
  }
}

async function getJointAccountModApprovals(financialAccountId, creatorId, tx) {
  const client = tx != null ? tx : prisma;
  const accountUsers = await client.accountUser.findMany({
    where: {
      financialAccountId
    },
    include: {
      user: {
        select: {
          id: true
        }
      }
    }
  });
  return accountUsers.map((accountUser) => {
    const { user } = accountUser;
    return {
      approverId: user.id,
      status: !!accountUser.autosign || user.id === creatorId ? "accepted" : "pending"
    };
  });
}

async function terminateInvestment(investmentId, options) {
  options = options != null ? options : {
    applyTerminationFee: true,
    terminatedReason: null
  };
  const investment = await prisma.investment.findUnique({
    where: {
      id: investmentId
    },
    include: {
      financialAccount: true,
      investor: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      }
    }
  });
  if (!investment) {
    throw createError$1({
      statusCode: 404,
      statusMessage: "Investment not found"
    });
  }
  if (investment.status === "terminated" || investment.status === "closed") {
    throw createError$1({
      statusCode: 400,
      statusMessage: `Investment already ${investment.status}`
    });
  }
  const terminationFee = round(
    options.applyTerminationFee ? investment.terminationFee : 0
  );
  const updatedBalance = round(investment.financialAccount.balance) + round(investment.totalProfit) - terminationFee;
  if (updatedBalance < 0) {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Insufficient funds to terminate investment"
    });
  }
  const investmentUpdates = {
    status: "terminated",
    terminatedReason: options.terminatedReason,
    terminatedAt: /* @__PURE__ */ new Date(),
    pausedAt: null,
    pausedReason: null,
    closedAt: null,
    closedReason: null
  };
  await prisma.$transaction([
    prisma.investment.update({
      where: { id: investment.id },
      data: investmentUpdates
    }),
    prisma.financialAccount.update({
      where: {
        id: investment.financialAccountId
      },
      data: {
        balance: updatedBalance
      }
    }),
    prisma.transaction.createMany({
      data: [
        {
          amount: terminationFee,
          USDAmount: terminationFee,
          rate: 1,
          charges: 0,
          financialAccountId: investment.financialAccountId,
          type: "withdrawal",
          investmentId: investment.id,
          status: "successfull",
          approvedAt: /* @__PURE__ */ new Date(),
          description: `Termination fee for investment with ID: ${investment.id}, Name: ${investment.investmentName}, and Category: (${investment.category})`
        },
        {
          amount: investment.totalProfit,
          USDAmount: investment.totalProfit,
          rate: 1,
          charges: 0,
          financialAccountId: investment.financialAccountId,
          type: "investment",
          investmentId: investment.id,
          status: "successfull",
          approvedAt: /* @__PURE__ */ new Date(),
          description: `Total profit for investment with ID: ${investment.id}, Name: ${investment.investmentName}, and Category: (${investment.category}) after termination`
        }
      ]
    }),
    prisma.notification.createMany({
      data: [
        {
          title: "Investment Termination Fee",
          body: `A termination fee of $${terminationFee.toLocaleString()} has been deducted from your account for the investment with ID: ${investment.id}, Name: ${investment.investmentName}, and Category: (${investment.category})`,
          userId: investment.investor.user.id,
          financialAccountId: investment.financialAccountId
        },
        {
          title: "Investment Profit",
          body: `The total profit of $${investment.totalProfit.toLocaleString()} has been added to your account for the investment with ID: ${investment.id}, Name: ${investment.investmentName}, and Category: (${investment.category}) after termination`,
          userId: investment.investor.user.id,
          financialAccountId: investment.financialAccountId
        }
      ]
    })
  ]);
  notificationEmitter.emit("investment-status:update", {
    user: investment.investor.user,
    data: {
      investment: { ...investment, ...investmentUpdates },
      account: investment.financialAccount
    }
  });
}

const reverseTransaction = async (financialAccountId, transactionId, status, failReason) => {
  const transaction = await prisma.transaction.findUniqueOrThrow({
    where: {
      id: transactionId,
      type: "withdrawal"
    }
  });
  const refundAmount = transaction.USDAmount + transaction.charges;
  const failedAt = /* @__PURE__ */ new Date() ;
  const reason = failReason ;
  await prisma.$transaction([
    prisma.financialAccount.update({
      where: {
        id: financialAccountId
      },
      data: {
        balance: {
          increment: refundAmount
        }
      }
    }),
    prisma.transaction.update({
      where: {
        id: transaction.id
      },
      data: {
        status,
        failedAt,
        failReason: reason
      }
    })
  ]);
};

async function saveUserImage(userId, base64Image, outputDir = resolve$2("public/uploads/img/users")) {
  const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return { data: null, error: new Error("Invalid base64 string") };
  }
  const mimeType = matches[1];
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, "base64");
  const extension = mimeType.split("/")[1];
  const filename = `${userId}-${Date.now()}.${extension}`;
  const filepath = join$1(outputDir, filename);
  try {
    await mkdir(outputDir, { recursive: true });
    await writeFile$1(filepath, buffer);
    const imageUrl = `${process.env.BASE_URL}/uploads/img/users/${filename}`;
    return {
      data: {
        filepath,
        filename,
        imageUrl
      },
      error: null
    };
  } catch (error) {
    return { data: null, error: normalizeException(error) };
  }
}
async function removeUserImage(imageUrl, outputDir = resolve$2("public/uploads/img/users")) {
  try {
    const filename = imageUrl.split("/").pop();
    if (!filename) {
      throw new Error("Invalid image URL: No filename found.");
    }
    const filePath = join$1(outputDir, filename);
    await rm(filePath, { force: true });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: normalizeException(error) };
  }
}

const collections = {
  'lucide': () => import('./icons.mjs').then(m => m.default),
};

const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _YA24Or = defineCachedEventHandler(async (event) => {
  const url = getRequestURL(event);
  if (!url)
    return createError$1({ status: 400, message: "Invalid icon request" });
  const options = useAppConfig().icon;
  const collectionName = event.context.params?.collection?.replace(/\.json$/, "");
  const collection = collectionName ? await collections[collectionName]?.() : null;
  const apiEndPoint = options.iconifyApiEndpoint || DEFAULT_ENDPOINT;
  const icons = url.searchParams.get("icons")?.split(",");
  if (collection) {
    if (icons?.length) {
      const data = getIcons(
        collection,
        icons
      );
      consola.debug(`[Icon] serving ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from bundled collection`);
      return data;
    }
  }
  if (options.fallbackToApi === true || options.fallbackToApi === "server-only") {
    const apiUrl = new URL("./" + basename(url.pathname) + url.search, apiEndPoint);
    consola.debug(`[Icon] fetching ${(icons || []).map((i) => "`" + collectionName + ":" + i + "`").join(",")} from iconify api`);
    if (apiUrl.host !== new URL(apiEndPoint).host) {
      return createError$1({ status: 400, message: "Invalid icon request" });
    }
    try {
      const data = await $fetch(apiUrl.href);
      return data;
    } catch (e) {
      consola.error(e);
      if (e.status === 404)
        return createError$1({ status: 404 });
      else
        return createError$1({ status: 500, message: "Failed to fetch fallback icon" });
    }
  }
  return createError$1({ status: 404 });
}, {
  group: "nuxt",
  name: "icon",
  getKey(event) {
    const collection = event.context.params?.collection?.replace(/\.json$/, "") || "unknown";
    const icons = String(getQuery(event).icons || "");
    return `${collection}_${icons.split(",")[0]}_${icons.length}_${hash$1(icons)}`;
  },
  swr: true,
  maxAge: 60 * 60 * 24 * 7
  // 1 week
});

const _lazy_SUUt7U = () => import('../routes/api/admin/banned-ips/_banId_.delete.mjs');
const _lazy_qEDUlM = () => import('../routes/api/admin/index.get.mjs');
const _lazy_OsYh7h = () => import('../routes/api/admin/index.post.mjs');
const _lazy_ZdPdJY = () => import('../routes/api/admin/business-profiles/_profileId_.put.mjs');
const _lazy_fdFb5o = () => import('../routes/api/admin/index.get2.mjs');
const _lazy_d5q4hi = () => import('../routes/api/admin/currencies/_currencyId_.delete.mjs');
const _lazy_paEEft = () => import('../routes/api/admin/currencies/_currencyId_.put.mjs');
const _lazy_InOT_k = () => import('../routes/api/admin/index.post2.mjs');
const _lazy_WYVr5W = () => import('../routes/api/admin/financial-accounts/_accountId_.delete.mjs');
const _lazy_3fFKOJ = () => import('../routes/api/admin/financial-accounts/_accountId_.put.mjs');
const _lazy_3kAR5r = () => import('../routes/api/admin/index.get3.mjs');
const _lazy_OnxOlC = () => import('../routes/api/admin/investment-plans/_investmentPlanId_.delete.mjs');
const _lazy_1DYDXF = () => import('../routes/api/admin/investment-plans/_investmentPlanId_.put.mjs');
const _lazy_ZjbJMe = () => import('../routes/api/admin/index.post3.mjs');
const _lazy_XrXqEU = () => import('../routes/api/admin/investments/index.delete.mjs');
const _lazy_uvytbZ = () => import('../routes/api/admin/investments/index.get.mjs');
const _lazy_SlP3C1 = () => import('../routes/api/admin/investments/index.put.mjs');
const _lazy_46XXNn = () => import('../routes/api/admin/index.get4.mjs');
const _lazy_9TIumU = () => import('../routes/api/admin/kyc-data/_profileId_.put.mjs');
const _lazy_0fYNkC = () => import('../routes/api/admin/index.get5.mjs');
const _lazy_ENw3Gm = () => import('../routes/api/admin/overview.mjs');
const _lazy_0VodJQ = () => import('../routes/api/admin/profits/_profitId_.put.mjs');
const _lazy_MwEcGn = () => import('../routes/api/admin/index.put.mjs');
const _lazy_JfMcQL = () => import('../routes/api/admin/transactions/_transactionId_.put.mjs');
const _lazy_jHn4Pw = () => import('../routes/api/admin/index.get6.mjs');
const _lazy_Bfu1cz = () => import('../routes/api/admin/users/_userId/ban.post.mjs');
const _lazy_dxKZ7R = () => import('../routes/api/admin/users/_userId/unban.post.mjs');
const _lazy_LGZQ_S = () => import('../routes/api/auth/_...all_.mjs');
const _lazy_mswi67 = () => import('../routes/api/index.get.mjs');
const _lazy_jC14Zp = () => import('../routes/api/index.get2.mjs');
const _lazy_u_aiw0 = () => import('../routes/api/mail.post.mjs');
const _lazy_Io2kkk = () => import('../routes/api/index.get3.mjs');
const _lazy_MGlcFw = () => import('../routes/api/user/financial-accounts/_accountId/account-user/_accountUserId_.delete.mjs');
const _lazy_bJ_CLx = () => import('../routes/api/user/financial-accounts/_accountId/account-users.get.mjs');
const _lazy_3d_huc = () => import('../routes/api/user/financial-accounts/_accountId/business-profile.get.mjs');
const _lazy_5rNaXD = () => import('../routes/api/user/financial-accounts/_accountId/business-profile.put.mjs');
const _lazy_muBMmi = () => import('../routes/api/user/financial-accounts/index.get.mjs');
const _lazy_AtFf2f = () => import('../routes/api/user/financial-accounts/index.put.mjs');
const _lazy_SO2QTS = () => import('../routes/api/user/financial-accounts/_accountId/investments/index.get.mjs');
const _lazy_Hawpv2 = () => import('../routes/api/user/financial-accounts/_accountId/investments/_investmentId/profits.get.mjs');
const _lazy_8cgOAI = () => import('../routes/api/user/financial-accounts/_accountId/investments/_investmentId/terminate.put.mjs');
const _lazy_NOXAoH = () => import('../routes/api/user/financial-accounts/_accountId/index.get.mjs');
const _lazy_SMXuHB = () => import('../routes/api/user/financial-accounts/_accountId/index.post.mjs');
const _lazy__VbdPb = () => import('../routes/api/user/financial-accounts/_accountId/join-requests.get.mjs');
const _lazy_2fa64W = () => import('../routes/api/user/financial-accounts/_accountId/join-requests.post.mjs');
const _lazy_4imzGx = () => import('../routes/api/user/financial-accounts/_accountId/mod-requests/_modRequestId_.put.mjs');
const _lazy_IzqFN4 = () => import('../routes/api/user/financial-accounts/_accountId/index.get2.mjs');
const _lazy_0gDHOE = () => import('../routes/api/user/financial-accounts/_accountId/notifications.get.mjs');
const _lazy_DZUBTv = () => import('../routes/api/user/financial-accounts/_accountId/transactions/_transactionId_.get.mjs');
const _lazy_IPYXPs = () => import('../routes/api/user/financial-accounts/_accountId/index.get3.mjs');
const _lazy_MsAo5O = () => import('../routes/api/user/index.get.mjs');
const _lazy_9XzCyq = () => import('../routes/api/user/index.post.mjs');
const _lazy_15QHm1 = () => import('../routes/api/index.put.mjs');
const _lazy_BNFrWr = () => import('../routes/api/user/join-requests/_requestId/accept.post.mjs');
const _lazy_K8zEkd = () => import('../routes/api/user/join-requests/index.delete.mjs');
const _lazy_IJdasN = () => import('../routes/api/user/join-requests/_requestId/send-reminder.post.mjs');
const _lazy_cJ5Gug = () => import('../routes/api/user/index.get2.mjs');
const _lazy_dsaPbg = () => import('../routes/api/user/notifications/_notificationId_.delete.mjs');
const _lazy_uQRAWe = () => import('../routes/api/user/index.get3.mjs');
const _lazy_bfF9aT = () => import('../routes/api/user/index.patch.mjs');
const _lazy_Pch6Hi = () => import('../routes/api/user/index.put.mjs');
const _lazy_Nun35y = () => import('../routes/api/user/notifications/unread/check.get.mjs');
const _lazy_GT9gb5 = () => import('../routes/api/user/notifications/unread/count.get.mjs');
const _lazy_o1BYit = () => import('../routes/api/user/pages/dashboard.get.mjs');
const _lazy_qa0pAl = () => import('../routes/api/user/index.get4.mjs');
const _lazy_fuUL38 = () => import('../routes/api/user/index.put2.mjs');
const _lazy_KS_l4z = () => import('../routes/api/user/profile/kyc.put.mjs');
const _lazy_0ls6Vd = () => import('../routes/api/user/transactions/deposit.post.mjs');
const _lazy_jGrieF = () => import('../routes/api/user/transactions/init-deposit.get.mjs');
const _lazy_jyhyon = () => import('../routes/api/user/transactions/init-withdrawal.get.mjs');
const _lazy_GaQxzK = () => import('../routes/api/user/transactions/withdrawal.post.mjs');
const _lazy_JmA1E2 = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _9wNLeV, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _dDwdpL, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _VdxJch, lazy: false, middleware: true, method: undefined },
  { route: '/api/admin/banned-ips/:banId', handler: _lazy_SUUt7U, lazy: true, middleware: false, method: "delete" },
  { route: '/api/admin/banned-ips', handler: _lazy_qEDUlM, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/banned-ips', handler: _lazy_OsYh7h, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/business-profiles/:profileId', handler: _lazy_ZdPdJY, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/business-profiles', handler: _lazy_fdFb5o, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/currencies/:currencyId', handler: _lazy_d5q4hi, lazy: true, middleware: false, method: "delete" },
  { route: '/api/admin/currencies/:currencyId', handler: _lazy_paEEft, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/currencies', handler: _lazy_InOT_k, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/financial-accounts/:accountId', handler: _lazy_WYVr5W, lazy: true, middleware: false, method: "delete" },
  { route: '/api/admin/financial-accounts/:accountId', handler: _lazy_3fFKOJ, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/financial-accounts', handler: _lazy_3kAR5r, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/investment-plans/:investmentPlanId', handler: _lazy_OnxOlC, lazy: true, middleware: false, method: "delete" },
  { route: '/api/admin/investment-plans/:investmentPlanId', handler: _lazy_1DYDXF, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/investment-plans', handler: _lazy_ZjbJMe, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/investments/:investmentId', handler: _lazy_XrXqEU, lazy: true, middleware: false, method: "delete" },
  { route: '/api/admin/investments/:investmentId', handler: _lazy_uvytbZ, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/investments/:investmentId', handler: _lazy_SlP3C1, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/investments', handler: _lazy_46XXNn, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/kyc-data/:profileId', handler: _lazy_9TIumU, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/kyc-data', handler: _lazy_0fYNkC, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/overview', handler: _lazy_ENw3Gm, lazy: true, middleware: false, method: undefined },
  { route: '/api/admin/profits/:profitId', handler: _lazy_0VodJQ, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/settings', handler: _lazy_MwEcGn, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/transactions/:transactionId', handler: _lazy_JfMcQL, lazy: true, middleware: false, method: "put" },
  { route: '/api/admin/transactions', handler: _lazy_jHn4Pw, lazy: true, middleware: false, method: "get" },
  { route: '/api/admin/users/:userId/ban', handler: _lazy_Bfu1cz, lazy: true, middleware: false, method: "post" },
  { route: '/api/admin/users/:userId/unban', handler: _lazy_dxKZ7R, lazy: true, middleware: false, method: "post" },
  { route: '/api/auth/**:all', handler: _lazy_LGZQ_S, lazy: true, middleware: false, method: undefined },
  { route: '/api/currencies', handler: _lazy_mswi67, lazy: true, middleware: false, method: "get" },
  { route: '/api/investment-plans', handler: _lazy_jC14Zp, lazy: true, middleware: false, method: "get" },
  { route: '/api/mail', handler: _lazy_u_aiw0, lazy: true, middleware: false, method: "post" },
  { route: '/api/settings', handler: _lazy_Io2kkk, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/account-user/:accountUserId', handler: _lazy_MGlcFw, lazy: true, middleware: false, method: "delete" },
  { route: '/api/user/financial-accounts/:accountId/account-users', handler: _lazy_bJ_CLx, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/business-profile', handler: _lazy_3d_huc, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/business-profile', handler: _lazy_5rNaXD, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/financial-accounts/:accountId', handler: _lazy_muBMmi, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId', handler: _lazy_AtFf2f, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/financial-accounts/:accountId/investments/:investmentId', handler: _lazy_SO2QTS, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/investments/:investmentId/profits', handler: _lazy_Hawpv2, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/investments/:investmentId/terminate', handler: _lazy_8cgOAI, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/financial-accounts/:accountId/investments', handler: _lazy_NOXAoH, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/investments', handler: _lazy_SMXuHB, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/financial-accounts/:accountId/join-requests', handler: _lazy__VbdPb, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/join-requests', handler: _lazy_2fa64W, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/financial-accounts/:accountId/mod-requests/:modRequestId', handler: _lazy_4imzGx, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/financial-accounts/:accountId/mod-requests', handler: _lazy_IzqFN4, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/notifications', handler: _lazy_0gDHOE, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/transactions/:transactionId', handler: _lazy_DZUBTv, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/transactions', handler: _lazy_IPYXPs, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts', handler: _lazy_MsAo5O, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts', handler: _lazy_9XzCyq, lazy: true, middleware: false, method: "post" },
  { route: '/api/user', handler: _lazy_15QHm1, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/join-requests/:requestId/accept', handler: _lazy_BNFrWr, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/join-requests/:requestId', handler: _lazy_K8zEkd, lazy: true, middleware: false, method: "delete" },
  { route: '/api/user/join-requests/:requestId/send-reminder', handler: _lazy_IJdasN, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/join-requests', handler: _lazy_cJ5Gug, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/notifications/:notificationId', handler: _lazy_dsaPbg, lazy: true, middleware: false, method: "delete" },
  { route: '/api/user/notifications', handler: _lazy_uQRAWe, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/notifications', handler: _lazy_bfF9aT, lazy: true, middleware: false, method: "patch" },
  { route: '/api/user/notifications', handler: _lazy_Pch6Hi, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/notifications/unread/check', handler: _lazy_Nun35y, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/notifications/unread/count', handler: _lazy_GT9gb5, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/pages/dashboard', handler: _lazy_o1BYit, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/profile', handler: _lazy_qa0pAl, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/profile', handler: _lazy_fuUL38, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/profile/kyc', handler: _lazy_KS_l4z, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/transactions/deposit', handler: _lazy_0ls6Vd, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/transactions/init-deposit', handler: _lazy_jGrieF, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/transactions/init-withdrawal', handler: _lazy_jyhyon, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/transactions/withdrawal', handler: _lazy_GaQxzK, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_JmA1E2, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _YA24Or, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_JmA1E2, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return C(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    debug("received shut down signal", signal);
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      debug("server shut down error occurred", error);
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    debug("Destroy Connections : " + (force ? "forced close" : "close"));
    let counter = 0;
    let secureCounter = 0;
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        counter++;
        destroy(socket);
      }
    }
    debug("Connections destroyed : " + counter);
    debug("Connection Counter    : " + connectionCounter);
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        secureCounter++;
        destroy(socket);
      }
    }
    debug("Secure Connections destroyed : " + secureCounter);
    debug("Secure Connection Counter    : " + secureConnectionCounter);
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
    debug("closed");
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      debug("Close http server");
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    debug("shutdown signal - " + sig);
    if (options.development) {
      debug("DEV-Mode - immediate forceful shutdown");
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          debug("executing finally()");
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      debug(`waitForReadyToShutDown... ${totalNumInterval}`);
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        debug("All connections closed. Continue to shutting down");
        return Promise.resolve(false);
      }
      debug("Schedule the next waitForReadyToShutdown");
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    debug("shutting down");
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      debug("Do onShutdown now");
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      debug(errString);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

export { encodePath as $, saveUserImage as A, Button as B, eventHandler as C, setResponseStatus as D, getUpdatedCurrencyData as E, checkBusinessProfileApproval as F, getJointAccountModApprovals as G, buildAssetsURL as H, getResponseStatusText as I, getResponseStatus as J, defineRenderHandler as K, Layout as L, publicAssetsURL as M, getQuery as N, getRouteRules as O, joinURL as P, serialize$1 as Q, defu as R, isEqual as S, klona as T, hasProtocol as U, isScriptProtocol as V, defuFn as W, parseQuery as X, withQuery as Y, sanitizeStatusCode as Z, parseURL as _, trapUnhandledNodeErrors as a, decodePath as a0, getContext as a1, withTrailingSlash as a2, withoutTrailingSlash as a3, $fetch$1 as a4, baseURL as a5, createHooks as a6, executeAsync as a7, normalizeException as a8, upperFirst as a9, hash$1 as aa, getRequestHeaders as ab, getPercentagePeriodicReturn as ac, useNitroApp as b, defineEventHandler as c, destr as d, createError$1 as e, getValidatedQuery as f, getRouterParams as g, terminateInvestment as h, auth as i, toWebRequest as j, sendEmail as k, getRequestParam as l, getRouterParam as m, notificationEmitter as n, removeFileByUrl as o, prisma as p, saveFile as q, readValidatedBody as r, setupGracefulShutdown as s, toNodeListener as t, useRuntimeConfig as u, checkUserKycApproval as v, round as w, reverseTransaction as x, generateAccountNumber as y, removeUserImage as z };
//# sourceMappingURL=nitro.mjs.map
