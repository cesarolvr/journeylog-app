export const journey = {};

export const getLogFromADay = (dateToBeSearched) => {

  const isSameDay = (d1, d2) => {
    return d1.getUTCFullYear() === d2.getUTCFullYear() &&
      d1.getUTCMonth() === d2.getUTCMonth() &&
      d1.getUTCDate() === d2.getUTCDate();
  }

  const database = [{
    id: 111,
    dateCreated: new Date(2024, 6, 18),
    type: "",
    content: "",
    journey_id: 3,
    content: '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"dia 18","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"opa","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sim sim","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":3},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"nsdojsdi","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":4},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ewoisndxew","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":5}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"check","start":1,"tag":"ul"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
  }, {
    id: 111,
    dateCreated: new Date(2024, 6, 15),
    type: "",
    content: "",
    journey_id: 3,
    content: '{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"dia 15","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"opa","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":2},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"sim sim","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":3},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"nsdojsdi","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":4},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ewoisndxew","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"listitem","version":1,"value":5}],"direction":"ltr","format":"","indent":0,"type":"list","version":1,"listType":"check","start":1,"tag":"ul"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
  }]


  const query = database.find((item) => {
    return isSameDay(item.dateCreated, dateToBeSearched)
  })


  return new Promise((resolve, reject) => {
    setTimeout(
      resolve(query),
      Math.random() * 1000
    );
  });
};

export const getJourneys = (userId: Number) => {

  const database = [
    {
      ownerId: 123,
      journey_id: 3,
      dateCreated: new Date(2023, 6, 15),
      id: "english-learning",
      name: "🇺🇸 English learning",
    },
    {
      ownerId: 123,
      journey_id: 3,
      dateCreated: new Date(2023, 6, 15),
      id: "to-learn-golang",
      name: "📚 To learn Golang",
    },
    {
      ownerId: 123,
      journey_id: 3,
      dateCreated: new Date(2023, 6, 15),
      id: "gym",
      name: "🏋🏾 Gym",
    },
    {
      ownerId: 126,
      journey_id: 3,
      dateCreated: new Date(2023, 6, 15),
      id: "good-habits",
      name: "🥦 Good habits",
    },
    {
      ownerId: 127,
      journey_id: 3,
      dateCreated: new Date(2023, 6, 15),
      id: "to-drink-water",
      name: "💦 To drink water",
    },
  ]


  const query = database.filter((item) => {
    return item.ownerId === userId
  })


  return new Promise((resolve, reject) => {
    setTimeout(
      resolve(query),
      Math.random() * 1000
    );
  });
};


export const quotes = [
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
  },
  {
    text: "The chains of habit are too weak to be felt until they are too strong to be broken.",
    author: "Samuel Johnson",
  },
  {
    text: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Ryun",
  },
  {
    text: "Successful people are simply those with successful habits.",
    author: "Brian Tracy",
  },
  {
    text: "Your net worth to the world is usually determined by what remains after your bad habits are subtracted from your good ones.",
    author: "Benjamin Franklin",
  },
  {
    text: "Good habits formed at youth make all the difference.",
    author: "Aristotle",
  },
  {
    text: "The second half of a man's life is made up of nothing but the habits he has acquired during the first half.",
    author: "Fyodor Dostoevsky",
  },
  {
    text: "Habit is a cable; we weave a thread each day, and at last we cannot break it.",
    author: "Horace Mann",
  },
  {
    text: "The best way to break a bad habit is to drop it.",
    author: "Leo Aikman",
  },
  {
    text: "First we form habits, then they form us. Conquer your bad habits, or they’ll eventually conquer you.",
    author: "Dr. Rob Gilbert",
  },
];