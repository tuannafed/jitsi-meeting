import { z } from 'zod';

export const RoomReqSchema = z.object({
  roomName: z.string().min(1, { message: 'Please enter a room name' }),
  yourName: z.string().min(1, { message: 'Please enter a your name' }),
  password: z.string().min(1, { message: 'Please enter a password' }),
});

export const RoomReq = z.object({});

export type TRoomReq = z.infer<typeof RoomReqSchema>;
