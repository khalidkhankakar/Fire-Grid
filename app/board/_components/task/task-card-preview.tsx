import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import MDEditor from '@uiw/react-md-editor';
interface Label {
    title: string
    color: string
}

interface TaskCardPreviewProps {
    coverImage: string
    title: string
    cardColor: string
    labels: Label[]
    description: string
    deadline: string
    setShow: (t: boolean) => void
}

export function TaskCardPreview({
    
    coverImage,
    title,
    labels,
    description,
    deadline,
    setShow
}: TaskCardPreviewProps) {
    return (
        <Card className={`w-full  overflow-hidden bg-white dark:bg-dark-1 border-none shadow-none ring-0 rounded-none`}>
            <div className="relative max-h-40">
                {coverImage && <Image
                    src={coverImage}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                />}

                <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 bg-white bg-opacity-70 hover:bg-opacity-100"
                    onClick={() => setShow(true)}
                >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
            </div>
            <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">{title}</h2>
                { labels.length > 0 && <div className="flex flex-wrap gap-2 mb-3">
                    {labels.map((label, index) => (
                        <Badge key={index} style={{ backgroundColor: label.color }}>{label.title}</Badge>
                    ))}
                </div>}
                {description &&  <MDEditor.Markdown className='p-3 bg-white dark:bg-dark-1 rounded-lg my-3' source={description} />}

                { deadline && <div className="flex w-fit rounded-md bg-slate-300 items-center text-sm text-gray-600 py-1 px-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{deadline}</span>
                </div>}
            </CardContent>
        </Card>
    )
}

export default TaskCardPreview
