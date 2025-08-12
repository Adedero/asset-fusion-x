import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import * as path$1 from 'node:path';
import { resolve as resolve$1, dirname as dirname$1, join } from 'node:path';
import { unlink as unlink$1, mkdir, writeFile as writeFile$1 } from 'fs/promises';
import axios from 'axios';
import { resolve as resolve$2, join as join$1 } from 'path';
import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { EventEmitter } from 'node:events';
import { Buffer as Buffer$1 } from 'node:buffer';
import { promises, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import * as process$1 from 'node:process';
import * as runtime from '@prisma/client/runtime/library';
import { admin } from 'better-auth/plugins';
import nodemailer from 'nodemailer';
import { getIcons } from '@iconify/utils';
import { consola } from 'consola';
import { ipxFSStorage, ipxHttpStorage, createIPX, createIPXH3Handler } from 'ipx';

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
function encodeParam(text) {
  return encodePath(text).replace(SLASH_RE, "%2F");
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
    return input;
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

function o(n){throw new Error(`${n} is not implemented yet!`)}let i$1 = class i extends EventEmitter{__unenv__={};readableEncoding=null;readableEnded=true;readableFlowing=false;readableHighWaterMark=0;readableLength=0;readableObjectMode=false;readableAborted=false;readableDidRead=false;closed=false;errored=null;readable=false;destroyed=false;static from(e,t){return new i(t)}constructor(e){super();}_read(e){}read(e){}setEncoding(e){return this}pause(){return this}resume(){return this}isPaused(){return  true}unpipe(e){return this}unshift(e,t){}wrap(e){return this}push(e,t){return  false}_destroy(e,t){this.removeAllListeners();}destroy(e){return this.destroyed=true,this._destroy(e),this}pipe(e,t){return {}}compose(e,t){throw new Error("Method not implemented.")}[Symbol.asyncDispose](){return this.destroy(),Promise.resolve()}async*[Symbol.asyncIterator](){throw o("Readable.asyncIterator")}iterator(e){throw o("Readable.iterator")}map(e,t){throw o("Readable.map")}filter(e,t){throw o("Readable.filter")}forEach(e,t){throw o("Readable.forEach")}reduce(e,t,r){throw o("Readable.reduce")}find(e,t){throw o("Readable.find")}findIndex(e,t){throw o("Readable.findIndex")}some(e,t){throw o("Readable.some")}toArray(e){throw o("Readable.toArray")}every(e,t){throw o("Readable.every")}flatMap(e,t){throw o("Readable.flatMap")}drop(e,t){throw o("Readable.drop")}take(e,t){throw o("Readable.take")}asIndexedPairs(e){throw o("Readable.asIndexedPairs")}};let l$1 = class l extends EventEmitter{__unenv__={};writable=true;writableEnded=false;writableFinished=false;writableHighWaterMark=0;writableLength=0;writableObjectMode=false;writableCorked=0;closed=false;errored=null;writableNeedDrain=false;writableAborted=false;destroyed=false;_data;_encoding="utf8";constructor(e){super();}pipe(e,t){return {}}_write(e,t,r){if(this.writableEnded){r&&r();return}if(this._data===void 0)this._data=e;else {const s=typeof this._data=="string"?Buffer$1.from(this._data,this._encoding||t||"utf8"):this._data,a=typeof e=="string"?Buffer$1.from(e,t||this._encoding||"utf8"):e;this._data=Buffer$1.concat([s,a]);}this._encoding=t,r&&r();}_writev(e,t){}_destroy(e,t){}_final(e){}write(e,t,r){const s=typeof t=="string"?this._encoding:"utf8",a=typeof t=="function"?t:typeof r=="function"?r:void 0;return this._write(e,s,a),true}setDefaultEncoding(e){return this}end(e,t,r){const s=typeof e=="function"?e:typeof t=="function"?t:typeof r=="function"?r:void 0;if(this.writableEnded)return s&&s(),this;const a=e===s?void 0:e;if(a){const u=t===s?void 0:t;this.write(a,u,s);}return this.writableEnded=true,this.writableFinished=true,this.emit("close"),this.emit("finish"),this}cork(){}uncork(){}destroy(e){return this.destroyed=true,delete this._data,this.removeAllListeners(),this}compose(e,t){throw new Error("Method not implemented.")}};const c$1=class c{allowHalfOpen=true;_destroy;constructor(e=new i$1,t=new l$1){Object.assign(this,e),Object.assign(this,t),this._destroy=g(e._destroy,t._destroy);}};function _(){return Object.assign(c$1.prototype,i$1.prototype),Object.assign(c$1.prototype,l$1.prototype),c$1}function g(...n){return function(...e){for(const t of n)t(...e);}}const m=_();class A extends m{__unenv__={};bufferSize=0;bytesRead=0;bytesWritten=0;connecting=false;destroyed=false;pending=false;localAddress="";localPort=0;remoteAddress="";remoteFamily="";remotePort=0;autoSelectFamilyAttemptedAddresses=[];readyState="readOnly";constructor(e){super();}write(e,t,r){return  false}connect(e,t,r){return this}end(e,t,r){return this}setEncoding(e){return this}pause(){return this}resume(){return this}setTimeout(e,t){return this}setNoDelay(e){return this}setKeepAlive(e,t){return this}address(){return {}}unref(){return this}ref(){return this}destroySoon(){this.destroy();}resetAndDestroy(){const e=new Error("ERR_SOCKET_CLOSED");return e.code="ERR_SOCKET_CLOSED",this.destroy(e),this}}class y extends i$1{aborted=false;httpVersion="1.1";httpVersionMajor=1;httpVersionMinor=1;complete=true;connection;socket;headers={};trailers={};method="GET";url="/";statusCode=200;statusMessage="";closed=false;errored=null;readable=false;constructor(e){super(),this.socket=this.connection=e||new A;}get rawHeaders(){const e=this.headers,t=[];for(const r in e)if(Array.isArray(e[r]))for(const s of e[r])t.push(r,s);else t.push(r,e[r]);return t}get rawTrailers(){return []}setTimeout(e,t){return this}get headersDistinct(){return p(this.headers)}get trailersDistinct(){return p(this.trailers)}}function p(n){const e={};for(const[t,r]of Object.entries(n))t&&(e[t]=(Array.isArray(r)?r:[r]).filter(Boolean));return e}class w extends l$1{statusCode=200;statusMessage="";upgrading=false;chunkedEncoding=false;shouldKeepAlive=false;useChunkedEncodingByDefault=false;sendDate=false;finished=false;headersSent=false;strictContentLength=false;connection=null;socket=null;req;_headers={};constructor(e){super(),this.req=e;}assignSocket(e){e._httpMessage=this,this.socket=e,this.connection=e,this.emit("socket",e),this._flush();}_flush(){this.flushHeaders();}detachSocket(e){}writeContinue(e){}writeHead(e,t,r){e&&(this.statusCode=e),typeof t=="string"&&(this.statusMessage=t,t=void 0);const s=r||t;if(s&&!Array.isArray(s))for(const a in s)this.setHeader(a,s[a]);return this.headersSent=true,this}writeProcessing(){}setTimeout(e,t){return this}appendHeader(e,t){e=e.toLowerCase();const r=this._headers[e],s=[...Array.isArray(r)?r:[r],...Array.isArray(t)?t:[t]].filter(Boolean);return this._headers[e]=s.length>1?s:s[0],this}setHeader(e,t){return this._headers[e.toLowerCase()]=t,this}setHeaders(e){for(const[t,r]of Object.entries(e))this.setHeader(t,r);return this}getHeader(e){return this._headers[e.toLowerCase()]}getHeaders(){return this._headers}getHeaderNames(){return Object.keys(this._headers)}hasHeader(e){return e.toLowerCase()in this._headers}removeHeader(e){delete this._headers[e.toLowerCase()];}addTrailers(e){}flushHeaders(){}writeEarlyHints(e,t){typeof t=="function"&&t();}}const E=(()=>{const n=function(){};return n.prototype=Object.create(null),n})();function R(n={}){const e=new E,t=Array.isArray(n)||H(n)?n:Object.entries(n);for(const[r,s]of t)if(s){if(e[r]===void 0){e[r]=s;continue}e[r]=[...Array.isArray(e[r])?e[r]:[e[r]],...Array.isArray(s)?s:[s]];}return e}function H(n){return typeof n?.entries=="function"}function v(n={}){if(n instanceof Headers)return n;const e=new Headers;for(const[t,r]of Object.entries(n))if(r!==void 0){if(Array.isArray(r)){for(const s of r)e.append(t,String(s));continue}e.set(t,String(r));}return e}const S=new Set([101,204,205,304]);async function b(n,e){const t=new y,r=new w(t);t.url=e.url?.toString()||"/";let s;if(!t.url.startsWith("/")){const d=new URL(t.url);s=d.host,t.url=d.pathname+d.search+d.hash;}t.method=e.method||"GET",t.headers=R(e.headers||{}),t.headers.host||(t.headers.host=e.host||s||"localhost"),t.connection.encrypted=t.connection.encrypted||e.protocol==="https",t.body=e.body||null,t.__unenv__=e.context,await n(t,r);let a=r._data;(S.has(r.statusCode)||t.method.toUpperCase()==="HEAD")&&(a=null,delete r._headers["content-length"]);const u={status:r.statusCode,statusText:r.statusMessage,headers:r._headers,body:a};return t.destroy(),r.destroy(),u}async function C(n,e,t={}){try{const r=await b(n,{url:e,...t});return new Response(r.body,{status:r.status,statusText:r.statusText,headers:v(r.headers)})}catch(r){return new Response(r.toString(),{status:Number.parseInt(r.statusCode||r.code)||500,statusText:r.statusText})}}

function useBase(base, handler) {
  base = withoutTrailingSlash(base);
  if (!base || base === "/") {
    return handler;
  }
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _path = event._path || event.node.req.url || "/";
    event._path = withoutBase(event.path || "/", base);
    event.node.req.url = event._path;
    try {
      return await handler(event);
    } finally {
      event._path = event.node.req.url = _path;
    }
  });
}

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
    const xForwardedHost = event.node.req.headers["x-forwarded-host"];
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
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
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
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
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
const fetch$1 = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s$1;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch({ fetch: fetch$1, Headers: Headers$1, AbortController });
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

