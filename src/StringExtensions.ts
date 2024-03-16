declare global {
  interface String {
    captilizeFirstLetter(): string;
  }
}

String.prototype.captilizeFirstLetter = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export {};
