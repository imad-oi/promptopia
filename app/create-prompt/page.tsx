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
            console.log("session is", session)
            console.log("post is", post)
            await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag,
                    userId: session?.user.id
                }),
            });

            alert("Prompt created successfully");
            router.push("/");
        } catch (error) {
            alert("Failed to create prompt");
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />

    )
}

export default CreatePrompt