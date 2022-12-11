import axios from 'axios';
import { useState } from 'react';
import { usePosts } from '../src/swr/usePosts';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [formValue, setFormValue] = useState({ name: '', content: '' });
  const { data, isLoading, trigger, isMutating, mutateError } = usePosts();

  const handleSubmit = async () => {
    if (!formValue.content) return;
    const res = await trigger(formValue); // triggerを使用すると、usePostsのfetcherが実行される模様
    // const res = await axios.post('/api/posts', formValue); // dataは更新されない

    console.log(res);
  };

  return (
    <div className={styles.container}>
      <h1>App</h1>
      <input
        placeholder='name'
        type='text'
        onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
      />
      <br />
      <input
        type='text'
        placeholder='message'
        onChange={(e) =>
          setFormValue({ ...formValue, content: e.target.value })
        }
      />
      <button disabled={isMutating} onClick={handleSubmit}>
        submit
      </button>
      {mutateError && <p>{mutateError.error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data?.map((post) => (
            <div key={post.id}>
              <h4>
                {post.name}
                <span style={{ fontSize: '10px', marginLeft: '8px' }}>
                  {post.createdAt.toLocaleString()}
                </span>
              </h4>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
