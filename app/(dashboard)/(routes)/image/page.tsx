"use client";
import { Heading } from "@/components/heading";
import axios from "axios";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProModal } from "@/hooks/use-pro-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { amountOptions, formSchema, resolutionOptions } from "./constant";
type MessageType = {
  content: String;
  role: String;
};
type ImageLoaderProps = { src: string };
const ImagePage = () => {
  const proModal = useProModal();
  const router = useRouter();
  const [images, setImages] = useState([]);

  const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;
  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      // const userMessage: MessageType = {
      //   role: "user",
      //   content: values.prompt,
      // };
      // const newMessages = [...messages, userMessage];
      setImages([]);
      const response = await axios.post("/api/image", values);
      console.log(response.data);
      const urls = response.data.map((image: any) => image.url);
      setImages(urls);
      console.log("urls", urls);
      // setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong");
      }
      console.log(error);
    } finally {
      //This helps in refresh when we make a new request
      router.refresh();
    }
  };

  const imageLoader = ({ src }: ImageLoaderProps) => {
    return src;
  };

  return (
    <div>
      <Heading
        title="Image generation"
        description="Turn prompt into images"
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
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
                  <FormItem className="col-span-12 lg:col-span-6">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none 
                        focus-visible:ring-0 
                        focus-visible:ring-transparent"
                        type="text"
                        disabled={isLoading}
                        placeholder="A picture of an astronaut riding a horse in space"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    {/* <Input type="number" {...field} /> */}
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {amountOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="resolution"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    {/* <Input type="number" {...field} /> */}
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {resolutionOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
          <div className="p-20">
            <Loader />
          </div>
        )}
        {images.length === 0 && !isLoading && (
          <Empty label="No images generated" />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8 gap-4">
          {images.map((src, i) => (
            <Card key={i}>
              <div className="relative aspect-square">
                <Image
                  placeholder={`data:image/svg+xml;base64,${toBase64(
                    shimmer(700, 475)
                  )}`}
                  alt="image"
                  fill
                  src={src}
                />
              </div>
              <CardFooter className="p-2">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => window.open(src)}
                >
                  <Download className="w-4 h-4 mr-2">Download</Download>
                </Button>
              </CardFooter>
            </Card>
          ))}
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
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default ImagePage;
