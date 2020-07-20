// Passes worker messages to correct handlers

import fs from "fs";
import path from "path";

const handlers = {};
const ignoredFiles = ["index", "headers"];

// Load message handlers
const files = fs.readdirSync(__dirname);
files.forEach(file => {
  const handlerPath = path.join(__dirname, file);
  const handlerStat = fs.statSync(handlerPath);

  // Ignore directories
  if (handlerStat.isDirectory()) return;

  // Ignore map files
  if (handlerPath.endsWith(".map")) return;

  // This is the name of the message that can be called
  const handlerName = path.basename(handlerPath, ".js");
  
  // Ignore blacklisted files
  if (ignoredFiles.includes(handlerName)) return;

  // Save method to the respective handler
  handlers[handlerName] = require(handlerPath);

  console.log(`Registered handler: ${handlerName}`);
});

// Message when there's no registered handlers found
if (Object.getOwnPropertyNames(handlers).length === 0)
  console.log("No message handlers found");

// Call workerHandlers() with payload and the master can send info to workers
// { header, content, socket }
export = function(payload: any) {
  // console.log("payload", payload);
  try {
    payload.header = JSON.parse(payload.header);
  } catch (e) {};
  try {
    payload.content = JSON.parse(payload.content);
  } catch (e) {};

  // Problems
  // if (!payload.content)
  //   return console.error({ payload }, "No payload content sent to handler");
  if (!payload.header)
    return console.error({ payload }, "No payload header sent to handler");
  if (!payload.socket)
    return console.error({ payload }, "No payload socket sent to handler");
  if (!payload.header.hasOwnProperty("type"))
    return console.error({ payload }, "Payload header has no message type");
  if (!handlers.hasOwnProperty(payload.header.type))
    return console.error({ payload }, "No handler defined for message type");
  if (typeof handlers[payload.header.type] !== "function")
    return console.error({ handler: handlers[payload.header.type] }, "Handler is not a function");

  // We'll need to reply to the worker with the result of this event
  // console.log(`${hostname} - Calling handler for`, payload.header.type);
  return handlers[payload.header.type](payload, (err, results) => {
    if (err) return console.error({ err, results }, `Error in worker handler: ${err}`);
    //
  });
};
