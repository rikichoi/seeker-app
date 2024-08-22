
import React from 'react'
import prisma from './prisma'
import { Prisma } from '@prisma/client';

export type JobWithCompany = Prisma.JobGetPayload<{
    include: { company: true },
}>

export async function getJobs() {
    const jobs = await prisma.job.findMany({
        include: { company: true }, orderBy: {
            createdAt: 'asc',
        },
    });
    return jobs
}

export async function getJobById(jobId: string) {
    const job = await prisma.job.findUnique({
        where: {
            id: jobId,
        },
        include: { company: true },
    });

    return job
}