const inlineAppConfig = {
  "ui": {
    "colors": {
      "primary": "azure",
      "secondary": "blue",
      "success": "green",
      "info": "blue",
      "warning": "yellow",
      "error": "red",
      "neutral": "slate"
    },
    "icons": {
      "arrowLeft": "i-lucide-arrow-left",
      "arrowRight": "i-lucide-arrow-right",
      "check": "i-lucide-check",
      "chevronDoubleLeft": "i-lucide-chevrons-left",
      "chevronDoubleRight": "i-lucide-chevrons-right",
      "chevronDown": "i-lucide-chevron-down",
      "chevronLeft": "i-lucide-chevron-left",
      "chevronRight": "i-lucide-chevron-right",
      "chevronUp": "i-lucide-chevron-up",
      "close": "i-lucide-x",
      "ellipsis": "i-lucide-ellipsis",
      "external": "i-lucide-arrow-up-right",
      "folder": "i-lucide-folder",
      "folderOpen": "i-lucide-folder-open",
      "loading": "i-lucide-loader-circle",
      "minus": "i-lucide-minus",
      "plus": "i-lucide-plus",
      "search": "i-lucide-search"
    }
  },
  "nuxt": {},
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
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
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
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
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
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
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
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
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



const appConfig = defuFn(inlineAppConfig);

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
    "buildId": "ed45d20b-12cf-4de3-83ce-a861f37f1c8c",
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
      "/_fonts/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
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
    "emailAddress": "andienathie@gmail.com",
    "minPasswordLength": 8,
    "maxAccounts": 20,
    "minDepositAmount": 10,
    "maxDepositAmount": 100000,
    "getRequestLimit": 20
  },
  "icon": {
    "serverKnownCssClasses": []
  },
  "ipx": {
    "baseURL": "/_ipx",
    "alias": {},
    "fs": {
      "dir": "../public"
    },
    "http": {
      "domains": []
    }
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

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

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

function isJsonRequest(event) {
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
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await import('../_/error-500.mjs');
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

const _e28lNZYXwSIC2TzGDXONQQqx3DjrZNzFLSFs68ngoV4 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  _e28lNZYXwSIC2TzGDXONQQqx3DjrZNzFLSFs68ngoV4
];

const assets = {
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"325fc-hS2DUiI+No6LCRWWmoeDjSrrjyc\"",
    "mtime": "2025-08-12T22:14:32.553Z",
    "size": 206332,
    "path": "../public/favicon.ico"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": "\"8693-eL5Fl1t6wDGD6TOZQYx/ZD7Ecw4\"",
    "mtime": "2025-08-12T22:14:32.553Z",
    "size": 34451,
    "path": "../public/logo.png"
  },
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"18-j8OIsL9qGDmNZ+lHhp2tyH4XtaE\"",
    "mtime": "2025-08-12T22:14:32.553Z",
    "size": 24,
    "path": "../public/robots.txt"
  },
  "/vid/animation-01.mp4": {
    "type": "video/mp4",
    "etag": "\"206b2f-WxlnaRGMdb9hXupWC5otyg5yzCM\"",
    "mtime": "2025-08-12T22:14:32.549Z",
    "size": 2124591,
    "path": "../public/vid/animation-01.mp4"
  },
  "/vid/animation-02.mp4": {
    "type": "video/mp4",
    "etag": "\"3ce49f-k2iIGipKhiXyCfC6+QqUE3xUEuc\"",
    "mtime": "2025-08-12T22:14:32.587Z",
    "size": 3990687,
    "path": "../public/vid/animation-02.mp4"
  },
  "/img/buildings.gif": {
    "type": "image/gif",
    "etag": "\"1c979b-wMrXSFYQ7E3K7FN99ily+7ygRQA\"",
    "mtime": "2025-08-12T22:14:32.545Z",
    "size": 1873819,
    "path": "../public/img/buildings.gif"
  },
  "/img/investment.gif": {
    "type": "image/gif",
    "etag": "\"1a163c-h9iQAqizr1z0MSlmV4/0LCDrz+4\"",
    "mtime": "2025-08-12T22:14:32.545Z",
    "size": 1709628,
    "path": "../public/img/investment.gif"
  },
  "/_nuxt/-5zcGYuv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ae-kdFx2TfMRAn9U7vX5j8LezE0BKQ\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 942,
    "path": "../public/_nuxt/-5zcGYuv.js"
  },
  "/_nuxt/-7KF7Ksm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"223-E6w/16EmZDO7NVbeVCSUQ+XFR3A\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 547,
    "path": "../public/_nuxt/-7KF7Ksm.js"
  },
  "/_nuxt/1gsSyNho.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2bd3-K4wCLe0lW+9CeDTmpbnMDJlbFgM\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 11219,
    "path": "../public/_nuxt/1gsSyNho.js"
  },
  "/_nuxt/7KQsTKLf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5753b-G96aIsuTfhypi+16dr8vxc2Q6V8\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 357691,
    "path": "../public/_nuxt/7KQsTKLf.js"
  },
  "/_nuxt/9ThFSRxC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20a-dQJ8BWv4HS7IZbEXbVesaiSYSQ8\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 522,
    "path": "../public/_nuxt/9ThFSRxC.js"
  },
  "/_nuxt/B4p64Xk_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d76-GAu++/aL0Hez0S23O97xEZhgHCU\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 11638,
    "path": "../public/_nuxt/B4p64Xk_.js"
  },
  "/_nuxt/B76bpIzF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"679-64O42q+6wn7s3gNqzz2LSlw9c3o\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 1657,
    "path": "../public/_nuxt/B76bpIzF.js"
  },
  "/_nuxt/B9XHDwWB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5805-T5Pxck7iP6EHrlwaHyN/0XfzLKo\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 22533,
    "path": "../public/_nuxt/B9XHDwWB.js"
  },
  "/_nuxt/BAdsnBGN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3f1a-o/o10FSOT1FyJN7axYpEA4IX1V0\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 16154,
    "path": "../public/_nuxt/BAdsnBGN.js"
  },
  "/_nuxt/BArDk46W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"802-UWUiAVU+BatvdekOcW/+BD6f338\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 2050,
    "path": "../public/_nuxt/BArDk46W.js"
  },
  "/_nuxt/BBOhS9Ev.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"156d-HhjQVqxrFcOfur0tmsSvmSgtSFc\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 5485,
    "path": "../public/_nuxt/BBOhS9Ev.js"
  },
  "/_nuxt/BCsj_p-M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"af4-mO5w5DdFIUIPVxsmwpJasP+3DBs\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 2804,
    "path": "../public/_nuxt/BCsj_p-M.js"
  },
  "/_nuxt/BFUdjLzw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24ca-szKntVpw0wnAgI5Y85J1Ap5vsJM\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 9418,
    "path": "../public/_nuxt/BFUdjLzw.js"
  },
  "/_nuxt/BGJXlsmp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7b06-lcJGjN+79zRNoXjciuzfYm9pSwg\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 31494,
    "path": "../public/_nuxt/BGJXlsmp.js"
  },
  "/_nuxt/BH6ohGST.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17832a-xJqCqFHCqDhDQkdH9wnWR8FwN7E\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 1540906,
    "path": "../public/_nuxt/BH6ohGST.js"
  },
  "/_nuxt/BHCeUxjz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"229e-4Vh5U7hLPdI1TnSx8QZ+FhBnA/g\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 8862,
    "path": "../public/_nuxt/BHCeUxjz.js"
  },
  "/_nuxt/BInm6yx3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13d5-MAzXhvjY+LYI9bsvcV/YV+qR/aw\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 5077,
    "path": "../public/_nuxt/BInm6yx3.js"
  },
  "/_nuxt/BIpI0Us3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e3-C3HLQpvUXdMyHbfiOIcALwPoLRg\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 227,
    "path": "../public/_nuxt/BIpI0Us3.js"
  },
  "/_nuxt/BLZFmZju.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"178a-4Em4w7Oe+zrmKX0OXd13LiA/feo\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 6026,
    "path": "../public/_nuxt/BLZFmZju.js"
  },
  "/_nuxt/BN8XJ3XY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b74-oBcAdlbBMs8okpmKEofVz3UKFT0\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 2932,
    "path": "../public/_nuxt/BN8XJ3XY.js"
  },
  "/_nuxt/BP_iKah0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a93-HKYVSXp/2k2hoKt/61zNo6Y5HN0\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 2707,
    "path": "../public/_nuxt/BP_iKah0.js"
  },
  "/_nuxt/BQH4YRWo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b3-LBN23G9uG9OpxqxSWt/+u5dG8Sc\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 691,
    "path": "../public/_nuxt/BQH4YRWo.js"
  },
  "/_nuxt/BRbhiJmG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"72c-taGEO9apDxamrvx3Pi1FsUD3Dio\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 1836,
    "path": "../public/_nuxt/BRbhiJmG.js"
  },
  "/_nuxt/BUduTsLz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"303d-HZ19rhGKJGZdUXSi/jz3TtfIOy8\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 12349,
    "path": "../public/_nuxt/BUduTsLz.js"
  },
  "/_nuxt/BUy_ktjI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6d1-SYqzidSxxLRnKi0wvhqPviG8Cq8\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 1745,
    "path": "../public/_nuxt/BUy_ktjI.js"
  },
  "/_nuxt/BWnwynY-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"632-J5AOnz/SrUGaHGA7Sab4+LrPp+k\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 1586,
    "path": "../public/_nuxt/BWnwynY-.js"
  },
  "/_nuxt/BWylYwCy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2878-lg4TriZNMETyG3pFNzY0PO87o6k\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 10360,
    "path": "../public/_nuxt/BWylYwCy.js"
  },
  "/_nuxt/BZPumJrv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e11-DdUusnwHaSub/AgIKhWJpxUY/P4\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 7697,
    "path": "../public/_nuxt/BZPumJrv.js"
  },
  "/_nuxt/B_U-gL2j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2227-7u6mVLTPJvOaCHXxXV3QMlU4e5E\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 8743,
    "path": "../public/_nuxt/B_U-gL2j.js"
  },
  "/_nuxt/B_lSGf9J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"210bf-XifRZTgHTop4oeV+1WMFhCC4+tQ\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 135359,
    "path": "../public/_nuxt/B_lSGf9J.js"
  },
  "/_nuxt/BaSTiW9O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9c-qP+6xIBNratGi18ndwdyfSkAsGY\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 156,
    "path": "../public/_nuxt/BaSTiW9O.js"
  },
  "/_nuxt/BaciPMwD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29e-wvSJWchInOoleD3zUcjZmKL/Bqc\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 670,
    "path": "../public/_nuxt/BaciPMwD.js"
  },
  "/_nuxt/BbtEspV7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1e6e-09y8GpIqpqTim2nL295TTMcVIvg\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 7790,
    "path": "../public/_nuxt/BbtEspV7.js"
  },
  "/_nuxt/Bc5VLw0W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"76c-aZwL5Dv5EseAHlXoX3AC8VFfTgI\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 1900,
    "path": "../public/_nuxt/Bc5VLw0W.js"
  },
  "/_nuxt/BeAYYLxY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"72a-5JIyI7L3StGxGgcUUg9t/p4n8BA\"",
    "mtime": "2025-08-12T22:14:32.452Z",
    "size": 1834,
    "path": "../public/_nuxt/BeAYYLxY.js"
  },
  "/_nuxt/BfxBtG_O.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3162d-Fgg5VzYWjRTiEvAJO3hoKoqCTK4\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 202285,
    "path": "../public/_nuxt/BfxBtG_O.js"
  },
  "/_nuxt/Bgc-ZZWy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24ac-2OU6abaIuyG2zoj0gIdGIb6NUR0\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 9388,
    "path": "../public/_nuxt/Bgc-ZZWy.js"
  },
  "/_nuxt/BhbC5LL8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3654-kNHe+INHjcU8U3nYvGWxThkRg6E\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 13908,
    "path": "../public/_nuxt/BhbC5LL8.js"
  },
  "/_nuxt/BiQBrVkL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d9-rZ4YZRtCgKnTzA9kskcaGiBugaM\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 473,
    "path": "../public/_nuxt/BiQBrVkL.js"
  },
  "/_nuxt/BifMU3wt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"59b-X/1HB7LjnSmclT56u8GRDFK3iWI\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 1435,
    "path": "../public/_nuxt/BifMU3wt.js"
  },
  "/_nuxt/BjJADY5a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"154f-J79PRgsDipLQjYi6AoRmmSw5SDg\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 5455,
    "path": "../public/_nuxt/BjJADY5a.js"
  },
  "/_nuxt/BlCRVRUn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"459-O/28HVEzW5215GyTDbFdmD/VI+Y\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 1113,
    "path": "../public/_nuxt/BlCRVRUn.js"
  },
  "/_nuxt/BrdnxjBE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a9f6-HuRSvCd+YwWSNjWNNYcgONPNtYA\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 43510,
    "path": "../public/_nuxt/BrdnxjBE.js"
  },
  "/_nuxt/BrlrytXh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"26e5a-fJhhXiR0no8UQY3O/ilIyLOc92Q\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 159322,
    "path": "../public/_nuxt/BrlrytXh.js"
  },
  "/_nuxt/BtQba1C5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c7a-vWIPqXcHcQPNKofx3C7VrvC9kAU\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 3194,
    "path": "../public/_nuxt/BtQba1C5.js"
  },
  "/_nuxt/BucZ4Rf5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3787-12e0vqCMOFBR8qC2y2lc3PPfTpI\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 14215,
    "path": "../public/_nuxt/BucZ4Rf5.js"
  },
  "/_nuxt/Bv6Vw6gc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6ba-R/8V7Cfm0Szp2XqfxWMCaY+wGs4\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 1722,
    "path": "../public/_nuxt/Bv6Vw6gc.js"
  },
  "/_nuxt/BvF3PFdS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"f1b-c9OcYbmI7+IfPCs5ijpwDnmqwYU\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 3867,
    "path": "../public/_nuxt/BvF3PFdS.js"
  },
  "/_nuxt/Bv_t6iuJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"96c-IHl5MwRoGLTaxydFl+f0u2+V3X4\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 2412,
    "path": "../public/_nuxt/Bv_t6iuJ.js"
  },
  "/_nuxt/BvhMhgb1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"99-FAlnFeBxLkLuhZf65bQHkFJWHjA\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 153,
    "path": "../public/_nuxt/BvhMhgb1.js"
  },
  "/_nuxt/BxuZ97f2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9f4-gPrGZVFZ7oEunBIQulni7sCZA40\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 2548,
    "path": "../public/_nuxt/BxuZ97f2.js"
  },
  "/_nuxt/BzvspqhN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5dc2-VbtTCSh+R4SGuAWlnTfchWvdYMQ\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 24002,
    "path": "../public/_nuxt/BzvspqhN.js"
  },
  "/_nuxt/C-BGqY-V.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2039-hhzoqCYXsUlcK5g34+Iks1ZaAQk\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 8249,
    "path": "../public/_nuxt/C-BGqY-V.js"
  },
  "/_nuxt/C-Qyzm3C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9cc-3xts3d5x7h5VVzgsDTOSxv1oc60\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 2508,
    "path": "../public/_nuxt/C-Qyzm3C.js"
  },
  "/_nuxt/C1KOLkGL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"632-oymioKIAnsYpZed1dO/FOzo4XXE\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 1586,
    "path": "../public/_nuxt/C1KOLkGL.js"
  },
  "/_nuxt/C2OazYEN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"21e-YZSMFQ8j2PBFM9yYfOy1o3cLo5c\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 542,
    "path": "../public/_nuxt/C2OazYEN.js"
  },
  "/_nuxt/C3npS8vC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7d-nbW5YAXslhzO7iI9vjTMJ6KkmGc\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 125,
    "path": "../public/_nuxt/C3npS8vC.js"
  },
  "/_nuxt/C40-9aZM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11b3-uFAv8BP+g1YRixpTQHNxU5ipm2o\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 4531,
    "path": "../public/_nuxt/C40-9aZM.js"
  },
  "/_nuxt/C46oJ1TD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b6-dDU7PA6OJ0yriswQPw6evsPgx80\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 694,
    "path": "../public/_nuxt/C46oJ1TD.js"
  },
  "/_nuxt/C5cbwpr9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4e0-8welJYaNQyXkP4+R/AZqVbee65U\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 1248,
    "path": "../public/_nuxt/C5cbwpr9.js"
  },
  "/_nuxt/C6Gds3t5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"140-U37YpFQRP4mC6DIP+av/TsZM6WQ\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 320,
    "path": "../public/_nuxt/C6Gds3t5.js"
  },
  "/_nuxt/CA--58-j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"152-gyRYq+/qY5qZFyoocU9Uoo+hzeI\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 338,
    "path": "../public/_nuxt/CA--58-j.js"
  },
  "/_nuxt/CFMfWUBg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"373f-J+pt6r923TvcDTKH9PIbM4Escno\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 14143,
    "path": "../public/_nuxt/CFMfWUBg.js"
  },
  "/_nuxt/CGTwjFam.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6f96-EyumqwHCz9EtlSGM0Z1VBBl+ScA\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 28566,
    "path": "../public/_nuxt/CGTwjFam.js"
  },
  "/_nuxt/CH84gJvK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3628-K5Q71w6JlutLdOU6CYzaBX0bMX0\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 13864,
    "path": "../public/_nuxt/CH84gJvK.js"
  },
  "/_nuxt/CHIgUVhi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2d-5VxZtfY6uAdipZl0DssbJfTlQJw\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 45,
    "path": "../public/_nuxt/CHIgUVhi.js"
  },
  "/_nuxt/CL-v-4Ds.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ece-kc4youCeEQfexoCKrJNaJb5XRqM\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 3790,
    "path": "../public/_nuxt/CL-v-4Ds.js"
  },
  "/_nuxt/CLyOlSXx.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18f46-6IU4rVCsvV6C+amB7dXkdChXJ04\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 102214,
    "path": "../public/_nuxt/CLyOlSXx.js"
  },
  "/_nuxt/CM2wjgdt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"35c-HPPZ7j4l55dodZuJhRlkVmyH4Sc\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 860,
    "path": "../public/_nuxt/CM2wjgdt.js"
  },
  "/_nuxt/CQJ0hv7W.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"553b-XinCBlaDkt1wuwxigwqjVgUVkWQ\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 21819,
    "path": "../public/_nuxt/CQJ0hv7W.js"
  },
  "/_nuxt/CQmQ2-nD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20ce-/1xhW9dcUAk7ZjAQeyrIlOWvFnE\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 8398,
    "path": "../public/_nuxt/CQmQ2-nD.js"
  },
  "/_nuxt/CSRlhb3z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"95-bCxKGrkgGt1v/Kvm0yR4QtqE+/I\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 149,
    "path": "../public/_nuxt/CSRlhb3z.js"
  },
  "/_nuxt/CTTQJ_OA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"84d-F8h6JKwKPFQ1pMg1yR78kiUeAf0\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 2125,
    "path": "../public/_nuxt/CTTQJ_OA.js"
  },
  "/_nuxt/CTecj4Hw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"92c-Xpcz8mjDWYx2VhPtHUI5OWyrp9M\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 2348,
    "path": "../public/_nuxt/CTecj4Hw.js"
  },
  "/_nuxt/CVURR19n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3d83-nnBuXq7gcDf1bDHFxit2KlNrV4I\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 15747,
    "path": "../public/_nuxt/CVURR19n.js"
  },
  "/_nuxt/CVVXIaxC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"243-swvSXDVfKc1jbGpfM3VwWVsTO/w\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 579,
    "path": "../public/_nuxt/CVVXIaxC.js"
  },
  "/_nuxt/CVwvMgBG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c475-/ro61M3gewONZlnbAIzA6IS7olc\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 377973,
    "path": "../public/_nuxt/CVwvMgBG.js"
  },
  "/_nuxt/CWWhJb-Q.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"100a-x8K8ubbCLvA2v29dxqpFXS7wquY\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 4106,
    "path": "../public/_nuxt/CWWhJb-Q.js"
  },
  "/_nuxt/CWxFjsf6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9975-Ji0GpTDwN+QS2ZImNpnyh3tdtcQ\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 39285,
    "path": "../public/_nuxt/CWxFjsf6.js"
  },
  "/_nuxt/C_w5PVnp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3782-Hs/5hMqB7zAlOB1hxrb6Ec3duDo\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 14210,
    "path": "../public/_nuxt/C_w5PVnp.js"
  },
  "/_nuxt/CcSCJNt5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2167-icn6hi/4HmBzCKWgpI5pksig1d0\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 8551,
    "path": "../public/_nuxt/CcSCJNt5.js"
  },
  "/_nuxt/CdVNNPCT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"246f-DBATj+7QF8nZX0G4XpO7dfi8o3w\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 9327,
    "path": "../public/_nuxt/CdVNNPCT.js"
  },
  "/_nuxt/CftSbWNE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"282-1+U5ManDame0szPQNqefX6PlKpc\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 642,
    "path": "../public/_nuxt/CftSbWNE.js"
  },
  "/_nuxt/CgxT210A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"39c1-OV2GhtwDm9/VYlZ1c0Duc8V+aA4\"",
    "mtime": "2025-08-12T22:14:32.456Z",
    "size": 14785,
    "path": "../public/_nuxt/CgxT210A.js"
  },
  "/_nuxt/ChRclvJ-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6b-rBe7DvpIcfXU3km160ev1lSyBhk\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 107,
    "path": "../public/_nuxt/ChRclvJ-.js"
  },
  "/_nuxt/CkukuWyT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dab-gloA5z3NNhwEnMmHc3dk6QoyYjQ\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 3499,
    "path": "../public/_nuxt/CkukuWyT.js"
  },
  "/_nuxt/Cl5dUHu_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"261f-ZCc6xpKcRXaciMLUMWNNccJKzoc\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 9759,
    "path": "../public/_nuxt/Cl5dUHu_.js"
  },
  "/_nuxt/Cn81Ckyq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"232-GvJo9paA9L/CEkWMN7QcAfvi5Ls\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 562,
    "path": "../public/_nuxt/Cn81Ckyq.js"
  },
  "/_nuxt/CpJRfXdp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"220-RY9cVTg/D0zHKJdfHRKCoDJhF3g\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 544,
    "path": "../public/_nuxt/CpJRfXdp.js"
  },
  "/_nuxt/Cpj98o6Y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ec-QtY1KaLA8vnMK3l2IvajpxyuPmY\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 236,
    "path": "../public/_nuxt/Cpj98o6Y.js"
  },
  "/_nuxt/Cr_PqBA6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12a-Imdy7/62F3DdAvGDEwN8gl/GVzs\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 298,
    "path": "../public/_nuxt/Cr_PqBA6.js"
  },
  "/_nuxt/Ct8ysQ5s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cf4-8AbcC1Bfpqx6R080/9Vk+2wdrB0\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 3316,
    "path": "../public/_nuxt/Ct8ysQ5s.js"
  },
  "/_nuxt/Ctcj3xgC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"677-gnNPbI9KqS5cqIl0KrB0gkHB3io\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 1655,
    "path": "../public/_nuxt/Ctcj3xgC.js"
  },
  "/_nuxt/D-tUALiy.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2c9a-qwiFR3qmq7mMeZtHAFoORJAxEtc\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 11418,
    "path": "../public/_nuxt/D-tUALiy.js"
  },
  "/_nuxt/D-uNaUL-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"df5-ZwVbHTx3VBQM2A6S2vtXRmt0+bw\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 3573,
    "path": "../public/_nuxt/D-uNaUL-.js"
  },
  "/_nuxt/D02m146y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"31e8-ZqVO8DEr7PKEH3fiWGsI0A7D0QQ\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 12776,
    "path": "../public/_nuxt/D02m146y.js"
  },
  "/_nuxt/D5doXoDp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"198-0xTKxsxIxCoHsqRbArDxw2V80e4\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 408,
    "path": "../public/_nuxt/D5doXoDp.js"
  },
  "/_nuxt/D7s51L10.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15288-5AwZauG1bpoc/Xvf9jK8nWKmLP0\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 86664,
    "path": "../public/_nuxt/D7s51L10.js"
  },
  "/_nuxt/D8aXSgAm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c5-2y4mAlFh3/BCvciQc5HTvI08E7w\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 197,
    "path": "../public/_nuxt/D8aXSgAm.js"
  },
  "/_nuxt/D9B1UaIg.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e6-X81fKxNZb17Lqq/IBerVuyFi/V8\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 230,
    "path": "../public/_nuxt/D9B1UaIg.js"
  },
  "/_nuxt/DKC2jaoI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"253-e6JoRMjVw64Wut8RPt4EtDAns4g\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 595,
    "path": "../public/_nuxt/DKC2jaoI.js"
  },
  "/_nuxt/DKgaHZ8v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"232-T/eUd1VN560kqNM2/N9dJVvRvWI\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 562,
    "path": "../public/_nuxt/DKgaHZ8v.js"
  },
  "/_nuxt/DQpgr5p1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"37c6-hmCwn5D+7DTp6fodXDcI8d6ITPw\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 14278,
    "path": "../public/_nuxt/DQpgr5p1.js"
  },
  "/_nuxt/DRMytl8m.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4fe-Hk0FroHaHSeZ8ASsPSQ0B+BeHfs\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 1278,
    "path": "../public/_nuxt/DRMytl8m.js"
  },
  "/_nuxt/DRtQBI20.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2da52-brT1mdCjgyRYb4V/1GxiCQy3jko\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 186962,
    "path": "../public/_nuxt/DRtQBI20.js"
  },
  "/_nuxt/DT3T3ECT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"36039-HPG+3iu7dlKhOjylU1ZW1W7QgEg\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 221241,
    "path": "../public/_nuxt/DT3T3ECT.js"
  },
  "/_nuxt/DVF1t_M1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"47c6-m1pAyBdavHaSqV562lmPsFvnEuE\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 18374,
    "path": "../public/_nuxt/DVF1t_M1.js"
  },
  "/_nuxt/DWW4WWGA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"cc7-j5gNEBau55dZI2FcGyd9rRrmjk4\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 3271,
    "path": "../public/_nuxt/DWW4WWGA.js"
  },
  "/_nuxt/DWmD9WUJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"674-dG632Tf3j9dlG2wjmhAd2wFn/9U\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 1652,
    "path": "../public/_nuxt/DWmD9WUJ.js"
  },
  "/_nuxt/DXiHk8ks.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3589-+FsC4Ef8J8LjcxW72mqFfSAF+d0\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 13705,
    "path": "../public/_nuxt/DXiHk8ks.js"
  },
  "/_nuxt/DYFdYwnq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3b86-Lj4ojZTXcEwQ39ZNY7DJ10SswjM\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 15238,
    "path": "../public/_nuxt/DYFdYwnq.js"
  },
  "/_nuxt/DYtOHeaK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2158-ZOZNezrxH2NabPwcSTwZ29ur4/g\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 8536,
    "path": "../public/_nuxt/DYtOHeaK.js"
  },
  "/_nuxt/D_ajDymQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17b-TaPKPL+kAvRaNpaSCVbdRkNzVEk\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 379,
    "path": "../public/_nuxt/D_ajDymQ.js"
  },
  "/_nuxt/DcG86Qvs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1c04-mLCUyxFfUlPb/kIAss6YmjtHtq0\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 7172,
    "path": "../public/_nuxt/DcG86Qvs.js"
  },
  "/_nuxt/DekjmoA0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ac4-a7tAvv5CopKgAwSTu6mwVWYD6Es\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 6852,
    "path": "../public/_nuxt/DekjmoA0.js"
  },
  "/_nuxt/DeuzRBk-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"509-jRmyYgTkVc3TmWQUZSHF04EMLoM\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 1289,
    "path": "../public/_nuxt/DeuzRBk-.js"
  },
  "/_nuxt/Df0nSlOo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1928-O57aKRF12G3vhcL2k+dP9HTZC/Y\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 6440,
    "path": "../public/_nuxt/Df0nSlOo.js"
  },
  "/_nuxt/DfG_qfGY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"232-MqNYFFwLDxKZ6pW1G3fl7ZWR/fc\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 562,
    "path": "../public/_nuxt/DfG_qfGY.js"
  },
  "/_nuxt/DfQS-cjd.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9cc-5AjBWgW9L63uU9+vrYVres1X8tQ\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 2508,
    "path": "../public/_nuxt/DfQS-cjd.js"
  },
  "/_nuxt/DjHW6eFj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18a9-W3M20EmB6r3TOQIw5KvwcIuVfbY\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 6313,
    "path": "../public/_nuxt/DjHW6eFj.js"
  },
  "/_nuxt/Dl8lASLG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1bdd-xyzFXOY/Vk7VyQpE1PCzp0XfNEc\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 7133,
    "path": "../public/_nuxt/Dl8lASLG.js"
  },
  "/_nuxt/DlAUqK2U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 91,
    "path": "../public/_nuxt/DlAUqK2U.js"
  },
  "/_nuxt/DlU5MmRb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4aa-KXW7GBhc+tWfBHjkWk2l0ZY7hYI\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 1194,
    "path": "../public/_nuxt/DlU5MmRb.js"
  },
  "/_nuxt/Dsaz7ZGA.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"24d-K3PiDkR/mYRFru65JJVdG+jmE8Y\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 589,
    "path": "../public/_nuxt/Dsaz7ZGA.js"
  },
  "/_nuxt/DtxMhGxY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a9f-UsgohPkCCYci1DAoaeQWdcfP3k4\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 2719,
    "path": "../public/_nuxt/DtxMhGxY.js"
  },
  "/_nuxt/DuisxuMi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"102b-LiibTch2QBh5lChVMINMQc3GAOw\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 4139,
    "path": "../public/_nuxt/DuisxuMi.js"
  },
  "/_nuxt/DvqOazBT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b9-vXguAsHHaiZldJgU99zaHf166as\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 185,
    "path": "../public/_nuxt/DvqOazBT.js"
  },
  "/_nuxt/DwYKWojw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"516-zgbr9cVu4pD4a3LvQDOxVEif7YA\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 1302,
    "path": "../public/_nuxt/DwYKWojw.js"
  },
  "/_nuxt/DwaAJkQT.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2bb-vCCJT+IFdEetAhORHxLoy7DQvLI\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 699,
    "path": "../public/_nuxt/DwaAJkQT.js"
  },
  "/_nuxt/Dx1SHFBO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4483-dlk19r6Im7TomCVqKtSQhXwotoQ\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 17539,
    "path": "../public/_nuxt/Dx1SHFBO.js"
  },
  "/_nuxt/Dx2Wq5DV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"35da-EFAgEdrS9KwgMiRtYntx1BX9qDs\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 13786,
    "path": "../public/_nuxt/Dx2Wq5DV.js"
  },
  "/_nuxt/GeistMono.BlNDD6KS.ttf": {
    "type": "font/ttf",
    "etag": "\"21a4c-gm9w2ENvXcfFhYWyTL/dr//O2vQ\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 137804,
    "path": "../public/_nuxt/GeistMono.BlNDD6KS.ttf"
  },
  "/_nuxt/HJQl-y0p.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"375-LZTnWQMTKmjiIxOUXjS0X5uAySs\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 885,
    "path": "../public/_nuxt/HJQl-y0p.js"
  },
  "/_nuxt/I1jJJzNo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"301-SFKsu/Z4rv1mg3fQUylDjMzvpnE\"",
    "mtime": "2025-08-12T22:14:32.460Z",
    "size": 769,
    "path": "../public/_nuxt/I1jJJzNo.js"
  },
  "/_nuxt/NgVA1xMM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"38e-uZ8RA/PPlO9JsWtv9aUR3UK8jg4\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 910,
    "path": "../public/_nuxt/NgVA1xMM.js"
  },
  "/_nuxt/PIg6nV0L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6ae-act1S5nOpiWaEomyXgik6hvZDbI\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 1710,
    "path": "../public/_nuxt/PIg6nV0L.js"
  },
  "/_nuxt/Poppins.CTKNfV9P.ttf": {
    "type": "font/ttf",
    "etag": "\"26a20-/dMALn2BTuR8HBuEh8csa7s6LQA\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 158240,
    "path": "../public/_nuxt/Poppins.CTKNfV9P.ttf"
  },
  "/_nuxt/RmZf-DBj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"80b-hotOyzBmGIxeU0Y6MCuCV+4yUpM\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 2059,
    "path": "../public/_nuxt/RmZf-DBj.js"
  },
  "/_nuxt/SACtJBj3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4296-Z1nYjVSrt96v6AgSYmdY14E8kEs\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 17046,
    "path": "../public/_nuxt/SACtJBj3.js"
  },
  "/_nuxt/TBFDyXU2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"13bf-l/sXLyyuuWvY3qmE+wQGGPpyI4A\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 5055,
    "path": "../public/_nuxt/TBFDyXU2.js"
  },
  "/_nuxt/TnZ4cY_b.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1795-Jgy6p+xaNKgkiBlrlJyMGsAHtjI\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 6037,
    "path": "../public/_nuxt/TnZ4cY_b.js"
  },
  "/_nuxt/UoBorrl-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"315-T2pDlGGv1ooEz1UjeA1kGYN2MlY\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 789,
    "path": "../public/_nuxt/UoBorrl-.js"
  },
  "/_nuxt/V07vZcpm.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fd49-88E4x6llcBaMCZTvWZe7DeSDHXE\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 64841,
    "path": "../public/_nuxt/V07vZcpm.js"
  },
  "/_nuxt/Z5DcAztL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4760-tURw4xFK/7N4l1/wB6cLDdGACeg\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 18272,
    "path": "../public/_nuxt/Z5DcAztL.js"
  },
  "/_nuxt/cD6ri7Sn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e4-qPeZfXeXcHF0/KEIlHStPyPjEHU\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 996,
    "path": "../public/_nuxt/cD6ri7Sn.js"
  },
  "/_nuxt/eFOk0bMv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9e-Tp8yCUxyjQCKGJ7KLTUvVNqW1UY\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 158,
    "path": "../public/_nuxt/eFOk0bMv.js"
  },
  "/_nuxt/entry.NS7-AOeN.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"24f95-8ECnlg/9IJ9eXAZtXV7jJqH/CCU\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 151445,
    "path": "../public/_nuxt/entry.NS7-AOeN.css"
  },
  "/_nuxt/error-404.DlVPZ4GE.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"980-mEKr2yDhHmG21upnVXydWBGkQJ0\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 2432,
    "path": "../public/_nuxt/error-404.DlVPZ4GE.css"
  },
  "/_nuxt/error-500.DjyirMQI.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"775-e/ssyla9fMU+TjO0KjMl5vd3xXk\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 1909,
    "path": "../public/_nuxt/error-500.DjyirMQI.css"
  },
  "/_nuxt/fF25g3x0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7e-pAlnoKUqvaTQiOMC8odug4qOo80\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 126,
    "path": "../public/_nuxt/fF25g3x0.js"
  },
  "/_nuxt/gDTRVH-N.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e26-xDZrsAM46HiScjOlnVdIX90MG2M\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 3622,
    "path": "../public/_nuxt/gDTRVH-N.js"
  },
  "/_nuxt/jFYhBC76.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"224-FHzXPBCuJL9jsLYPNEezdythwVM\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 548,
    "path": "../public/_nuxt/jFYhBC76.js"
  },
  "/_nuxt/kRIii9yh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1f3-yYb3MkTdiuhHjcDfFDHvLT+nO3M\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 499,
    "path": "../public/_nuxt/kRIii9yh.js"
  },
  "/_nuxt/mGNbPSyX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"16fa-Iec4noJv3xZqW5Ij5jm95Zidwk4\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 5882,
    "path": "../public/_nuxt/mGNbPSyX.js"
  },
  "/_nuxt/oL62-6GZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"69b-IacI+rq6bvN3KEYdsx9QLIHVAZc\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 1691,
    "path": "../public/_nuxt/oL62-6GZ.js"
  },
  "/_nuxt/oPcAJ6q_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"20dd-cy+FFM7XdADZv1WmbufhGFYU7zM\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 8413,
    "path": "../public/_nuxt/oPcAJ6q_.js"
  },
  "/_nuxt/partner-list.iLHk2OFp.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"48f-BHss8ywjauBX1eKpeaE+pmgZRRM\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 1167,
    "path": "../public/_nuxt/partner-list.iLHk2OFp.css"
  },
  "/_nuxt/password.D7e_onzx.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1b-TMZKD6boIOYNoDcCE4aOxomJVYw\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 27,
    "path": "../public/_nuxt/password.D7e_onzx.css"
  },
  "/_nuxt/poyWHrki.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"492c-P2dTXlXU73GQSRGj/DXrBY1tvh0\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 18732,
    "path": "../public/_nuxt/poyWHrki.js"
  },
  "/_nuxt/r8-QPo5A.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"294e-JitmUgjOPRycQzqE2iazVQK5Nmk\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 10574,
    "path": "../public/_nuxt/r8-QPo5A.js"
  },
  "/_nuxt/uAYkovRb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4e5-n/sVMhweff11Jut/bqG4994h7G0\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 46309,
    "path": "../public/_nuxt/uAYkovRb.js"
  },
  "/_nuxt/y9Fq2xlU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"894-PEZeDQZicVDL2sc0TNVspKOtUUo\"",
    "mtime": "2025-08-12T22:14:32.464Z",
    "size": 2196,
    "path": "../public/_nuxt/y9Fq2xlU.js"
  },
  "/documents/users/cuUsm3ESKruSe6k0MZSizsIOKIid5lSP-1754133482626.pdf": {
    "type": "application/pdf",
    "etag": "\"319f9-H/nUwAI+An2VGTLxxWjHqB+Yr1Y\"",
    "mtime": "2025-08-12T22:14:32.570Z",
    "size": 203257,
    "path": "../public/documents/users/cuUsm3ESKruSe6k0MZSizsIOKIid5lSP-1754133482626.pdf"
  },
  "/documents/users/vEesX1QVV5dnpP44EFeUo9GzkiERJUHm-1753129402362.pdf": {
    "type": "application/pdf",
    "etag": "\"1f1b85-1hjL2WCnXQWDcpydoeSLYt95ZZs\"",
    "mtime": "2025-08-12T22:14:32.562Z",
    "size": 2038661,
    "path": "../public/documents/users/vEesX1QVV5dnpP44EFeUo9GzkiERJUHm-1753129402362.pdf"
  },
  "/img/customers/executives.jpg": {
    "type": "image/jpeg",
    "etag": "\"1868c-MtaFRjfWMSBA+WFCEkCWQftWnVs\"",
    "mtime": "2025-08-12T22:14:32.519Z",
    "size": 99980,
    "path": "../public/img/customers/executives.jpg"
  },
  "/img/customers/investors.jpg": {
    "type": "image/jpeg",
    "etag": "\"a0c2-Ump14YaHOpNKT0vmJMqpBpU3W1g\"",
    "mtime": "2025-08-12T22:14:32.545Z",
    "size": 41154,
    "path": "../public/img/customers/investors.jpg"
  },
  "/img/customers/new-to-investing.jpg": {
    "type": "image/jpeg",
    "etag": "\"adce-y0X23YMivRn0tr+/MO75W7QsLP8\"",
    "mtime": "2025-08-12T22:14:32.532Z",
    "size": 44494,
    "path": "../public/img/customers/new-to-investing.jpg"
  },
  "/img/customers/private-clients.jpg": {
    "type": "image/jpeg",
    "etag": "\"2ffca-FlC6bCaB0K9LpTdASmziTwO5bMo\"",
    "mtime": "2025-08-12T22:14:32.532Z",
    "size": 196554,
    "path": "../public/img/customers/private-clients.jpg"
  },
  "/img/customers/retirees.jpg": {
    "type": "image/jpeg",
    "etag": "\"569e-NPmoiG6327rGXeJU1qOeA+x5Vpc\"",
    "mtime": "2025-08-12T22:14:32.532Z",
    "size": 22174,
    "path": "../public/img/customers/retirees.jpg"
  },
  "/img/icons/image.svg": {
    "type": "image/svg+xml",
    "etag": "\"541-JTG/7SZVoeezHaulFOUQN7KzPtw\"",
    "mtime": "2025-08-12T22:14:32.519Z",
    "size": 1345,
    "path": "../public/img/icons/image.svg"
  },
  "/img/icons/pdf.svg": {
    "type": "image/svg+xml",
    "etag": "\"390-r8S/r1oYBetLWdj6tVdUo2Fq7jc\"",
    "mtime": "2025-08-12T22:14:32.545Z",
    "size": 912,
    "path": "../public/img/icons/pdf.svg"
  },
  "/img/loaders/initial-loader.gif": {
    "type": "image/gif",
    "etag": "\"a0300-GhC39hEBe/X9xt7jFMJTS1yUfL4\"",
    "mtime": "2025-08-12T22:14:32.524Z",
    "size": 656128,
    "path": "../public/img/loaders/initial-loader.gif"
  },
  "/img/loaders/route-loader.gif": {
    "type": "image/gif",
    "etag": "\"78883-JeKg+np7l/lxSh59mOWmmhQNUYs\"",
    "mtime": "2025-08-12T22:14:32.545Z",
    "size": 493699,
    "path": "../public/img/loaders/route-loader.gif"
  },
  "/img/partners/alphasense.png": {
    "type": "image/png",
    "etag": "\"1e26f7-FQrfkAqOBVazo/30gJUYVxaPoFE\"",
    "mtime": "2025-08-12T22:14:32.528Z",
    "size": 1976055,
    "path": "../public/img/partners/alphasense.png"
  },
  "/img/partners/avaloq.svg": {
    "type": "image/svg+xml",
    "etag": "\"1694-vebQOUcyLRI/h28B8v69EHV/rKg\"",
    "mtime": "2025-08-12T22:14:32.545Z",
    "size": 5780,
    "path": "../public/img/partners/avaloq.svg"
  },
  "/img/partners/holded.png": {
    "type": "image/png",
    "etag": "\"12a2-RXIdnMsdruk9AMzlqnNH2ygXiTw\"",
    "mtime": "2025-08-12T22:14:32.545Z",
    "size": 4770,
    "path": "../public/img/partners/holded.png"
  },
  "/img/partners/metaco.png": {
    "type": "image/png",
    "etag": "\"23657-Xn/sVA+MPfd+26oRKOFEKJHEqgU\"",
    "mtime": "2025-08-12T22:14:32.545Z",
    "size": 144983,
    "path": "../public/img/partners/metaco.png"
  },
  "/img/partners/monarch.png": {
    "type": "image/png",
    "etag": "\"1e01-/9gIes8F8ZEvI9ak0OqP2QukJgY\"",
    "mtime": "2025-08-12T22:14:32.545Z",
    "size": 7681,
    "path": "../public/img/partners/monarch.png"
  },
  "/img/partners/otransfer.png": {
    "type": "image/png",
    "etag": "\"5b0b-aBjMePlDAkU3JjWk1kCNR20Z45Y\"",
    "mtime": "2025-08-12T22:14:32.545Z",
    "size": 23307,
    "path": "../public/img/partners/otransfer.png"
  },
  "/img/partners/sygnum.png": {
    "type": "image/png",
    "etag": "\"114f-RPaAZ0PjUS+e3yLXz5w5peKJ1sU\"",
    "mtime": "2025-08-12T22:14:32.549Z",
    "size": 4431,
    "path": "../public/img/partners/sygnum.png"
  },
  "/img/users/vEesX1QVV5dnpP44EFeUo9GzkiERJUHm-1753115855827.jpeg": {
    "type": "image/jpeg",
    "etag": "\"8556c-uPJpf4ktPLTsNevje8OCaiuaOPk\"",
    "mtime": "2025-08-12T22:14:32.528Z",
    "size": 546156,
    "path": "../public/img/users/vEesX1QVV5dnpP44EFeUo9GzkiERJUHm-1753115855827.jpeg"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-OM2NAZPk9rYd6BcBbHk0CpAGUHU\"",
    "mtime": "2025-08-12T22:14:32.286Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/documents/business-profile/874a5b8e-dfef-492a-bfc7-b51335142dd2/874a5b8e-dfef-492a-bfc7-b51335142dd2-1754132569325.jpg": {
    "type": "image/jpeg",
    "etag": "\"66-zDj/5wMyc9WDq0XRyUwL/E06Ego\"",
    "mtime": "2025-08-12T22:14:32.575Z",
    "size": 102,
    "path": "../public/documents/business-profile/874a5b8e-dfef-492a-bfc7-b51335142dd2/874a5b8e-dfef-492a-bfc7-b51335142dd2-1754132569325.jpg"
  },
  "/documents/business-profile/874a5b8e-dfef-492a-bfc7-b51335142dd2/874a5b8e-dfef-492a-bfc7-b51335142dd2-1754132569333.jpg": {
    "type": "image/jpeg",
    "etag": "\"66-s78ZaLqHIzV1RlgB/dcye+nYoLk\"",
    "mtime": "2025-08-12T22:14:32.575Z",
    "size": 102,
    "path": "../public/documents/business-profile/874a5b8e-dfef-492a-bfc7-b51335142dd2/874a5b8e-dfef-492a-bfc7-b51335142dd2-1754132569333.jpg"
  },
  "/img/pages/about/about-us.jpg": {
    "type": "image/jpeg",
    "etag": "\"a9fa1-SNL3P8hkPR7CO4H1MQppDtVTWhk\"",
    "mtime": "2025-08-12T22:14:32.553Z",
    "size": 696225,
    "path": "../public/img/pages/about/about-us.jpg"
  },
  "/img/pages/about/careers.jpg": {
    "type": "image/jpeg",
    "etag": "\"a4299-FPFuI+liB/Mc13sQmeXsi2fKPL4\"",
    "mtime": "2025-08-12T22:14:32.566Z",
    "size": 672409,
    "path": "../public/img/pages/about/careers.jpg"
  },
  "/img/pages/about/mission.jpg": {
    "type": "image/jpeg",
    "etag": "\"6bbe-Tyd428zh5unz3GH9/C5XxWtp3Rk\"",
    "mtime": "2025-08-12T22:14:32.566Z",
    "size": 27582,
    "path": "../public/img/pages/about/mission.jpg"
  },
  "/img/pages/about/our-journey.jpg": {
    "type": "image/jpeg",
    "etag": "\"ac9b4-+szjHJWlwkclIj9ROWH55k28h60\"",
    "mtime": "2025-08-12T22:14:32.549Z",
    "size": 706996,
    "path": "../public/img/pages/about/our-journey.jpg"
  },
  "/img/pages/about/partnerships.jpg": {
    "type": "image/jpeg",
    "etag": "\"27096-pv3nqczIqE/xrGBZgo3d+s3EUo0\"",
    "mtime": "2025-08-12T22:14:32.553Z",
    "size": 159894,
    "path": "../public/img/pages/about/partnerships.jpg"
  },
  "/img/pages/about/team-at-work.jpg": {
    "type": "image/jpeg",
    "etag": "\"297cb-KaOYwy1XQ6HWeQ3QNYPSPk+n3ws\"",
    "mtime": "2025-08-12T22:14:32.558Z",
    "size": 169931,
    "path": "../public/img/pages/about/team-at-work.jpg"
  },
  "/img/pages/investments/automated-investment-platform.jpg": {
    "type": "image/jpeg",
    "etag": "\"19400-welsBPIRNsMQ8qpYzknf4B/vm1g\"",
    "mtime": "2025-08-12T22:14:32.549Z",
    "size": 103424,
    "path": "../public/img/pages/investments/automated-investment-platform.jpg"
  },
  "/img/pages/investments/bond-certificate.jpg": {
    "type": "image/jpeg",
    "etag": "\"35868-E5osCyvoZkVyylig145wmBLkAFc\"",
    "mtime": "2025-08-12T22:14:32.558Z",
    "size": 219240,
    "path": "../public/img/pages/investments/bond-certificate.jpg"
  },
  "/img/pages/investments/bonds.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e32d-i2w0ja0w82e+WXiYPD0cAhM9OUE\"",
    "mtime": "2025-08-12T22:14:32.558Z",
    "size": 123693,
    "path": "../public/img/pages/investments/bonds.jpg"
  },
  "/img/pages/investments/clock-tower.jpg": {
    "type": "image/jpeg",
    "etag": "\"33e6e-1unJgSXnWTHweuiWaxJ06z11U8s\"",
    "mtime": "2025-08-12T22:14:32.558Z",
    "size": 212590,
    "path": "../public/img/pages/investments/clock-tower.jpg"
  },
  "/img/pages/investments/commodities.webp": {
    "type": "image/webp",
    "etag": "\"6cc4-NYEa2neEzLKqCFAn2igEY2vlJSQ\"",
    "mtime": "2025-08-12T22:14:32.558Z",
    "size": 27844,
    "path": "../public/img/pages/investments/commodities.webp"
  },
  "/img/pages/investments/commodity-etfs.webp": {
    "type": "image/webp",
    "etag": "\"179d6-x422jInOigsVzRBZw5NNGaPNTuo\"",
    "mtime": "2025-08-12T22:14:32.558Z",
    "size": 96726,
    "path": "../public/img/pages/investments/commodity-etfs.webp"
  },
  "/img/pages/investments/commodity-types.jpg": {
    "type": "image/jpeg",
    "etag": "\"760be-m257GjwlIabwUlXiYf1vQQCwT64\"",
    "mtime": "2025-08-12T22:14:32.566Z",
    "size": 483518,
    "path": "../public/img/pages/investments/commodity-types.jpg"
  },
  "/img/pages/investments/commodity-types.svg": {
    "type": "image/svg+xml",
    "etag": "\"24b2f-YTC4gSuPWKIBEARrInYcYbnmfWA\"",
    "mtime": "2025-08-12T22:14:32.558Z",
    "size": 150319,
    "path": "../public/img/pages/investments/commodity-types.svg"
  },
  "/img/pages/investments/crypto-dashboard.png": {
    "type": "image/png",
    "etag": "\"2b6da-ThUZzTFo6LDAWD15lqpnw5hyUL0\"",
    "mtime": "2025-08-12T22:14:32.558Z",
    "size": 177882,
    "path": "../public/img/pages/investments/crypto-dashboard.png"
  },
  "/img/pages/investments/cryptocurrencies.jpg": {
    "type": "image/jpeg",
    "etag": "\"297f8-khoYq0W7T8mfORde5wlWXqk/geE\"",
    "mtime": "2025-08-12T22:14:32.566Z",
    "size": 169976,
    "path": "../public/img/pages/investments/cryptocurrencies.jpg"
  },
  "/img/pages/investments/diversified-portfolio.jpg": {
    "type": "image/jpeg",
    "etag": "\"6f62-Wio5zYVcw87pGvQIiiCHvm9k+jk\"",
    "mtime": "2025-08-12T22:14:32.562Z",
    "size": 28514,
    "path": "../public/img/pages/investments/diversified-portfolio.jpg"
  },
  "/img/pages/investments/expert-analyzing-data.jpg": {
    "type": "image/jpeg",
    "etag": "\"ce31-+hXu/5Q+2S/ooN9AYNTXW1zYC3A\"",
    "mtime": "2025-08-12T22:14:32.562Z",
    "size": 52785,
    "path": "../public/img/pages/investments/expert-analyzing-data.jpg"
  },
  "/img/pages/investments/financial-documents-and-calculator.jpg": {
    "type": "image/jpeg",
    "etag": "\"c9be-Nhs5/v6NRyormbW6cWHAaVm3DN4\"",
    "mtime": "2025-08-12T22:14:32.562Z",
    "size": 51646,
    "path": "../public/img/pages/investments/financial-documents-and-calculator.jpg"
  },
  "/img/pages/investments/financial-stability.jpg": {
    "type": "image/jpeg",
    "etag": "\"2458f-FKT8An16AOuHv/1IjRnpgIuEfyk\"",
    "mtime": "2025-08-12T22:14:32.562Z",
    "size": 148879,
    "path": "../public/img/pages/investments/financial-stability.jpg"
  },
  "/img/pages/investments/foreign-currencies.jpg": {
    "type": "image/jpeg",
    "etag": "\"4b5b2-h0g8qMkwSMHiWgqG7JyNMkjjRhc\"",
    "mtime": "2025-08-12T22:14:32.566Z",
    "size": 308658,
    "path": "../public/img/pages/investments/foreign-currencies.jpg"
  },
  "/img/pages/investments/forex.jpg": {
    "type": "image/jpeg",
    "etag": "\"58ff-Y1QC3cZ2PyQ2hWAtKCeFVuOlSxU\"",
    "mtime": "2025-08-12T22:14:32.562Z",
    "size": 22783,
    "path": "../public/img/pages/investments/forex.jpg"
  },
  "/img/pages/investments/global-economic-data.jpg": {
    "type": "image/jpeg",
    "etag": "\"10b76-NnKs62bmzSyRNgRNvW8zxPjKf8U\"",
    "mtime": "2025-08-12T22:14:32.562Z",
    "size": 68470,
    "path": "../public/img/pages/investments/global-economic-data.jpg"
  },
  "/img/pages/investments/global-stock-market.webp": {
    "type": "image/webp",
    "etag": "\"21ada-kMwFqs1R9pjWLhY32UNm+AzUCjw\"",
    "mtime": "2025-08-12T22:14:32.566Z",
    "size": 137946,
    "path": "../public/img/pages/investments/global-stock-market.webp"
  },
  "/img/pages/investments/grains.jpg": {
    "type": "image/jpeg",
    "etag": "\"13e61-+kY3r/Irw5nwLKlIYPaUNoDhXsU\"",
    "mtime": "2025-08-12T22:14:32.566Z",
    "size": 81505,
    "path": "../public/img/pages/investments/grains.jpg"
  },
  "/img/pages/investments/high-liquidity.jpg": {
    "type": "image/jpeg",
    "etag": "\"c0de-DYkcflvcL/nbPWCw2Y+1L4iH/Zw\"",
    "mtime": "2025-08-12T22:14:32.566Z",
    "size": 49374,
    "path": "../public/img/pages/investments/high-liquidity.jpg"
  },
  "/img/pages/investments/investment-analyst.png": {
    "type": "image/png",
    "etag": "\"17e00-SZ8L+SSOxZ7TpPQjA7G88832ohA\"",
    "mtime": "2025-08-12T22:14:32.566Z",
    "size": 97792,
    "path": "../public/img/pages/investments/investment-analyst.png"
  },
  "/img/pages/investments/leverage-scale.jpg": {
    "type": "image/jpeg",
    "etag": "\"564f-CAWOmGdTwLY0QAlllY4hsZngMT4\"",
    "mtime": "2025-08-12T22:14:32.566Z",
    "size": 22095,
    "path": "../public/img/pages/investments/leverage-scale.jpg"
  },
  "/img/pages/investments/mining-commodity.jpg": {
    "type": "image/jpeg",
    "etag": "\"2c7d1-yIwrouz/MHSJC9FZ39S+skw2Gvk\"",
    "mtime": "2025-08-12T22:14:32.566Z",
    "size": 182225,
    "path": "../public/img/pages/investments/mining-commodity.jpg"
  },
  "/img/pages/investments/property-types.jpg": {
    "type": "image/jpeg",
    "etag": "\"35fca-qUpV4CA88l2U1Nheo3Ywi6hhJ9U\"",
    "mtime": "2025-08-12T22:14:32.566Z",
    "size": 221130,
    "path": "../public/img/pages/investments/property-types.jpg"
  },
  "/img/pages/investments/secure-transaction.jpg": {
    "type": "image/jpeg",
    "etag": "\"be4e-D60r51acizWay1CjfYcOhI0rhPc\"",
    "mtime": "2025-08-12T22:14:32.570Z",
    "size": 48718,
    "path": "../public/img/pages/investments/secure-transaction.jpg"
  },
  "/img/pages/investments/steady-income-flow.jpg": {
    "type": "image/jpeg",
    "etag": "\"369ea-/m52BJttkHAC3uD7T6wE7XjliEE\"",
    "mtime": "2025-08-12T22:14:32.570Z",
    "size": 223722,
    "path": "../public/img/pages/investments/steady-income-flow.jpg"
  },
  "/img/pages/investments/stocks.jpg": {
    "type": "image/jpeg",
    "etag": "\"c205-teNk7iOm46fU9mBULoDxwd0pMdo\"",
    "mtime": "2025-08-12T22:14:32.570Z",
    "size": 49669,
    "path": "../public/img/pages/investments/stocks.jpg"
  },
  "/img/pages/investments/types-of-stocks.png": {
    "type": "image/png",
    "etag": "\"3e20f-Xljgp3ujIVcVNO/mB6yoz4Aqthg\"",
    "mtime": "2025-08-12T22:14:32.570Z",
    "size": 254479,
    "path": "../public/img/pages/investments/types-of-stocks.png"
  },
  "/img/pages/investments/understanding-forex.jpg": {
    "type": "image/jpeg",
    "etag": "\"10463-0zl5uJki64VrcIWgZeRRYqAVAlE\"",
    "mtime": "2025-08-12T22:14:32.570Z",
    "size": 66659,
    "path": "../public/img/pages/investments/understanding-forex.jpg"
  },
  "/img/pages/investments/what-are-stocks.svg": {
    "type": "image/svg+xml",
    "etag": "\"13602-DL0sEmq86UjFP8nT0+seEoQg5B0\"",
    "mtime": "2025-08-12T22:14:32.570Z",
    "size": 79362,
    "path": "../public/img/pages/investments/what-are-stocks.svg"
  },
  "/img/pages/investments/what-is-cryptocurrency.png": {
    "type": "image/png",
    "etag": "\"9dcd3-awodgtmBrlETf1CLtnM/5B/mRJ4\"",
    "mtime": "2025-08-12T22:14:32.570Z",
    "size": 646355,
    "path": "../public/img/pages/investments/what-is-cryptocurrency.png"
  },
  "/_nuxt/builds/meta/ed45d20b-12cf-4de3-83ce-a861f37f1c8c.json": {
    "type": "application/json",
    "etag": "\"8b-ABnrNc6xAHHmLy2iOru8N/lpa2E\"",
    "mtime": "2025-08-12T22:14:32.278Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/ed45d20b-12cf-4de3-83ce-a861f37f1c8c.json"
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

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_fonts/":{"maxAge":31536000},"/_nuxt/":{"maxAge":31536000}};

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
const _0l781a = eventHandler((event) => {
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
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
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

const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client"
    },
    "output": {
      "value": "/home/Adedero/dev/assetfusionx/server/generated/prisma",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      },
      {
        "fromEnvVar": null,
        "value": "debian-openssl-1.0.x"
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/home/Adedero/dev/assetfusionx/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativePath": "../../../prisma",
  "clientVersion": "6.13.0",
  "engineVersion": "361e86d0ea4987e9f53a565309b3eed797a6bcbd",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": 'generator client {\n  provider      = "prisma-client"\n  output        = "../server/generated/prisma"\n  binaryTargets = ["native", "debian-openssl-1.0.x"]\n}\n\ndatasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\ngenerator json {\n  provider = "prisma-json-types-generator"\n}\n\ngenerator zod {\n  provider = "zod-prisma-types"\n  output   = "../shared/zod"\n}\n\nenum UserRole {\n  admin\n  user\n}\n\nmodel User {\n  id            String    @id @default(uuid())\n  name          String\n  email         String    @unique\n  emailVerified Boolean\n  image         String?\n  role          UserRole  @default(user)\n  banned        Boolean?\n  banReason     String?\n  banExpires    DateTime?\n  createdAt     DateTime  @default(now())\n  updatedAt     DateTime  @updatedAt\n\n  // Existing Relations\n  profile  Profile?\n  sessions Session[]\n  accounts Account[]\n\n  // New Relations\n  createdAccounts                 FinancialAccount[]               @relation("UserCreatedAccounts")\n  accountMemberships              AccountUser[]\n  createdJointAccountRequests     JointAccountRequest[]\n  receivedJointAccountRequests    JointAccountRequest[]            @relation("JointRequestRecipient")\n  createdJointAccountModRequests  JointAccountModRequest[]\n  notifications                   Notification[]\n  approvedJointAccountModRequests JointAccountModRequestApproval[]\n\n  @@map("user")\n}\n\nmodel Session {\n  id             String   @id @default(uuid())\n  userId         String\n  token          String   @unique\n  expiresAt      DateTime\n  ipAddress      String?\n  userAgent      String?\n  impersonatedBy String?\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n\n  // Relation\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id @default(uuid())\n  userId                String\n  accountId             String\n  providerId            String\n  accessToken           String?\n  refreshToken          String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  idToken               String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n\n  // Relation\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@index([accountId, providerId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id @default(uuid())\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum KycStatus {\n  pending\n  verified\n  rejected\n  resubmit\n}\n\nenum GovernmentIdType {\n  international_passport\n  national_id\n  driving_license\n}\n\nmodel Profile {\n  id               String            @id @default(uuid())\n  userId           String            @unique\n  address          String?\n  country          String?\n  state            String?\n  city             String?\n  postalCode       String?\n  governmentId     String?\n  governmentIdType GovernmentIdType?\n  governmentIdExt  String?\n  kycStatus        KycStatus?\n  createdAt        DateTime          @default(now())\n  updatedAt        DateTime          @updatedAt\n\n  // Relation\n  user User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@map("profile")\n}\n\nmodel BusinessProfile {\n  id                 String   @id @default(uuid())\n  financialAccountId String   @unique\n  address            String?\n  creationMonth      String?\n  creationYear       Int?\n  proofOfAddress     String?\n  proofOfAddressExt  String?\n  certificate        String?\n  certificateExt     String?\n  approved           Boolean\n  createdAt          DateTime @default(now())\n  updatedAt          DateTime @updatedAt\n\n  // Relation\n  account FinancialAccount @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n\n  @@map("business_profile")\n}\n\nenum AccountType {\n  personal\n  business\n}\n\nenum AccountOwnership {\n  single\n  joint\n}\n\nenum AccountStatus {\n  active\n  dormant\n  closed\n}\n\nmodel FinancialAccount {\n  id                 String           @id @default(uuid())\n  creatorId          String\n  name               String\n  number             String\n  status             AccountStatus    @default(active)\n  type               AccountType      @default(personal)\n  ownership          AccountOwnership @default(single)\n  balance            Float            @default(0)\n  totalTransactions  Int              @default(0)\n  totalInvestments   Int              @default(0)\n  firstTransactionAt DateTime?\n  lastTransactionAt  DateTime?\n  closedAt           DateTime?\n  dormantAt          DateTime?\n  createdAt          DateTime         @default(now())\n  updatedAt          DateTime         @updatedAt\n\n  // Relations\n  creator                 User                     @relation("UserCreatedAccounts", fields: [creatorId], references: [id], onDelete: Cascade)\n  businessProfile         BusinessProfile?\n  accountUsers            AccountUser[]\n  jointAccountRequests    JointAccountRequest[]\n  jointAccountModRequests JointAccountModRequest[]\n  notifications           Notification[]\n  transactions            Transaction[]\n  receivedTransactions    Transaction[]            @relation("RecipientTransaction")\n  investments             Investment[]\n\n  @@index([status])\n  @@map("financial_account")\n}\n\nenum AccountUserRole {\n  owner\n  co_owner\n  manager\n  admin\n  accountant\n  investor\n  contributor\n  legal_guardian\n  signatory\n}\n\nmodel AccountUser {\n  id                 String          @id @default(uuid())\n  userId             String\n  financialAccountId String\n  role               AccountUserRole @default(owner)\n  ownership          Float           @default(100)\n  autosign           Boolean         @default(false)\n  createdAt          DateTime        @default(now())\n  updatedAt          DateTime        @updatedAt\n\n  // Relations\n  user             User             @relation(fields: [userId], references: [id], onDelete: Cascade)\n  financialAccount FinancialAccount @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n  transactions     Transaction[]\n  investments      Investment[]\n\n  @@unique([userId, financialAccountId])\n  @@index([financialAccountId])\n  @@map("account_user")\n}\n\nenum JointAccountRequestStatus {\n  pending\n  accepted\n  rejected\n}\n\nmodel JointAccountRequest {\n  id                 String                    @id @default(uuid())\n  creatorId          String\n  recipientName      String\n  recipientEmail     String\n  role               AccountUserRole\n  ownership          Float\n  recipientId        String? // If user already has an account\n  financialAccountId String\n  description        String?\n  lastReminderAt     DateTime?\n  reminderCount      Int                       @default(0)\n  status             JointAccountRequestStatus @default(pending)\n  createdAt          DateTime                  @default(now())\n  updatedAt          DateTime                  @updatedAt\n\n  // Relation\n  creator          User             @relation(fields: [creatorId], references: [id], onDelete: Cascade)\n  recipient        User?            @relation("JointRequestRecipient", fields: [recipientId], references: [id], onDelete: Cascade)\n  financialAccount FinancialAccount @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n\n  @@map("joint_account_request")\n}\n\nenum JointAccountModRequestType {\n  transfer\n  withdrawal\n  name_change\n}\n\nmodel JointAccountModRequest {\n  id                 String                     @id @default(uuid())\n  creatorId          String\n  financialAccountId String\n  type               JointAccountModRequestType\n  transactionId      String?\n  description        String?\n  createdAt          DateTime                   @default(now())\n  updatedAt          DateTime                   @updatedAt\n\n  creator     User             @relation(fields: [creatorId], references: [id], onDelete: Cascade)\n  account     FinancialAccount @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n  transaction Transaction?     @relation(fields: [transactionId], references: [id], onDelete: Cascade)\n\n  approvals JointAccountModRequestApproval[]\n\n  @@map("joint_account_mod_request")\n}\n\nmodel JointAccountModRequestApproval {\n  id                       String                    @id @default(uuid())\n  jointAccountModRequestId String\n  approverId               String\n  status                   JointAccountRequestStatus @default(pending)\n  createdAt                DateTime                  @default(now())\n  updatedAt                DateTime                  @updatedAt\n\n  request  JointAccountModRequest @relation(fields: [jointAccountModRequestId], references: [id], onDelete: Cascade)\n  approver User                   @relation(fields: [approverId], references: [id], onDelete: Cascade)\n\n  @@map("joint_account_mod_approval")\n}\n\nenum ProfitDistribution {\n  daily\n  weekly\n  bi_weekly\n  monthly\n}\n\nenum InvestmentPlanCategory {\n  forex\n  stocks\n  real_estate\n  bonds\n  commodities\n  cryptocurrencies\n  derivatives\n}\n\nmodel InvestmentPlan {\n  id                       String                 @id @default(uuid())\n  name                     String\n  category                 InvestmentPlanCategory\n  minimumDeposit           Float\n  maximumDeposit           Float\n  duration                 Int\n  profitDistribution       ProfitDistribution     @default(daily)\n  percentageTotalReturn    Float\n  percentagePeriodicReturn Float\n  terminationFee           Float                  @default(0)\n  createdAt                DateTime               @default(now())\n  updatedAt                DateTime               @updatedAt\n\n  @@map("investment_plan")\n}\n\nenum InvestmentStatus {\n  open\n  closed\n  paused\n  terminated\n}\n\nmodel Investment {\n  id                 String                 @id @default(uuid())\n  financialAccountId String\n  investorId         String\n  deposit            Float\n  investmentName     String\n  totalProfit        Float                  @default(0)\n  profitCount        Int                    @default(0)\n  status             InvestmentStatus       @default(open)\n  pausedAt           DateTime?\n  pausedReason       String?\n  closedAt           DateTime?\n  closedReason       String?\n  terminatedAt       DateTime?\n  terminatedReason   String?\n  category           InvestmentPlanCategory\n  daysCompleted      Int                    @default(0)\n  duration           Int\n  totalReturn        Float\n  periodicReturn     Float\n  profitDistribution ProfitDistribution     @default(daily)\n  terminationFee     Float                  @default(0)\n  createdAt          DateTime               @default(now())\n  updatedAt          DateTime               @updatedAt\n\n  // Relation\n  investor         AccountUser      @relation(fields: [investorId], references: [id], onDelete: Cascade)\n  // profits          Profit[]\n  transactions     Transaction[]\n  financialAccount FinancialAccount @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n\n  @@index([financialAccountId])\n  @@index([status])\n  @@map("investment")\n}\n\n/**\n * model Profit {\n * id                 String   @id @default(uuid())\n * financialAccountId String\n * investmentId       String\n * amount             Float\n * createdAt          DateTime @default(now())\n * updatedAt          DateTime @updatedAt\n * // Relation\n * investment       Investment       @relation(fields: [investmentId], references: [id], onDelete: Cascade)\n * financialAccount FinancialAccount @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n * @@map("profit")\n * }\n */\n\nenum TransactionType {\n  deposit\n  withdrawal\n  transfer\n  investment\n  profit\n}\n\nenum TransactionStatus {\n  pending\n  successfull\n  reversed\n  failed\n}\n\nenum TransactionMedium {\n  wire\n  crypto\n}\n\nmodel Transaction {\n  id                             String            @id @default(uuid())\n  amount                         Float\n  currency                       String            @default("USD")\n  USDAmount                      Float\n  rate                           Float             @default(1)\n  charges                        Float             @default(0)\n  financialAccountId             String\n  type                           TransactionType\n  initiatorAccountId             String\n  recipientAccountId             String?\n  investmentId                   String?\n  status                         TransactionStatus @default(pending)\n  parentTransactionId            String?\n  approvedAt                     DateTime?\n  failedAt                       DateTime?\n  failReason                     String?\n  depositWalletAddress           String?\n  depositWalletAddressNetwork    String?\n  withdrawalWalletAddress        String?\n  withdrawalWalletAddressNetwork String?\n  bank                           String?\n  bankAccount                    String?\n  description                    String?\n  createdAt                      DateTime          @default(now())\n  updatedAt                      DateTime          @updatedAt\n\n  initiator               AccountUser              @relation(fields: [initiatorAccountId], references: [id])\n  financialAccount        FinancialAccount         @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n  recipientAccount        FinancialAccount?        @relation("RecipientTransaction", fields: [recipientAccountId], references: [id])\n  investment              Investment?              @relation(fields: [investmentId], references: [id], onDelete: Cascade)\n  jointAccountModRequests JointAccountModRequest[]\n  parentTransaction       Transaction?             @relation("childTransactions", fields: [parentTransactionId], references: [id])\n  childTransactions       Transaction[]            @relation("childTransactions")\n\n  @@map("transaction")\n}\n\nenum NotificationBodyType {\n  string\n  html\n}\n\nmodel Notification {\n  id                 String               @id @default(uuid())\n  title              String\n  body               String\n  bodyType           NotificationBodyType @default(string)\n  userId             String?\n  financialAccountId String?\n  link               String?\n  isRead             Boolean              @default(false)\n  createdAt          DateTime             @default(now())\n  updatedAt          DateTime             @updatedAt\n\n  user             User?             @relation(fields: [userId], references: [id], onDelete: Cascade)\n  financialAccount FinancialAccount? @relation(fields: [financialAccountId], references: [id], onDelete: Cascade)\n\n  @@map("notification")\n}\n\nmodel Currency {\n  id                   String    @id @default(uuid())\n  name                 String\n  symbol               String    @unique\n  image                String?\n  rate                 Float\n  rateUpdatedAt        DateTime?\n  walletAddress        String?\n  walletAddressNetwork String?\n  allowWithdrawal      Boolean   @default(true)\n  withdrawalCharge     Float     @default(0)\n  createdAt            DateTime  @default(now())\n  updatedAt            DateTime  @updatedAt\n\n  @@map("currency")\n}\n\nmodel Settings {\n  id               String  @id @default(uuid())\n  allowWithdrawals Boolean\n\n  @@map("settings")\n}\n',
  "inlineSchemaHash": "ec1865197d2c636f4d4bc5956c96713fd717c620ec03d86a9c66dc35760bc61d",
  "copyEngine": true,
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "dirname": ""
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"dbName":"user","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"email","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"emailVerified","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"image","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"UserRole","nativeType":null,"default":"user","isGenerated":false,"isUpdatedAt":false},{"name":"banned","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"banReason","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"banExpires","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"profile","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Profile","nativeType":null,"relationName":"ProfileToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"sessions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Session","nativeType":null,"relationName":"SessionToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"accounts","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Account","nativeType":null,"relationName":"AccountToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdAccounts","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"UserCreatedAccounts","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"accountMemberships","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AccountUser","nativeType":null,"relationName":"AccountUserToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdJointAccountRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountRequest","nativeType":null,"relationName":"JointAccountRequestToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"receivedJointAccountRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountRequest","nativeType":null,"relationName":"JointRequestRecipient","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"createdJointAccountModRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequest","nativeType":null,"relationName":"JointAccountModRequestToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"notifications","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Notification","nativeType":null,"relationName":"NotificationToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"approvedJointAccountModRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequestApproval","nativeType":null,"relationName":"JointAccountModRequestApprovalToUser","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Session":{"dbName":"session","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"token","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"expiresAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"ipAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"userAgent","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"impersonatedBy","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"SessionToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Account":{"dbName":"account","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"accountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"providerId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"accessToken","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"refreshToken","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"accessTokenExpiresAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"refreshTokenExpiresAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"scope","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"idToken","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"password","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"AccountToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Verification":{"dbName":"verification","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"identifier","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"value","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"expiresAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Profile":{"dbName":"profile","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"address","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"country","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"state","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"city","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"postalCode","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"governmentId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"governmentIdType","kind":"enum","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"GovernmentIdType","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"governmentIdExt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"kycStatus","kind":"enum","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"KycStatus","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"ProfileToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"BusinessProfile":{"dbName":"business_profile","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"address","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"creationMonth","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"creationYear","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"proofOfAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"proofOfAddressExt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"certificate","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"certificateExt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"approved","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"account","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"BusinessProfileToFinancialAccount","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"FinancialAccount":{"dbName":"financial_account","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"creatorId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"number","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"AccountStatus","nativeType":null,"default":"active","isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"AccountType","nativeType":null,"default":"personal","isGenerated":false,"isUpdatedAt":false},{"name":"ownership","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"AccountOwnership","nativeType":null,"default":"single","isGenerated":false,"isUpdatedAt":false},{"name":"balance","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"totalTransactions","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"totalInvestments","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"firstTransactionAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"lastTransactionAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"closedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"dormantAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"creator","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"UserCreatedAccounts","relationFromFields":["creatorId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"businessProfile","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"BusinessProfile","nativeType":null,"relationName":"BusinessProfileToFinancialAccount","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"accountUsers","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AccountUser","nativeType":null,"relationName":"AccountUserToFinancialAccount","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"jointAccountRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountRequest","nativeType":null,"relationName":"FinancialAccountToJointAccountRequest","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"jointAccountModRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequest","nativeType":null,"relationName":"FinancialAccountToJointAccountModRequest","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"notifications","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Notification","nativeType":null,"relationName":"FinancialAccountToNotification","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"transactions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"FinancialAccountToTransaction","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"receivedTransactions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"RecipientTransaction","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"investments","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Investment","nativeType":null,"relationName":"FinancialAccountToInvestment","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"AccountUser":{"dbName":"account_user","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"AccountUserRole","nativeType":null,"default":"owner","isGenerated":false,"isUpdatedAt":false},{"name":"ownership","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":100,"isGenerated":false,"isUpdatedAt":false},{"name":"autosign","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"AccountUserToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"financialAccount","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"AccountUserToFinancialAccount","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"transactions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"AccountUserToTransaction","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"investments","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Investment","nativeType":null,"relationName":"AccountUserToInvestment","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[["userId","financialAccountId"]],"uniqueIndexes":[{"name":null,"fields":["userId","financialAccountId"]}],"isGenerated":false},"JointAccountRequest":{"dbName":"joint_account_request","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"creatorId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"recipientName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"recipientEmail","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"role","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AccountUserRole","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"ownership","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"recipientId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"lastReminderAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"reminderCount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"JointAccountRequestStatus","nativeType":null,"default":"pending","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"creator","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"JointAccountRequestToUser","relationFromFields":["creatorId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"recipient","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"JointRequestRecipient","relationFromFields":["recipientId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"financialAccount","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"FinancialAccountToJointAccountRequest","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"JointAccountModRequest":{"dbName":"joint_account_mod_request","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"creatorId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequestType","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"transactionId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"creator","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"JointAccountModRequestToUser","relationFromFields":["creatorId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"account","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"FinancialAccountToJointAccountModRequest","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"transaction","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"JointAccountModRequestToTransaction","relationFromFields":["transactionId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"approvals","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequestApproval","nativeType":null,"relationName":"JointAccountModRequestToJointAccountModRequestApproval","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"JointAccountModRequestApproval":{"dbName":"joint_account_mod_approval","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"jointAccountModRequestId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"approverId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"JointAccountRequestStatus","nativeType":null,"default":"pending","isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"request","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequest","nativeType":null,"relationName":"JointAccountModRequestToJointAccountModRequestApproval","relationFromFields":["jointAccountModRequestId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"approver","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"JointAccountModRequestApprovalToUser","relationFromFields":["approverId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"InvestmentPlan":{"dbName":"investment_plan","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"category","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"InvestmentPlanCategory","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"minimumDeposit","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"maximumDeposit","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"duration","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"profitDistribution","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ProfitDistribution","nativeType":null,"default":"daily","isGenerated":false,"isUpdatedAt":false},{"name":"percentageTotalReturn","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"percentagePeriodicReturn","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"terminationFee","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Investment":{"dbName":"investment","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"investorId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"deposit","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"investmentName","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"totalProfit","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"profitCount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"InvestmentStatus","nativeType":null,"default":"open","isGenerated":false,"isUpdatedAt":false},{"name":"pausedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"pausedReason","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"closedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"closedReason","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"terminatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"terminatedReason","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"category","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"InvestmentPlanCategory","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"daysCompleted","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Int","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"duration","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Int","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"totalReturn","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"periodicReturn","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"profitDistribution","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"ProfitDistribution","nativeType":null,"default":"daily","isGenerated":false,"isUpdatedAt":false},{"name":"terminationFee","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"investor","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AccountUser","nativeType":null,"relationName":"AccountUserToInvestment","relationFromFields":["investorId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"transactions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"InvestmentToTransaction","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccount","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"FinancialAccountToInvestment","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Transaction":{"dbName":"transaction","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"amount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"currency","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":"USD","isGenerated":false,"isUpdatedAt":false},{"name":"USDAmount","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"rate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":1,"isGenerated":false,"isUpdatedAt":false},{"name":"charges","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"type","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"TransactionType","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"initiatorAccountId","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"recipientAccountId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"investmentId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"status","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"TransactionStatus","nativeType":null,"default":"pending","isGenerated":false,"isUpdatedAt":false},{"name":"parentTransactionId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"approvedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"failedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"failReason","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"depositWalletAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"depositWalletAddressNetwork","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"withdrawalWalletAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"withdrawalWalletAddressNetwork","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"bank","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"bankAccount","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"description","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"initiator","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"AccountUser","nativeType":null,"relationName":"AccountUserToTransaction","relationFromFields":["initiatorAccountId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccount","kind":"object","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"FinancialAccountToTransaction","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"recipientAccount","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"RecipientTransaction","relationFromFields":["recipientAccountId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"investment","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Investment","nativeType":null,"relationName":"InvestmentToTransaction","relationFromFields":["investmentId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"jointAccountModRequests","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"JointAccountModRequest","nativeType":null,"relationName":"JointAccountModRequestToTransaction","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false},{"name":"parentTransaction","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"childTransactions","relationFromFields":["parentTransactionId"],"relationToFields":["id"],"isGenerated":false,"isUpdatedAt":false},{"name":"childTransactions","kind":"object","isList":true,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Transaction","nativeType":null,"relationName":"childTransactions","relationFromFields":[],"relationToFields":[],"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Notification":{"dbName":"notification","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"title","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"body","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"bodyType","kind":"enum","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"NotificationBodyType","nativeType":null,"default":"string","isGenerated":false,"isUpdatedAt":false},{"name":"userId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"financialAccountId","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":true,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"link","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"isRead","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":false,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true},{"name":"user","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"User","nativeType":null,"relationName":"NotificationToUser","relationFromFields":["userId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false},{"name":"financialAccount","kind":"object","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"FinancialAccount","nativeType":null,"relationName":"FinancialAccountToNotification","relationFromFields":["financialAccountId"],"relationToFields":["id"],"relationOnDelete":"Cascade","isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Currency":{"dbName":"currency","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"name","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"symbol","kind":"scalar","isList":false,"isRequired":true,"isUnique":true,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"image","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"rate","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Float","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"rateUpdatedAt","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"walletAddress","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"walletAddressNetwork","kind":"scalar","isList":false,"isRequired":false,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"String","nativeType":null,"isGenerated":false,"isUpdatedAt":false},{"name":"allowWithdrawal","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Boolean","nativeType":null,"default":true,"isGenerated":false,"isUpdatedAt":false},{"name":"withdrawalCharge","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"Float","nativeType":null,"default":0,"isGenerated":false,"isUpdatedAt":false},{"name":"createdAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":true,"type":"DateTime","nativeType":null,"default":{"name":"now","args":[]},"isGenerated":false,"isUpdatedAt":false},{"name":"updatedAt","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"DateTime","nativeType":null,"isGenerated":false,"isUpdatedAt":true}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false},"Settings":{"dbName":"settings","schema":null,"fields":[{"name":"id","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":true,"isReadOnly":false,"hasDefaultValue":true,"type":"String","nativeType":null,"default":{"name":"uuid","args":[4]},"isGenerated":false,"isUpdatedAt":false},{"name":"allowWithdrawals","kind":"scalar","isList":false,"isRequired":true,"isUnique":false,"isId":false,"isReadOnly":false,"hasDefaultValue":false,"type":"Boolean","nativeType":null,"isGenerated":false,"isUpdatedAt":false}],"primaryKey":null,"uniqueFields":[],"uniqueIndexes":[],"isGenerated":false}},"enums":{"UserRole":{"values":[{"name":"admin","dbName":null},{"name":"user","dbName":null}],"dbName":null},"KycStatus":{"values":[{"name":"pending","dbName":null},{"name":"verified","dbName":null},{"name":"rejected","dbName":null},{"name":"resubmit","dbName":null}],"dbName":null},"GovernmentIdType":{"values":[{"name":"international_passport","dbName":null},{"name":"national_id","dbName":null},{"name":"driving_license","dbName":null}],"dbName":null},"AccountType":{"values":[{"name":"personal","dbName":null},{"name":"business","dbName":null}],"dbName":null},"AccountOwnership":{"values":[{"name":"single","dbName":null},{"name":"joint","dbName":null}],"dbName":null},"AccountStatus":{"values":[{"name":"active","dbName":null},{"name":"dormant","dbName":null},{"name":"closed","dbName":null}],"dbName":null},"AccountUserRole":{"values":[{"name":"owner","dbName":null},{"name":"co_owner","dbName":null},{"name":"manager","dbName":null},{"name":"admin","dbName":null},{"name":"accountant","dbName":null},{"name":"investor","dbName":null},{"name":"contributor","dbName":null},{"name":"legal_guardian","dbName":null},{"name":"signatory","dbName":null}],"dbName":null},"JointAccountRequestStatus":{"values":[{"name":"pending","dbName":null},{"name":"accepted","dbName":null},{"name":"rejected","dbName":null}],"dbName":null},"JointAccountModRequestType":{"values":[{"name":"transfer","dbName":null},{"name":"withdrawal","dbName":null},{"name":"name_change","dbName":null}],"dbName":null},"ProfitDistribution":{"values":[{"name":"daily","dbName":null},{"name":"weekly","dbName":null},{"name":"bi_weekly","dbName":null},{"name":"monthly","dbName":null}],"dbName":null},"InvestmentPlanCategory":{"values":[{"name":"forex","dbName":null},{"name":"stocks","dbName":null},{"name":"real_estate","dbName":null},{"name":"bonds","dbName":null},{"name":"commodities","dbName":null},{"name":"cryptocurrencies","dbName":null},{"name":"derivatives","dbName":null}],"dbName":null},"InvestmentStatus":{"values":[{"name":"open","dbName":null},{"name":"closed","dbName":null},{"name":"paused","dbName":null},{"name":"terminated","dbName":null}],"dbName":null},"TransactionType":{"values":[{"name":"deposit","dbName":null},{"name":"withdrawal","dbName":null},{"name":"transfer","dbName":null},{"name":"investment","dbName":null},{"name":"profit","dbName":null}],"dbName":null},"TransactionStatus":{"values":[{"name":"pending","dbName":null},{"name":"successfull","dbName":null},{"name":"reversed","dbName":null},{"name":"failed","dbName":null}],"dbName":null},"TransactionMedium":{"values":[{"name":"wire","dbName":null},{"name":"crypto","dbName":null}],"dbName":null},"NotificationBodyType":{"values":[{"name":"string","dbName":null},{"name":"html","dbName":null}],"dbName":null}},"types":{}}');
config.engineWasm = void 0;
config.compilerWasm = void 0;
function getPrismaClientClass(dirname) {
  config.dirname = dirname;
  return runtime.getPrismaClient(config);
}

const __dirname = path$1.dirname(fileURLToPath(globalThis._importMeta_.url));
const PrismaClient = getPrismaClientClass(__dirname);
path$1.join(__dirname, "libquery_engine-debian-openssl-3.0.x.so.node");
path$1.join(process$1.cwd(), "server/generated/prisma/libquery_engine-debian-openssl-3.0.x.so.node");
path$1.join(__dirname, "libquery_engine-debian-openssl-1.0.x.so.node");
path$1.join(process$1.cwd(), "server/generated/prisma/libquery_engine-debian-openssl-1.0.x.so.node");

const prisma = new PrismaClient();

function normalizeException(exception) {
  let normalizedException;
  if (exception instanceof Error) {
    normalizedException = exception;
  } else if (typeof exception === "object" && exception !== null && !Array.isArray(exception)) {
    if ("data" in exception) {
      normalizedException = new Error(exception.data.statusMessage);
    } else if ("message" in exception && typeof exception.message === "string") {
      normalizedException = new Error(exception.message);
    } else if ("statusMessage" in exception && typeof exception.statusMessage === "string") {
      normalizedException = new Error(exception.statusMessage);
    } else if ("statusText" in exception && typeof exception.statusText === "string") {
      normalizedException = new Error(exception.statusText);
    } else {
      try {
        normalizedException = new Error(JSON.stringify(exception));
      } catch {
        normalizedException = new Error(
          `Unserializable error object of type: ${Object.prototype.toString.call(
            exception
          )}`
        );
      }
    }
    if ("stack" in exception && typeof exception.stack === "string") {
      normalizedException.stack = exception.stack;
    }
  } else {
    normalizedException = new Error(String(exception));
  }
  return normalizedException;
}

const nodemailerConfig = {
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  service: process.env.EMAIL_SERVICE
};
const transporter = nodemailer.createTransport(nodemailerConfig);
const sendEmail = async (mailOptions) => {
  var _a;
  try {
    const info = await transporter.sendMail({
      from: { name: "AssetFusionX", address: (_a = process.env.USER_EMAIL) != null ? _a : "" },
      ...mailOptions
    });
    return { data: info, error: null };
  } catch (error) {
    return { data: null, error: normalizeException(error) };
  }
};

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

  <section>
    If clicking the button above doesn't work you can click this link or copy and paste it in your browser: ${url}
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

  <section>
    If clicking the button above doesn't work you can click this link or copy and paste it in your browser: ${url}
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

  <section>
    If clicking the button above doesn't work you can click this link or copy and paste it in your browser: ${url}
  </section>
</section>
`;
  return Layout(body, { subject });
}

const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
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
      }) => {
        const subject = "Approve email change";
        await sendEmail({
          to: user.email,
          subject,
          html: emailChangeTemplate({ user, url, subject })
        });
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

const _Orqy2Q = defineEventHandler(async (event) => {
  const requestUrl = getRequestURL(event);
  const isUserRoute = requestUrl.pathname.includes("/user");
  const isAdminRoute = requestUrl.pathname.includes("/admin");
  if (isUserRoute || isAdminRoute) {
    const expectedRole = isAdminRoute ? "admin" : "user";
    const session = await auth.api.getSession(event);
    if (!session) {
      throw createError$1({
        statusCode: 401,
        message: "You must be logged in to access this resource."
      });
    }
    if (session.user.role !== expectedRole) {
      throw createError$1({
        statusCode: 403,
        message: `Access denied. You must be logged in as a ${expectedRole}.`
      });
    }
    event.context.user = session.user;
  }
});

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
  return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
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

const reverseTransaction = async (financialAccountId, transactionId, status) => {
  const transaction = await prisma.transaction.findUniqueOrThrow({
    where: {
      id: transactionId,
      type: "withdrawal"
    }
  });
  const refundAmount = transaction.USDAmount + transaction.charges;
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
        status
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
    await unlink$1(filePath);
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: normalizeException(error) };
  }
}

const collections = {
  'lucide': () => import('../_/icons.mjs').then(m => m.default),
};

const DEFAULT_ENDPOINT = "https://api.iconify.design";
const _luIRAS = defineCachedEventHandler(async (event) => {
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

const _SxA8c9 = defineEventHandler(() => {});

const _Aatz7c = lazyEventHandler(() => {
  const opts = useRuntimeConfig().ipx || {};
  const fsDir = opts?.fs?.dir ? (Array.isArray(opts.fs.dir) ? opts.fs.dir : [opts.fs.dir]).map((dir) => isAbsolute(dir) ? dir : fileURLToPath(new URL(dir, globalThis._importMeta_.url))) : void 0;
  const fsStorage = opts.fs?.dir ? ipxFSStorage({ ...opts.fs, dir: fsDir }) : void 0;
  const httpStorage = opts.http?.domains ? ipxHttpStorage({ ...opts.http }) : void 0;
  if (!fsStorage && !httpStorage) {
    throw new Error("IPX storage is not configured!");
  }
  const ipxOptions = {
    ...opts,
    storage: fsStorage || httpStorage,
    httpStorage
  };
  const ipx = createIPX(ipxOptions);
  const ipxHandler = createIPXH3Handler(ipx);
  return useBase(opts.baseURL, ipxHandler);
});

const _lazy_fQHCnr = () => import('../routes/api/auth/_...all_.mjs');
const _lazy_fhSWsE = () => import('../routes/api/index.get.mjs');
const _lazy_MT_RDj = () => import('../routes/api/index.get2.mjs');
const _lazy_RUsoFl = () => import('../routes/api/index.get3.mjs');
const _lazy_PVg2VH = () => import('../routes/api/user/financial-accounts/_accountId/account-user/_accountUserId_.delete.mjs');
const _lazy_n7saoJ = () => import('../routes/api/user/financial-accounts/_accountId/account-users.get.mjs');
const _lazy_vaD6BK = () => import('../routes/api/user/financial-accounts/_accountId/business-profile.get.mjs');
const _lazy_ndN6rK = () => import('../routes/api/user/financial-accounts/_accountId/business-profile.put.mjs');
const _lazy_9QABdl = () => import('../routes/api/user/financial-accounts/index.get.mjs');
const _lazy_JwOzvQ = () => import('../routes/api/user/financial-accounts/index.put.mjs');
const _lazy_0XKEqn = () => import('../routes/api/user/financial-accounts/_accountId/investments/index.get.mjs');
const _lazy_AG0d35 = () => import('../routes/api/user/financial-accounts/_accountId/investments/_investmentId/profits.get.mjs');
const _lazy_9fUm6G = () => import('../routes/api/user/financial-accounts/_accountId/index.get.mjs');
const _lazy_nXfgS6 = () => import('../routes/api/user/financial-accounts/_accountId/index.post.mjs');
const _lazy_EALpGU = () => import('../routes/api/user/financial-accounts/_accountId/join-requests.get.mjs');
const _lazy_pe6EbY = () => import('../routes/api/user/financial-accounts/_accountId/join-requests.post.mjs');
const _lazy_vvsPtk = () => import('../routes/api/user/financial-accounts/_accountId/mod-requests/_modRequestId_.put.mjs');
const _lazy_Z1NZr5 = () => import('../routes/api/user/financial-accounts/_accountId/index.get2.mjs');
const _lazy_T7_cNh = () => import('../routes/api/user/financial-accounts/_accountId/notifications.get.mjs');
const _lazy_JBOVUW = () => import('../routes/api/user/financial-accounts/_accountId/transactions/_transactionId_.get.mjs');
const _lazy_Ug7N4P = () => import('../routes/api/user/financial-accounts/_accountId/index.get3.mjs');
const _lazy_0ZtuXA = () => import('../routes/api/user/index.get.mjs');
const _lazy_ib4dMW = () => import('../routes/api/user/index.post.mjs');
const _lazy_ZSwull = () => import('../routes/api/index.put.mjs');
const _lazy_HESTj7 = () => import('../routes/api/user/join-requests/_requestId/accept.post.mjs');
const _lazy_e9toxG = () => import('../routes/api/user/join-requests/index.delete.mjs');
const _lazy_tT4Sf4 = () => import('../routes/api/user/join-requests/_requestId/send-reminder.post.mjs');
const _lazy_YQrybL = () => import('../routes/api/user/index.get2.mjs');
const _lazy_OkMZG_ = () => import('../routes/api/user/notifications/_notificationId_.delete.mjs');
const _lazy_RSepLH = () => import('../routes/api/user/index.get3.mjs');
const _lazy_WfJmxW = () => import('../routes/api/user/index.patch.mjs');
const _lazy_m4L6vJ = () => import('../routes/api/user/index.put.mjs');
const _lazy_1UhlXn = () => import('../routes/api/user/notifications/unread/check.get.mjs');
const _lazy_ZHJA9m = () => import('../routes/api/user/notifications/unread/count.get.mjs');
const _lazy_SmC989 = () => import('../routes/api/user/pages/dashboard.get.mjs');
const _lazy_IcHdzF = () => import('../routes/api/user/index.get4.mjs');
const _lazy_h8Rhtw = () => import('../routes/api/user/index.put2.mjs');
const _lazy_WCtQdp = () => import('../routes/api/user/profile/kyc.put.mjs');
const _lazy_w4FnIJ = () => import('../routes/api/user/transactions/deposit.post.mjs');
const _lazy_09Wws5 = () => import('../routes/api/user/transactions/init-deposit.get.mjs');
const _lazy_x3H4Mw = () => import('../routes/api/user/transactions/init-withdrawal.get.mjs');
const _lazy_s7gP6C = () => import('../routes/api/user/transactions/withdrawal.post.mjs');
const _lazy_VEugJO = () => import('../routes/renderer.mjs').then(function (n) { return n.r; });

const handlers = [
  { route: '', handler: _0l781a, lazy: false, middleware: true, method: undefined },
  { route: '', handler: _Orqy2Q, lazy: false, middleware: true, method: undefined },
  { route: '/api/auth/**:all', handler: _lazy_fQHCnr, lazy: true, middleware: false, method: undefined },
  { route: '/api/currencies', handler: _lazy_fhSWsE, lazy: true, middleware: false, method: "get" },
  { route: '/api/investment-plans', handler: _lazy_MT_RDj, lazy: true, middleware: false, method: "get" },
  { route: '/api/settings', handler: _lazy_RUsoFl, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/account-user/:accountUserId', handler: _lazy_PVg2VH, lazy: true, middleware: false, method: "delete" },
  { route: '/api/user/financial-accounts/:accountId/account-users', handler: _lazy_n7saoJ, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/business-profile', handler: _lazy_vaD6BK, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/business-profile', handler: _lazy_ndN6rK, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/financial-accounts/:accountId', handler: _lazy_9QABdl, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId', handler: _lazy_JwOzvQ, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/financial-accounts/:accountId/investments/:investmentId', handler: _lazy_0XKEqn, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/investments/:investmentId/profits', handler: _lazy_AG0d35, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/investments', handler: _lazy_9fUm6G, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/investments', handler: _lazy_nXfgS6, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/financial-accounts/:accountId/join-requests', handler: _lazy_EALpGU, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/join-requests', handler: _lazy_pe6EbY, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/financial-accounts/:accountId/mod-requests/:modRequestId', handler: _lazy_vvsPtk, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/financial-accounts/:accountId/mod-requests', handler: _lazy_Z1NZr5, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/notifications', handler: _lazy_T7_cNh, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/transactions/:transactionId', handler: _lazy_JBOVUW, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts/:accountId/transactions', handler: _lazy_Ug7N4P, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts', handler: _lazy_0ZtuXA, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/financial-accounts', handler: _lazy_ib4dMW, lazy: true, middleware: false, method: "post" },
  { route: '/api/user', handler: _lazy_ZSwull, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/join-requests/:requestId/accept', handler: _lazy_HESTj7, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/join-requests/:requestId', handler: _lazy_e9toxG, lazy: true, middleware: false, method: "delete" },
  { route: '/api/user/join-requests/:requestId/send-reminder', handler: _lazy_tT4Sf4, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/join-requests', handler: _lazy_YQrybL, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/notifications/:notificationId', handler: _lazy_OkMZG_, lazy: true, middleware: false, method: "delete" },
  { route: '/api/user/notifications', handler: _lazy_RSepLH, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/notifications', handler: _lazy_WfJmxW, lazy: true, middleware: false, method: "patch" },
  { route: '/api/user/notifications', handler: _lazy_m4L6vJ, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/notifications/unread/check', handler: _lazy_1UhlXn, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/notifications/unread/count', handler: _lazy_ZHJA9m, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/pages/dashboard', handler: _lazy_SmC989, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/profile', handler: _lazy_IcHdzF, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/profile', handler: _lazy_h8Rhtw, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/profile/kyc', handler: _lazy_WCtQdp, lazy: true, middleware: false, method: "put" },
  { route: '/api/user/transactions/deposit', handler: _lazy_w4FnIJ, lazy: true, middleware: false, method: "post" },
  { route: '/api/user/transactions/init-deposit', handler: _lazy_09Wws5, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/transactions/init-withdrawal', handler: _lazy_x3H4Mw, lazy: true, middleware: false, method: "get" },
  { route: '/api/user/transactions/withdrawal', handler: _lazy_s7gP6C, lazy: true, middleware: false, method: "post" },
  { route: '/__nuxt_error', handler: _lazy_VEugJO, lazy: true, middleware: false, method: undefined },
  { route: '/api/_nuxt_icon/:collection', handler: _luIRAS, lazy: false, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/_ipx/**', handler: _Aatz7c, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_VEugJO, lazy: true, middleware: false, method: undefined }
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
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => b(nodeHandler, aRequest);
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
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

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

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch$1 as $, getResponseStatus as A, Button as B, defineRenderHandler as C, publicAssetsURL as D, getQuery as E, destr as F, getRouteRules as G, useNitroApp as H, serialize$1 as I, defu as J, parseQuery as K, Layout as L, klona as M, defuFn as N, hasProtocol as O, isScriptProtocol as P, joinURL as Q, isEqual as R, withQuery as S, sanitizeStatusCode as T, getContext as U, withTrailingSlash as V, withoutTrailingSlash as W, withLeadingSlash as X, parseURL as Y, baseURL as Z, createHooks as _, auth as a, executeAsync as a0, toRouteMatcher as a1, createRouter$1 as a2, encodeParam as a3, encodePath as a4, normalizeException as a5, upperFirst as a6, hash$1 as a7, nodeServer as a8, getRouterParam as b, createError$1 as c, defineEventHandler as d, removeFileByUrl as e, getRouterParams as f, getRequestParam as g, getValidatedQuery as h, sendEmail as i, reverseTransaction as j, generateAccountNumber as k, removeUserImage as l, saveUserImage as m, eventHandler as n, setResponseStatus as o, prisma as p, getUpdatedCurrencyData as q, readValidatedBody as r, saveFile as s, toWebRequest as t, checkUserKycApproval as u, checkBusinessProfileApproval as v, getJointAccountModApprovals as w, buildAssetsURL as x, useRuntimeConfig as y, getResponseStatusText as z };
//# sourceMappingURL=nitro.mjs.map
