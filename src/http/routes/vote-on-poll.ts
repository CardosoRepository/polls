import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";
import { redis } from "../../lib/redis";

export async function voteOnPoll(app: FastifyInstance) {
    app.post("/polls/:pollId/votes", async (req, reply) => {
        const voteOnPollBody = z.object({
            pollOptionId: z.string().uuid(),
        });

        const voteOnPollParams = z.object({
            pollId: z.string().uuid(),
        });

        const { pollOptionId } = voteOnPollBody.parse(req.body);
        const { pollId } = voteOnPollParams.parse(req.params);

        let { sessionId } = req.cookies; // let sessionId = req.cookies.sessionId;

        if (sessionId) {
            const userPreviousVoteOnPoll = await prisma.vote.findUnique({
                where: {
                    sessionId_pollId: {
                        sessionId,
                        pollId,
                    },
                },
            });

            if (
                userPreviousVoteOnPoll &&
                userPreviousVoteOnPoll.pollOptionId !== pollOptionId
            ) {
                await prisma.vote.delete({
                    where: {
                        id: userPreviousVoteOnPoll.id,
                    },
                });

                await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.id);
            } else {
                if (userPreviousVoteOnPoll) {
                    return reply
                        .status(400)
                        .send({ message: "You already voted on this poll." });
                }
            }
        }

        if (!sessionId) {
            sessionId = randomUUID();

            reply.setCookie("sessionId", sessionId, {
                path: "/",
                maxAge: 60 * 60 * 24 * 30, // 30 days
                signed: true,
                httpOnly: true,
            });
        }

        await prisma.vote.create({
            data: {
                sessionId,
                pollId,
                pollOptionId,
            },
        });

        await redis.zincrby(pollId, 1, pollOptionId);

        return reply.status(201).send();
    });
}