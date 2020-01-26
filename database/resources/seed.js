const sequelize = require('sequelize');
const faker = require('faker');
const Review = require('../index.js');


const generateRating = () => {
  const temp = Math.random();
  if (temp >= 0.2) {
    return faker.random.number({ min: 3, max: 5 });
  }
  return faker.random.number({ min: 1, max: 3 });
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
    let title; let recommended; let size; let width; let comfort; let quality;
    let verified = false;
    let helpfulYes = 0;
    let helpfulNo = 0;
    if (rating >= 3) {
      title = goodTitles[Math.round(Math.random() * (goodTitles.length - 1))];
      recommended = true;
      size = Math.round(Math.random() * faker.random.number({ min: 5, max: 10 }));
      width = Math.round(Math.random() * faker.random.number({ min: 5, max: 10 }));
      comfort = Math.round(Math.random() * faker.random.number({ min: 5, max: 10 }));
      quality = Math.round(Math.random() * faker.random.number({ min: 5, max: 10 }));
    } else {
      title = badTitles[Math.round(Math.random() * (badTitles.length - 1))];
      recommended = false;
      size = Math.round(Math.random() * faker.random.number({ min: 0, max: 5 }));
      width = Math.round(Math.random() * faker.random.number({ min: 0, max: 5 }));
      comfort = Math.round(Math.random() * faker.random.number({ min: 0, max: 5 }));
      quality = Math.round(Math.random() * faker.random.number({ min: 0, max: 5 }));
    }
    if (Math.random() > 0.1) {
      verified = true;
    }
    if (Math.random() > 0.6) {
      helpfulYes = Math.floor(Math.random() * 40);
      helpfulNo = Math.floor(Math.random() * 10);
    }
    const fakeReview = {
      rating,
      title,
      body: faker.lorem.sentences({ sentenceCount: Math.round(Math.random() * 3) }),
      recommended,
      name: faker.internet.userName(),
      verified,
      helpfulYes,
      helpfulNo,
      date: `${faker.date.month()} ${faker.number.random({ min: 1, max: 31 })}, ${faker.number.random({ min: 2015, max: 2019 })}`,
      size,
      width,
      comfort,
      quality,
    };
    Review.create(fakeReview);
  }
};

generateReviews();
