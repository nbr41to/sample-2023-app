import { Post } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma/client';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Post | Post[] | { error: string }>,
) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      // Get data from your database
      const getRes = await prisma.post.findMany();
      res.status(200).json(getRes);
      break;

    case 'POST':
      /* 1/3の確率で擬似的にエラー */
      if (Math.random() < 0.33) {
        res.status(500).json({ error: 'エラーが発生しました' });
        return;
      }
      // Update or create data in your database
      console.log(req.body);
      const postRes = await prisma.post.create({
        data: {
          name: req.body.name || '名無しさん',
          content: req.body.content,
        },
      });
      res.status(200).json(postRes);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
