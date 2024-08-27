import { issueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const { success, error } = issueSchema.safeParse(body);

  if (!success)
    return NextResponse.json({ error: error.format() }, { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}
