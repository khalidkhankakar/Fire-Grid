'use client'
import { updatedCard } from "@/actions/card.actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { backgroundArray } from "@/contants"
import { useToast } from "@/hooks/use-toast"
import { taskSchema } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, X } from "lucide-react"
import Image from "next/image"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface Label {
    title: string;
    color: string;
}

interface TaskEditFormProps {
    id: string;
    coverImage: string;
    title: string;
    cardColor: string;
    labels: Label[];
    description: string;
    deadline: string;
    setShow: (b: boolean) => void;
}

export function TaskCardEditForm({
    id,
    coverImage,
    title,
    cardColor,
    labels: initialLabels,
    description,
    deadline,
    setShow
}: TaskEditFormProps) {

    const [isPending, startTransition] = useTransition();
    const {toast} = useToast();
    const [selectedBackground, setSelectedBackground] = useState<string>(coverImage || '');
    const form = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            id,
            title: title || '',
            description: description || '',
            deadline: deadline || '',
            labels: initialLabels || [],
            cardColor: cardColor || '',
            coverImage: coverImage || '',
        },
    })

    function onSubmit(values: z.infer<typeof taskSchema>) {
        if(!id) return
        console.log({id})
        startTransition(() => {
            updatedCard(values).then((res) => {
                if(res.success) toast({ title: res.status });
                if(!res.success) toast({ title: res.status, variant: 'destructive' })
            }).catch((err) => toast({ title: err.status, variant: 'destructive' }));
        })

    }
    const [labels, setLabels] = useState<Label[]>(initialLabels || []);
    const [newLabel, setNewLabel] = useState({ title: '', color: '#000000' });


    const handleAddLabel = () => {
        if (newLabel.title.trim()) {
            setLabels([...labels, newLabel]);
            setNewLabel({ title: '', color: '#000000' });
        }
        form.setValue("labels", [...labels, newLabel]);
    };

    const handleRemoveLabel = (index: number) => {
        setLabels(labels.filter((_, i) => i !== index));
        form.setValue("labels", labels.filter((_, i) => i !== index));
    };

    const handleBackgroundClick = (background: string) => {
        setSelectedBackground(background);
        form.setValue("coverImage", background);
    };

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">

                <div className="relative h-40">
                   {( selectedBackground || coverImage) && <Image
                        src={selectedBackground || coverImage}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                    />}

                    <Button
                        size="icon"
                        variant="secondary"
                        className="absolute top-2 right-2 bg-white bg-opacity-70 hover:bg-opacity-100"
                        onClick={() => setShow(false)}

                    >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                    </Button>
                    {/* TODO: Add cover image */}

                </div>
                <FormField
                    control={form.control}
                    name="coverImage"
                    render={() => (
                        <FormItem>
                            <FormLabel className="text-gray-500 text-sm">Card Background</FormLabel>
                            <div className="flex flex-wrap gap-2">
                                {backgroundArray.map((background) => (
                                    <div
                                        key={background}
                                        className={`h-12 w-16 rounded-md overflow-hidden cursor-pointer ${selectedBackground === background ? "ring-2 ring-blue-500" : ""
                                            }`}
                                        onClick={() => handleBackgroundClick(background)}
                                    >
                                        <Image
                                            src={background}
                                            width={100}
                                            height={100}
                                            alt="Background"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                ))}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cardColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Color</FormLabel>
                            <FormControl>
                                <Input type="color" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Deadline</FormLabel>
                            <FormControl>
                                <Input type='date' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col my-2">

                    <Label >Labels</Label>

                    <div className=" flex flex-col gap-2 my-2 w-full  ">

                        <div className="flex flex-wrap gap-2 ">

                            {labels.map((label, index) => (
                                <Badge key={index} style={{ backgroundColor: label.color }} className="flex rounded-full gap-x-2 items-center">
                                        <p className="text-xs">{label.title}</p>
                                    <Button
                                        variant="icon-normal"
                                        size="icon"
                                        onClick={() => handleRemoveLabel(index)}
                                        asChild 
                                    >
                                        <X  className="h-4 w-4"/>
                                    </Button>
                                </Badge>
                            ))}
                        </div>
                        <div className="flex items-center ">

                            <Input
                                value={newLabel.title}
                                onChange={(e) => setNewLabel({ ...newLabel, title: e.target.value })}
                                placeholder="New label"
                                className="mr-2"
                            />
                            <Input
                                type="color"
                                value={newLabel.color}
                                onChange={(e) => setNewLabel({ ...newLabel, color: e.target.value })}
                                className="w-12 h-10 p-1 mr-2"
                            />
                            <Button type="button" onClick={handleAddLabel}>Add</Button>
                        </div>
                    </div>


                </div>
                <div className="my-3">
                    <Button type="submit" className="w-full">
                        {isPending ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
