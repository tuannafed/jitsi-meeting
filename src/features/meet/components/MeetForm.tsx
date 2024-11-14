'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import Jitsi from 'react-jitsi';

import { CardWrapper } from '@/components/card/cardWrapper';
import { Loader } from '@/components/loader';
import { PasswordInput } from '@/components/passwordInput';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { RoomReqSchema, TRoomReq } from '@/schemas/meet/request';

export function MeetForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [onCall, setOnCall] = useState(false);

  const form = useForm<TRoomReq>({
    resolver: zodResolver(RoomReqSchema),
    defaultValues: {
      roomName: '',
      yourName: '',
      password: '',
    },
  });

  const onSubmit = async () => {
    startTransition(async () => {
      try {
        setOnCall(true);
        // Do something with the form data
      } catch (e) {
        toast({
          variant: 'error',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
      }
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAPI = (JitsiMeetAPI: any) => {
    // eslint-disable-next-line no-console
    console.log('JitsiMeetAPI =======>> ');
    JitsiMeetAPI.executeCommand('toggleVideo');
  };

  return (
    <Fragment>
      {onCall ? (
        <Jitsi
          roomName={form.getValues('roomName')}
          displayName={form.getValues('yourName')}
          password={form.getValues('password')}
          loadingComponent={Loader}
          config={{
            startWithAudioMuted: true,
            startScreenSharing: true,
            enableEmailInStats: false,
            disable1On1Mode: true,
          }}
          interfaceConfig={{
            DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          }}
          jwt={process.env.NEXT_PUBLIC_JITSI_JWT}
          onAPILoad={handleAPI}
        />
      ) : (
        <CardWrapper
          headerTitle="Jitsi Meet Nextjs Demo"
          headerLabel="An example usage of the Jitsi Meet React component."
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
              <FormField
                control={form.control}
                name="roomName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RoomName</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your room name..."
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yourName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your your name..."
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} disabled={isPending} placeholder="******" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-center !mt-8">
                <Button disabled={isPending} className="w-[120px]" type="submit">
                  {isPending ? 'Starting...' : 'Let start!'}
                </Button>
              </div>
            </form>
          </Form>
        </CardWrapper>
      )}
    </Fragment>
  );
}
