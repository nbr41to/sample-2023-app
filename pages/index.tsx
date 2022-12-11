import { usePosts } from '../src/swr/usePost';
import styles from '../styles/Home.module.css';

export default function Home() {
  const { data, isLoading, trigger, isMutating, mutateError } = usePosts();

  const handleSubmit = async () => {
    const res = await trigger({ name: 'Steve Nobs', content: 'Hello World' });

    console.log(res);
  };

  return (
    <div className={styles.container}>
      <h1>App</h1>
      <input placeholder='名無しさん' type='text' />
      <br />
      <input type='text' />
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
