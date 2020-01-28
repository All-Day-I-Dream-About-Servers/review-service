/* eslint-disable no-else-return */
const faker = require('faker');
const Review = require('../index.js');


const generateRating = () => {
  const temp = Math.random();
  if (temp >= 0.22) {
    return faker.random.number({ min: 4, max: 5 });
  } else if (temp >= 0.1) {
    return 3;
  } else {
    return faker.random.number({ min: 1, max: 2 });
  }
};

const goodTitles = [
  'I love these shoes!', 'Great purchase', 'Stylish and comfortable', 'No regrets',
  'Excellent!', 'Good shoes', null, 'Wonderful', 'Recommended', 'My new fave!', 'Best shoes',
  'Wise purchase', 'Great buy', 'Love them!', 'Not bad',
];

const badTitles = [
  'Fit poorly', null, 'Didn\'t last', 'Don\'t buy', null, 'Beware!', 'Look elsewhere',
  'Nike >', 'Not good',
];

const generateReviews = () => {
  for (let i = 0; i < 100; i += 1) {
    const rating = generateRating();
    let title; let recommended;
    let verified = false;
    let helpfulYes = 0;
    let helpfulNo = 0;
    const size = Math.round(faker.random.number({ min: 0, max: 10 }));
    const width = Math.round(faker.random.number({ min: 0, max: 10 }));
    const comfort = Math.round(faker.random.number({ min: 0, max: 10 }));
    const quality = Math.round(faker.random.number({ min: 0, max: 10 }));
    if (rating >= 3) {
      title = goodTitles[Math.round(Math.random() * (goodTitles.length - 1))];
      recommended = true;
    } else {
      title = badTitles[Math.round(Math.random() * (badTitles.length - 1))];
      recommended = false;
    }
    if (Math.random() > 0.1) {
      verified = true;
    }
    if (Math.random() > 0.6) {
      helpfulYes = Math.floor(Math.random() * 40);
      helpfulNo = Math.floor(Math.random() * 10);
    }
    const month = faker.date.month();
    const day = faker.random.number({ min: 1, max: 31 });
    const year = faker.random.number({ min: 2015, max: 2019 });
    const date = new Date(`${month} ${day}, ${year}`);
    let monthStr; let dayStr;
    if (`${date.getMonth()}`.length === 1) {
      monthStr = `0${date.getMonth()}`;
    } else {
      monthStr = `${date.getMonth()}`;
    }
    if (`${day}`.length === 1) {
      dayStr = `0${day}`;
    } else {
      dayStr = `${day}`;
    }
    const fakeReview = {
      rating,
      title,
      body: faker.lorem.sentences(Math.round(Math.random() * 3 + 1)),
      recommended,
      name: faker.internet.userName(),
      verified,
      helpfulYes,
      helpfulNo,
      date: `${month} ${day}, ${year}`,
      dateNum: Number(`${year}${monthStr}${dayStr}`),
      size,
      width,
      comfort,
      quality,
    };
    Review.create(fakeReview);
  }
};

generateReviews();
