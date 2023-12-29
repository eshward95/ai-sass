"use client";
import { Heading } from "@/components/heading";
import axios from "axios";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useProModal } from "@/hooks/use-pro-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formSchema } from "./constant";
type MessageType = {
  content: String;
  role: String;
};
const VideoPage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [video, setVideo] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setVideo("");
      // const userMessage: MessageType = {
      //   role: "user",
      //   content: values.prompt,
      // };
      // const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/video", values);
      console.log(response);
      setVideo(response.data[0]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
    } finally {
      //This helps in refresh when we make a new request
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Video generation"
        description="Turn your prompt into video"
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-emerald-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border
               w-full p-4 px-3 md:px-6
                grid grid-cols-12 gap-2 
                focus-within:shadow-sm"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none 
                        focus-visible:ring-0 
                        focus-visible:ring-transparent"
                        type="text"
                        disabled={isLoading}
                        placeholder="Dancing in the air.."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        {isLoading && (
          <div className="items-center justify-center p-8 rounded-lg w-full">
            <Loader />
          </div>
        )}
        {video.length === 0 && !isLoading && (
          <Empty label="No video generated" />
        )}
        <div className="space-y-4 mt-4">
          {video && (
            <video
              className="w-full mt-8 aspect-video rounded-lg border bg-black"
              controls
            >
              <source src={video} />
            </video>
          )}
          {/* <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  "p-8 w-full flex items-start rounded-lg gap-x-8 bg-slate-100",
                  message.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
