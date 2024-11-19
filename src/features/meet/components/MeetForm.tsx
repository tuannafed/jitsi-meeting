/* eslint-disable no-console */
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';

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
import { cn } from '@/lib/utils';
import { RoomReqSchema, TRoomReq } from '@/schemas/meet/request';
import { importJitsiApi } from '@/utils';

import * as Default from '../defaults';
import { JitsiMeetAPIOptions } from '../types';

export function MeetForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(false);
  const [onCall, setOnCall] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

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
        setLoading(true);
        startConference();
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

  const startConference = async () => {
    console.log('ref.current :>> ', ref.current);
    if (!ref.current) return;

    try {
      const JitsiMeetExternalAPI: any = await importJitsiApi().catch((err) => {
        console.error('Jitsi Meet API library not loaded.', err);
      });
      console.log('JitsiMeetExternalAPI :>> ', JitsiMeetExternalAPI);

      const options: JitsiMeetAPIOptions = {
        roomName: form.getValues('roomName'),
        parentNode: ref.current as any,
        configOverwrite: {
          startWithAudioMuted: true,
          startScreenSharing: true,
          enableEmailInStats: false,
          disable1On1Mode: true,
        },
        interfaceConfigOverwrite: {
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
          SHOW_CHROME_EXTENSION_BANNER: false,
        },
        jwt: process.env.NEXT_PUBLIC_JITSI_JWT,
        userInfo: {
          email: '',
        },
      };
      const domain = 'meet.jit.si';
      const displayName = form.getValues('yourName');
      const password = form.getValues('password');

      const api = new JitsiMeetExternalAPI(domain, options);

      console.log('api :>> ', api);

      if (!api) throw new Error('Failed to create JitsiMeetExternalAPI istance');

      setLoading(false);
      setOnCall(true);

      api.addEventListener('videoConferenceJoined', () => {
        console.log('loading :>> ', loading);

        api.executeCommand('displayName', displayName);

        if (domain === Default.Props.domain && password) api.executeCommand('password', password);
      });

      /**
       * If we are on a self hosted Jitsi domain, we need to become moderators before setting a password
       * Issue: https://community.jitsi.org/t/lock-failed-on-jitsimeetexternalapi/32060
       */
      api.addEventListener('participantRoleChanged', (e: { id: string; role: string }) => {
        if (domain !== Default.Props.domain && password && e.role === 'moderator')
          api.executeCommand('password', password);
      });
    } catch (error) {
      console.error('Failed to start the conference', error);
    }
  };

  return (
    <Fragment>
      {!onCall && (
        <div className="max-w-xl mx-auto flex items-center h-full">
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
        </div>
      )}
      <div className={cn('main')}>
        <div id="react-jitsi-container" style={{ ...Default.ContainerStyle }}>
          {loading && <Loader />}
          <div id="react-jitsi-frame" style={{ ...Default.FrameStyle(loading) }} ref={ref} />
        </div>
      </div>
    </Fragment>
  );
}
