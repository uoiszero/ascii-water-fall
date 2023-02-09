import _ from "lodash";
import chalk from "chalk";

const WATER_FALL_HEIGHT = 20;
const WATER_FALL_WIDTH = 40;
const DELAY = 40;

console.clear();

const log = console.log

/**
 * 初始化数组
 */
const martrix = Array.from({ length: WATER_FALL_WIDTH }, () => {
  return Array.from({ length: WATER_FALL_HEIGHT }, () => " ");
});

/**
 * 初始化选项
 */
const OPTIONS = Array.from({ length: WATER_FALL_WIDTH }, () => {
  return {
    speed: _.random(1, 10),
    coiled: 0
  };
})

/**
 * 生成一个字符
 * @param {number} coiled 
 * @returns 
 */
function getChar(coiled = 0) {
  let random;
  if (coiled === 0) {
    random = _.random(2, 7, false);
  } else if (coiled >= 1 && coiled <= 10) {
    random = _.random(6, 8, false);
  } else {
    random = _.random(1, 10, false);
  } 
  let code = random > 6 ? _.random(33, 126, false) : 32;
  return String.fromCharCode(code)
}

/**
 * 画界面
 * @param {string} frame 
 */
function render(frame) {
  let msg = chalk.bold.rgb(102, 255, 89).bgBlack(frame);
  log(msg);
}

/**
 * 字符下降
 */
function stepDown() {
  //将数字向下移动一位
  martrix.forEach((column, index) => {
    let { speed, coiled } = OPTIONS[index];
    if (counter % speed === 0) {
      let char = getChar(coiled);
      column.splice(0, 0, char);
      setCoiled(index, char);
      column.splice(WATER_FALL_HEIGHT, 1);
    }
  })
}

function setCoiled(index, char) {
  if (char === " ") {
    OPTIONS[index].coiled = 0;
  } else {
    OPTIONS[index].coiled++;
  }
}

function getFrame() {
  let arr = Array.from({ length: WATER_FALL_HEIGHT });
  for (let j = 0; j < WATER_FALL_HEIGHT; j++) {
    let str = "";
    for (let i = 0; i < WATER_FALL_WIDTH; i++) {
      str += martrix[i][j];
    }
    arr[j] = str.split("").join(" ");
  }

  return arr.join("\n");
}

let counter = 0;

setInterval(() => {
  counter++;
  stepDown();
  let frame = getFrame();
  console.clear();
  render(frame);
  log(`frame: ${counter}`)
}, DELAY);

