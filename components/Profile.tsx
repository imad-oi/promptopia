import PromptCard from "./PromptCard"
import Post from "@models/Post"

type ProfileProps = {
  name: string,
  description: string,
  data: any[]
  handleDelete: (post: Post) => void
  handleEdit: (post: Post) => void
}



const Profile = ({
  name, description, data, handleDelete, handleEdit
}: ProfileProps) => {

  return (
    <section className="w-full">

      <h1 className="head_text text-left">
        <span className="blue_gradient"> {name} </span>
        Profile
      </h1>
      <p className="desc text-left"> {description} </p>

      <div className="mt-10 sm:columns-2  md:columns-2 lg:columns-3 space-y-4 gap-4 mb-5 ">
        {data.map((post, index) => (
          <PromptCard
            key={index}
            post={post}
            handleTagClick={() => { }}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleEdit={() => handleEdit && handleEdit(post)}
          />
        ))}
      </div>

    </section>
  )
}

export default Profile