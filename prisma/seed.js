import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';


try {

  if (isDev) {
    await prisma.$queryRaw`TRUNCATE comments, reviews, games, users RESTART IDENTITY CASCADE;`;
    console.log('Development: comments, reviews, games, users tables have been truncated');
  }

  if (!isDev){
    const userCount = await prisma.user.count();

    if (userCount > 0) {
      console.log('Production: seed already appears to have run. Skipping.');
      await prisma.$disconnect();
      process.exit(0);
    }
  }

  const usersData = [
    { email: 'jane@test.com', password: 'jane1234' },
    { email: 'joe@example.com', password: 'joe1234' },
    { email: 'coryadmin@demo.com', password: 'cory1234', role: 'ADMIN' },
  ];

  const users = [];

  for (const userData of usersData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: userData.role || 'USER',
      },
    });

    users.push(user);
  }

  const games = await prisma.game.createManyAndReturn({
    data: [
      {
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Action-Adventure',
        releaseDate: new Date('2017-03-03'),
        developer: 'Nintendo',
      },
      {
        title: 'Hollow Knight',
        genre: 'Metroidvania',
        releaseDate: new Date('2017-02-24'),
        developer: 'Team Cherry',
      },
      {
        title: 'Elden Ring',
        genre: 'Action RPG',
        releaseDate: new Date('2022-02-25'),
        developer: 'FromSoftware',
      },
      {
        title: 'Red Dead Redemption 2',
        genre: 'Open World',
        releaseDate: new Date('2018-10-26'),
        developer: 'Rockstar Games',
      },
    ],
  });

  const reviews = [];

  for (const user of users) {
    for (const game of games.slice(0, 2)) {
      const review = await prisma.review.create({
        data: {
          title: `${game.title} Review`,
          content: `This is a sample review for ${game.title} by ${user.email.split('@')[0]}.`,
          rating: 8,
          authorId: user.id,
          gameId: game.id,
        },
      });

      reviews.push(review);
    }
  }

  for (const review of reviews) {
    await prisma.comment.createMany({
      data: [
        {
          content: 'I agree with this review.',
          authorId: users[0].id,
          reviewId: review.id,
        },
        {
          content: 'Interesting opinion on this game.',
          authorId: users[1].id,
          reviewId: review.id,
        },
      ],
    });
  }

  console.log('Seed completed successfully!');
} catch (error) {
  console.error('Seed failed:', error);
} finally {
  await prisma.$disconnect();
}