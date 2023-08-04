'use client';

import { useEffect, useState } from "react";

import Profile from '@components/Profile';
import Post from "@models/Post";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const ProfilePage = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch(`/api/users/${session?.user?.id}/posts`);
            const data = await res.json();
            console.log(data);
            setPosts(data);
        }

        if (session?.user.id) fetchPosts();
    }, [])

    const handleDelete = async (post: Post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this prompt?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = posts.filter((item: Post) => item._id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleEdit = async (post: Post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    return (
        <Profile
            name='My'
            data={posts}
            description='Welcome to your personalized profile page'
            handleDelete={handleDelete}
            handleEdit={handleEdit}
        />
    )
}

export default ProfilePage;