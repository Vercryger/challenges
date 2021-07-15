function createPromise(arg) {
  return new Promise(resolve => {
    setTimeout(resolve, 500, arg)
  })
}

async function main1 () {
  let now = Date.now();
  const res = [];

  createPromise('p1 (1)')
    .then(str => {
      res.push(str);
      return createPromise('p2 (1)')
    })
    .then(str => {
      res.push(str);
      return createPromise('p3 (1)')
    })
    .then(str => {
      res.push(str);
      return createPromise('p4 (1)')
    })
    .then(str => {
      res.push(str);
      return createPromise('p5 (1)')
    })
    .then((str) => {
      console.log([...res, str]);
      console.log(`(1)Took ${Date.now() - now}ms`);
    });
}

async function main2 () { 
  let now = Date.now();

  const res = await Promise.all([
    createPromise('p1 (2)'),
    createPromise('p2 (2)'),
    createPromise('p3 (2)'),
    createPromise('p4 (2)'),
    createPromise('p5 (2)'),
  ]);

  console.log(res);
  console.log(`(2)Took ${Date.now() - now}ms`);
}

async function main3 () {
  const res = [];
  let now = Date.now();

  for (let i = 0; i < 5; i++) {
    const _res = await createPromise(`p${i + 1} (3)`)
    res.push(_res);
  }

  console.log(res);
  console.log(`(3)Took ${Date.now() - now}ms`);
}

main1();
main2();
main3();
