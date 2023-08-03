'use client';

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";


type PromptCardListProps = {
  data: any[],
  handleTagClick: (tag: string) => void
}


const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard
          key={index}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [posts, setPosts] = useState<any[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:3000/api/prompt');
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, [])


  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          placeholder="Search for a prompt..."
          value={searchText}
          required
          className="search_input peer"
          onChange={handleSearchChange}
          type="text" />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => { }}
      />
    </section>
  )
}

export default Feed