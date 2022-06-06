function valid(str) {
  const regex = /(ftp|http|https):\/\/(\w+:{0,1\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return regex.test(str);
}

export default {
  valid
};
