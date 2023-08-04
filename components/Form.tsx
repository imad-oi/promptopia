
import { Prompt } from '@app/create-prompt/page'
import Link from 'next/link'


type FormProps = {
  type: string
  post: Prompt
  setPost: React.Dispatch<React.SetStateAction<Prompt>>
  submitting: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {

  const sum = (a: number, b: number) => {
    return a + b
  }
  sum(1, 2);
  
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>
          {type} Post
        </span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share your prompt with the world!, or just save it for later.
      </p>

      <form
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Prompt
          </span>

          <textarea
            cols={10}
            rows={10}
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            required
            className='form_textarea'
            placeholder='write your prompt here...'
          />
        </label>
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag {' '}
            <span className='font-normal'>
              (#product, #design, #tech, #business, #marketing, #other)
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            required
            name='tag'
            className='form_input'
            placeholder='#tag'
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm ' >
            Cancel
          </Link>

          <button
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
            type='submit'
            disabled={submitting}
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form