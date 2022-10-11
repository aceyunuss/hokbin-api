async function act1() {
  console.log("first");
}

async function act2() {
  return setTimeout(() => {
    console.log("done timeout");
  }, 1000);
}

async function act3() {
  let element = 0;
  for (let index = 0; index < 10000; index++) {
    element += index;
  }
  console.log(element);
}

async function act4() {
  console.log("last");
}

async function show() {
  const res = await Promise.all([act1(), act2(), act3(), act4()]);
}

show();
