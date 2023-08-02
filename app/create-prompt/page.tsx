'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Form from "@components/Form";

export type Prompt = {
    prompt: string,
    tag: string
    userId?: string
}


const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [post, setPost] = useState<Prompt>({ prompt: "", tag: "" });


    const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id
                }),
            })

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />

    )
}

export default CreatePrompt