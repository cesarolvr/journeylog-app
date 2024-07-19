export const journey = {};

export const getLogFromADay = (date: any) => {
  return new Promise((resolve, reject) => {
    if (!date) reject()
    setTimeout(
      resolve({
        id: 111,
        dateCreated: new Date(),
        type: "",
        content: "",
        journey_id: 3,
        content: '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"opa opa","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"opa","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sim sim","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":3},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"nsdojsdi","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":4},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ewoisndxew","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":5}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"check","start":1,"tag":"ul"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
      }),
      Math.random() * 1000
    );
  });
};
