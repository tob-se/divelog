"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { Suggestion } from "use-places-autocomplete";
import { z } from "zod";
import GoogleAutocomplete from "./google-autocomplete";
// @ts-ignore
import species from "./species.json";
import Link from "next/link";

type Specie = {
  id: number;
  name: string;
  oberservations: number;
  common_name?: string;
  image?: {
    square_url: string;
    medium_url: string;
    original_dimensions: {
      height: number;
      width: number;
    };
  };
};

// @ts-ignore
const selectables: Option[] = species.slice(0, 20).map((specie: Specie) => ({
  value: specie.common_name + specie.name,
  ...specie,
}));

const optionSchema = z.object({
  value: z.string(),
  id: z.number(),
  name: z.string(),
});

const suggestionSchema = z.object({
  place_id: z.string(),
  description: z.string(),
  structured_formatting: z.object({
    main_text: z.string(),
    secondary_text: z.string(),
    main_text_matched_substrings: z.array(
      z.object({
        length: z.number(),
        offset: z.number(),
      })
    ),
  }),
  distance_meters: z.number().optional(),
  matched_substrings: z.array(
    z.object({
      length: z.number(),
      offset: z.number(),
    })
  ),
  terms: z.array(
    z.object({
      offset: z.number(),
      value: z.string(),
    })
  ),
  types: z.array(z.string()),
});

const formSchema = z.object({
  date: z.date().optional(),
  marineLife: z.array(optionSchema).optional(),
  location: suggestionSchema.optional(),
  diveSite: z.string().optional(),
});

export default function DiveForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      diveSite: "",
      marineLife: [],
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Dive #199</CardTitle>
            <CardDescription>How was your dive?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marineLife"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marine Life</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={selectables}
                      placeholder="Hammerhead"
                      emptyIndicator={
                        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                          no results found.
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dive Center/Location</FormLabel>
                  <FormControl>
                    <GoogleAutocomplete
                      selected={field.value}
                      setSelected={(s: Suggestion) =>
                        form.setValue("location", s)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="diveSite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dive Site</FormLabel>
                  <FormControl>
                    <Input placeholder="Barracuda Point" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/">
              <Button variant="outline">Cancel</Button>
            </Link>
            <Button type="submit">Save</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
