export = function help() {
  console.log("Wiresync can be called with these arguments:\n");

  console.log("wiresync status          \tShow status of wiresync connections");
  console.log("wiresync configure [name]\tSet up or change a wiresync connection");
  console.log("wiresync list            \tShow all wiresync connections");
  console.log("wiresync remove [name]   \tDelete a wiresync connection");
}
