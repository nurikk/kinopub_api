export class Base {
  log() {
    console.log.apply(console, arguments);
  }
}