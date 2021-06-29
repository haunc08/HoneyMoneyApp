export default function toMoneyString(string) {
  var s = "" + string;
  var part = s.split("-");
  var sign = "";

  var num;
  if (part[0] === "") {
    sign = "-";
    num = part[1];
  } else {
    num = part[0];
    if (num[0] == "+") {
      sign = "+";
      num = num.split("+")[1];
    }
  }
  if (parseInt(num) < 3) {
    return num;
  }
  num = num.split("").reverse().join("");
  var result = "";
  var i = 0;
  for (i; i < num.length - 3; i += 3) {
    result += num.substring(i, i + 3) + ",";
  }
  result += num.substring(i, i + 3);
  result = result.split("").reverse().join("");
  return sign + result + " VNĐ";
}

export function toMoneyStringWithoutVND(string) {
  var s = "" + string;
  var part = s.split("-");
  var sign = "";

  var num;
  if (part[0] === "") {
    sign = "-";
    num = part[1];
  } else {
    num = part[0];
    if (num[0] == "+") {
      sign = "+";
      num = num.split("+")[1];
    }
  }
  if (parseInt(num) < 3) {
    return num;
  }
  num = num.split("").reverse().join("");
  var result = "";
  var i = 0;
  for (i; i < num.length - 3; i += 3) {
    result += num.substring(i, i + 3) + ",";
  }
  result += num.substring(i, i + 3);
  result = result.split("").reverse().join("");
  return sign + result;
}

export const FloatToMoney = (num) => {
  const world = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  return (
    world.replace(/,/g, "_").replace(/\./g, ",").replace(/_/g, ".") + " VNĐ"
  );
};
